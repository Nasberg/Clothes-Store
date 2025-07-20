import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  CircularProgress,
} from "@material-ui/core";

// Import Mui Icons
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

// Import App Components
import ErrorButton from "./ErrorButton";

import airMax90Orange from "../images/air-max-90-orange.jpg";
import { useEffect } from "react";

const CartDeleteDialog = (props) => {
  const {
    delItem,
    open,
    itemDeleted,
    handleOpen,
    handleClose,
    handleDelCartItem,
  } = props;

  const [loading, setLoading] = useState(false);

  const handleDeleteItem = (item) => {
    setLoading(true);
    handleDelCartItem(item);
  };

  useEffect(() => {
    if (itemDeleted) {
      setLoading(false);
    }
  });

  return (
    <>
      {delItem && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionComponent={Slide}
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h6">
              <Box fontWeight="fontWeightBold">
                Are you sure you want do delete{" "}
                {delItem.selectedQuantity === 1 ? "this item" : "these items"}?
              </Box>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box mb={3}>
              <Paper elevation={14}>
                <Box px={3} py={1}>
                  <Grid container justify="center" alignItems="center">
                    {itemDeleted ? (
                      <Avatar
                        style={{
                          width: theme.spacing(6),
                          height: theme.spacing(6),
                          backgroundColor: theme.palette.secondary.main,
                        }}
                      >
                        <CheckCircleOutlineOutlinedIcon
                          style={{
                            width: theme.spacing(5),
                            height: theme.spacing(5),
                          }}
                        />
                      </Avatar>
                    ) : loading ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <Grid item xs={6}>
                          <List>
                            <ListItem style={{ padding: 0 }}>
                              <ListItemText
                                primary={delItem.title}
                                secondary={
                                  delItem.selectedQuantity === 1
                                    ? `${delItem.price} kr`
                                    : `${
                                        delItem.selectedQuantity * delItem.price
                                      } kr (${delItem.price} kr)`
                                }
                              />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item xs={3}>
                          <Grid container justify="flex-end">
                            <Avatar
                              style={{
                                width: theme.spacing(4),
                                height: theme.spacing(4),
                                backgroundColor: `#${delItem.selectedColor}`,
                              }}
                            >
                              {" "}
                            </Avatar>
                          </Grid>
                        </Grid>
                        <Grid item xs={3}>
                          <Grid container justify="flex-end">
                            <Avatar
                              style={{
                                width: theme.spacing(4),
                                height: theme.spacing(4),
                                backgroundColor: theme.palette.secondary.main,
                              }}
                            >
                              <Typography variant="subtitle1">
                                {delItem.selectedSize}
                              </Typography>
                            </Avatar>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box mr={2}>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <ErrorButton
                onClick={() => handleDeleteItem(delItem)}
                variant="outlined"
                autoFocus
              >
                Delete
              </ErrorButton>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CartDeleteDialog;
