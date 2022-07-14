import React, { useState, useContext } from "react";
import classes from "./Login.module.css";
import Modal from "../UI/Modal";
import { auth, db } from "../data-base/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import CartContext from "../store/cart-context";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [registerFormShowing, setRegisterFormShowing] = useState(false);

  const cartCtx = useContext(CartContext);

  const usernameHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const firstnameHandler = (event) => {
    setFirstname(event.target.value);
  };

  const lastnameHandler = (event) => {
    setLastname(event.target.value);
  };

  const signInHandler = (event) => {
    event.preventDefault();
    registerFormShowing ? registerHandler() : loginHandler();
  };

  const loginHandler = () => {
    const colRef = collection(db, "users");
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        return getDoc(doc(colRef, cred.user.uid));
      })
      .then((doc) => {
        const user = doc.data();
        cartCtx.loadItems(user.cart.itemsList);
        cartCtx.loadTotalAmount(user.cart.totalAmount);
        cartCtx.loadUserName(user.info.firstname);
        props.hideLogin();
      })
      .catch((error) => alert(error.message));
  };

  const registerHandler = () => {
    const colRef = collection(db, "users");
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        return setDoc(doc(colRef, cred.user.uid), {
          cart: {
            itemsList: cartCtx.cartItems,
            totalAmount: cartCtx.totalAmount,
          },
          info: { firstname, lastname },
        });
      })
      .then(() => {
        props.hideLogin();
        cartCtx.loadUserName(firstname);
      })
      .catch((error) => alert(error.message));
  };

  const showRegisterFormHandler = (event) => {
    event.preventDefault();
    setRegisterFormShowing(true);
  };

  const cancelHandler = (event) => {
    if (!registerFormShowing) {
      props.hideLogin();
    } else {
      setRegisterFormShowing(false);
    }
  };

  return (
    <Modal onClose={props.hideLogin}>
      <form onSubmit={signInHandler} className={classes.modal}>
        {registerFormShowing && (
          <div className={classes.register}>
            <div className={classes.name}>
              <label className={classes.text}>Firstname</label>
              <input
                type="text"
                className={classes.input}
                onChange={firstnameHandler}
              />
            </div>
            <div className={classes.name}>
              <label className={classes.text}>Lastname</label>
              <input
                type="text"
                className={classes.input}
                onChange={lastnameHandler}
              />
            </div>
          </div>
        )}
        <div>
          <label className={classes.text}>Username</label>
          <input
            className={classes.input}
            type="text"
            value={email}
            onChange={usernameHandler}
          />
        </div>
        <div>
          <label className={classes.text}>Password</label>
          <input
            className={classes.input}
            type="password"
            value={password}
            onChange={passwordHandler}
          />
        </div>
        <div className={classes.actions}>
          <span className={classes.button} onClick={cancelHandler}>
            Cancel
          </span>
          {!registerFormShowing ? (
            <button className={classes.button} type="submit">
              Login
            </button>
          ) : (
            <button className={classes.button} type="submit">
              Create
            </button>
          )}
        </div>
        <div>
          <p
            className={classes.information}
          >{`By signing-in you agree to the eShop Website Conditions  
          of Use  & sale. Please see our Privacy Notice, our Cookies Notice 
          and our Interest-Based Ads Notice`}</p>
          {!registerFormShowing && (
            <button
              className={classes["signup-button"]}
              onClick={showRegisterFormHandler}
            >
              Create your eShop Account
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default Login;
