import React, { FC } from 'react';
import { Box, Paper, Button } from "@mui/material";
import { Result } from '../../../interface/comic';
import PersonalData from './PersonalData';
import DirectionData from './DirectionData.component';
import PaymentData from './PaymentData.component';

interface Props {
    activeStep: number;
    result: Result;
    handleBack: () => void;
    handleNext: () => void;
}

const Form: FC<Props> = ({ result, activeStep, handleBack, handleNext }) => {
    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <PersonalData handleNext={handleNext} />;
            case 1:
                return <DirectionData handleNext={handleNext} />;
            case 2:
                return <PaymentData result={result} />;
            default:
                throw new Error("Paso no válido");
        }
    };

    return (
        <Box sx={{ width: "80%", alignSelf: "center", marginTop: "2rem" }}>
            <Paper elevation={8} sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}>
                {renderStepContent(activeStep)}
            </Paper>
        </Box>
    );
}

export default Form;
