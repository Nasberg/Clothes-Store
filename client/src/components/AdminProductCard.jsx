import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  Typography,
  Avatar,
  Box,
  IconButton,
  Divider,
  Paper,
  TextField,
} from "@material-ui/core";

// Import Mui Icons
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

// Import App Components
import AdminEditProduct from "./AdminEditProduct";

import airMax90Orange from "../images/air-max-90-orange.jpg";

const AdminProductCard = (props) => {
  const { item, handleOpenAdminDeleteDialog } = props;
  const { _id, title, price, discount, sizes, colors } = item;

  const [editItem, setEditItem] = useState(false);

  const handleEditItem = () => {
    setEditItem(!editItem);
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={14}>
        <Box p={2}>
          <Grid container spacing={5} alignItems="center">
            {editItem ? (
              <AdminEditProduct item={item} setEditItem={setEditItem} />
            ) : (
              <>
                <Grid item xs={2}>
                  <img src={airMax90Orange} style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body1">Name:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" noWrap>
                        <Box fontWeight="fontWeightBold">{title}</Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">Price:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" noWrap>
                        <Box fontWeight="fontWeightBold">{price} kr</Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">Discount:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" noWrap>
                        <Box fontWeight="fontWeightBold">{discount}%</Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper variant="outlined">
                        <Box p={1}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12}>
                              <Typography variant="body1">Colors</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container>
                                {colors.map((colItem, colI) => (
                                  <Box mr={1}>
                                    <Avatar
                                      style={{
                                        backgroundColor: `#${colItem}`,
                                        width: theme.spacing(4),
                                        height: theme.spacing(4),
                                      }}
                                    >
                                      {""}
                                    </Avatar>
                                  </Box>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper variant="outlined">
                        <Box p={1}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12}>
                              <Typography variant="body1">Sizes</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container>
                                {sizes.map((sizeItem, sizeI) => (
                                  <Box mr={1}>
                                    <Avatar
                                      style={{
                                        backgroundColor:
                                          theme.palette.secondary.main,
                                        color: "white",
                                        width: theme.spacing(4),
                                        height: theme.spacing(4),
                                      }}
                                    >
                                      <Typography variant="body1">
                                        {sizeItem}
                                      </Typography>
                                    </Avatar>
                                  </Box>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Grid container justify="flex-end">
                    <IconButton color="primary" onClick={handleEditItem}>
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleOpenAdminDeleteDialog(
                          `/delete-product/${_id}`,
                          "Product",
                          title
                        )
                      }
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default AdminProductCard;
