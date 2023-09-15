import React, { FC, useContext } from 'react'
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { CustomTextField } from './customInput/CustomTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaAddress } from 'rules';
import { Button } from '@mui/material';
import { CheckoutContext } from './context/FormContext';
import { DevTool } from '@hookform/devtools';

interface Props {
    handleNext: () => void
};

const DirectionData:  FC<Props>= ({handleNext}) => {

    const {control, formState:{errors}, handleSubmit }  = useForm({ resolver: yupResolver(schemaAddress) });

    const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error("Componente debe estar dentro de CheckoutProvider");
    }
    
    const { handlerAddress} = context

    const onSubmit = (formData: any) => {
       
        
        handlerAddress(formData)
        handleNext()
    }
    
    
    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
                Direccion de Entrega
            </Typography>
            <CustomTextField
                name="address1"
                label="Dirección"
                type="text"
                control={control}
                defaultValue=""
                required={true}
            />
            <CustomTextField
                name="address2"
                label="Departamento, piso o altura"
                type="text"
                control={control}
                defaultValue=""
                required={true}
            />

            <CustomTextField
                name="city"
                label="Ciudad"
                type="text"
                control={control}
                defaultValue=""
                required={true}
            />

            <CustomTextField
                name="state"
                label="Provincia"
                type="text"
                control={control}
                defaultValue=""
                required={true}
            />

            <CustomTextField
                name="zipCode"
                label="Código postal"
                type="text"
                control={control}
                defaultValue=""
                required={true}
            />

            <Button variant="contained" type='submit' > Siguiente</Button>
            </form>
            <DevTool control={control} /> 
        </>
    )
}

export default DirectionData