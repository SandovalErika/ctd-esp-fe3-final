import type {GetServerSideProps , NextPage} from 'next'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { Comics } from 'interface/comic';
import { useState } from 'react';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { Box, Grid, Pagination } from '@mui/material';
import ComicCard from 'dh-marvel/components/ui/comicCard/ComicCard.component';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { useRouter } from 'next/router';
import countComics from '../utils/generalFunctions';

interface Props {
    comics?: Comics
}

const Index: NextPage<Props> = ({comics}) => {
    const router = useRouter();
    const [page, setPage] = useState<number>(1)
    
    const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
        router.push(`?page=${newPage}`);
    };

    return (
        <>
            <LayoutGeneral title={'Comics'}>
            <Box sx={{
                    background: 'url(img/backgroundMarvel.jpg) no-repeat center center fixed',
                    backgroundSize: 'cover', 
                    minHeight: '100vh'
                }}>
                    <BodySingle title={"Marvel Project"}>
                        <Pagination 
                            onChange={handleChange} 
                            page={page} 
                            count={comics && countComics(comics)}  
                            variant="outlined" 
                            shape="rounded" 
                            color="secondary"
                            sx={{
                                display: 'block',
                                margin: '20px auto',
                                width: '24rem', 
                                backgroundColor: 'rgba(255,255,255,0.7)',
                                borderRadius: 2,
                                padding: 1,
                                }} 
                            />
                        <Grid alignItems="stretch" columnSpacing={{ xs: 1, sm: 2, md: 3 }} container spacing={2}  justifyContent="center">
                            {comics && comics.results?.map((result) => (
                                <Grid key={result.id} >
                                    <ComicCard result={result} />
                                </Grid>
                            ))}
                        </Grid>
                        <Pagination 
                            onChange={handleChange} 
                            page={page} 
                            count={comics && countComics(comics)} 
                            variant="outlined" 
                            shape="rounded" 
                            color="secondary"
                            sx={{
                                display: 'block', // Cambio a display block
                                margin: '20px auto', // Centrar horizontalmente
                                width: '24rem', 
                                backgroundColor: 'rgba(255,255,255,0.7)',
                                borderRadius: 2,
                                padding: 1,
                                }} 
                        />
                    </BodySingle>
                </Box>
            </LayoutGeneral>
        </>
    )
}

// export const getStaticProps: GetStaticProps = async () => {
    
//     const comics = await getComics(undefined, 12)
//     return {
//         props: {
//             comics: comics.data
//         }
//     }
// }

export const getServerSideProps: GetServerSideProps  = async (context) => {
    const page = context.query.page ? Number(context.query.page) : 1;
    const comics = await getComics(page, 12);  

    return {
        props: {
            comics: comics.data
        }
    }
}


export default Index
