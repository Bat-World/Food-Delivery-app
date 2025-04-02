"use client";

import React, { useState } from "react";
import { InMyBag } from "./InMyBag";
import { Orders } from "./Ordered";

const Order = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showInMyBag, setShowInMyBag] = useState(false);


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

      {showOrders && <Orders  />}
    </div>
  );
};

export default Order;
