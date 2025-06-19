import { useEffect, useState, useContext } from "react";
import { Authconext } from "../../Context/AuthContext/AuthContext";

const MyProducts = () => {
    const { user } = useContext(Authconext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => {
                const userProducts = data.filter(
                    (product) => product.email === user?.email
                );
                setProducts(userProducts);
            })
            .catch((error) => console.error("Error fetching products:", error))
            .finally(() => setLoading(false));
    }, [user?.email]);

        if (loading)
            return (
                <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
                    <span className="text-2xl font-bold animate-pulse text-blue-700">
                        Loading...
                    </span>
                </div>
            );
    
        return (
            <div className="py-20 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-blue-100">
                    <h2 className="text-4xl font-extrabold mb-8 text-blue-800 text-center tracking-tight drop-shadow">
                        My Products
                    </h2>
                    {products.length === 0 ? (
                        <p className="text-gray-500 text-center text-lg">
                            No products found for your account.
                        </p>
                    ) : (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {products.map((product) => (
                                <li
                                    key={product._id || product.id}
                                    className="border border-blue-100 rounded-xl p-6 shadow-md bg-white hover:shadow-xl transition-all duration-200 flex flex-col gap-2"
                                >
                                    <h3 className="text-2xl font-semibold text-blue-700 mb-1">
                                        {product.name}
                                    </h3>
                                    {product.description && (
                                        <p className="text-gray-600 mb-1">
                                            {product.description}
                                        </p>
                                    )}
                                    {product.price && (
                                        <span className="inline-block bg-blue-200 text-blue-900 px-4 py-1 rounded-full text-base font-semibold mt-auto self-start">
                                            ${product.price}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    };
    
    export default MyProducts;
