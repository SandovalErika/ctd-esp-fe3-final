import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { Character } from "../../interface/comic";
import { getCharacter } from "dh-marvel/services/marvel/marvel.service";
import { GetServerSideProps, NextPage } from "next";
import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import router from "next/router";
import { TEXT_BUTTON } from "../../utils/constant";

interface Props {
  character: Character;
}

const PersonajePage: NextPage<Props> = ({ character }) => {
  if (!character) {
    return <LayoutGeneral title="Error">Personaje no encontrado</LayoutGeneral>;
  }

  return (
    <LayoutGeneral title={"Personaje"}>
      <Box>
        <Card
          sx={{
            backgroundColor: (theme) => theme.palette.grey[300],
            marginTop: 10,
            padding: 3,
            gap: 10,
            height: "fit-content",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            align="center"
            fontWeight="bold"
          >
            {character.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Image
              alt={character.name}
              src={character.thumbnail.path.concat(
                ".",
                character.thumbnail.extension
              )}
              width={300}
              height={300}
            />
             <Typography
              variant="body1"
              component="div"
              align="center"
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              {character.description || "Descripción no disponible."}
            </Typography>
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              onClick={() => router.back()}
            >
              {TEXT_BUTTON.ATRAS}
            </Button>
          </Box>
        </Card>
      </Box>
    </LayoutGeneral>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id);
  const character = await getCharacter(id);

  return {
    props: {
      character,
    },
  };
};

export default PersonajePage;
