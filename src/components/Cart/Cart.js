import React, {useContext} from 'react'
import Modal from '../UI/Modal'
import {AiFillCloseCircle} from 'react-icons/ai'
import classes from './Cart.module.css'
import CartContext from '../store/cart-context'
import CartItem from './CartItem'

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const cartItems = cartCtx.cartItems
  return (
    <Modal onClose={props.hideCart}>
      <div className={classes.header}>
        <h2>YourCart</h2>
        <AiFillCloseCircle className={classes['icon-close']} onClick={props.hideCart}/>
      </div>
      {cartItems.length === 0 && <h3>Your Cart is Empty</h3>}
      <ul>{cartItems.map(item => {return <CartItem key={item.item.id} itemData = {item}></CartItem>})}</ul>
      <div className={classes.actions}>
        <p>{`$${Math.abs(cartCtx.totalAmount).toFixed(2)}`}</p>
        <button className={classes.button}>Checkout</button>
      </div>
    </Modal>
  )
}

export default Cart