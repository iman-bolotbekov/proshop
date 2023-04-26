import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import {Container} from "react-bootstrap"
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <main className='py-5'>
                <Container>
                    <Routes>
                        <Route path={`/`} element={<HomeScreen/>}/>
                        <Route path={`/cart/:id?`} element={<CartScreen/>}/>}

                        <Route path={`/product/:id`} element={<ProductScreen/>}/>
                        <Route path={`/admin/productlist/`} element={<ProductListScreen/>}/>
                        <Route path={`/admin/product/create`} element={<ProductCreateScreen/>}/>
                        <Route path={`/admin/product/:id/edit`} element={<ProductEditScreen/>}/>

                        <Route path={`/register`} element={<RegisterScreen/>}/>
                        <Route path={`/login`} element={<LoginScreen/>}/>}
                        <Route path={`/profile`} element={<ProfileScreen/>}/>
                        <Route path={`/admin/userlist`} element={<UserListScreen/>}/>
                        <Route path={`/admin/user/:id/edit`} element={<UserEditScreen/>}/>

                        <Route path={`/shipping`} element={<ShippingScreen/>}/>
                        <Route path={`/payment`} element={<PaymentScreen/>}/>
                        <Route path={`/place-order`} element={<PlaceOrder/>}/>

                        <Route path={`/order/:id`} element={<OrderScreen/>}/>
                        <Route path={`/admin/orderlist`} element={<OrderListScreen/>}/>
                    </Routes>
                </Container>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
