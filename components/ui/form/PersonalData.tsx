import React, { FC, useContext } from 'react';
import { Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomTextField } from './customInput/CustomTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCustomer } from 'rules';
import { DevTool } from "@hookform/devtools";
import { CheckoutContext } from './context/FormContext';
import { TITLE_STEPPER } from 'utils/constant';

interface Props {
  handleNext: () => void;
}

interface FieldData {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
}

const personalFields: FieldData[] = [
  { name: "name", label: "Nombre", type: "text", required: true, defaultValue: "" },
  { name: "lastname", label: "Apellido", type: "text", required: true, defaultValue: "" },
  { name: "email", label: "E-Mail", type: "email", required: true, defaultValue: "" },
];

const PersonalData: FC<Props> = ({ handleNext }) => {
  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schemaCustomer)
  });

  const { handlerCustomer } = useContext(CheckoutContext) ?? {};

  if (!handlerCustomer) {
    throw new Error("Componente debe estar dentro de CheckoutProvider");
  }

  const onSubmit = (formData: any) => {
    handlerCustomer(formData);
    handleNext();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
          {TITLE_STEPPER.DATOS_PERSONALES}
        </Typography>
        
        {personalFields.map(field => (
          <CustomTextField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            control={control}
            defaultValue={field.defaultValue}
            required={field.required}
          />
        ))}

        <Button variant="contained" type='submit'> Siguiente</Button>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default PersonalData;
