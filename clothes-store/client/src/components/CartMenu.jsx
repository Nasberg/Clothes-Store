import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Typography,
} from "@material-ui/core";

// Import Mui Icons
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

// Import App Components
import CartMenuItem from "./CartMenuItem";

const CartMenu = (props) => {
  const { array, selectedItem, handleSelection } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="secondary"
        onClick={handleMenuOpen}
        // aria-haspopup="true"
      >
        <EditOutlinedIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {array.map((item, i) => (
          <CartMenuItem
            item={item}
            selectedItem={selectedItem}
            handleSelection={handleSelection}
          />
        ))}
      </Menu>
    </>
  );
};
export default CartMenu;
