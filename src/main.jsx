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
      }
      ,
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
