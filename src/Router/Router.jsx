import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '../Pages/Root/Root.jsx';
import Home from '../Pages/Home/Home.jsx';
import Login from '../Pages/Login/Login.jsx';
import Register from '../Pages/Register/Register.jsx';
import Profile from '../Pages/Profile/Profile.jsx';
import AddProduct from '../Pages/AddProduct/AddProduct.jsx';
import AllProducts from '../Pages/AllProducts/AllProducts.jsx';
import Catagories from '../Pages/Catagories/Catagories.jsx';
import Catagory from '../Pages/Catagories/Catagory.jsx';
import MyProducts from '../Pages/MyProducts/MyProducts.jsx';
import Detail from '../Pages/DetailPage/Detail.jsx';
import Cart from '../Pages/Cart/Cart.jsx';
import Edit from '../Pages/Edit/Edit.jsx';
import Error from '../Components/Error/Error.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <PrivateRoute><Profile /></PrivateRoute> },
      { path: 'cart', element: <PrivateRoute><Cart /></PrivateRoute> },
      { path: 'addProduct', element: <PrivateRoute><AddProduct /></PrivateRoute> },
      { path: 'edit/:id', element: <Edit /> },
      { path: 'allProducts', element: <PrivateRoute><AllProducts /></PrivateRoute> },
      { path: 'allProducts/:id', element: <PrivateRoute><Detail /></PrivateRoute> },
      { path: 'catagories', element: <Catagories /> },
      { path: 'catagories/:catagory', element: <PrivateRoute><Catagory /></PrivateRoute> },
      { path: 'myProducts', element: <PrivateRoute><MyProducts /></PrivateRoute> },
    ]
  }
]);

const AppRouter = () => <RouterProvider router={appRouter} />;

export default AppRouter;
