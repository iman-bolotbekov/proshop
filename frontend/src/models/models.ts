export interface IReview {
  id: number
  name: string
  rating: number
  comment: string
  createdAt: string
}

export interface IProduct {
  id: number
  name: string
  image_url: string
  brand: string
  category: string
  description: string
  rating: number
  numReviews: number
  price: string
  createdAt: string
  countInStock: number
  user: number
  reviews: IReview[]
}

export interface ProductServerResponse {
  next: string
  previous: string
  count: number
  results: IProduct[]
}

export interface IFilters {
  page?: number
}

export interface ICartItem {
  countInStock?: number
  image: string
  name: string
  price: string
  product: number
  qty: number
}

export interface IRegisterPayload {
  name: string
  email: string
  password: string
}

export interface IRegisterData {
  id: number
  name: string
  email: string
  username: string
  isAdmin: boolean
}

export interface ILoginPayload {
  username: string
  password: string
}

export interface ILoginData {
  refresh: string
  access: string
  id: number
  name: string
  email: string
  username: string
  isAdmin: boolean
  token: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  name: string
  email: string
  password: string
  rePassword?: string
}

export interface IShipping {
  address: string
  city: string
  postalCode: string
  country: string
  id?: number
}

export interface IPaymentMethod {
  paymentMethod: string
}

export interface IOrderItem {
  id: number
  qty: number
  product: number
  price: string
  order: 7
  name: string
  image: string
}

export interface IOrderData {
  createdAt: string
  deliveredAt: string | null
  isDelivered: boolean
  isPaid: boolean
  orderItems: IOrderItem[]
  paidAt: string | null
  paymentMethod: string
  shippingAddress: IShipping
  shippingPrice: string
  taxPrice: string
  totalPrice: string
  user: IRegisterData
  id: number
}

export interface IOrder {
  orderItems: ICartItem[]
  shippingAddress: IShipping
  paymentMethod: IPaymentMethod
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}

export interface IOrderPayload {
  token: string
  order: IOrder
}

export interface IChartDataPoints {
  label: string
  value: number
}

export interface IUpdateUser {
  id?: number
  name: string
  email: string
  isAdmin: boolean
}

export interface ILeaveReview {
  productId?: number
  rating: number
  comment: string
}

export interface ICreateProduct {
  name: string
  price: string
  brand: string
  category: string
  description: string
  image: File | null
  countInStock: number
}

export interface IUpdateProductPayload {
  product: FormData
  productId: number
}

export interface IOrderServerResponse {
  next: string
  previous: string
  count: number
  results: IOrderData[]
}

export interface IUserServerResponse {
  next: string
  previous: string
  count: number
  results: IRegisterData[]
}
