import CartContext from "./cart-context";
import React, { useState, useEffect } from "react";
import { doc, getDoc, collection } from "firebase/firestore";
import { auth, db } from "../data-base/Firebase";

const CartProvider = (props) => {
  let itemsInit = [];
  let totalAmountInit = 0;
  let userNameInit = "Guest";

  useEffect(() => {
    const currUser = auth.currentUser;
    if (auth.currentUser) {
      const colRef = collection(db, "users");
      getDoc(doc(colRef, auth.currentUser.uid))
        .then((data) => {
          const user = data.data();
          itemsInit = user.cart.itemsList;
          totalAmountInit = user.cart.totalAmount;
          userNameInit = user.info.firstname;
          console.log(userNameInit);
        })
        .catch((error) => alert(error.message));
    }
  }, []);
  

  const [items, setItems] = useState(itemsInit);
  const [totalAmount, setTotalAmount] = useState(totalAmountInit);
  const [userName, setUserName] = useState(userNameInit);

  const addItem = (item) => {
    let updatedItems = [...items];
    let cartItem = updatedItems.find((element) => element.item.id === item.id);
    if (cartItem) {
      let index = updatedItems.indexOf(cartItem);
      updatedItems[index] = { ...cartItem, amount: cartItem.amount + 1 };
      setTotalAmount(totalAmount + +cartItem.item.price);
    } else {
      updatedItems.push({ item: item, amount: 1 });
      setTotalAmount(totalAmount + +item.price);
    }
    setItems(updatedItems);
  };

  const deleteItem = (item) => {
    let updatedItems = [...items];
    const index = updatedItems.indexOf(item);
    const newItem = updatedItems[index];
    if (newItem.amount === 1) {
      updatedItems.splice(index, 1);
    } else {
      newItem.amount -= 1;
      updatedItems[index] = newItem;
    }
    setTotalAmount(totalAmount - +newItem.item.price);
    setItems(updatedItems);
  };

  const loadItems = (itemsList) => {
    setItems(itemsList);
  };

  const loadTotalAmount = (amount) => {
    setTotalAmount(amount);
  };

  const loadUserName = (username) => {
    setUserName(username);
  };

  const cartContext = {
    cartItems: items,
    loadItems: loadItems,
    addItem: addItem,
    deleteItem: deleteItem,
    totalAmount: totalAmount,
    loadTotalAmount: loadTotalAmount,
    userName: userName,
    loadUserName: loadUserName,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
