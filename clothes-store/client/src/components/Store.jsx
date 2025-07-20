import React, { Component, useState, useEffect } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  Box,
  Paper,
  useTheme,
  ListItem,
  List,
  ListItemText,
  Typography,
  Button,
  ListItemIcon,
  Divider,
  IconButton,
  Tabs,
  Tab,
  withStyles,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";

// Import Mui Icons
import DoubleArrowOutlinedIcon from "@material-ui/icons/DoubleArrowOutlined";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

// Import App Components
import StoreCategoryCard from "./StoreCategoryCard";
import StoreProductCard from "./StoreProductCard";
import StoreProductPage from "./StoreProductPage";

import airMax90Orange from "../images/air-max-90-orange.jpg";

const Store = (props) => {
  const {
    products,
    cart,
    openedCategory,
    openedProduct,
    handleOpenedPage,
    handleAddCartItem,
    handleDelCartItem,
  } = props;

  return (
    <Box mt={4}>
      <Grid container justify="center">
        <Grid item xs={11}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Paper elevation={14}>
                <Box p={2}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <Box fontWeight="fontWeightBold">Categories</Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <List dense>
                        {products.map((item, i) => (
                          <ListItem
                            button
                            key={item.title}
                            onClick={() =>
                              handleOpenedPage("category", item.title)
                            }
                            style={{ paddingLeft: theme.spacing(1) }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                style={{
                                  width: theme.spacing(2),
                                  height: theme.spacing(2),
                                  backgroundColor:
                                    openedCategory === item.title
                                      ? theme.palette.secondary.main
                                      : "white",
                                  border: `1.15px solid ${theme.palette.secondary.main}`,
                                }}
                              >
                                {" "}
                              </Avatar>
                            </ListItemAvatar>
                            <Box ml={-4}>
                              <ListItemText primary={item.title} />
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10}>
              {openedCategory === "" ? (
                <Grid container spacing={4}>
                  {products.map((item, i) => (
                    <StoreCategoryCard
                      title={item.title}
                      openedCategory={openedCategory}
                      handleOpenedPage={handleOpenedPage}
                    />
                  ))}
                </Grid>
              ) : openedProduct === "" ? (
                <Grid container spacing={3}>
                  {products
                    .filter((item, i) => item.title === openedCategory)[0]
                    .products.map((item, i) => (
                      <StoreProductCard
                        product={item}
                        openedCategory={openedCategory}
                        handleOpenedPage={handleOpenedPage}
                        handleAddCartItem={handleAddCartItem}
                      />
                    ))}
                </Grid>
              ) : (
                <>
                  {products
                    .filter((item) => item.title === openedCategory)[0]
                    .products.map((item) => {
                      if (item.title === openedProduct) {
                        return (
                          <StoreProductPage
                            product={item}
                            openedCategory={openedCategory}
                            handleAddCartItem={handleAddCartItem}
                          />
                        );
                      }
                    })}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Store;
