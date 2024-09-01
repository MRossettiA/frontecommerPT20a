"use client"

import CartPage from "@/components/CartPage/CartPage";
import { useAuth } from "@/context/AuthContext"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Cart = () => {
  const { userData } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
   
    if (!userData?.token) {
      router.push("/login");
    }
  }, [userData, router]);

  return (
    <div className="flex flex-col bg-gray-700 rounded-lg">
      <CartPage />
    </div>
  );
};

export default Cart;
