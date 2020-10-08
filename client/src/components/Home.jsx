import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Typography, Button, Box, Paper } from "@material-ui/core";
import theme from "../styles/theme";

import airMax90Orange from "../images/air-max-90-orange.jpg";
import jacketBlue from "../images/jacket-blue.jpg";
import pantsGrey from "../images/pants-grey.jpg";

const Home = (props) => {
  const { handleStoreOpenedPage } = props;

  const handleGoToStore = () => {
    handleStoreOpenedPage("category", "");
  };

  return (
    <Grid container justify="center">
      <Grid item xs={11} sm={10} lg={11}>
        <Box style={{ marginTop: "10%" }}>
          <Grid
            container
            spacing={10}
            justify="center"
            alignItems="center"
            direction="row-reverse"
          >
            <Grid item xs={12} lg={8}>
              <Paper
                elevation={14}
                style={{
                  borderTopLeftRadius: "2rem",
                }}
              >
                <Grid container>
                  <Grid item xs={4}>
                    <img
                      src={airMax90Orange}
                      style={{
                        width: "100%",
                        borderLeft: `16px solid ${theme.palette.primary.main}`,
                        borderTop: `12px solid ${theme.palette.primary.main}`,
                        borderTopLeftRadius: "2rem",
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      src={jacketBlue}
                      style={{
                        width: "100%",
                        borderLeft: `16px solid ${theme.palette.secondary.main}`,
                        borderTop: `12px solid ${theme.palette.secondary.main}`,
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      src={pantsGrey}
                      style={{
                        width: "100%",
                        borderLeft: `16px solid ${theme.palette.primary.main}`,
                        borderTop: `12px solid ${theme.palette.primary.main}`,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Paper
                elevation={14}
                style={{
                  border: `16px solid ${theme.palette.secondary.main}`,
                  borderLeft: "none",
                  borderRight: "none",
                  borderRadius: "2rem",
                }}
              >
                <Box p={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h3">
                        Welcome to{" "}
                        <span
                          style={{ fontSize: "3.2rem", fontWeight: "bold" }}
                        >
                          Sporley
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <NavLink to="/shop" style={{ textDecoration: "none" }}>
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          color="primary"
                          onClick={handleGoToStore}
                        >
                          Go to shop
                        </Button>
                      </NavLink>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
