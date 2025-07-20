import React, { Component, useState, useEffect } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Divider,
  Button,
  Avatar,
  TextField,
} from "@material-ui/core";

// Import App Components
import AdminProductsTab from "./AdminProductsTab";
// import AdminAddDialog from "./AdminAddDialog";
import AdminDeleteDialog from "./AdminDeleteDialog";

const Admin = (props) => {
  const { products } = props;

  const [menuTabs, setMenuTabs] = useState(1);

  const handleMenuTabs = (event, newValue) => {
    setMenuTabs(newValue);
  };

  const [delUrl, setDelUrl] = useState("");
  const [delType, setDelType] = useState("");
  const [delTitle, setDelTitle] = useState("");
  const [openAdminDeleteDialog, setOpenAdminDeleteDialog] = useState(false);

  const handleOpenAdminDeleteDialog = (deleteUrl, type, title) => {
    setDelUrl(deleteUrl);
    setDelType(type);
    setDelTitle(title);
    setOpenAdminDeleteDialog(true);
  };

  const handleCloseAdminDeleteDialog = () => {
    setOpenAdminDeleteDialog(false);
    setDelUrl("");
    setDelType("");
    setDelTitle("");
  };

  return (
    <>
      <AdminDeleteDialog
        delType={delType}
        delTitle={delTitle}
        deleteUrl={delUrl}
        open={openAdminDeleteDialog}
        handleClose={handleCloseAdminDeleteDialog}
      />
      <Grid container justify="center">
        <Grid item xs={11}>
          <Box mt={4}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper elevation={14}>
                  <Box p={2}>
                    <Tabs
                      variant="fullWidth"
                      indicatorColor="primary"
                      textColor="secondary"
                      value={menuTabs}
                      onChange={handleMenuTabs}
                    >
                      {["Dashboard", "Products", "Users"].map((item, i) => (
                        <Tab
                          label={<Typography variant="h6">{item}</Typography>}
                        />
                      ))}
                    </Tabs>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                {menuTabs === 1 && (
                  <AdminProductsTab
                    products={products}
                    handleOpenAdminDeleteDialog={handleOpenAdminDeleteDialog}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
