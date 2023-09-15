import {
  Paper,
  Typography,
  Grid,
  CardMedia,
  Box,
  Button,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  TEXT_BUTTON,
  TEXT_INFORMATION_COMIC,
  TEXT_PURCHASE,
  TITLE_STEPPER,
} from "utils/constant";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

interface PropsConfirmation {
  handleClickGoHome: () => void;
}

interface SavedData {
  customer: {
    name: "";
    lastname: "";
    email: "";
    address: {
      address1: "";
      address2: "";
      city: "";
      state: "";
      zipCode: "";
    };
  };

  card: {
    number: "";
    cvc: "";
    expDate: "";
    nameOnCard: "";
  };
  order?: {
    name?: string;
    image?: string;
    price?: number;
  };
}

const PurchaseConfirmation: React.FC<PropsConfirmation> = ({
  handleClickGoHome,
}) => {
  const [savedData, setSavedData] = React.useState<SavedData>({
    order: {
      name: "",
      image: "",
      price: 0,
    },
    customer: {
      name: "",
      lastname: "",
      email: "",
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
    card: {
      number: "",
      cvc: "",
      expDate: "",
      nameOnCard: "",
    },
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutData") || "{}");
    setSavedData(data);
    localStorage.removeItem("checkoutData");
  }, []);

  const styles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "30px",
  };

  return (
    <Paper
      elevation={5}
      sx={{
        padding: "30px",
        textAlign: "center",
        borderRadius: "15px",
        background: "#f4f6f8",
      }}
    >
      <Box sx={{ paddingBottom: "2rem" }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green" }} />
        <Typography
          variant="h3"
          color="green"
          sx={{ ...styles, fontWeight: "bold" }}
        >
          {TEXT_PURCHASE.PURCHASE_CONFIRMATION}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid
        container
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        <Grid item xs={12} sm={6}>
          <CardMedia
            component="img"
            alt={savedData?.order?.name}
            height="250"
            image={savedData && savedData?.order?.image}
            title={savedData?.order?.name}
            sx={{
              borderRadius: "10px",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ ...styles, gap: "20px" }}>
          <Typography variant="h6" color="black" sx={{ fontWeight: "bold" }}>
            {TEXT_INFORMATION_COMIC.NOMBRE}
          </Typography>
          <Typography variant="h6" color="black">
            {savedData?.order?.name || ""}
          </Typography>
          <Typography variant="h6" color="black" sx={{ fontWeight: "bold" }}>
            {TEXT_INFORMATION_COMIC.IMPORTE}
          </Typography>
          <Typography variant="h5" color="black">
            ${savedData?.order?.price || ""}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {TITLE_STEPPER.DIRECCION_DE_ENTREGA}
          </Typography>
          <Typography variant="h5">
            {savedData?.customer?.address?.address1 || ""}
          </Typography>
        </Grid>
        <Box sx={{ ...styles, gap: "10px", width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickGoHome}
            sx={{ marginTop: "30px" }}
          >
            {TEXT_BUTTON.VOLVER_A_INICIO}
          </Button>
        </Box>
      </Grid>
    </Paper>
  );
};

export default PurchaseConfirmation;
