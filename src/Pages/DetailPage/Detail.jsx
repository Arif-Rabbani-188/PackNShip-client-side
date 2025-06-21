import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { Authconext } from "../../Context/AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const Detail = () => {
  const { user, cartDatas, setCartDatas } = useContext(Authconext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pick-ns-hiip-serversite.vercel.app/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setQuantity(parseInt(response.data.minimum_selling_quantity) || 1);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product) {
      Swal.fire({
      title: "Error",
      text: "Product information is not available.",
      icon: "error",
      draggable: false,
      });
      return;
    }

    // Check if product already exists in cart
    const existingIndex = cartDatas.findIndex(item => item._id === product._id);
    let updatedProduct;
    if (existingIndex !== -1) {
      // Update quantity if exists
      updatedProduct = cartDatas.map((item, idx) =>
      idx === existingIndex
        ? { ...item, quantity: item.quantity + quantity, buying_date: new Date() }
        : item
      );
    } else {
      // Add new product
      updatedProduct = [...cartDatas, { ...product, quantity: quantity, buying_date: new Date() }];
    }
    setCartDatas(updatedProduct);

    axios.patch(
      `https://pick-ns-hiip-serversite.vercel.app/users/${user._id}`,
      { cart: updatedProduct }
    )

    axios.patch(
      `https://pick-ns-hiip-serversite.vercel.app/products/${id}`,
      {
        ...product,
        main_quantity: product.main_quantity - quantity,
      }
    )
    .then((response) => {
      console.log("Cart updated successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error updating cart:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update cart. Please try again.",
        icon: "error",
        draggable: false,
      });
    });

    Swal.fire({
      title: "Purchase Confirmed",
      icon: "success",
      draggable: false,
    }).then(() => {
      setShowModal(false);
      navigate("/cart");
    });
  };

  const handleBuy = (e) => {
    e.preventDefault();
    setShowModal(false);
    // Optionally show a success message or redirect
  };

  return (
    <div className="py-24 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen justify-center items-center">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden items-center flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-12">
          {product?.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg shadow-md w-96 h-96 object-cover"
            />
          ) : (
            <div className="w-96 h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-3xl">
              No Image
            </div>
          )}
        </div>
        {/* Product Details */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Category: {product?.category || "Product Name"}
                </h2>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {product?.name || "Product Name"}
                </h2>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Brand: {product?.brand_name || "Product Name"}
                </h2>
                <p className="text-gray-600 mb-4">
                  Description: {product?.short_description||
                "Description of the product goes here. Include details such as features, price, and availability."}
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-gray-600 mr-2">Rating:</span>
                  {product?.rating ? (
                <span className="flex items-center">
                  {[1,2,3,4,5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                  product.rating >= star
                    ? "text-yellow-400"
                    : product.rating >= star - 0.5
                    ? "text-yellow-300"
                    : "text-gray-300"
                    }`}
                    fill={product.rating >= star ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <polygon
                  points="10 15 4 18 5.5 11.5 1 7.5 7 7 10 1 13 7 19 7.5 14.5 11.5 16 18"
                    />
                  </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-700 font-medium">{parseInt(product.rating).toFixed(1)}</span>
                </span>
                  ) : (
                <span className="text-gray-400">N/A</span>
                  )}
                </div>
                <div className="flex items-center space-x-6 mb-4">
                  <span className="text-xl font-semibold text-purple-700">
                {product?.price || "N/A"} Taka
                  </span>
                  <span className="text-sm text-gray-500">
                <strong></strong>Stock: {product?.main_quantity || "Stock Out"}
                  </span>
                </div>
                </div>
                <button
                onClick={() => setShowModal(true)}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow hover:from-purple-600 hover:to-blue-600 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!product?.main_quantity || product.main_quantity === 0 || product.email === user.email}
                >
                Buy Now
                </button>
              </div>
                </div>

                {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl min-w-[340px] max-w-sm w-full relative shadow-2xl border border-purple-100">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-purple-600 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-6 text-purple-700 text-center">
              Buy Product
            </h3>
            <form onSubmit={handleBuy} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full border text-black border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full border text-black border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none"
                />
              </div>
              <div className="flex text-black items-center space-x-3">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(product.minimum_selling_quantity, q - 1)
                    )
                  }
                  className="px-3 text-black py-1 bg-gray-200 rounded hover:bg-purple-200 text-lg font-bold"
                >
                  -
                </button>
                <span className="mx-2 text-lg font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.main_quantity, q + 1))}
                  className="px-3 py-1 text-black bg-gray-200 rounded hover:bg-purple-200 text-lg font-bold"
                >
                  +
                </button>
              </div>
              <button
              onClick={handleSubmit}
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition"
              >
                Confirm Purchase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
