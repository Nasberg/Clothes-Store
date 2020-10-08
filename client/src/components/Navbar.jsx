import React, { Component, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Badge,
  Menu,
  MenuItem,
  Grid,
  ListItemSecondaryAction,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";

// Import Mui Icons
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import HouseOutlinedIcon from "@material-ui/icons/HouseOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

import airMax90Orange from "../images/air-max-90-orange.jpg";

const drawerItems = [
  ["Home", <HouseOutlinedIcon />, "/"],
  ["Shop", <LocalMallOutlinedIcon />, "/shop"],
  ["Cart", <ShoppingCartOutlinedIcon />, "/cart"],
  ["Profile", <PersonOutlineOutlinedIcon />, "/profile"],
  ["Help", <ContactSupportOutlinedIcon />, "/help"],
];

const Navbar = (props) => {
  const { cart, handleStoreOpenedPage, handleDelItemDialogOpen } = props;

  const location = useLocation();
  const { pathname } = location;

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Go To Product
  const handleGoToProduct = (category, title) => {
    handleClose();
    handleStoreOpenedPage("category", category);
    handleStoreOpenedPage("product", title);
  };

  return (
    <>
      <AppBar position="static" elevation={10}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
              >
                <MenuOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="h4" align="center">
                  <Box fontWeight="fontWeightBold">Sporley</Box>
                </Typography>
              </NavLink>
            </Grid>
            <Grid item xs={4}>
              <Grid container justify="flex-end">
                <IconButton color="inherit" onClick={handleClick}>
                  <Badge badgeContent={cart.length} color="secondary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  style={{ width: 600 }}
                  elevation={14}
                >
                  {cart.length === 0 ? (
                    <ListItem style={{ width: 300 }}>
                      <ListItemText primary="Cart is empty" />
                    </ListItem>
                  ) : (
                    <>
                      {cart.map((item, i) => (
                        <MenuItem
                          style={{ width: 300 }}
                          onClick={() =>
                            handleGoToProduct(item.category, item.title)
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              style={{
                                width: theme.spacing(6),
                                height: theme.spacing(6),
                              }}
                            >
                              <img
                                src={airMax90Orange}
                                style={{ width: "100%", margin: "auto" }}
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.title}
                            secondary={`${
                              item.selectedQuantity * item.price
                            } kr (${item.selectedQuantity})`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={() => handleDelItemDialogOpen(item)}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </MenuItem>
                      ))}
                      <Box px={2} py={1}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              <Box fontWeight="fontWeightBold">Total</Box>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container justify="flex-end">
                              <Typography variant="body2">
                                <Box fontWeight="fontWeightBold">
                                  {cart.reduce(
                                    (total, item) =>
                                      total +
                                      item.selectedQuantity * item.price,
                                    0
                                  )}{" "}
                                  kr
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                          <Grid item xs={12}>
                            <NavLink
                              to="/cart"
                              style={{ textDecoration: "none" }}
                            >
                              <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={handleClose}
                              >
                                Go to cart
                              </Button>
                            </NavLink>
                          </Grid>
                        </Grid>
                      </Box>
                    </>
                  )}
                </Menu>

                <IconButton color="inherit">
                  <PersonOutlineOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <Box ml="auto">
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftOutlinedIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {drawerItems.map((item, i) => (
            <NavLink
              to={item[2]}
              style={{
                textDecoration: "none",
              }}
            >
              <ListItem
                button
                key={item[0]}
                onClick={handleDrawerClose}
                style={{
                  width: 250,
                  color:
                    pathname === item[2]
                      ? "white"
                      : theme.palette.secondary.main,
                  backgroundColor:
                    pathname === item[2]
                      ? theme.palette.secondary.main
                      : "white",
                }}
              >
                <ListItemIcon
                  style={{
                    color:
                      pathname === item[2]
                        ? "white"
                        : theme.palette.secondary.main,
                  }}
                >
                  {item[1]}
                </ListItemIcon>
                <ListItemText primary={item[0]} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
