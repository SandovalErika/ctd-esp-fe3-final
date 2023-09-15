import { Container } from "@mui/material";
import PurchaseConfirmation from "../../components/ui/purchaseConfirmation/PurchaseConfirmation.component";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { useRouter } from "next/router";
import React from "react";
import Cookies from "js-cookie";

const ConfirmationPage = () => {
  const router = useRouter();
  console.log(Cookies.get("access"));

  const handleClickGoHome = () => {
    Cookies.remove("access", { path: "/confirmacion-compra" });
    router.push("/");
  };

  return (
    <LayoutCheckout title={'Confirmacion de compra'}>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
     <PurchaseConfirmation handleClickGoHome={handleClickGoHome}/>
    </Container>
    </LayoutCheckout>
  );
};

export default ConfirmationPage;