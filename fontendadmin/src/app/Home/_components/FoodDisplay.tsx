"use client";

import React from "react";
import { sendRequest } from "@/lib/send-request";
import { useEffect } from "react";
import { Food } from "@/lib/types";

interface AddFoodProps {
  setFoodsData: React.Dispatch<React.SetStateAction<Food[]>>;
  foodsData: Food[];
}

const FoodDisplay = ({ setFoodsData, foodsData }: AddFoodProps) => {
  const fetchFoods = async () => {
    try {
      const response = await sendRequest.get("/food");
      setFoodsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {foodsData.length === 0 ? (
        <p className="text-lg text-center text-gray-600">Loading...</p>
      ) : (
        foodsData.map((food) => (
          <div
            key={food.id}
            className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={food.image || "https://via.placeholder.com/400x300"}
              alt={food.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {food.name}
              </h2>
              <p className="text-gray-600 mt-2">{food.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold text-gray-900">
                  ${food.price}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FoodDisplay;
