"use client";
import { getOrders } from "@/helpers/orders.helper";
import IProduct from "@/interfaces/Product";
import { userSession } from "@/interfaces/Session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IOrder } from "./types";
import { useAuth } from "@/context/AuthContext";

const OrdersPage = () => {
  const { userData } = useAuth();
  const router = useRouter();
  const [Orders, setOrders] = useState<IOrder[]>([]);

  const fetchData = async () => {
    const ordersResponse = await getOrders(userData?.token!);
    setOrders(ordersResponse);
  };

  useEffect(() => {
    if (userData?.userData.name) {
      userData?.userData.name === undefined ? router.push("/login") : fetchData();
    }
  }, [userData?.userData]);

  // Función para determinar la clase de color basada en el estado del pedido
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-600'; // Verde para aprobado
      case 'pending':
        return 'text-yellow-600'; // Amarillo para pendiente
      case 'rejected':
        return 'text-red-600'; // Rojo para rechazado
      default:
        return 'text-gray-600'; // Gris para estados desconocidos
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-gray-200">Your Orders</h1>
      {Orders && Orders.length > 0 ? (
        <div className="space-y-4">
          {Orders.map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-200">{new Date(item.date)?.toDateString()}</p>
              <p className={`text-lg ${getStatusClass(item.status)}`}>
                Status: {item.status.toLocaleUpperCase()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">You don’t have any orders.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
