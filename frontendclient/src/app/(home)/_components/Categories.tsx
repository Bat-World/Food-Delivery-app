"use client";

import { sendRequest } from "@/lib/send-request";
import { FoodCategory } from "@/lib/types";
import { Fish } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { parseAsString, useQueryState } from "nuqs";

const CATEGORIES_EMOJIS: Record<string, React.ReactNode> = {
  fastfoods: "🍔",
  italian: "🍝",
  salads: "🥗",
  desserts: "🍰",
  seafoods: <Fish />,
};

export const Categories = () => {
  const [_, setSelectedCategory] = useQueryState("categories", parseAsString);
  const [categories, setCategories] = useState<FoodCategory[]>([]);

  const getCategories = async () => {
    try {
      const categoryResponse = await sendRequest.get("/food/category");
      setCategories(categoryResponse.data);
    } catch (err) {
      toast("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex justify-center space-x-4 mt-10">
      <button
        onClick={() => setSelectedCategory(null)}
        className="bg-[rgb(33,25,34)] text-white py-2 px-4 rounded-lg font-semibold text-lg "
      >
        All
      </button>
      {categories?.map((category) => (
        <button
          key={category._id}
          onClick={() => setSelectedCategory(category._id)}
          className="bg-[rgb(33,25,34)] text-white py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <span>
            <span>
              {CATEGORIES_EMOJIS[category.categoryName.toLowerCase()] || "📌"}
            </span>
          </span>
          <span className="font-semibold text-lg">{category.categoryName}</span>
        </button>
      ))}
    </div>
  );
};
