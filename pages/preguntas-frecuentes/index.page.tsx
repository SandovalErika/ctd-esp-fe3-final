import React from 'react'
import { NextPage, GetStaticProps, } from 'next'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/material';
import Head from 'next/head';
import { FaqsType } from 'dh-marvel/components/faqs/faqsData';

interface Props{
    faqs: any[]
}

const FaqsPage: NextPage<Props> = ({ faqs }) => {
    return (
        <>
            <Head>
                <title>FAQs</title>
                <meta name="description" content="All the frequency questions"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Container>
                <h1>Freguntas Frecuentes</h1>
            {faqs.map(faq => {
                return (
                    <Accordion key={faq.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>)
            })}
        </Container>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const response = await fetch(
        "https://ctd-esp-fe3-final-erika-sandoval.vercel.app/api/faqs"
        // `${process.env.BASE_URL}/api/faqs`
        )
    const faqs = await response.json()

    return {
        props: {
            faqs
        }
    }

}

export default FaqsPage