import React, { Fragment } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Container,
  CardContent,
  Typography,
  Card,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ComicCard from "dh-marvel/components/ui/comicCard/ComicCard.component";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { Result } from "../../interface/comic";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { TEXT_INFORMATION_CARD, TEXT_INFORMATION_COMIC } from "utils/constant";
import {REGEX} from '../../utils/constant'

interface Props {
  result: Result;
}

const ComicPage: NextPage<Props> = ({ result }) => {
  
  const idCharacter = (url: string) => {
    const extractId = url.match(REGEX.extractIdFromURL);
    return extractId ? extractId[1] : null;
  };

  if (!result) {
    return (
      <LayoutGeneral title="Error">
        <Typography>Error: El cómic no pudo ser cargado.</Typography>
      </LayoutGeneral>
    );
  }
  
  return (
    <Fragment>
      <Box
        sx={{
          background:
            "url(img/backgroundMarvel.jpg) no-repeat center center fixed",
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <LayoutGeneral title="Comic">
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              marginX: "10rem",
              marginY: "2rem",
            }}
          >
            <ComicCard result={result} />
            <Card
              sx={{
                width: "100%",
                height: "max-content",
                padding: 3,
                margin: 3,
                backgroundColor: (theme) => theme.palette.grey[300],
              }}
            >
              <CardContent>
              <Typography gutterBottom variant="body1" fontWeight="bold">
                  {TEXT_INFORMATION_COMIC.DESCRIPTION}
                </Typography>
                <Typography gutterBottom variant="body1">
                  {result?.textObjects[0]?.text}
                </Typography>
                <Typography gutterBottom variant="body1" fontWeight="bold" margin="1px">
                  {TEXT_INFORMATION_CARD.PRECIO_NUEVO + ` $ ${result.price}`}
                </Typography>
                <Typography gutterBottom component="div" color="red" margin="1px">
                  {TEXT_INFORMATION_CARD.PRECIO_ANTERIOR}
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: "10px",
                    }}
                  >
                    {result.price !== result.oldPrice
                      ? `$ ${result.oldPrice}`
                      : "-"}
                  </span>
                </Typography>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography fontWeight="bold">{TEXT_INFORMATION_CARD.PERSONAJES}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {result?.characters.items?.map((character) => {
                        return (
                          <li key={character.name}>
                            <Link
                              href={`/personajes/${idCharacter(
                                character.resourceURI
                              )}`}
                            >
                              {character.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Container>
        </LayoutGeneral>
      </Box>
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const comics = await getComics();
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
      }
  }
}

export default ComicPage;
