"use client";
import { createOrder } from "@/helpers/orders.helper";
import IProduct from "@/interfaces/Product";
import { userSession } from "@/interfaces/Session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
  const router = useRouter();
  const [userSession, setUserSession] = useState<userSession>();
  const [cart, setCart] = useState<IProduct[]>([]);
  const [totalCart, setTotalCart] = useState<number>(0);

  useEffect(() => {
    const userSessionLocal = localStorage.getItem("userSession");
    setUserSession(JSON.parse(userSessionLocal!));
  }, []);

  useEffect(() => {
    const cartProducts: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cartProducts) {
      let totalCart = 0;
      cartProducts.forEach((item: IProduct) => {
        totalCart += item.price;
      });
      setTotalCart(totalCart);
      setCart(cartProducts);
    }
  }, []);

  useEffect(() => {
    if (!userSession?.userData.name) {
      router.push("/login");
    }
  }, [userSession?.userData]);

  const handleClick = async () => {
    const idProducts = cart.map((product) => product.id);
    await createOrder(idProducts, userSession?.token!);
    alert("Buy successfully");
    setCart([]);
    setTotalCart(0);
    localStorage.setItem("cart", "[]");
    router.push("/dashboard/orders");
  };

  const handleMore = () => {
    router.push("/");
  };

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    const newTotalCart = updatedCart.reduce((total, item) => total + item.price, 0);
    setTotalCart(newTotalCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="p-4 max-w-lg mx-auto border border-gray-300 rounded-lg shadow-lg space-y-4">
      {/* Sección de Productos en el Carrito */}
      {cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((item: IProduct) => (
            <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white">You don’t have any products in your cart</p>
        </div>
      )}

      {/* Sección de Total y Botones */}
      <div className="flex flex-col items-center space-y-4">
        <p className="bg-gray-500 text-white border border-black rounded-lg p-2 w-full text-center">
          Total: ${totalCart.toFixed(2)}
        </p>

        <div className="flex space-x-4 w-full justify-center">
          <button
            onClick={handleClick}
            className="bg-cyan-800 text-white rounded-lg py-2 px-4 flex-1 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
          >
            Checkout
          </button>
          <button
            onClick={handleMore}
            className="bg-cyan-800 text-white rounded-lg py-2 px-4 flex-1 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
          >
            Buy More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
