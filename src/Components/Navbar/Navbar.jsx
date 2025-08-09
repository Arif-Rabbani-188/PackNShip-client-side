import React, { useContext, useRef, useCallback } from "react";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { Authconext } from "../../Context/AuthContext/AuthContext";

// Utility: central place for primary navigation links.
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/catagories", label: "Categories" }, // keeping original route spelling
  { to: "/allProducts", label: "All Products" },
  { to: "/addProduct", label: "Add Product" },
  { to: "/myProducts", label: "My Products" },
];

const Navbar = () => {
  const { logOut, user, cartDatas } = useContext(Authconext);
  const drawerRef = useRef(null);

  const closeDrawer = useCallback(() => {
    if (drawerRef.current) drawerRef.current.checked = false;
  }, []);

  const handleLogout = useCallback(() => {
    closeDrawer();
    logOut();
  }, [closeDrawer, logOut]);

  const cartCount = user ? cartDatas?.length || 0 : 0;

  const avatar = user?.photoURL ? (
    <img
      className="w-[50px] h-[50px] object-cover rounded-full"
      src={user.photoURL}
      alt={user?.displayName || "User avatar"}
      referrerPolicy="no-referrer"
    />
  ) : (
    <FaRegUserCircle size={50} />
  );

  return (
    <header className="bg-gradient-to-r from-black/10 to-gray-300 shadow-md z-50 fixed top-0 left-0 w-full backdrop-blur-md">
      <div className="flex justify-between items-center p-4 text-white md:w-11/12 mx-auto">
        {/* Mobile Drawer */}
        <div className="flex gap-5 items-center">
          <div className="flex md:hidden" aria-label="Mobile navigation menu">
            <div className="drawer">
              <input id="navbar-drawer" type="checkbox" className="drawer-toggle" ref={drawerRef} />
              <div className="drawer-content">
                <label
                  htmlFor="navbar-drawer"
                  className="drawer-button inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/10 focus:outline-none focus-visible:ring"
                  aria-label="Open menu"
                >
                  <IoMenu size={30} />
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="navbar-drawer" aria-label="Close menu" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  <li className="mb-2">
                    <div className="flex flex-col items-center py-4 border-b mb-4 w-full">
                      {avatar}
                      <span className="font-semibold text-center text-lg mt-2">
                        {user?.displayName || "Guest"}
                      </span>
                      {user?.email && (
                        <span className="text-sm text-gray-500 break-all">{user.email}</span>
                      )}
                      {user && (
                        <Link
                          className="btn btn-primary btn-sm mt-3 w-full"
                          to="/profile"
                          onClick={closeDrawer}
                        >
                          View Profile
                        </Link>
                      )}
                    </div>
                  </li>
                  {NAV_LINKS.map(l => (
                    <li key={l.to}>
                      <NavLink to={l.to} onClick={closeDrawer}>
                        {l.label}
                      </NavLink>
                    </li>
                  ))}
                  <li className="mt-2">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="btn btn-primary btn-sm w-full"
                        type="button"
                      >
                        Logout
                      </button>
                    ) : (
                      <div className="flex flex-col items-start gap-2">
                        <NavLink to="/login" onClick={closeDrawer}>Login</NavLink>
                        <NavLink to="/register" onClick={closeDrawer}>Register</NavLink>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Branding */}
          <Link to="/" className="text-white font-bold text-2xl flex items-center gap-3" aria-label="PackNShip Home">
            <img
              className="w-10 h-10 rounded-xl hidden md:block object-cover"
              src="https://i.ibb.co/wFpwy1dq/Gemini-Generated-Image-blwhytblwhytblwh.png"
              alt="PackNShip Logo"
              loading="lazy"
            />
            PackNShip
          </Link>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex gap-5 font-bold">
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `transition-colors px-2 py-1 rounded-md hover:text-blue-300 ${
                      isActive ? "text-blue-500" : "text-white"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* Right Section */}
        <div className="flex items-center gap-6">
          <div className="indicator">
            {cartCount > 0 && (
              <span className="indicator-item badge badge-secondary" aria-label={`Cart items: ${cartCount}`}>
                {cartCount}
              </span>
            )}
            <Link to="/cart" aria-label="Cart" className="p-1 rounded-lg hover:bg-white/10 focus:outline-none focus-visible:ring">
              <FaShoppingCart color="black" size={30} />
            </Link>
          </div>
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/profile" aria-label="Profile" className="flex items-center">
                {avatar}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-primary rounded-4xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link className="btn btn-primary rounded-4xl" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline rounded-4xl text-blue-600" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
