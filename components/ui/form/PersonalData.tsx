import React, { FC, useContext } from 'react'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useForm, useFormContext } from "react-hook-form";
import { CustomTextField } from './customInput/CustomTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCustomer } from 'rules';
// import { ErrorMessage } from '@hookform/error-message';
import { DevTool } from "@hookform/devtools";
import { Button } from '@mui/material';
import { CheckoutContext } from './context/FormContext';
import { log } from 'console';
interface Props {
    handleNext: () => void
};

const PersonalData:  FC<Props> = ({handleNext}) => {

    const {control, formState:{errors}, handleSubmit }  = useForm({ resolver: yupResolver(schemaCustomer) });


    const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error("Componente debe estar dentro de CheckoutProvider");
    }
    
    const { handlerCustomer} = context

    const onSubmit = (formData: any) => {

       
        handlerCustomer(formData)
        handleNext();
    }
    
    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
                Datos Personales
            </Typography>

            <CustomTextField
                name="name"
                control={control}
                defaultValue=""
                type="text"
                label="Nombre"
                required={true}
            />

            {/* <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="lastname" />
            </Typography> */}


            <CustomTextField
                name="lastname"
                label="Apellido"
                type="text"
                control={control}
                defaultValue=""
                required={true}
            />
              {/* <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="email" />
            </Typography>
             */}
            <CustomTextField
                name="email"
                label="E-Mail"
                type="email"
                control={control}
                defaultValue=""
                required={true}
            />
            <Button variant="contained" type='submit'>Siguiente</Button>
        </form>

        <DevTool control={control} /> 
    
        </>
    )
}

export default PersonalData
