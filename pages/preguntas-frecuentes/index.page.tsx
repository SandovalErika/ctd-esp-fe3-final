import React from 'react'
import { NextPage, GetStaticProps, } from 'next'
import { FaqsType } from 'dh-marvel/components/faqs/faqsData';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import Faqs from 'dh-marvel/components/faqs/Faqs';

interface Props {
    faqs: FaqsType[];
  }

const faqsPage: NextPage<Props> = ({ faqs }) => {
    return (
      <LayoutGeneral title={'FAQ'}>
        <Faqs faqs={faqs} />
      </LayoutGeneral>
    );
  };

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

export default faqsPage