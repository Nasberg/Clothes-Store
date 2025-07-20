import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import { MenuItem, Avatar, Typography } from "@material-ui/core";

// Import Mui Icons
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

const CartMenuItem = (props) => {
  const { item, selectedItem, handleSelection } = props;

  return (
    <MenuItem
      onClick={() => handleSelection(item)}
      style={
        item.length !== 6 && item === selectedItem
          ? { backgroundColor: theme.palette.secondary.main }
          : {}
      }
    >
      <Avatar
        style={{
          width: theme.spacing(4),
          height: theme.spacing(4),
          backgroundColor:
            item.length === 6
              ? `#${item}`
              : item === selectedItem
              ? "white"
              : theme.palette.secondary.main,
          color:
            item.length !== 6 && item === selectedItem
              ? theme.palette.secondary.main
              : "",
        }}
      >
        {item.length === 6 ? (
          item === selectedItem ? (
            <CheckCircleOutlineOutlinedIcon />
          ) : (
            " "
          )
        ) : (
          <Typography variant="subtitle1">{item}</Typography>
        )}
      </Avatar>
    </MenuItem>
  );
};

export default CartMenuItem;
