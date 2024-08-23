"use client"

import CartPage from "@/components/CartPage/CartPage";
import { userSession } from "@/interfaces/Session";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const Cart = () => {
  const router = useRouter()
  const [userSession, setUserSession] = useState<userSession>()
  
  useEffect(() => {
    const userSessionLocal = localStorage.getItem("userSession")
    setUserSession(JSON.parse(userSessionLocal!))
    !userSession?.token && router.push("/cart")
  },[router, userSession?.token])
  
  useEffect(()=>{
    if(userSession?.userData.name) {
      userSession?.userData.name === undefined && router.push("/login")
    }
      } , [userSession?.userData, router])

    return (
      <div className="flex flex-col bg-gray-700 rounded-lg">
        <CartPage/>
      </div>
    );
  };
  
  export default Cart;
  