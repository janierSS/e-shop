import React, {useContext} from 'react'
import classes from './CartItem.module.css'
import CartContext from '../store/cart-context'



const CartItem = (props) => {
  
  const item = props.itemData.item
  const cartCtx = useContext(CartContext)

  const deleteItemHandler = () => {
    cartCtx.deleteItem(props.itemData)
  }

  return (
    <li className={classes.container}>
      <img className={classes.image} src={item.image} alt="Item" />
      <p>{item.description}</p>
      <div className={classes.actions}>
      <p className={classes.price}>{item.price}</p>
        <p className={classes.price}>{`x${props.itemData.amount}`}</p>
        <button className={classes.button} onClick={deleteItemHandler}>-</button>
      </div>
    </li>
  )
}

export default CartItem