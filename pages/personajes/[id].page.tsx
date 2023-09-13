import LayoutGeneral from 'dh-marvel/components/layouts/layout-general'
import { Character, Characters } from '../../interface/comic'
import { getCharacter } from 'dh-marvel/services/marvel/marvel.service'
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Box, Card} from '@mui/material';
import React from 'react'
import Image from 'next/image';

interface Props {
    character: Character
}

const PersonajePage: NextPage<Props> = ({ character }) => {

    return (
        <LayoutGeneral title={'Personaje'} >
            <Box >
                <Card sx={{ marginTop: 10, padding: 3, gap: 10, height: "fit-content" }}>
                    <div>{character.name}</div>
                    <Image
                        alt={character.name}
                        src={character.thumbnail.path.concat(".", character.thumbnail.extension)}
                        width={300}
                        height={300}
                    />
                </Card>
            </Box>
        </LayoutGeneral>
            
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = Number(context.params?.id);
    const character = await getCharacter(id)

    return {
        props: {
            character
        }
    }
}

export default PersonajePage;

