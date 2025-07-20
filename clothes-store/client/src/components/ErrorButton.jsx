import React, { Component } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import { Button, withStyles } from "@material-ui/core";

const ErrorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
  "&:hover": {
    color: theme.palette.error.dark,
    borderColor: theme.palette.error.dark,
  },
}))((props) => <Button {...props} />);

export default ErrorButton;
