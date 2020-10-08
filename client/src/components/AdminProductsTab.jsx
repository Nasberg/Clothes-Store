import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  IconButton,
  Avatar,
  Typography,
  Box,
  Divider,
  Paper,
  TextField,
} from "@material-ui/core";

// Import Mui Icons
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

// Import App Components
import AdminProductCategoriesCard from "./AdminProductCategoriesCard";
import AdminProductCard from "./AdminProductCard";
import AdminEditProductColorAndSize from "./AdminEditProductColorAndSize";

const AdminProductsTab = (props) => {
  const { products, handleOpenAdminDeleteDialog } = props;

  const [openedCategory, setOpenedCategory] = useState("");

  const handleOpenedCategory = (value) => {
    setOpenedCategory(value);
  };

  const [addProduct, setAddProduct] = useState(false);

  const handleAddProduct = () => {
    setAddProduct(!addProduct);
  };

  const [productName, setProductName] = useState("");

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const [productPrice, setProductPrice] = useState("");

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const [productDiscount, setProductDiscount] = useState("");

  const handleProductDiscountChange = (event) => {
    setProductDiscount(event.target.value);
  };

  const [productColors, setProductColors] = useState([]);

  const handleAddProductColor = (newColor) => {
    setProductColors([...productColors, newColor]);
    setNewColor("");
  };

  const handleDeleteProductColor = (delColor) => {
    setProductColors(productColors.filter((item) => item !== delColor));
  };

  const [productSizes, setProductSizes] = useState([]);

  const handleAddProductSize = (newSize) => {
    setProductSizes([...productSizes, newSize]);
    setNewSize("");
  };

  const handleDeleteProductSize = (delSize) => {
    setProductSizes(productSizes.filter((item) => item !== delSize));
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

  const handleAddNewProduct = (categoryId) => {
    fetch(`/add-product/${categoryId}`, {
      method: "POST",
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
      .then((data) => {
        setProductName("");
        setProductPrice("");
        setProductDiscount("");
        setProductSizes([]);
        setProductColors([]);
      });
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={3}>
        <AdminProductCategoriesCard
          products={products}
          openedCategory={openedCategory}
          handleOpenedCategory={handleOpenedCategory}
          handleOpenAdminDeleteDialog={handleOpenAdminDeleteDialog}
        />
      </Grid>
      <Grid item xs={9}>
        {openedCategory !== "" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <Paper elevation={14}>
                  <Box p={2}>
                    <Grid container alignItems="center" justify="flex-end">
                      {products.filter(
                        (item) => item.title === openedCategory
                      )[0].products.length === 0 && (
                        <Box mr={2}>
                          <Typography variant="body1">
                            <Box fontWeight="fontWeightBold">
                              {openedCategory}: 0 products
                            </Box>
                          </Typography>
                        </Box>
                      )}
                      <IconButton
                        color="primary"
                        onClick={handleAddProduct}
                        style={
                          addProduct
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
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            {addProduct ? (
              <Grid item xs={12}>
                <Paper elevation={14}>
                  <Box p={2}>
                    <Grid container spacing={5} alignItems="center">
                      <Grid item xs={2}>
                        <Paper variant="outlined">
                          <Box p={3}>
                            <Grid
                              container
                              justify="center"
                              alignItems="center"
                            >
                              <IconButton color="primary">
                                <AddCircleOutlineOutlinedIcon />
                              </IconButton>
                            </Grid>
                          </Box>
                        </Paper>
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
                                    <Typography variant="body1">
                                      Colors
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2}>
                                    <IconButton
                                      color="primary"
                                      onClick={handleAddColor}
                                      style={
                                        addColor
                                          ? {
                                              backgroundColor:
                                                theme.palette.primary.main,
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
                                          onClick={() =>
                                            handleAddProductColor(newColor)
                                          }
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
                                            handleDelete={
                                              handleDeleteProductColor
                                            }
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
                                    <Typography variant="body1">
                                      Sizes
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2}>
                                    <IconButton
                                      color="primary"
                                      onClick={handleAddSize}
                                      style={
                                        addSize
                                          ? {
                                              backgroundColor:
                                                theme.palette.primary.main,
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
                                          onClick={() =>
                                            handleAddProductSize(newSize)
                                          }
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
                                            handleDelete={
                                              handleDeleteProductSize
                                            }
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
                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleAddNewProduct(
                                products.filter(
                                  (item) => item.title === openedCategory
                                )[0]._id
                              )
                            }
                          >
                            <SaveOutlinedIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            ) : (
              <>
                {products
                  .filter((item) => item.title === openedCategory)[0]
                  .products.map((item, i) => (
                    <AdminProductCard
                      key={i}
                      item={item}
                      handleOpenAdminDeleteDialog={handleOpenAdminDeleteDialog}
                    />
                  ))}
              </>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default AdminProductsTab;
