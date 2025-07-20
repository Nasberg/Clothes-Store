import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";

// Import Mui Icons
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

// Import App Components
import CartMenu from "./CartMenu";

import airMax90Orange from "../images/air-max-90-orange.jpg";
import { NavLink } from "react-router-dom";

const CartProductCard = (props) => {
  const { product, handleStoreOpenedPage, handleDelItemDialogOpen } = props;
  const {
    category,
    title,
    price,
    discount,
    colors,
    selectedColor,
    sizes,
    selectedSize,
    selectedQuantity,
  } = product;

  const [currentColor, setCurrentColor] = useState(selectedColor);

  const handleColorSelection = (value) => {
    setCurrentColor(value);
  };

  const [currentSize, setCurrentSize] = useState(selectedSize);

  const handleSizeSelection = (value) => {
    setCurrentSize(value);
  };

  const [currentQuantity, setCurrentQuantity] = useState(selectedQuantity || 1);

  const handleGoToProduct = () => {
    handleStoreOpenedPage("category", category);
    handleStoreOpenedPage("product", title);
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={14}>
        <Box p={2}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={5} md={4} lg={2}>
              <img src={airMax90Orange} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={7} md={8} lg={10}>
              <Grid container spacing={5} alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="body1">{title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        {selectedQuantity === 1
                          ? `${price} kr`
                          : `${selectedQuantity * price} kr (${price} kr)`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} lg={2}>
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Color</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Avatar
                        style={{
                          width: theme.spacing(4),
                          height: theme.spacing(4),
                          backgroundColor: `#${currentColor}`,
                        }}
                      >
                        {" "}
                      </Avatar>
                    </Grid>
                    <Grid item xs={5}>
                      <CartMenu
                        array={colors}
                        selectedItem={currentColor}
                        handleSelection={handleColorSelection}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} lg={2}>
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Size</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Avatar
                        style={{
                          width: theme.spacing(4),
                          height: theme.spacing(4),
                          backgroundColor: theme.palette.secondary.main,
                          color: "white",
                        }}
                      >
                        <Typography variant="subtitle1">
                          {currentSize}
                        </Typography>
                      </Avatar>
                    </Grid>
                    <Grid item xs={5}>
                      <CartMenu
                        array={sizes}
                        selectedItem={currentSize}
                        handleSelection={handleSizeSelection}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8} sm={6} lg={3}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Grid container justify="center">
                        <IconButton
                          disabled={currentQuantity === 1}
                          onClick={() =>
                            setCurrentQuantity(currentQuantity - 1)
                          }
                        >
                          <RemoveOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container justify="center" alignItems="center">
                        <Typography variant="body1">
                          <Box fontWeight="fontWeightBold">
                            {currentQuantity}
                          </Box>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container justify="center">
                        <IconButton
                          onClick={() =>
                            setCurrentQuantity(currentQuantity + 1)
                          }
                        >
                          <AddOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={6} lg={1}>
                  <Grid container justify="flex-end">
                    <NavLink to="/shop" style={{ textDecoration: "none" }}>
                      <IconButton color="secondary" onClick={handleGoToProduct}>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </NavLink>
                    <IconButton
                      onClick={() => handleDelItemDialogOpen(product)}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default CartProductCard;
