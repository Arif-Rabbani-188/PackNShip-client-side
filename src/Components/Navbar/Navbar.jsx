import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  // Reference for the drawer checkbox
  const drawerRef = React.useRef(null);

  // Function to close the drawer
  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
  };

  return (
    <div className="bg-gradient-to-r from-black/10 to-gray-300 shadow-md z-50 relative">
      <div className="flex justify-between items-center p-4 text-white md:w-11/12 mx-auto">
        <div className="flex gap-5 items-center">
          <div className="flex md:hidden">
            <div className="drawer">
              <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                ref={drawerRef}
              />
              <div className="drawer-content">
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
                  <li>
                    <NavLink to="/" onClick={closeDrawer}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/" onClick={closeDrawer}>Catagories</NavLink>
                  </li>
                  <li>
                    <NavLink to="/" onClick={closeDrawer}>All Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/" onClick={closeDrawer}>Add Product</NavLink>
                  </li>
                  <li>
                    <NavLink to="/" onClick={closeDrawer}>My Products</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h1 className="text-white font-bold text-2xl flex items-center gap-3"> <img className="w-10 rounded-xl hidden md:block" src="https://i.ibb.co/wFpwy1dq/Gemini-Generated-Image-blwhytblwhytblwh.png" alt="" />PackNShip</h1>
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
            <Link className="btn btn-primary rounded-4xl">Log out</Link>
          </div>
          <div className="flex gap-2 md:gap-5">
            <Link className="btn btn-primary rounded-4xl">Login</Link>
            <Link className="btn btn-primary rounded-4xl">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
