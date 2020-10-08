import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Snackbar,
  SnackbarContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Slide,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// Import Mui Icons
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";

const CartSnackbar = (props) => {
  const { open, itemAdded, handleClose } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
    >
      {itemAdded ? (
        <Alert elevation={24} color="success">
          <Typography variant="body2">
            <Box fontWeight="fontWeightBold">Item added to cart!</Box>
          </Typography>
        </Alert>
      ) : (
        <Alert
          elevation={24}
          icon={<CircularProgress size={24} />}
          style={{ backgroundColor: theme.palette.secondary.main }}
        >
          <Grid container justify="flex-start">
            <Typography variant="body2">
              <Box fontWeight="fontWeightBold">Adding item to cart...</Box>
            </Typography>
          </Grid>
        </Alert>
      )}
    </Snackbar>
  );
};

export default CartSnackbar;
