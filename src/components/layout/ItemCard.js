import React, { useContext } from "react";
import classes from "./ItemCard.module.css";
import { AiFillStar } from "react-icons/ai";
import CartContext from "../store/cart-context";

const ItemCard = (props) => {
  const item = props.item;
  const cartCtx = useContext(CartContext);

  const starAmount = (amount) => {
    let lis = [];
    for (let i = 0; i < amount; i++) {
      lis.push(<AiFillStar className={classes.star} key={i} />);
    }
    return lis;
  };

  const addToCartHandle = () => {
    cartCtx.addItem(item);
  };

  return (
    <div className={classes.container}>
      <div>
        <p>{item.description}</p>
        <p className={classes.price}>{`$${item.price}`}</p>
        <ul>{starAmount(item.rating)}</ul>
      </div>
      <img className={classes.image} src={item.image} alt="" />
      <button className={classes.button} onClick={addToCartHandle}>
        Add to Basket
      </button>
    </div>
  );
};

export default ItemCard;
