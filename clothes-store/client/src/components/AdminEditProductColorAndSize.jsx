import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import { Box, IconButton, Typography } from "@material-ui/core";

// Import Mui Icons
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

export default ({ type, item, handleDelete }) => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  return (
    <Box mr={1}>
      <IconButton
        style={{
          backgroundColor:
            type === "color" ? `#${item}` : theme.palette.secondary.main,
          color: "white",
          width: theme.spacing(4),
          height: theme.spacing(4),
        }}
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
        onClick={() => handleDelete(item)}
      >
        {hover ? (
          <DeleteOutlineOutlinedIcon />
        ) : type === "size" ? (
          <Typography variant="body1">{item}</Typography>
        ) : (
          ""
        )}
      </IconButton>
    </Box>
  );
};
