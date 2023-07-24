import {
  ICreateProduct,
  ILeaveReview,
  ILogin,
  IPaymentMethod,
  IRegister,
} from '../models/models'

export const signInValues: ILogin = {
  email: '',
  password: '',
}

export const signUpValues: IRegister = {
  name: '',
  email: '',
  password: '',
  rePassword: '',
}

export const paymentValues: IPaymentMethod = {
  paymentMethod: 'PayPal',
}

export const leaveReviewValues: ILeaveReview = {
  comment: '',
  rating: 0,
}

export const createProductValues: ICreateProduct = {
  name: '',
  price: '0',
  brand: '',
  category: '',
  description: '',
  countInStock: 0,
  image: null,
}
