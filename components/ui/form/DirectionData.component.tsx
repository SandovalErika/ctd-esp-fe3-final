import React, { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { Button, Typography } from "@mui/material";
import { CustomTextField } from "./customInput/CustomTextField";
import { CheckoutContext } from "./context/FormContext";
import { schemaAddress } from "rules";
import { TEXT_BUTTON, TEXT_INFORMATION_COMIC, TITLE_STEPPER } from "utils/constant";

interface Props {
  handleNext: () => void;
}

interface FieldData {
  name: string;
  label: string;
  type: string;
  required: boolean;
  defaultValue: string;
}

const fields: FieldData[] = [
  {
    name: "address1",
    label: "Dirección",
    type: "text",
    required: true,
    defaultValue: "",
  },
  {
    name: "address2",
    label: "Departamento, piso o altura",
    type: "text",
    required: true,
    defaultValue: "",
  },
  {
    name: "city",
    label: "Ciudad",
    type: "text",
    required: true,
    defaultValue: "",
  },
  {
    name: "state",
    label: "Provincia",
    type: "text",
    required: true,
    defaultValue: "",
  },
  {
    name: "zipCode",
    label: "Código postal",
    type: "text",
    required: true,
    defaultValue: "",
  },
];

const DirectionData: FC<Props> = ({ handleNext }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schemaAddress) });

  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("Componente debe estar dentro de CheckoutProvider");
  }

  const { handlerAddress } = context;

  const onSubmit = (formData: any) => {
    handlerAddress(formData);
    handleNext();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
          {TITLE_STEPPER.DIRECCION_DE_ENTREGA}
        </Typography>

        {fields.map((field) => (
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

        <Button variant="contained" type="submit">
          {TEXT_BUTTON.SIGUIENTE}
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default DirectionData;
