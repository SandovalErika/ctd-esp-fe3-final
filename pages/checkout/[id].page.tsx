import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout'
import { Result } from '../../interface/comic'
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import Box from '@mui/material/Box';
import HorizontalLinearStepper from '../../components/ui/stepper/stepper.component'
import ComicCard from 'dh-marvel/components/ui/comicCard/ComicCard.component'

interface Props {
    result: Result
}

const CheckOut: NextPage<Props> = ({ result }) => {


    return (
            <LayoutCheckout title={'Checkout'}>
            <Box sx={{ width: "100%", display: "flex", alignContent: "center", justifyContent: "center" }}>
                <ComicCard result={result} />
                <HorizontalLinearStepper result={result} />
            </Box>
            </LayoutCheckout>
    )
}

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

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const id = Number(params?.id);

    const character = await getComic(id)

    return {
        props: {
            result: character
        }
    }
}

export default CheckOut