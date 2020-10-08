import React, { Component, useState } from "react";

// Import Mui Components
import { Grid, TextField, IconButton, Divider } from "@material-ui/core";

// Import Mui Icons
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

export default (props) => {
  const { item, handleOpenAdminDeleteDialog } = props;

  const [newCategory, setNewCategory] = useState(item.title);

  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleSaveCategory = () => {
    fetch(`/update-product-category/${item._id}`, {
      method: "PUT",
      body: JSON.stringify({ title: newCategory }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
          <IconButton
            color="secondary"
            disabled={newCategory === item.title}
            onClick={handleSaveCategory}
          >
            <SaveOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleOpenAdminDeleteDialog(
                `/delete-product-category/${item._id}`,
                "Category",
                item.title
              )
            }
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  );
};
