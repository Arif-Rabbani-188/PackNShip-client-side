import { useEffect, useState, useContext } from "react";
import { Authconext } from "../../Context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const MyProducts = () => {
  const { user } = useContext(Authconext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://pick-ns-hiip-serversite.vercel.app/myProducts?email=${user?.email}`
      )
      .then((response) => {
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [user?.email]);

  const handleDelete = async (id) => {
    console.log("Deleting product with ID:", id);

    axios.delete(`https://pick-ns-hiip-serversite.vercel.app/products/${id}`)
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <span className="text-2xl font-bold animate-pulse text-blue-700">
          Loading...
        </span>
      </div>
    );

  return (
    <div className="py-20 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white/90 shadow-2xl rounded-3xl p-14 border border-blue-100 backdrop-blur-md">
        <h2 className="text-5xl font-extrabold mb-12 text-blue-800 text-center tracking-tight drop-shadow-lg">
          <span className="inline-block bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent">
            My Products
          </span>
        </h2>
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <svg
              className="w-20 h-20 text-blue-200 mb-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
            </svg>
            <p className="text-gray-500 text-center text-2xl font-semibold">
              No products found for your account.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white border border-blue-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex flex-col overflow-hidden group"
              >
                {product.image && (
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 bg-blue-500/90 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {product.category || "Product"}
                    </span>
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-blue-900 transition">
                    {product.name}
                  </h3>
                  {product.short_description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {product.short_description}
                    </p>
                  )}
                  <div className="mb-3 space-y-1">
                    {product.brand_name && (
                      <div className="text-sm text-blue-500 font-medium">
                        <span className="font-semibold">Brand:</span>{" "}
                        {product.brand_name}
                      </div>
                    )}
                    {product.main_quantity !== undefined && (
                      <div className="text-sm text-green-600">
                        <span className="font-semibold">Stock:</span>{" "}
                        {product.main_quantity}
                      </div>
                    )}
                  </div>
                  {product.price && (
                    <span className="inline-block  text-blue-900 py-1 text-lg font-semibold">
                      {product.price} Taka
                    </span>
                  )}
                  <div className="mt-7 flex gap-4">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-base font-semibold shadow transition"
                      onClick={() => {
                        window.location.href = `/edit/${product._id}`;
                      }}
                    >
                      Edit
                    </button>
                    <Link
                      to={`/allProducts/${product._id}`}
                      className="bg-white border border-blue-400 hover:bg-blue-50 text-blue-700 px-6 py-2 rounded-lg text-base font-semibold shadow transition"
                    >
                      Details
                    </Link>
                      {/* <button
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-base font-semibold shadow transition"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
