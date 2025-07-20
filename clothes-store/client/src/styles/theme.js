import React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { lightBlue, blueGrey, grey } from "@material-ui/core/colors";

let theme = createMuiTheme({
  palette: {
    background: {
      // default: lightBlue[300],
      default: "#8bf6ff",
    },
    primary: {
      main: "#ff893b",
      dark: "#c65a04",
      light: "#ffba6a",
    },
    secondary: {
      main: lightBlue[300],
      dark: "#0093c4",
      light: "#8bf6ff",
      contrastText: blueGrey[800],
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "2rem",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
