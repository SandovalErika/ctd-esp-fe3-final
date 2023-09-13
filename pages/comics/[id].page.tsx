import ComicCard from 'dh-marvel/components/ui/comicCard/ComicCard.component'
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general'
import { Result } from '../../interface/comic'
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import { useMediaQuery, Accordion, AccordionSummary, AccordionDetails, Box, Container, CardActions, CardContent, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TEXT_INFORMATION_CARD } from 'utils/constant'

interface Props {
    result: Result
    page?: number
}

const ComicPage: NextPage<Props> = ({ result, page }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const router = useRouter()

    const idCharacter = (url: any) => {
        const regex = /characters\/(\d+)/;
        const match = url.match(regex)
        const id = match ? match[1] : null;
        return id
    }

    return (
        <Box sx={{
            background: 'url(img/backgroundMarvel.jpg) no-repeat center center fixed',
            backgroundSize: 'cover', 
            minHeight: '100vh'
        }}>
        <LayoutGeneral title={'Comic'}>
          
            <Container 
                sx={{ 
                    display: "flex", 
                    flexWrap: "no-wrap", 
                    flexDirection: "row", 
                    alignContent: "center", 
                    marginX: "10rem", 
                    marginY: "2rem" 
                    }}
                >
                <ComicCard result={result} page={page} />
                <Card sx={{ width: "100%", height: "max-content", padding: 3, margin: 3, backgroundColor: theme => theme.palette.grey[300], }}>
                    <CardContent>
                        <Typography gutterBottom variant="body1"  >
                            {result?.textObjects[0]?.text}
                        </Typography>
                        <Typography gutterBottom variant="body1" >
                            {TEXT_INFORMATION_CARD.PRECIO_NUEVO + ` $ ${result.price}`}
                        </Typography>
                        <Typography gutterBottom component="div" color='red'>
                            {TEXT_INFORMATION_CARD.PRECIO_ANTERIOR}
                            <span style={{ textDecoration: 'line-through', marginLeft:"10px" }}>
                                {result.price !== result.oldPrice ? `$ ${ result.oldPrice}` : '-' }
                            </span>
                        </Typography>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{TEXT_INFORMATION_CARD.PERSONAJES}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul>
                                    {result?.characters.items?.map(character => {
                                        return (
                                            <li key={character.name} >
                                                <Link href={`/personajes/${idCharacter(character.resourceURI)}`}>
                                                    {character.name}
                                                </Link>
                                            </li>
                                        )
                                    })
                                    }
                                </ul>

                            </AccordionDetails>
                        </Accordion>
                    </CardContent>
                </Card>
            </Container>
           
        </LayoutGeneral>
        </Box>
    )
};


export const getStaticPaths: GetStaticPaths = async () => {
    const comics = await getComics(undefined, 12);

    const paths = comics.data.results?.map((comic: Result) => ({
        params: { id: comic.id.toString() },
    }));


    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = Number(context.params?.id);
    const character = await getComic(id)

    return {
        props: {
            result: character
        },
        revalidate: 60 * 60 *24
    }
}

export default ComicPage
