"use client";

import { useState, useEffect } from "react";
import { sendRequest } from "@/lib/send-request";
import {  OrderType } from "@/lib/types";
import { InMyBag } from "./InMyBag";
import { Orders } from "./Ordered";

const Order = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showInMyBag, setShowInMyBag] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("auth_token");

    try {
      const response = await sendRequest.get("/user", {
        headers: { Authorization: "Bearer " + token },
      });
      setOrders(response.data.orderedFoods);
      console.log(response.data.orderedFoods);
      
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (showOrders) {
      fetchOrders();
    }
  }, [showOrders]);

  return (
    <div className="w-full max-w-4xl h-screen overflow-y-auto bg-[rgb(33,25,34)] flex flex-col items-center py-10 px-6">
      <div className="w-full flex justify-center gap-6 mb-8">
        <button
          onClick={() => {
            setShowInMyBag(true);
            setShowOrders(false);
          }}
          className={`px-8 py-4 rounded-lg transition-colors text-lg font-medium ${
            showInMyBag ? "bg-red-400 text-white" : "bg-gray-700 text-white"
          } hover:bg-red-400`}
        >
          Cart
        </button>
        <button
          onClick={() => {
            setShowOrders(true);
            setShowInMyBag(false);
          }}
          className={`px-8 py-4 rounded-lg transition-colors text-lg font-medium ${
            showOrders ? "bg-red-400 text-white" : "bg-gray-700 text-white"
          } hover:bg-red-400`}
        >
          Orders
        </button>
      </div>

      {showInMyBag && <InMyBag setShowInMyBag={setShowInMyBag} />}

      {showOrders && <Orders orders={orders} />}
    </div>
  );
};

export default Order;
