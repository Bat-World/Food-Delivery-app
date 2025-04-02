"use state";

import React from "react";
import { sendRequest } from "@/lib/send-request";
import { useEffect, useState } from "react";
import { Order } from "@/lib/types";

interface AddFoodProps {
  showOrders: boolean;
}

const ShowOrders = ({ showOrders }: AddFoodProps) => {
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await sendRequest.get("/food/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdersData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  if (showOrders === true) {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {ordersData.length === 0 ? (
          <p className="text-lg text-center text-gray-600">Loading...</p>
        ) : (
          ordersData.map((order) => (
            <div
              key={order._id}
              className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Order ID: {order._id}
                </h2>
                <p className="text-gray-600 mt-2">
                  Total Price: ${order.totalPrice}
                </p>
                <p className="text-gray-600 mt-2">Status: {order.status}</p>
                {order.user && (
                  <p className="text-gray-600 mt-2">
                    User Email: {order.user.email}
                  </p>
                )}
                <h3 className="text-lg font-semibold text-gray-700 mt-4">
                  Ordered Items:
                </h3>
                <ul>
                  {order.foodOrderItems.map((item, idx) => (
                    <li key={idx} className="text-gray-600">
                      Item {idx + 1}: Quantity - {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
};

export default ShowOrders;
