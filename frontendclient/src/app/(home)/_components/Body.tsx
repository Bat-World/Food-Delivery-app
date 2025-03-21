// components/Body.tsx

import { useState, useEffect } from "react";
import { sendRequest } from "@/lib/send-request";
import { Fish } from "lucide-react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

type Food = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  quantity?: number;
};

const categoryEmojis: Record<string, React.ReactNode> = {
  fastfoods: "🍔",
  italian: "🍝",
  salads: "🥗",
  desserts: "🍰",
  seafoods: <Fish />,
};

const Body = ({
  foodsData,
  categories,
  selectedCategory,
  setSelectedCategory,
  setShowFoodModal,
  setSelectedFood,
  addToCart,
  cartNotification
}: any) => {
  return (
    <div className="bg-black">
      {cartNotification && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-6 rounded-md">
          {cartNotification}
        </div>
      )}

      {/* Categories Section */}
      <div className="flex justify-center space-x-4 mt-10">
        <button
          onClick={() => setSelectedCategory(null)}
          className="bg-[rgb(33,25,34)] text-white py-2 px-4 rounded-lg font-semibold text-lg"
        >
          All
        </button>
        {categories?.map((category: FoodCategory) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category._id)}
            className="bg-[rgb(33,25,34)] text-white py-2 px-4 rounded-lg flex items-center space-x-2"
          >
            <span>
              {categoryEmojis[category.categoryName.toLowerCase()] || "📌"}
            </span>
            <span className="font-semibold text-lg">
              {category.categoryName}
            </span>
          </button>
        ))}
      </div>

      {/* Foods Section */}
      <div className="w-full h-[80vw] mt-20 flex flex-col gap-20 px-10 rounded-t-[30%]">
        <div className="flex flex-wrap justify-center gap-6">
          {foodsData.length === 0 ? (
            <p className="text-lg text-center text-gray-600">Loading...</p>
          ) : (
            foodsData.map((food: Food) => (
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
                      setSelectedFood(food);
                      setShowFoodModal(true);
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
