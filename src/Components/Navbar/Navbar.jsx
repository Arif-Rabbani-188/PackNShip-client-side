import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="flex justify-between items-center p-4 text-black md:w-11/12 mx-auto">
        <div className="flex gap-5 items-center">
          <div className="flex md:hidden">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="drawer-button">
                  <IoMenu size={30} />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Catagories</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">All Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Add Product</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">My Products</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h1 className="text-blue-500 font-bold text-2xl">PackNShip</h1>
        </div>
        <div>
          <ul className="hidden md:flex gap-5 font-bold">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/">Catagories</NavLink>
            </li>
            <li>
              <NavLink to="/">All Products</NavLink>
            </li>
            <li>
              <NavLink to="/">Add Product</NavLink>
            </li>
            <li>
              <NavLink to="/">My Products</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-5">
          <div className="flex gap-5 items-center hidden">
            <Link>
              <FaShoppingCart size={30} />
            </Link>
            <Link className="btn">Log out</Link>
          </div>
          <div className="flex gap-2 md:gap-5">
            <Link className="btn">Login</Link>
            <Link className="btn">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
