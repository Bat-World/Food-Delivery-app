"use client";

import { useState } from "react";
import { Food } from "@/lib/types";
import AddFood from "./_components/AddFood";
import FoodDisplay from "./_components/FoodDisplay";
import ShowOrders from "./_components/ShowOrders";

const AdminPage = () => {
  const [foodsData, setFoodsData] = useState<Food[]>([]);
  const [showOrders, setShowOrders] = useState(true);
  const [showFoods, setShowFoods] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => {
            setShowFoods(true);
            setShowOrders(false);
          }}
          className={`py-2 px-4 rounded-lg transition ${
            showFoods
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-blue-500"
          }`}
        >
          Foods
        </button>
        <button
          onClick={() => {
            setShowFoods(false);
            setShowOrders(true);
          }}
          className={`py-2 px-4 rounded-lg transition ${
            showOrders
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-blue-500"
          }`}
        >
          Orders
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Admin - Food & Order Management
      </h1>
      {showOrders ? (
        <ShowOrders showOrders={showOrders} />
      ) : (
        <>
          <AddFood setFoodsData={setFoodsData} />

          <FoodDisplay setFoodsData={setFoodsData} foodsData={foodsData} />
        </>
      )}

      {/* Orders Display */}
    </div>
  );
};

export default AdminPage;
