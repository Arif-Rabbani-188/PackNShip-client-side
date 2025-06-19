import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Pages/Root/Root.jsx'
import Home from './Pages/Home/Home.jsx'
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'
import Error from './Components/Error/Error.jsx'
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import AddProduct from './Pages/AddProduct/AddProduct.jsx'
import AllProducts from './Pages/AllProducts/AllProducts.jsx'
import Catagories from './Pages/Catagories/Catagories.jsx'
import Catagory from './Pages/Catagories/Catagory.jsx'
import MyProducts from './Pages/MyProducts/MyProducts.jsx'
import Detail from './Pages/DetailPage/Detail.jsx'
import Cart from './Pages/Cart/Cart.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children:[
      {index: true, element: <Home></Home>},
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "profile",
        element: <Profile></Profile>
      },
      {
        path: 'cart',
        element:<Cart></Cart>
      }
      ,{
          path: "addProduct",
          element: <AddProduct></AddProduct>
      },
      {
        path: "allProducts",
        element: <AllProducts></AllProducts>
      },
      {
        path: "allProducts/:id",
        element: <Detail></Detail>
      },
      {
        path: "catagories",
        element: <Catagories></Catagories>
      },
      {
        path: "catagories/:catagory",
        element: <Catagory />,
      },
      {
        path: "myProducts",
        element: <MyProducts></MyProducts>
      },
      {
        path: '*',
        element: <Error></Error>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
