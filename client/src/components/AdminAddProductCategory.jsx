import React, { Component, useState } from "react";

// Import Mui Components
import {
  Grid,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
} from "@material-ui/core";

// Import Mui Icons
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

export default (props) => {
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };

  const [loading, setLoading] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState(false);

  const handleAddNewCategory = () => {
    setLoading(true);

    fetch("/add-product-category", {
      method: "POST",
      body: JSON.stringify({ title: newCategory }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoryAdded(true);
        setLoading(false);
        setNewCategory("");

        setTimeout(() => {
          setCategoryAdded(false);
        }, 2000);
      });
  };

  return (
    <>
      <Grid item xs={9}>
        <TextField
          fullWidth
          variant="filled"
          value={newCategory}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Grid container justify="flex-end">
          {loading ? (
            <CircularProgress color="secondary" />
          ) : categoryAdded ? (
            <IconButton color="secondary">
              <CheckCircleOutlineOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              disabled={newCategory.length < 3}
              onClick={handleAddNewCategory}
            >
              <SaveOutlinedIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  );
};
