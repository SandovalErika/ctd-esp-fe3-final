import React, { FC, useContext, useEffect, useState } from 'react'
import Typography from "@mui/material/Typography";
import { useForm, useFormContext } from "react-hook-form";
import { CustomTextField } from './customInput/CustomTextField';
import { schemaCard } from 'rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { CheckoutContext } from './context/FormContext';
import { postCheckOut } from 'dh-marvel/services/checkout/checkout.service';
import { useRouter } from 'next/router';
import { DevTool } from '@hookform/devtools';

interface Props {
  handleNext: () => void
  result: any
};

const PaymentData: FC<Props> = ({handleNext, result}): any => {

  const {control, formState:{errors}, handleSubmit }  = useForm({ resolver: yupResolver(schemaCard) });


  const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error("Componente debe estar dentro de CheckoutProvider");
    }
    const router = useRouter()
    
    const {data, handlerCard} = context

    const [isCardUpdated, setCardUpdated] = useState(false);

    const sendData = async () => {
      const name = result?.title;
      const image = result?.thumbnail.path.concat(".", result?.thumbnail.extension);
      const price = result.price;
  
      const dataFinal = {
        ...data,
        order: {
          name,
          image,
          price,
        },
      };
  
      try {
        const response = await postCheckOut(dataFinal);
     
        if (response) {
      
          localStorage.setItem("checkoutData",JSON.stringify(dataFinal));
          router.push("/confirmacion-compra");
        } else {
          // Manejar error aquí
        }
      } catch (error) {
        console.error("Hubo un error al enviar los datos", error);
      }
    };
  
    useEffect(() => {
      if (isCardUpdated) {
        sendData();
        setCardUpdated(false);
      }
    }, [isCardUpdated]);
  
    const onSubmit = (formData: any) => {
      handlerCard(formData); 
      setCardUpdated(true); 
    };
  
    
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
        Datos del Pago
      </Typography>
      <CustomTextField
        name="number"
        label="Número de tarjeta"
        type="text"
        control={control}
        defaultValue=""
      />

      <CustomTextField
        name="nameOnCard"
        label="Nombre como aparece en la tarjeta"
        type="text"
        control={control}
        defaultValue=""
      />

      <CustomTextField
        name="expDate"
        label="Fecha de expiración"
        type="text"
        control={control}
        defaultValue=""
      />

      <CustomTextField
        name="cvc"
        label="Código de segurirar"
        type="password"
        control={control}
        defaultValue=""
      />
    <Button variant="contained" type='submit' > Siguiente</Button>
      </form>
      <DevTool control={control} /> 
    </>
  )
}

export default PaymentData