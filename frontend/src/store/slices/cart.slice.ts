import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartItem, IShipping, IPaymentMethod } from '../../models/models'

const LS_CART_KEY = 'rck'
const LS_SHIPPING_KEY = 'rsk'
const LS_PAYMENT_METHOD_KEY = 'rpmk'

interface CartState {
  cartItems: ICartItem[]
  shippingAddress: IShipping
  paymentMethod: IPaymentMethod
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem(LS_CART_KEY) ?? '[]'),
  shippingAddress: JSON.parse(localStorage.getItem(LS_SHIPPING_KEY) ?? '{}'),
  paymentMethod: JSON.parse(
    localStorage.getItem(LS_PAYMENT_METHOD_KEY) ?? '{}'
  ),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)
      if (existItem) {
        state.cartItems.forEach((x) => {
          if (x.product === existItem.product) {
            x.qty += existItem.qty
          }
        })
      } else {
        state.cartItems.push(item)
      }
      localStorage.setItem(LS_CART_KEY, JSON.stringify(state.cartItems))
    },
    removeFromCart(state, action: PayloadAction<string | number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      )
      localStorage.setItem(LS_CART_KEY, JSON.stringify(state.cartItems))
    },
    clearCart(state) {
      state.cartItems = []
      localStorage.removeItem(LS_CART_KEY)
    },
    increaseCartQty(state, action) {
      state.cartItems.forEach((item) => {
        if (item.product === action.payload) {
          item.qty++
        }
      })
      localStorage.setItem(LS_CART_KEY, JSON.stringify(state.cartItems))
    },
    decreaseCartQty(state, action) {
      state.cartItems = state.cartItems.filter((item) => {
        if (item.product === action.payload) {
          item.qty--
          return item.qty !== 0
        }
        return true
      })
      localStorage.setItem(LS_CART_KEY, JSON.stringify(state.cartItems))
    },
    addToShippingAddress(state, action: PayloadAction<IShipping>) {
      state.shippingAddress = action.payload
      localStorage.setItem(
        LS_SHIPPING_KEY,
        JSON.stringify(state.shippingAddress)
      )
    },
    addToPaymentMethod(state, action: PayloadAction<IPaymentMethod>) {
      state.paymentMethod = action.payload
      localStorage.setItem(
        LS_PAYMENT_METHOD_KEY,
        JSON.stringify(state.paymentMethod)
      )
    },
    clearPaymentMethod(state) {
      state.paymentMethod = { paymentMethod: '' }
      localStorage.removeItem(LS_PAYMENT_METHOD_KEY)
    },
  },
})

export const cartActions = cartSlice.actions
export const cartReducer = cartSlice.reducer
