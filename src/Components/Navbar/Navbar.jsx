import React, { use } from "react";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import { Authconext } from "../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const { logOut, user } = use(Authconext);
  // Reference for the drawer checkbox
  const drawerRef = React.useRef(null);
  console.log(user);

  // Function to close the drawer
  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
  };

  return (
    <div className="bg-gradient-to-r from-black/10 to-gray-300 shadow-md z-50 fixed top-0 left-0 w-full backdrop-blur-md">
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
                    <div className="flex flex-col items-center py-4 border-b mb-4">
                      {user ? (
                        <img
                          src={user?.photoURL}
                          alt="Profile"
                          className="w-16 h-16 rounded-full mb-2"
                        />
                      ) : (
                        <FaRegUserCircle size={64} />
                      )}
                      <span className="font-semibold text-center text-lg">
                        {user?.displayName || "No User"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {user?.email}
                      </span>
                      {user ? (
                        <Link
                          className="btn btn-primary btn-sm mt-3 w-full"
                          to="/profile"
                          onClick={closeDrawer}
                        >
                          View Profile
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                  <li>
                    <NavLink to="/" onClick={closeDrawer}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/catagories" onClick={closeDrawer}>
                      Catagories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/allProducts" onClick={closeDrawer}>
                      All Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/addProduct" onClick={closeDrawer}>
                      Add Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/myProducts" onClick={closeDrawer}>
                      My Products
                    </NavLink>
                  </li>
                  <li>
                    {user ? (
                      <NavLink
                      className={"btn btn-primary btn-sm w-full"}
                        onClick={() => {
                          closeDrawer();
                          logOut();
                        }}
                      >
                        LogOut
                      </NavLink>
                    ) : (
                      <div className="flex flex-col items-start gap-2">
                        <NavLink
                          to="/login"
                          onClick={() => {
                            closeDrawer();
                          }}
                        >
                          Login
                        </NavLink>
                        <NavLink
                          to="/register"
                          onClick={() => {
                            closeDrawer();
                          }}
                        >
                          Register
                        </NavLink>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h1 className="text-white font-bold text-2xl flex items-center gap-3">
            {" "}
            <img
              className="w-10 rounded-xl hidden md:block"
              src="https://i.ibb.co/wFpwy1dq/Gemini-Generated-Image-blwhytblwhytblwh.png"
              alt=""
            />
            PackNShip
          </h1>
        </div>
        <div>
          <ul className="hidden md:flex gap-5 font-bold">
            <li>
              <NavLink to="/" onClick={closeDrawer}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catagories" onClick={closeDrawer}>
                Catagories
              </NavLink>
            </li>
            <li>
              <NavLink to="/allProducts" onClick={closeDrawer}>
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/addProduct" onClick={closeDrawer}>
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/myProducts" onClick={closeDrawer}>
                My Products
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-5">
            <Link>
              <FaShoppingCart color="black" size={30} />
            </Link>
            {user ? (
              <div className="md:flex gap-5 items-center hidden">
                <Link to="/profile">
                <img
                  className="w-[50px] rounded-full"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
                </Link>
                <Link className="btn btn-primary rounded-4xl" onClick={logOut}>
                  Log out
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex gap-2 md:gap-5">
                <Link className="btn btn-primary rounded-4xl" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary rounded-4xl" to="/register">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
