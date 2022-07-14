import React, { useContext } from "react";
import classes from "./Header.module.css";
import { MdStorefront, MdSearch, MdShoppingCart } from "react-icons/md";
import CartContext from "../store/cart-context";
import { auth, db } from "../data-base/Firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
// import HomeContext from "../store/home-context";

const Header = (props) => {
  // const [searchInput, setSearchInput] = useState('')
  const cartCtx = useContext(CartContext);
  // const homeCtx = useContext(HomeContext)

  const numberOfCartItems = cartCtx.cartItems.reduce((currentNumber, item) => {
    return currentNumber + +item.amount;
  }, 0);

  const logoutHandler = () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    signOut(auth)
      .then(() => {
        return updateDoc(docRef, {
          cart: {
            itemsList: cartCtx.cartItems,
            totalAmount: cartCtx.totalAmount,
          },
        });
      })
      .then(() => {
        cartCtx.loadUserName("Guest");
        cartCtx.loadItems([]);
        cartCtx.loadTotalAmount(0);
      })
      .catch((error) => alert(error));
  };

  const searchHandler = (event) => {
    // setSearchInput(event.target.value)
  };

  const search = () => {
    // const filteredItems = homeCtx.homeItems.filter(elem => {
    //   if (searchInput === "") {
    //     return elem
    //   }else if (elem.description.toLowerCase().includes(searchInput.toLowerCase())) {
    //     return elem
    //   }
    // })
    // homeCtx.setHomeItems(filteredItems)
  };

  return (
    <div className={classes.header}>
      <div className={classes["shop_icon_container"]}>
        <MdStorefront className={classes.shop_icon}></MdStorefront>
        <h2>eShop</h2>
      </div>
      <div className={classes["search_input"]}>
        <input className={classes.input} type="text" onChange={searchHandler} />
        <MdSearch
          className={classes["search_icon"]}
          onClick={search}
        ></MdSearch>
      </div>
      <div className={classes.nav}>
        <div className={classes.actions}>
          <span
            className={classes["top_text"]}
          >{`Hello ${cartCtx.userName}`}</span>
          {cartCtx.userName === "Guest" ? (
            <span className={classes["bottom_text"]} onClick={props.showLogin}>
              Sign in
            </span>
          ) : (
            <span className={classes["bottom_text"]} onClick={logoutHandler}>
              Sign out
            </span>
          )}
        </div>
        <div className={classes.actions}>
          <span className={classes["top_text"]}>Your</span>
          <span className={classes["bottom_text"]}>Shop</span>
        </div>
        <div className={classes.shoping}>
          <MdShoppingCart
            onClick={props.showCart}
            className={classes["cart_icon"]}
          ></MdShoppingCart>
          <label className={classes["cart_amount"]}>{numberOfCartItems}</label>
        </div>
      </div>
    </div>
  );
};

export default Header;
