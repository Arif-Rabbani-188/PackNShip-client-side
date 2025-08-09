import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Authconext } from "../../Context/AuthContext/AuthContext";

const Cart = () => {
  const { user, setUser, cartDatas, setCartDatas, refreshUser } = useContext(Authconext);
  const cartData = cartDatas || [];

  const [localCart, setLocalCart] = useState(cartData);
  const [editIndex, setEditIndex] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);

  useEffect(() => {
    setLocalCart(cartData);
  }, [cartDatas]);

  // On mount (and when user changes) ensure we have latest server cart
  useEffect(() => {
    if (user?.email) {
      refreshUser(user.email);
    }
  }, [user?.email]);

  const handleRemove = (indexToRemove) => {
    Swal.fire({
      title: `Are you sure you want to remove this item?`,
      showCancelButton: true,
      confirmButtonText: "Remove",
      icon: "warning",
    }).then((result) => {
      if (!result.isConfirmed) return;
      const updatedCart = (cartDatas || []).filter((_, idx) => idx !== indexToRemove);
      // Optimistically update UI
      setLocalCart(updatedCart);
      setCartDatas(updatedCart);
      setUser((prev) => ({ ...prev, cart: updatedCart }));
      axios
        .patch(
          `https://pick-ns-hiip-serversite.vercel.app/users/${user._id}`,
          { cart: updatedCart }
        )
        .then(() => {
          Swal.fire({
            title: "Removed",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
          refreshUser(user.email);
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to update cart. Restoring previous state.",
            icon: "error",
            draggable: false,
          });
          // Rollback
          setLocalCart(cartDatas || []);
          setCartDatas(cartDatas || []);
        });
    });
  };

  const handleEdit = (index, quantity) => {
    setEditIndex(index);
    setEditQuantity(quantity || 1);
  };

  const handleSaveQuantity = (index) => {
    const updatedCart = [...cartData];
    updatedCart[index].quantity = Number(editQuantity);
    axios
      .patch(`https://pick-ns-hiip-serversite.vercel.app/users/${user._id}`, {
        cart: updatedCart,
      })
      .then(() => {
        setUser((prev) => ({ ...prev, cart: updatedCart }));
        setCartDatas(updatedCart);
        refreshUser(user.email);
      })
      .catch(() => {
        // revert edit if server fails
        setLocalCart(cartData);
      });
    setEditIndex(null);
    setEditQuantity(1);
  };

  const totalPrice = cartData.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleCeckout = () => {
    if (cartData.length === 0) {
      Swal.fire({
        title: "Your cart is empty",
        text: "Please add items to your cart before checking out.",
        icon: "info",
        draggable: false,
      });
      return;
    }

    Swal.fire({
      title: "Confirm Checkout",
      text: "Are you sure you want to proceed with the checkout?",
      showCancelButton: true,
      confirmButtonText: "Checkout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://pick-ns-hiip-serversite.vercel.app/users/${user._id}`, { cart: [] })
          .then(() => {
            setCartDatas([]);
            refreshUser(user.email);
            Swal.fire({
              title: "Checkout Successful",
              text: "Thank you for your purchase!",
              icon: "success",
              draggable: false,
            });
          })
          .catch((error) => {
            console.error("Error during checkout:", error);
            Swal.fire({
              title: "Checkout Failed",
              text: "Please try again later.",
              icon: "error",
              draggable: false,
            });
          });
      }
    });
  }

  console.log(user);

  return (
    <div className="min-h-screen w-full py-20 sm:py-24 bg-gradient-to-br from-blue-50 to-purple-100 px-0 sm:px-0">
      <div className="w-full mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-black drop-shadow">
          Your Shopping Cart
        </h2>
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16 sm:mt-20">
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-9h2a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2h2"
              />
            </svg>
            <p className="text-base sm:text-lg text-black">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="w-11/12 mx-auto">
            {/* Desktop Table */}
            <div className="hidden sm:block rounded-lg overflow-x-auto">
              <table className="min-w-[900px] w-full bg-white rounded-xl shadow-lg text-sm sm:text-base">
                <thead>
                  <tr>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Image
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Name
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Category
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Brand
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Description
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Buying Date (MM/DD/YYYY)
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Min. Qty
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Price
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Quantity
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold">
                      Subtotal
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-b-0 hover:bg-purple-50 transition"
                    >
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name || "Product"}
                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-100 shadow"
                          />
                        )}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-black font-semibold">
                        {item.name || "Product Name"}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-black">
                        {item.category || "-"}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-black">
                        {item.brand_name || "-"}
                      </td>
                      <td
                        className="px-2 sm:px-4 py-2 sm:py-3 text-black max-w-xs truncate"
                        title={item.short_description}
                      >
                        {item.short_description || "-"}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-black">
                        {item.buying_date
                          ? new Date(item.buying_date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-black">
                        {item.minimum_selling_quantity || 1}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-black">
                        {item.price || "N/A"} Taka
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-black flex items-center gap-2">
                        {editIndex === index ? (
                          <>
                            <input
                              type="number"
                              min={item.minimum_selling_quantity || 1}
                              value={editQuantity}
                              onChange={(e) => setEditQuantity(e.target.value)}
                              className="w-16 px-2 py-1 border rounded"
                            />
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                              onClick={() => handleSaveQuantity(index)}
                            >
                              Save
                            </button>
                            <button
                              className="bg-gray-300 text-black px-2 py-1 rounded ml-1"
                              onClick={() => setEditIndex(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <span>{item.quantity || 1}</span>
                            <button
                              className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                              onClick={() => handleEdit(index, item.quantity)}
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-black">
                        {((item.price || 0) * (item.quantity || 1)).toFixed(0)}{" "}
                        Taka
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded-lg shadow transition-colors duration-200 text-xs sm:text-base"
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan="9"
                      className="px-2 sm:px-4 py-2 sm:py-3 text-right font-bold text-base sm:text-lg text-black"
                    >
                      Total:
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 font-bold text-base sm:text-lg text-black">
                      {totalPrice.toFixed(0)} Taka
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="sm:hidden flex flex-col gap-4">
              {cartData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-2 border border-purple-100 hover:shadow-2xl transition"
                >
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name || "Product"}
                        className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow"
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-bold text-black text-lg mb-1">
                        {item.name || "Product Name"}
                      </div>
                      <div className="text-xs text-purple-700 font-semibold mb-1">
                        {item.category || "-"}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        Brand:{" "}
                        <span className="font-medium">
                          {item.brand_name || "-"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        Buying Date:{" "}
                        <span className="font-medium">
                          {item.buying_date
                            ? new Date(item.buying_date).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        Min. Qty:{" "}
                        <span className="font-medium">
                          {item.minimum_selling_quantity || 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mt-2 mb-1">
                    {item.short_description || "-"}
                  </div>
                  <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-black text-sm font-semibold">
                        Price:
                      </span>
                      <span className="text-purple-700 font-bold">
                        {item.price || "N/A"} Taka
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-black text-sm font-semibold">
                        Quantity:
                      </span>
                      {editIndex === index ? (
                        <>
                          <input
                            type="number"
                            min={item.minimum_selling_quantity || 1}
                            value={editQuantity}
                            onChange={(e) => setEditQuantity(e.target.value)}
                            className="w-16 px-2 py-1 border rounded"
                          />
                          <button
                            className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                            onClick={() => handleSaveQuantity(index)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-300 text-black px-2 py-1 rounded ml-1"
                            onClick={() => setEditIndex(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-black">
                            {item.quantity || 1}
                          </span>
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                            onClick={() => handleEdit(index, item.quantity)}
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-black font-bold text-base">
                      Subtotal:{" "}
                      <span className="text-purple-700">
                        {((item.price || 0) * (item.quantity || 1)).toFixed(0)}{" "}
                        Taka
                      </span>
                    </div>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow transition-colors duration-200 text-xs"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {/* Total for mobile */}
              <div className="bg-white rounded-xl shadow-lg p-4 flex justify-between items-center font-bold text-black text-base mt-2">
                <span>Total:</span>
                <span>{totalPrice.toFixed(0)} Taka</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end mt-6 sm:mt-8 gap-4 sm:gap-0">
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-xl shadow-lg transition-all duration-200 text-base sm:text-lg flex items-center justify-center gap-2"
                onClick={() => handleCeckout()}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-9h2a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2h2"
                  />
                </svg>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
