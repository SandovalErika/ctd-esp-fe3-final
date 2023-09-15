import React, { FC, useContext } from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Result } from '../../../interface/comic';
import PersonalData from './PersonalData';
import DirectionData from './DirectionData.component';
import PaymentData from './PaymentData.component';;


interface Props {
    activeStep: number
    result: Result
    handleBack: () => void
    handleNext: () => void
}


const Form: FC<Props> = ({ result, activeStep, handleBack, handleNext }) => {

    return (
        <Box sx={{ width: "80%", alignSelf: "center", marginTop: "2rem" }}>
            <Paper elevation={8} sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}>
                {activeStep === 0 && <PersonalData handleNext={handleNext}/>}
                    {activeStep === 1 && <DirectionData  handleNext={handleNext} />}
                    {activeStep === 2 && <PaymentData  handleNext={handleNext} result={result}/>}
            </Paper>
        </Box>
    )
}

export default Form