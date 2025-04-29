import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import SignUpPage from './pages/SignUpPage'
import {Navigate, Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import AddProductPage from './pages/AddProductPage'
import DashboardPage from './pages/DashboardPage'
import PrivateRoute from './Component/PrivateRoute'
import CartPage from './pages/CartPage'
import UserDashboardPage from './pages/UserDashboardPage'
import AdminPage from './pages/AdminPage'

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/logIn"/>} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/logIn" element={<LoginPage />} />
        <Route path="/emailverification" element={<PrivateRoute><EmailVerificationPage/></PrivateRoute>} />
        <Route path="/addproduct" element={<PrivateRoute><AddProductPage/></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />
        <Route path="/cartpage" element={<PrivateRoute><CartPage/></PrivateRoute>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserDashboardPage />} />

      </Routes>
  )
}

export default App
