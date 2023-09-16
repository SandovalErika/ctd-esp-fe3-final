import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaqsType } from "../../components/faqs/faqsData";
import { Box } from "@mui/material";
import { useState } from "react";

interface Props {
  faqs: FaqsType[];
}

export default function FaqSection({ faqs }: Props) {
  const [expand, setExpand] = useState<string | false>(false);

  const handleExpand = (isExpand: boolean, value: string) => {
    setExpand(isExpand ? value : false);
  };

  return (
    <div>
      <Typography variant="h5" textAlign="center" margin="20px" fontWeight="bold">Preguntas Frecuentes</Typography>
      {faqs &&
        faqs.map((faq) => (
          <Box m={3} key={faq.id}>
            <Accordion
              expanded={expand === faq.id.toString()}
              onChange={(event, isExpand) =>
                handleExpand(isExpand, faq.id.toString())
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="secondary" />}
              >
                <Typography variant="h5">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
    </div>
  );
}
