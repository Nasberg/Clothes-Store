import React, { Component, useState } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  Divider,
  IconButton,
  Button,
} from "@material-ui/core";

// Import Mui Icons
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AdminAddProductCategory from "./AdminAddProductCategory";
import AdminEditProductCategories from "./AdminEditProductCategories";

const AdminProductCategoriesCard = (props) => {
  const {
    products,
    openedCategory,
    handleOpenedCategory,
    handleOpenAdminDeleteDialog,
  } = props;

  const [addCategoryButton, setAddCategoryButton] = useState(false);

  const handleAddCategoryButton = () => {
    setEditCategoryButton(false);
    setAddCategoryButton(!addCategoryButton);
  };

  const [editCategoryButton, setEditCategoryButton] = useState(false);

  const handleEditCategoryButton = () => {
    setAddCategoryButton(false);
    setEditCategoryButton(!editCategoryButton);
  };

  return (
    <Paper elevation={14}>
      <Box p={2}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="body1">
              <Box fontWeight="fontWeightBold">Categories</Box>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="flex-end">
              <IconButton
                color="primary"
                onClick={handleAddCategoryButton}
                style={
                  addCategoryButton
                    ? {
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                      }
                    : {}
                }
              >
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={handleEditCategoryButton}
                style={
                  editCategoryButton
                    ? {
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                      }
                    : {}
                }
              >
                <EditOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {products.length > 0 && (
            <>
              {addCategoryButton ? (
                <AdminAddProductCategory />
              ) : editCategoryButton ? (
                <>
                  {products.map((item, i) => (
                    <AdminEditProductCategories
                      key={i}
                      item={item}
                      handleOpenAdminDeleteDialog={handleOpenAdminDeleteDialog}
                    />
                  ))}
                </>
              ) : (
                <>
                  {products.map((item, i) => (
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOpenedCategory(item.title)}
                        style={
                          openedCategory === item.title
                            ? {
                                backgroundColor: theme.palette.secondary.main,
                                color: "white",
                              }
                            : {}
                        }
                      >
                        {item.title}
                      </Button>
                    </Grid>
                  ))}
                </>
              )}
            </>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default AdminProductCategoriesCard;
