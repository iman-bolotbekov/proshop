import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  leaveRatingModal: boolean
  qty: number
}

const initialState: UIState = {
  leaveRatingModal: false,
  qty: 1,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openLeaveRatingModal(state) {
      state.leaveRatingModal = state.leaveRatingModal = true
    },
    closeLeaveRatingModal(state) {
      state.leaveRatingModal = state.leaveRatingModal = false
    },
    increamentQty(state) {
      state.qty++
    },
    decreamentQty(state) {
      state.qty--
    },
    resetQty(state) {
      state.qty = 1
    },
  },
})

export const uiActions = uiSlice.actions
export const uiReducer = uiSlice.reducer
