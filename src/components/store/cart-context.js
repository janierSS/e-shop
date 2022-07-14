import {createContext} from 'react'

const CartContext = createContext({
  cartItems: [],
  loadItems: () => {},
  addItem: () => {},
  deleteItem: () => {},
  totalAmount: 0,
  loadTotalAmount: () => {},
  userName: "",
  loadUserName: () => {}
}) 

export default CartContext