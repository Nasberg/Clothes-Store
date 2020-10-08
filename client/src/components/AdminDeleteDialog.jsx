import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Dialog,
  Typography,
  DialogActions,
  Grid,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Slide,
  DialogTitle,
  DialogContent,
  Paper,
} from "@material-ui/core";
import ErrorButton from "./ErrorButton";

// Import Mui Icons
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

export default (props) => {
  const { delType, delTitle, deleteUrl, open, handleClose } = props;

  const [loading, setLoading] = useState(false);
  const [itemDeleted, setItemDeleted] = useState(false);

  const handleDeleteItem = () => {
    setLoading(true);

    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItemDeleted(true);
        setLoading(false);

        setTimeout(() => {
          setItemDeleted(false);
          handleClose();
        }, 1500);
      });
  };

  return (
    <>
      {delTitle && (
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
                Are you sure you want do delete this item?
              </Box>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box mb={2}>
              <Paper elevation={14}>
                <Box p={3}>
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
                          <Typography variant="h6">Type:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6">Value:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">{delType}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">{delTitle}</Typography>
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
                onClick={handleDeleteItem}
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
