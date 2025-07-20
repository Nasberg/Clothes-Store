import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@material-ui/core";

const Receipt = (props) => {
  const { purchasedItems } = props;

  return (
    <>
      {purchasedItems.length > 0 ? (
        <Box mt={4}>
          <Grid container justify="center">
            <Grid item xs={11} sm={5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" align="center">
                    <Box fontWeight="fontWeightBold">
                      Thank you for your purchase!
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={14}>
                    <Box p={4}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box mb={1}>
                            <Typography variant="body1">
                              <Box fontWeight="fontWeightBold">Receipt</Box>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Paper
                            elevation={5}
                            style={{
                              border: `3px solid ${theme.palette.secondary.main}`,
                            }}
                          >
                            <Table aria-label="simple table" size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    <Box fontWeight="fontWeightBold">
                                      Product
                                    </Box>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Box fontWeight="fontWeightBold">
                                      Quantity
                                    </Box>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Box fontWeight="fontWeightBold">
                                      Price/product (kr)
                                    </Box>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Box fontWeight="fontWeightBold">
                                      Price (kr)
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {purchasedItems.map((item, i) => (
                                  <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                      {item.title}
                                    </TableCell>
                                    <TableCell align="right">
                                      {item.selectedQuantity}
                                    </TableCell>
                                    <TableCell align="right">
                                      {item.price} kr
                                    </TableCell>
                                    <TableCell align="right">
                                      {item.selectedQuantity * item.price}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow key={2000}></TableRow>
                                <TableRow key={2001}>
                                  <TableCell component="th" scope="row">
                                    <Box fontWeight="fontWeightBold">Total</Box>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Box fontWeight="fontWeightBold">
                                      {purchasedItems
                                        .map((item) => item.selectedQuantity)
                                        .reduce(
                                          (total, item) => total + item,
                                          0
                                        )}
                                    </Box>
                                  </TableCell>
                                  <TableCell />
                                  <TableCell align="right">
                                    <Box fontWeight="fontWeightBold">
                                      {purchasedItems.reduce(
                                        (total, item) =>
                                          total +
                                          item.selectedQuantity * item.price,
                                        0
                                      )}
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      <Paper elevation={14} style={{ borderRadius: "2rem" }}>
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                        >
                          Return to home
                        </Button>
                      </Paper>
                    </NavLink>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box mt={15}>
          <Grid container justify="center">
            <CircularProgress size={60} color="primary" />
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Receipt;
