"use client";

import { sendRequest } from "@/lib/send-request";
import { Food } from "@/lib/types";
import { Plus } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { FoodModal } from "./FoodModal";
import { Skeleton } from "@heroui/skeleton";

export const Foods = () => {
  const [selectedCategory] = useQueryState("categories", parseAsString);
  const [, setFoodId] = useQueryState("food", parseAsString);

  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);

  const fetchFoods = async () => {
    try {
      const foodsResponse = await sendRequest.get("/food");

      setFoods(foodsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const filteredFoodsByCategory = selectedCategory
      ? foods.filter((food) => selectedCategory === food.category)
      : foods;

    setFilteredFoods(filteredFoodsByCategory);
  }, [selectedCategory, foods]);

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="w-full h-[80vw] mt-20 flex flex-col gap-20 px-10 rounded-t-[30%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {filteredFoods.length === 0
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="max-w-sm w-full i shadow-lg rounded-lg overflow-hidden relative"
                >
                  <div className="w-full h-48 relative">
                    <Skeleton className="rounded-lg h-full bg-gray-500" />
                  </div>
                  <div className="p-6">
                    <Skeleton className="h-6 bg-gray-500 mb-2 rounded-sm" />
                    <Skeleton className="h-6 bg-gray-500 rounded-sm" />
                  </div>
                </div>
              ))
          : filteredFoods.map((food) => (
              <div
                key={food._id}
                className="max-w-sm w-full bg-[rgb(33,25,34)] shadow-lg rounded-lg overflow-hidden relative"
              >
                <div className="w-full h-48 relative">
                  <img
                    src={food.image || "https://via.placeholder.com/400x400"}
                    alt={food.name}
                    className="w-full h-48 object-cover px-4 pt-4 rounded-[20px]"
                  />
                </div>
                <div className="absolute right-6 bottom-20 bg-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                  <Plus
                    className="text-white"
                    onClick={() => {
                      setFoodId(food._id);
                    }}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-300">
                    {food.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{food.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-3xl font-semibold text-red-400">
                      ${food.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <FoodModal foods={foods} />
    </div>
  );
};
