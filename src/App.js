import React, { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/layout/Header";
import Home from "./components/layout/Home";
import Login from "./components/login/Login";
import CartProvider from "./components/store/CartProvider";
// import HomeProvider from "./components/store/HomeProvider";

function App() {
  const [cartIsShowing, setCartIsShowing] = useState(false);
  const [loginIsShowing, setLoginIsShowing] = useState(false);

  const hideLogin = () => {
    setLoginIsShowing(false);
  };

  const showLogin = () => {
    setLoginIsShowing(true);
  };

  const hideCart = () => {
    setCartIsShowing(false);
  };

  const showCart = () => {
    setCartIsShowing(true);
  };

  return (
    <CartProvider>
      {loginIsShowing && <Login hideLogin={hideLogin} />}
      {cartIsShowing && <Cart hideCart={hideCart} />}
      
        <Header showCart={showCart} showLogin={showLogin} />
        <Home></Home>
      
    </CartProvider>
  );
}

export default App;
