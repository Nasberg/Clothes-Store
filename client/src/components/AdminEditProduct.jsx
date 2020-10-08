import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  Typography,
  IconButton,
  Paper,
  Box,
  TextField,
  Divider,
} from "@material-ui/core";

// Import Mui Icons
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

// Import App Components
import AdminEditProductColorAndSize from "./AdminEditProductColorAndSize";

export default ({ item, setEditItem }) => {
  const { _id, title, price, discount, sizes, colors } = item;

  const [productName, setProductName] = useState(title);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const [productPrice, setProductPrice] = useState(price);

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const [productDiscount, setProductDiscount] = useState(discount);

  const handleProductDiscountChange = (event) => {
    setProductDiscount(event.target.value);
  };

  const [productColors, setProductColors] = useState(colors || []);

  const handleAddProductColor = (newColor) => {
    setProductColors([...productColors, newColor]);
    setNewColor("");
  };

  const handleDeleteProductColor = (delColor) => {
    setProductColors(productColors.filter((item) => item !== delColor));
  };

  const [productSizes, setProductSizes] = useState(sizes || []);

  const handleAddProductSize = (newSize) => {
    setProductSizes([...productSizes, newSize]);
    setNewSize("");
  };

  const handleDeleteProductSize = (delSize) => {
    setProductSizes(productSizes.filter((item) => item !== delSize));
  };

  const handleUpdateProduct = (productId) => {
    fetch(`/update-product/${productId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: productName,
        price: productPrice,
        discount: productDiscount,
        sizes: productSizes,
        colors: productColors,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setEditItem(false));
  };

  const [addColor, setAddColor] = useState(false);

  const handleAddColor = () => {
    setAddColor(!addColor);
  };

  const [newColor, setNewColor] = useState("");

  const handleNewColorChange = (event) => {
    setNewColor(event.target.value);
  };

  const [addSize, setAddSize] = useState(false);

  const handleAddSize = () => {
    setAddSize(!addSize);
  };

  const [newSize, setNewSize] = useState("");

  const handleNewSizeChange = (event) => {
    setNewSize(event.target.value);
  };

  return (
    <>
      <Grid item xs={2}>
        Hej
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={productName}
              onChange={handleProductNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              value={productPrice}
              onChange={handleProductPriceChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Discount"
              value={productDiscount}
              onChange={handleProductDiscountChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper variant="outlined">
              <Box p={1}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant="body1">Colors</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="primary"
                      onClick={handleAddColor}
                      style={
                        addColor
                          ? {
                              backgroundColor: theme.palette.primary.main,
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {addColor ? (
                    <>
                      <Grid item xs={10}>
                        <TextField
                          fullWidth
                          label="New color"
                          value={newColor}
                          onChange={handleNewColorChange}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          color="primary"
                          disabled={newColor.length !== 6}
                          onClick={() => handleAddProductColor(newColor)}
                        >
                          <SaveOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <Grid container>
                        {productColors.map((colItem, colI) => (
                          <AdminEditProductColorAndSize
                            key={colI}
                            type="color"
                            item={colItem}
                            handleDelete={handleDeleteProductColor}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined">
              <Box p={1}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant="body1">Sizes</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="primary"
                      onClick={handleAddSize}
                      style={
                        addSize
                          ? {
                              backgroundColor: theme.palette.primary.main,
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {addSize ? (
                    <>
                      <Grid item xs={10}>
                        <TextField
                          fullWidth
                          label="New color"
                          value={newSize}
                          onChange={handleNewSizeChange}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          color="primary"
                          disabled={newSize.length === 0}
                          onClick={() => handleAddProductSize(newSize)}
                        >
                          <SaveOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <Grid container>
                        {productSizes.map((sizeItem, sizeI) => (
                          <AdminEditProductColorAndSize
                            key={sizeI}
                            type="size"
                            item={sizeItem}
                            handleDelete={handleDeleteProductSize}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Grid container justify="flex-end">
          <IconButton color="primary" onClick={() => handleUpdateProduct(_id)}>
            <SaveOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};
