import Faqs, { getStaticProps } from "dh-marvel/pages/preguntas-frecuentes/index.page"
import { render, screen } from "@testing-library/react";
import { faqsData } from "dh-marvel/components/faqs/faqsData";

const faqs = faqsData[0];


describe("Faqs", () => {
    describe('when rendering default', () => {
        it('should render the title', () => {
            render(<Faqs faqs={faqsData} />)
            const title = screen.getByText('Preguntas Frecuentes')
            expect(title).toBeInTheDocument()
        }),
        it('should render the faq', async () => {
            render(<Faqs faqs={faqsData} />)
            const title = screen.getByText('Preguntas Frecuentes')
            expect(title).toBeInTheDocument()
            const faqTitle = await screen.findByText(faqs.question)
            expect(faqTitle).toBeInTheDocument()
            
        })

    })
})