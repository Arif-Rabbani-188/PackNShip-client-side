import Swal from "sweetalert2";

const Cart = () => {
  // Get cart data from localStorage
  const cartData = JSON.parse(localStorage.getItem("product")) || [];

  // Function to remove item from cart
  const handleRemove = (indexToRemove) => {
    const updatedCart = cartData.filter((_, idx) => idx !== indexToRemove);
    localStorage.setItem("product", JSON.stringify(updatedCart));
    window.location.reload(); // Simple way to re-render after removal
  };

  // Calculate total price
  const totalPrice = cartData.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black drop-shadow">
          Your Shopping Cart
        </h2>
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <svg
              className="w-24 h-24 text-gray-300 mb-4"
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
            <p className="text-lg text-black">Your cart is empty.</p>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-black font-semibold">
                      Image
                    </th>
                    <th className="px-4 py-3 text-left text-black font-semibold">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-black font-semibold">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-black font-semibold">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-black font-semibold">
                      Subtotal
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="px-4 py-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name || "Product"}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-100 shadow"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3 text-black">
                        {item.name || "Product Name"}
                      </td>
                      <td className="px-4 py-3 text-black">
                        {item.price || "N/A"} Taka
                      </td>
                      <td className="px-4 py-3 text-black flex items-center gap-2">
                        <button
                          className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                          disabled={item.quantity <= 1}
                          onClick={() => {
                            if (item.quantity > item.minimum_selling_quantity) {
                              const updatedCart = [...cartData];
                              updatedCart[index].quantity =
                                (updatedCart[index].quantity || 1) - 1;
                              localStorage.setItem(
                                "product",
                                JSON.stringify(updatedCart)
                              );
                              window.location.reload();
                            }
                          }}
                        >
                          -
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                          className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                          onClick={() => {
                            const updatedCart = [...cartData];
                            updatedCart[index].quantity =
                              (updatedCart[index].quantity || 1) + 1;
                            localStorage.setItem(
                              "product",
                              JSON.stringify(updatedCart)
                            );
                            window.location.reload();
                          }}
                        >
                          +
                        </button>
                      </td>
                      <td className="px-4 py-3 font-semibold text-black">
                        {((item.price || 0) * (item.quantity || 1)).toFixed(0)}{" "}
                        Taka
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg shadow transition-colors duration-200"
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
                      colSpan="4"
                      className="px-4 py-3 text-right font-bold text-lg text-black"
                    >
                      Total:
                    </td>
                    <td className="px-4 py-3 font-bold text-lg text-black">
                      {totalPrice.toFixed(0)} Taka
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex justify-end mt-8">
              <button
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-200 text-lg flex items-center gap-2"
                onClick={() => {
                  Swal.fire({
                    title: "Checkout Successful",
                    icon: "success",
                    draggable: true,
                  }).then(() => {
                    localStorage.removeItem("product");
                    window.location.href = "/cart"; // Redirect to products page
                  });
                }}
              >
                <svg
                  className="w-6 h-6"
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
