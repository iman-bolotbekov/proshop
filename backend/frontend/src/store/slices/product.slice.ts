import { createSlice } from '@reduxjs/toolkit'

interface ProductState {}

const initialState: ProductState = {}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
})

export const productActions = productSlice.actions
export const productReducer = productSlice.reducer
