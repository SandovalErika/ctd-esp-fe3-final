import React, { FC, useContext, useState, useEffect, useCallback } from "react";
import { Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomTextField } from "./customInput/CustomTextField";
import { schemaCard } from "../../../rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckoutContext } from "./context/FormContext";
import { postCheckOut } from "dh-marvel/services/checkout/checkout.service";
import { useRouter } from "next/router";
import { DevTool } from "@hookform/devtools";
import { TEXT_BUTTON, TITLE_STEPPER } from "../../../utils/constant";

interface Props {
  result: any;
}

interface FieldData {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
}

const paymentFields: FieldData[] = [
  {
    name: "number",
    label: "Número de tarjeta",
    type: "text",
    required: true,
    defaultValue: "",
  },
  {
    name: "nameOnCard",
    label: "Nombre como aparece en la tarjeta",
    type: "text",
    required: true,
    defaultValue: "",
  },
  {
    name: "expDate",
    label: "Fecha de expiración",
    type: "text",
    required: true,
    defaultValue: "",
  },
  {
    name: "cvc",
    label: "Código de seguridad",
    type: "password",
    required: true,
    defaultValue: "",
  },
];

const PaymentData: FC<Props> = ({ result }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaCard),
  });

  const { data, handlerCard } = useContext(CheckoutContext) ?? {};
  const router = useRouter();
  const [isCardUpdated, setCardUpdated] = useState(false);

  if (!data || !handlerCard) {
    throw new Error("Componente debe estar dentro de CheckoutProvider");
  }

  const sendData = useCallback(async () => {
    const order = {
      name: result?.title,
      image: `${result?.thumbnail.path}.${result?.thumbnail.extension}`,
      price: result.price,
    };

    try {
      const response = await postCheckOut({ ...data, order });
      if (response) {
        localStorage.setItem(
          "checkoutData",
          JSON.stringify({ ...data, order })
        );
        router.push("/confirmacion-compra");
      } else {
        throw new Error("No se pudo realizar el pago");
      }
    } catch (error) {
      console.error("Hubo un error al enviar los datos", error);
    }
  }, [data, result, router]);

  useEffect(() => {
    if (isCardUpdated) {
      sendData();
      setCardUpdated(false);
    }
  }, [isCardUpdated, sendData]);

  const onSubmit = (formData: any) => {
    handlerCard(formData);
    setCardUpdated(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
          {TITLE_STEPPER.DATOS_DEL_PAGO}
        </Typography>

        {paymentFields.map((field) => (
          <div key={field.name}>
            <CustomTextField
              name={field.name}
              label={field.label}
              type={field.type}
              control={control}
              defaultValue={field.defaultValue}
              required={field.required}
            />
            {errors[field.name as keyof typeof errors] && (
              <Typography variant="caption" color="red">
                {errors[field.name as keyof typeof errors]?.message}
              </Typography>
            )}
          </div>
        ))}

        <Button variant="contained" type="submit">
          {" "}
          {TEXT_BUTTON.COMPRAR}
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default PaymentData;
