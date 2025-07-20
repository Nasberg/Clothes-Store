import React, { Component, useState } from "react";
import { uuid } from "uuidv4";

// Import Mui Components
import {
  Grid,
  Paper,
  Box,
  Typography,
  Tabs,
  Tab,
  Divider,
  IconButton,
  withStyles,
} from "@material-ui/core";

// Import Mui Icons
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

import airMax90Orange from "../images/air-max-90-orange.jpg";

// Styled Mui Tab
const ProductCardTab = withStyles((theme) => ({
  root: {
    minWidth: 32,
    maxWidth: 32,
  },
}))((props) => <Tab {...props} />);

const StoreProductCard = (props) => {
  const {
    product,
    openedCategory,
    handleOpenedPage,
    handleAddCartItem,
  } = props;
  const { title, price, discount, colors, sizes } = product;

  const [colorTabs, setColorTabs] = useState(0);

  const handleColorTabs = (evant, newValue) => {
    setColorTabs(newValue);
  };

  const [sizeTabs, setSizeTabs] = useState(0);

  const handleSizeTabs = (evant, newValue) => {
    setSizeTabs(newValue);
  };

  const [quantity, setQuantity] = useState(1);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={14}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <img src={airMax90Orange} style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12}>
            <Box p={2}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <Box fontWeight="fontWeightBold">{title}</Box>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" align="right">
                    <Box fontWeight="fontWeightBold">{price} kr</Box>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle2">
                    <Box fontWeight="fontWeightBold">Color</Box>
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Tabs
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="sedondary"
                    value={colorTabs}
                    onChange={handleColorTabs}
                  >
                    {colors.map((colItem, colI) => (
                      <ProductCardTab
                        icon={
                          colorTabs === colI ? (
                            <CheckCircleOutlineOutlinedIcon
                              style={{
                                backgroundColor: `#${colItem}`,
                                color: "white",
                                borderRadius: "2rem",
                                padding: 2,
                              }}
                            />
                          ) : (
                            <RadioButtonUncheckedOutlinedIcon
                              style={{
                                backgroundColor: `#${colItem}`,
                                color: `#${colItem}`,
                                borderRadius: "2rem",
                              }}
                            />
                          )
                        }
                      />
                    ))}
                  </Tabs>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle2">
                    <Box fontWeight="fontWeightBold">Size</Box>
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Tabs
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="secondary"
                    value={sizeTabs}
                    onChange={handleSizeTabs}
                  >
                    {sizes.map((sizeItem, sizeI) => (
                      <ProductCardTab label={sizeItem} />
                    ))}
                  </Tabs>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Grid container justify="center">
                        <IconButton
                          size="small"
                          disabled={quantity === 1}
                          onClick={() => setQuantity(quantity - 1)}
                        >
                          <RemoveOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container justify="center" alignItems="center">
                        <Typography variant="subtitle1">
                          <Box fontWeight="fontWeightBold">{quantity}</Box>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container justify="center">
                        <IconButton
                          size="small"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <AddOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid container justify="center">
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenedPage("product", title)}
                    >
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid container justify="center">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleAddCartItem({
                          ...product,
                          selectedColor: colors[colorTabs],
                          selectedSize: sizes[sizeTabs],
                          selectedQuantity: quantity,
                          category: openedCategory,
                          id: uuid(),
                        })
                      }
                    >
                      <AddShoppingCartOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default StoreProductCard;
