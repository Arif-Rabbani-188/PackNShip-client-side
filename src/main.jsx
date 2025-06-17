import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Pages/Root/Root.jsx'
import Home from './Pages/Home/Home.jsx'
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children:[
      {index: true, element: <Home></Home>}
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
