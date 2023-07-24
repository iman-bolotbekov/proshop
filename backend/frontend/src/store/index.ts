import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from './api/product.api'
import { productReducer } from './slices/product.slice'
import { uiReducer } from './slices/ui.slice'
import { cartReducer } from './slices/cart.slice'
import { authReducer } from './slices/auth.slice'
import { userApi } from './api/user.api'
import { orderApi } from './api/order.api'

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    product: productReducer,
    ui: uiReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(userApi.middleware)
      .concat(orderApi.middleware),
  devTools: true,
})

setupListeners(store.dispatch)

export default store

export type RootState = ReturnType<typeof store.getState>
