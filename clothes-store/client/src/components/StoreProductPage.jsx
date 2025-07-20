import React, { Component, useState } from "react";
import { uuid } from "uuidv4";

// Import Mui Components
import {
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  withStyles,
  IconButton,
} from "@material-ui/core";

// Import Mui Icons
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

import airMax90Orange from "../images/air-max-90-orange.jpg";

// Styled Mui Tab
const ProductPageTab = withStyles((theme) => ({
  root: {
    minWidth: 64,
    maxWidth: 64,
  },
}))((props) => <Tab {...props} />);

const StoreProductPage = (props) => {
  const { product, openedCategory, handleAddCartItem } = props;
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
    <Grid container spacing={8}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper elevation={14}>
          <img src={airMax90Orange} style={{ width: "100%" }} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="h6">
                  <Box fontWeight="fontWeightBold">{title}</Box>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" align="right">
                  <Box fontWeight="fontWeightBold">{price} kr</Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <Box fontWeight="fontWeightBold">Description</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <Box fontWeight="fontWeightBold">Color</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={14}>
                  <Box p={2}>
                    <Tabs
                      indicatorColor="primary"
                      textColor="secondary"
                      value={colorTabs}
                      onChange={handleColorTabs}
                    >
                      {colors.map((colItem, colI) => (
                        <ProductPageTab
                          icon={
                            colorTabs === colI ? (
                              <CheckCircleOutlineOutlinedIcon
                                style={{
                                  backgroundColor: `#${colItem}`,
                                  color: "white",
                                  borderRadius: "2rem",
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
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <Box fontWeight="fontWeightBold">Size</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={14}>
                  <Box p={2}>
                    <Tabs
                      indicatorColor="primary"
                      textColor="secondary"
                      value={sizeTabs}
                      onChange={handleSizeTabs}
                    >
                      {sizes.map((sizeItem, sizeI) => (
                        <ProductPageTab label={sizeItem} />
                      ))}
                    </Tabs>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="body1">
                  <Box fontWeight="fontWeightBold">Quantity</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} lg={5}>
                    <Paper elevation={14}>
                      <Box p={2}>
                        <Grid container spacing={5} alignItems="center">
                          <Grid item xs={12}>
                            <Grid container alignItems="center">
                              <Grid item xs={4}>
                                <Grid container justify="center">
                                  <IconButton
                                    disabled={quantity === 1}
                                    onClick={() => setQuantity(quantity - 1)}
                                  >
                                    <RemoveOutlinedIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                              <Grid item xs={4}>
                                <Grid
                                  container
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Typography variant="body1">
                                    <Box fontWeight="fontWeightBold">
                                      {quantity}
                                    </Box>
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item xs={4}>
                                <Grid container justify="center">
                                  <IconButton
                                    onClick={() => setQuantity(quantity + 1)}
                                  >
                                    <AddOutlinedIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <Paper elevation={14} style={{ borderRadius: "2rem" }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        color="primary"
                        startIcon={<AddShoppingCartOutlinedIcon />}
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
                        Add to cart
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Grid container spacing={2}>
          {[
            ["Air Max", 1199],
            ["Air Force", 1099],
          ].map((item, i) => (
            <Grid item xs={6} lg={12}>
              <Paper elevation={14}>
                <Grid container>
                  <Grid item xs={12}>
                    <img src={airMax90Orange} style={{ width: "100%" }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <Grid item xs={12}>
                        <List dense>
                          <ListItem>
                            <ListItemText
                              primary={
                                <Typography variant="body2" noWrap>
                                  {item[0]}
                                </Typography>
                              }
                              secondary={`${item[1]} kr`}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item xs={12}>
                        <Box px={2} pb={2}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            color="primary"
                          >
                            See more
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StoreProductPage;
