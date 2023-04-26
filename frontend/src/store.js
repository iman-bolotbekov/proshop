import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    productListReducers,
    productDetailReducers,
    productDeleteReducers,
    productUpdateReducers, productCreateReducers, productReviewCreateReducers, productTopRatedReducers
} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userDeleteReducers,
    userDetailsReducers,
    userListReducers,
    userLoginReducers,
    userRegisterReducers,
    userUpdateProfileReducers, userUpdateReducers
} from "./reducers/userReducers"
import {
    orderCreateReducer, orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMyListReducer,
    orderPayReducer
} from "./reducers/orderReducers";
import orderListScreen from "./screens/OrderListScreen";


const reducer = combineReducers({
    productList: productListReducers,
    productCreate: productCreateReducers,
    productDetail: productDetailReducers,
    productDelete: productDeleteReducers,
    productUpdate: productUpdateReducers,
    productReviewCreate: productReviewCreateReducers,
    productsTopRated: productTopRatedReducers,
    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    usersList: userListReducers,
    userUpdate: userUpdateReducers,
    userDelete: userDeleteReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage},

}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store