import React, { Component, useState } from "react";

import { Grid, Button, Typography, Paper, Box } from "@material-ui/core";

import airMax90Orange from "../images/air-max-90-orange.jpg";
import theme from "../styles/theme";

const StoreCategoryCard = (props) => {
  const { title, handleOpenedPage } = props;

  const [hoverCard, setHoverCard] = useState(false);

  const handleEnterCard = () => {
    setHoverCard(true);
  };

  const handleLeaveCard = () => {
    setHoverCard(false);
  };

  return (
    <Grid item xs={6} md={3}>
      <Paper elevation={14} style={{ borderRadius: "2rem" }}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          style={{
            padding: 0,
            border: hoverCard ? `4px solid ${theme.palette.primary.main}` : "",
          }}
          onMouseOver={handleEnterCard}
          onMouseLeave={handleLeaveCard}
          onClick={() => handleOpenedPage("category", title)}
        >
          <Grid container>
            <Grid item xs={12}>
              <img
                src={airMax90Orange}
                style={{
                  width: "100%",
                  borderTopLeftRadius: "2rem",
                  borderTopRightRadius: "2rem",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box my={1}>
                <Typography variant="body1" align="center">
                  <Box fontWeight="fontWeightBold">{title}</Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Button>
      </Paper>
    </Grid>
  );
};

export default StoreCategoryCard;
