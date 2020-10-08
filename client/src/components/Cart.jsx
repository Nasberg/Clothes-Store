import React, { Component } from "react";

// Import Mui Components
import {
  Grid,
  Box,
  Typography,
  Paper,
  IconButton,
  Tabs,
  Tab,
  Menu,
  Button,
} from "@material-ui/core";

// Import App Components
import CartProductCard from "./CartProductCard";
import CartCheckoutCard from "./CartCheckoutCard";

import airMax90Orange from "../images/air-max-90-orange.jpg";
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  const {
    cart,
    handleStoreOpenedPage,
    handleDelItemDialogOpen,
    handleCheckout,
  } = props;

  const handleGoToStore = () => {
    handleStoreOpenedPage("category", "");
  };

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Box mt={4}>
          {cart.length > 0 ? (
            <Grid container spacing={8}>
              <Grid item xs={12} md={8} lg={9}>
                <Grid container spacing={2}>
                  {cart.map((item, i) => (
                    <CartProductCard
                      product={item}
                      handleStoreOpenedPage={handleStoreOpenedPage}
                      handleDelItemDialogOpen={handleDelItemDialogOpen}
                    />
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <CartCheckoutCard cart={cart} handleCheckout={handleCheckout} />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3} justify="center">
              <Grid item xs={12}>
                <Typography variant="h4" align="center">
                  <Box fontWeight="fontWeightBold">Cart is empty</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <NavLink to="/shop" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={handleGoToStore}
                    >
                      Go to shop
                    </Button>
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Cart;
