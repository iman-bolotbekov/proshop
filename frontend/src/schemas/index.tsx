import * as yup from 'yup'

export const signInShema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalide email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password min 8'),
})

export const signUpShema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalide email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password min 8'),
  rePassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

export const shippingShema = yup.object().shape({
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.number().required('Postal Code is required'),
  country: yup.string().required('Country is required'),
})

export const paymentMethodShema = yup.object().shape({
  paymentMethod: yup.string().required('Payment method is required'),
})

export const updateProfileShema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email('Invalide email'),
  password: yup.string().min(8, 'Password min 8'),
  rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
})

export const editUserShema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email('Invalide email'),
  isAdmin: yup.boolean(),
})

export const leaveReviewShema = yup.object().shape({
  rating: yup.number().required('Rating is required!'),
  comment: yup.string(),
})

export const createProductShema = yup.object().shape({
  name: yup.string().required('Name is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  countInStock: yup.number().required('Count in stock is required'),
  brand: yup.string().required('Brand is required'),
  image: yup.string().required('Image is required'),
})
