import React, { Component, useState } from "react";
import "date-fns";
import svLocale from "date-fns/locale/sv";
import DateFnsUtils from "@date-io/date-fns";

// Import Mui Pickers
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";

// Import Mui Components
import {
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
  Tabs,
  Tab,
  withStyles,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

// Import Mui Icons
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import { NavLink } from "react-router-dom";

// Style Mui Components
const PaymentMethodTab = withStyles((theme) => ({
  root: {
    minWidth: "50%",
    maxWidth: "50%",
  },
}))((props) => <Tab {...props} />);

const CartCheckoutCard = (props) => {
  const { cart, handleCheckout } = props;

  const [paymentMethodTabs, setPaymentMethodTabs] = useState(0);

  const handlePaymentMethodTabs = (event, newValue) => {
    setPaymentMethodTabs(newValue);
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [checkedPromoCode, setCheckedPromoCode] = useState(false);

  const handleCheckedPromoCode = () => {
    setCheckedPromoCode(!checkedPromoCode);
  };

  return (
    <Paper elevation={14}>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body1" align="center">
                  Quantity
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="center">
                  Total
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="center">
                  <Box fontWeight="fontWeightBold">
                    {cart.reduce(
                      (total, item) => total + item.selectedQuantity,
                      0
                    )}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="center">
                  <Box fontWeight="fontWeightBold">
                    {cart.length > 0
                      ? `${cart.reduce(
                          (total, item) =>
                            total + item.selectedQuantity * item.price,
                          0
                        )} kr`
                      : "0 kr"}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Tabs
              variant="fullWidth"
              indicatorColor="primary"
              textColor="secondary"
              value={paymentMethodTabs}
              onChange={handlePaymentMethodTabs}
            >
              {["Credit card", "Invoice"].map((item, i) => (
                <PaymentMethodTab
                  label={<Typography variant="body2">{item}</Typography>}
                />
              ))}
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            {paymentMethodTabs === 0 && (
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={12}>
                  <TextField color="secondary" fullWidth label="Card holder" />
                </Grid>
                <Grid item xs={12}>
                  <TextField color="secondary" fullWidth label="Card number" />
                </Grid>
                <Grid item xs={8}>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={svLocale}
                  >
                    <KeyboardDatePicker
                      color="secondary"
                      disablePast
                      disableToolbar
                      label="Expiry date"
                      value={selectedDate}
                      onChange={(date) => handleDateChange(date)}
                      format="MM/yy"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth color="secondary" label="CVC" />
                </Grid>
              </Grid>
            )}
            {paymentMethodTabs === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    color="secondary"
                    fullWidth
                    label="E-mail address"
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              color="secondary"
              label="Promo code"
              disabled={!checkedPromoCode}
            />
          </Grid>
          <Grid item xs={3}>
            <Grid container justify="flex-end">
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<RadioButtonUncheckedOutlinedIcon />}
                    checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                    name="promoCode"
                    checked={checkedPromoCode}
                    onChange={handleCheckedPromoCode}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <NavLink to="/receipt" style={{ textDecoration: "none" }}>
              <Paper elevation={14} style={{ borderRadius: "2rem" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Paper>
            </NavLink>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CartCheckoutCard;
