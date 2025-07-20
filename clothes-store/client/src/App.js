import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import Styles
import theme from "./styles/theme";

// Import Mui Components
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

// Import App Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Store from "./components/Store";
import Cart from "./components/Cart";
import Receipt from "./components/Receipt";
import Admin from "./components/Admin";
import CartDeleteDialog from "./components/CartDeleteDialog";
import CartSnackbar from "./components/CartSnackbar";

// Mock User
const mockUserId = "5f553b7e4e2dd96bb17bc3d1";

function App() {
  // Product State
  const [products, setProducts] = useState([]);

  // Store State
  const [storeOpenedCategory, setStoreOpenedCategory] = useState("");
  const [storeOpenedProduct, setStoreOpenedProduct] = useState("");

  const handleStoreOpenedPage = (type, value) => {
    if (type === "category") {
      setStoreOpenedProduct("");
      setStoreOpenedCategory(value);
    } else {
      setStoreOpenedProduct(value);
    }
  };

  // Cart State
  const [cart, setCart] = useState([]);
  const [openCartSnackbar, setOpenCartSnackbar] = useState(false);

  // Handle Cart Snackbar
  const handleCartSnackbarOpen = () => {
    setOpenCartSnackbar(true);
  };

  const handleCartSnackbarClose = () => {
    setOpenCartSnackbar(false);
  };

  const [itemAddedToCart, setItemAddedToCart] = useState(false);

  // Add Item To Cart
  const handleAddCartItem = (newItem) => {
    // setCart([...cart, newItem]);
    // handleCartSnackbarOpen();

    setItemAddedToCart(false);
    handleCartSnackbarOpen();
    console.log("NewItem", newItem);

    fetch(`/add-to-cart/${mockUserId}`, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart);
        setItemAddedToCart(true);
        setTimeout(() => handleCartSnackbarClose(), 3000);
      })
      .catch((err) => console.error("Error:", err));
  };

  const [itemDeletedFromCart, setItemDeletedFromCart] = useState(false);

  // Delete Item From Cart
  const handleDelCartItem = (delItem) => {
    // setCart(cart.filter((item) => item.id !== delItem.id));
    // handleDelItemDialogClose();

    fetch(`/delete-from-cart/${mockUserId}/${delItem._id}`, {
      method: "DELETE",
      body: JSON.stringify(delItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart);
        setItemDeletedFromCart(true);
        setTimeout(() => handleDelItemDialogClose(), 1500);
      })
      .catch((err) => console.error("Error:", err));
  };

  // Set Delete Item
  // Delete Item Dialog Open And Close State
  const [delItem, setDelItem] = useState({});
  const [delItemDialogOpen, setDelItemDialogOpen] = useState(false);

  const handleDelItemDialogOpen = (item) => {
    setItemDeletedFromCart(false);
    setDelItem(item);
    setDelItemDialogOpen(true);
  };

  const handleDelItemDialogClose = () => {
    setDelItem(null);
    setDelItemDialogOpen(false);
  };

  const [purchasedItems, setPurchasedItems] = useState([]);

  const handleCheckout = () => {
    setPurchasedItems([]);

    fetch(`/buy-products/${mockUserId}`, {
      method: "PUT",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPurchasedItems(cart);
        setCart(data.cart);
      })
      .catch((err) => console.error(err));
  };

  // Get Products
  useEffect(() => {
    fetch("/get-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  // Get User
  useEffect(() => {
    fetch(`/get-user/${mockUserId}`)
      .then((res) => res.json())
      .then((data) => setCart(data.cart));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <CartSnackbar
          open={openCartSnackbar}
          itemAdded={itemAddedToCart}
          handleOpen={handleCartSnackbarOpen}
          handleClose={handleCartSnackbarClose}
        />
        <CartDeleteDialog
          delItem={delItem}
          open={delItemDialogOpen}
          itemDeleted={itemDeletedFromCart}
          handleOpen={handleDelItemDialogOpen}
          handleClose={handleDelItemDialogClose}
          handleDelCartItem={handleDelCartItem}
        />
        <Navbar
          cart={cart}
          handleStoreOpenedPage={handleStoreOpenedPage}
          handleDelItemDialogOpen={handleDelItemDialogOpen}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <Home handleStoreOpenedPage={handleStoreOpenedPage} />
          )}
        />
        <Route
          exact
          path="/shop"
          render={(props) => (
            <Store
              products={products}
              cart={cart}
              openedCategory={storeOpenedCategory}
              openedProduct={storeOpenedProduct}
              handleOpenedPage={handleStoreOpenedPage}
              handleAddCartItem={handleAddCartItem}
              handleDelCartItem={handleDelCartItem}
            />
          )}
        />
        <Route
          exact
          path="/cart"
          render={(props) => (
            <Cart
              cart={cart}
              handleStoreOpenedPage={handleStoreOpenedPage}
              handleDelItemDialogOpen={handleDelItemDialogOpen}
              handleCheckout={handleCheckout}
            />
          )}
        />
        <Route
          exact
          path="/receipt"
          render={(props) => <Receipt purchasedItems={purchasedItems} />}
        />
        <Route
          exact
          path="/admin"
          render={(props) => <Admin products={products} />}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
