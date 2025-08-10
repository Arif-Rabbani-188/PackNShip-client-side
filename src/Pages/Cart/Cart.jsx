import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Authconext } from "../../Context/AuthContext/AuthContext";

const API_BASE = "https://pick-ns-hiip-serversite.vercel.app/users";

const Cart = () => {
  const { user, setUser, cartDatas, setCartDatas, refreshUser } = useContext(Authconext);
  const cartData = cartDatas || [];

  const [localCart, setLocalCart] = useState(cartData);
  const [editIndex, setEditIndex] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [loadingCart, setLoadingCart] = useState(true);
  const [mutating, setMutating] = useState(false);

  // Sync local mirror when context cart changes
  useEffect(() => {
    setLocalCart(cartData);
  }, [cartDatas]);

  // Initial load / re-load on user change
  useEffect(() => {
    const load = async () => {
      if (!user?._id) {
        setLoadingCart(false);
        return;
      }
      setLoadingCart(true);
      try {
        // Prefer dedicated endpoint by id to guarantee latest
        const res = await axios.get(`${API_BASE}/${user._id}`);
        // Server may return full user doc (with cart)
        if (res.data) {
          const dbUser = res.data;
          const serverCart = Array.isArray(dbUser.cart) ? dbUser.cart : [];
            setCartDatas(serverCart);
          setUser((prev) => prev ? { ...prev, ...dbUser, cart: serverCart } : dbUser);
          setLocalCart(serverCart);
        }
      } catch (e) {
        console.error("Failed to load cart:", e);
      } finally {
        setLoadingCart(false);
      }
    };
    load();
  }, [user?._id, setCartDatas, setUser]);

  const patchCart = async (nextCart, successTitle) => {
    if (!user?._id) return;
    setMutating(true);
    try {
      const res = await axios.patch(`${API_BASE}/${user._id}`, {
        cart: nextCart,
        email: user.email, // helps backend email consistency check
      });
      if (res.data?.ok || res.status === 200) {
        const updatedCart = res.data.cart ?? nextCart;
        setCartDatas(updatedCart);
        setLocalCart(updatedCart);
        setUser((prev) => prev ? { ...prev, cart: updatedCart } : prev);
        if (successTitle) {
          Swal.fire({
            title: successTitle,
            icon: "success",
            timer: 1100,
            showConfirmButton: false,
          });
        }
        refreshUser(user.email);
      } else {
        throw new Error(res.data?.message || "Unknown server response");
      }
    } catch (e) {
      console.error("Cart patch error:", e);
      Swal.fire({
        title: "Error",
        text: e?.response?.data?.message || e.message || "Failed to update cart",
        icon: "error",
      });
    } finally {
      setMutating(false);
    }
  };

  const handleRemove = (indexToRemove) => {
    Swal.fire({
      title: "Remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then((r) => {
      if (!r.isConfirmed) return;
      const updatedCart = (cartDatas || []).filter((_, idx) => idx !== indexToRemove);
      // optimistic
      setLocalCart(updatedCart);
      patchCart(updatedCart, "Removed");
    });
  };

  const handleEdit = (index, quantity) => {
    setEditIndex(index);
    setEditQuantity(quantity || 1);
  };

  const handleSaveQuantity = (index) => {
    const updated = [...localCart];
    updated[index] = { ...updated[index], quantity: Number(editQuantity) };
    setEditIndex(null);
    setEditQuantity(1);
    patchCart(updated, "Updated");
  };

  const handleCheckout = () => {
    if (!cartData.length) {
      Swal.fire({
        title: "Cart empty",
        icon: "info",
        timer: 1200,
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire({
      title: "Proceed to checkout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Checkout",
    }).then((r) => {
      if (!r.isConfirmed) return;
      patchCart([], "Checkout successful");
    });
  };

  const totalPrice = cartData.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Inline component loader (not full-screen)
  if (loadingCart) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full border-4 border-purple-400 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-600 font-medium">Loading cart items...</p>
          <div className="w-72 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-600">
        Please log in to view your cart.
      </div>
    );
  }

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
                    {[
                      "Image",
                      "Name",
                      "Category",
                      "Brand",
                      "Description",
                      "Buying Date (MM/DD/YYYY)",
                      "Min. Qty",
                      "Price",
                      "Quantity",
                      "Subtotal",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-2 sm:px-4 py-2 sm:py-3 text-left text-black font-semibold"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {localCart.map((item, index) => (
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
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-black">
                        {editIndex === index ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={item.minimum_selling_quantity || 1}
                              value={editQuantity}
                              onChange={(e) => setEditQuantity(e.target.value)}
                              className="w-16 px-2 py-1 border rounded"
                            />
                            <button
                              disabled={mutating}
                              className="bg-green-500 text-white px-2 py-1 rounded"
                              onClick={() => handleSaveQuantity(index)}
                            >
                              Save
                            </button>
                            <button
                              disabled={mutating}
                              className="bg-gray-300 text-black px-2 py-1 rounded"
                              onClick={() => setEditIndex(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>{item.quantity || 1}</span>
                            <button
                              disabled={mutating}
                              className="bg-blue-500 text-white px-2 py-1 rounded"
                              onClick={() => handleEdit(index, item.quantity)}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-black">
                        {((item.price || 0) * (item.quantity || 1)).toFixed(0)}{" "}
                        Taka
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <button
                          disabled={mutating}
                          className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-2 sm:px-3 py-1 rounded-lg shadow transition-colors duration-200 text-xs sm:text-base"
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
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden flex flex-col gap-4">
              {localCart.map((item, index) => (
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
                        Qty:
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
                            disabled={mutating}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                            onClick={() => handleSaveQuantity(index)}
                          >
                            Save
                          </button>
                          <button
                            disabled={mutating}
                            className="bg-gray-300 text-black px-2 py-1 rounded"
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
                            disabled={mutating}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
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
                      disabled={mutating}
                      className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-4 py-1 rounded-lg shadow transition-colors duration-200 text-xs"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Total (mobile) */}
              <div className="bg-white rounded-xl shadow-lg p-4 flex justify-between items-center font-bold text-black text-base mt-2">
                <span>Total:</span>
                <span>{totalPrice.toFixed(0)} Taka</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end mt-6 sm:mt-8 gap-4 sm:gap-0">
              <button
                disabled={!cartData.length || mutating}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 disabled:opacity-50 text-white font-bold py-3 px-6 sm:px-8 rounded-xl shadow-lg transition-all duration-200 text-base sm:text-lg flex items-center justify-center gap-2"
                onClick={handleCheckout}
              >
                {mutating ? "Processing..." : (
                  <>
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
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
