"use client";

import React from "react";
import { OrderType } from "@/lib/types";

interface OrdersProps {
  orders: OrderType[];
}

export const Orders: React.FC<OrdersProps> = ({ orders }) => {
  return (
    <div className="w-full max-h-[70vh] overflow-y-auto bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-lg text-center text-gray-400">No orders yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold text-white">
                {order.foodOrderItems
                  .map((item) => item.food.name)
                  .join(", ")}
              </h3>
              <p className="text-gray-400">
                Total Price: ${order.totalPrice.toFixed(2)}
              </p>
              <p className="text-gray-400">Status: {order.status}</p>
              <p className="text-gray-500 text-sm">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="mt-4">
                {order.foodOrderItems.map((food, index) => (
                  <div key={index} className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-md font-semibold text-white">{food.food.name}</h4>
                      <p className="text-gray-400">Quantity: {food.quantity}</p>
                    </div>
                    <img
                      alt={food.food.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
