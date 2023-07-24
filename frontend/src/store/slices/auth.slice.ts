import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ILoginData } from '../../models/models'

const LS_UI_KEY = 'userInfo'

interface AuthState {
  userInfo: ILoginData | null
}
const localStorageData = localStorage.getItem(LS_UI_KEY)

const initialState: AuthState = {
  userInfo: localStorageData ? JSON.parse(localStorageData) : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<ILoginData>) {
      state.userInfo = action.payload
      localStorage.setItem(LS_UI_KEY, JSON.stringify(state.userInfo))
    },
    logout(state) {
      state.userInfo = null
      localStorage.removeItem(LS_UI_KEY)
    },
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
