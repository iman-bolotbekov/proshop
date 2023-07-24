import React, { lazy } from 'react'
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  HashRouter,
} from 'react-router-dom'
import RootLayout from './components/RootLayout'
const AdminUserEdit = lazy(() => import(`./pages/AdminUserEdit`))
const AdminProductEdit = lazy(() => import(`./pages/AdminProductEdit`))
const AdminProductCreate = lazy(() => import(`./pages/AdminProductCreate`))
const AdminOrder = lazy(() => import(`./pages/AdminOrder`))
const AdminUser = lazy(() => import(`./pages/AdminUser`))
const Profile = lazy(() => import(`./pages/Profile`))
const Admin = lazy(() => import(`./pages/Admin`))
const AdminProduct = lazy(() => import(`./pages/AdminProduct`))
const HomeScreen = lazy(() => import(`./pages/Home`))
const ProductDetail = lazy(() => import(`./pages/ProductDetail`))
const ShippingScreen = lazy(() => import(`./pages/Shipping`))
const SignIn = lazy(() => import(`./pages/SignIn`))
const SignUp = lazy(() => import(`./pages/SignUp`))
const Payment = lazy(() => import(`./pages/Payment`))
const PlaceOrder = lazy(() => import(`./pages/PlaceOrder`))
const ProtectedRoute = lazy(() => import(`./components/ProtectedRoute`))
const Order = lazy(() => import(`./pages/Order`))
const Cart = lazy(() => import(`./pages/Cart`))

const RoutesJSX = (
  <Route path="/" element={<RootLayout />}>
    <Route index element={<HomeScreen />} />
    <Route path="sign-in" element={<SignIn />} />
    <Route path="sign-up" element={<SignUp />} />
    <Route path="product/:productId" element={<ProductDetail />} />
    <Route path="cart" element={<Cart />} />
    <Route
      path="profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="admin"
      element={
        <ProtectedRoute isAdmin>
          <Admin />
        </ProtectedRoute>
      }
    />
    <Route
      path="admin/product"
      element={
        <ProtectedRoute isAdmin>
          <AdminProduct />
        </ProtectedRoute>
      }
    />
    <Route
      path="admin/product/create"
      element={
        <ProtectedRoute isAdmin>
          <AdminProductCreate />
        </ProtectedRoute>
      }
    />
    <Route
      path="admin/product/:productId/edit"
      element={
        <ProtectedRoute isAdmin>
          <AdminProductEdit />
        </ProtectedRoute>
      }
    />
    <Route
      path="admin/order"
      element={
        <ProtectedRoute isAdmin>
          <AdminOrder />
        </ProtectedRoute>
      }
    />
    <Route
      path="admin/user"
      element={
        <ProtectedRoute isAdmin>
          <AdminUser />
        </ProtectedRoute>
      }
    />
    <Route
      path="admin/user/:userId/edit"
      element={
        <ProtectedRoute isAdmin>
          <AdminUserEdit />
        </ProtectedRoute>
      }
    />
    <Route path="order/:orderId" element={<Order />} />
    <Route
      path="shipping"
      element={
        <ProtectedRoute>
          <ShippingScreen />
        </ProtectedRoute>
      }
    />
    <Route
      path="payment"
      element={
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      }
    />
    <Route
      path="place-order"
      element={
        <ProtectedRoute>
          <PlaceOrder />
        </ProtectedRoute>
      }
    />
  </Route>
)

const routes = createRoutesFromElements(RoutesJSX)
const router = createHashRouter(routes)

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App
