// ProductDetail.tsx
"use client";
import React, { useEffect, useState } from 'react';
import IProduct from '@/interfaces/Product';
import { userSession } from '@/interfaces/Session';
import { useRouter } from 'next/navigation';

const ProductDetail: React.FC<IProduct> = ({ name, image, description, stock, id, price, categoryId }) => {
  const router = useRouter();
  const [userSession, setUserSession] = useState<userSession>();

  useEffect(() => {
    const userSessionLocal = localStorage.getItem("userSession");
    setUserSession(JSON.parse(userSessionLocal!));
  }, []);

  const handleClick = () => {
    if (!userSession?.token) {
      alert("You must be logged in");
      router.push("/login");
    } else {
      const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const productExist = cart.some((product: IProduct) => product.id === id);
      if (productExist) {
        alert("This product exists in your cart");
        router.push("/cart");
      } else {
        cart.push({
          name,
          description,
          image,
          price,
          stock,
          id,
          categoryId,
          map: function (arg0: (product: any) => import('react').JSX.Element): import('react').ReactNode {
            throw new Error('Function not implemented.');
          }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to your cart");
        router.push("/cart");
      }
    }
  };
 
  return (
    <div className="bg-gray-700 p-4 rounded-md max-w-sm w-full min-h-[400px] flex flex-col overflow-auto">
      <h2 className="text-white font-bold text-lg">{name}</h2>
      <img src={image} alt="imagen del producto" className="w-full h-auto rounded-md" />
      <p className="mt-2 text-white">{description}</p>
      <h2 className="text-white text-xl">${price}</h2>
      <p className="text-white">Stock: {stock}</p>
      <button onClick={handleClick} className="bg-cyan-800 rounded-full py-2 px-4 mt-2 w-full ">Add to cart</button>
    </div>
  );
};

export default ProductDetail;
