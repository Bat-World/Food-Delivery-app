"use client";

import { Plus } from "lucide-react";
import { XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "./_components/Navbar";
import { Fish } from "lucide-react";
import Order from "./_components/Order";
import { sendRequest } from "@/lib/send-request";

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

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foodsData, setFoodsData] = useState<Food[]>([]);
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<Food[]>([]);
  const [cartNotification, setCartNotification] = useState<string | null>(null);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showInMyBag, setShowInMyBag] = useState(false);


  // Fetch foods
  const fetchFoods = async () => {
    try {
      const categoryResponse = await sendRequest.get("/food/category");
      const foodsResponse = await sendRequest.get("/food");
      setCategories(categoryResponse.data);
      setFoodsData(foodsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add food to cart
  const addToCart = (food: Food, quantity: number) => {
    const foodWithQuantity = { ...food, quantity };
    setCart([...cart, foodWithQuantity]);
    setCartNotification(
      `${food.name} (x${quantity}) has been added to the cart!`
    );
    setTimeout(() => setCartNotification(null), 3000);
  };

  useEffect(() => {
    if (selectedFood) {
      setTotalPrice(selectedFood.price * quantity);
    }

    const filteredFoodsByCategory = selectedCategory
      ? foodsData.filter((food) => food.category === selectedCategory)
      : foodsData;

    setFoodsData(filteredFoodsByCategory);
  }, [quantity, selectedFood, selectedCategory, foodsData]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const categoryEmojis: Record<string, React.ReactNode> = {
    fastfoods: "🍔",
    italian: "🍝",
    salads: "🥗",
    desserts: "🍰",
    seafoods: <Fish />,
  };

  return (
    <div className="flex flex-row overflow-y-hidden">
      <Navbar />
      <div className="bg-black">
        {cartNotification && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-6 rounded-md">
            {cartNotification}
          </div>
        )}

        {showCart && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <XCircle
                onClick={() => setShowCart(false)}
                className="cursor-pointer"
              />
              {/* In My Bag Tab */}
              <div className="mb-4">
                <button
                  onClick={() => setShowInMyBag(true)}
                  className={`px-4 py-2 ${
                    showInMyBag
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } rounded-lg`}
                >
                  In My Bag
                </button>
              </div>

              {/* "In My Bag" Section */}
              {showInMyBag && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Your Cart
                  </h2>
                  {cart.length === 0 ? (
                    <p className="text-lg text-center text-gray-600">
                      Your cart is empty
                    </p>
                  ) : (
                    <div>
                      {cart.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center mb-4"
                        >
                          <div>
                            <h3 className="text-lg text-gray-800">
                              {item.name} (x{item.quantity})
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                          <p className="text-xl font-semibold text-gray-900">
                            ${item.price * item.quantity}
                          </p>
                        </div>
                      ))}
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => setShowCart(false)}
                          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                        >
                          Close Cart
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {showFoodModal && selectedFood && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedFood.name}
              </h2>
              <img
                src={
                  selectedFood.image || "https://via.placeholder.com/400x400"
                }
                alt={selectedFood.name}
                className="w-full h-48 object-cover my-4"
              />
              <p className="text-gray-600">{selectedFood.description}</p>
              <p className="text-xl font-semibold text-gray-900 mt-4">
                ${selectedFood.price}
              </p>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-300 text-gray-800 p-2 rounded-full"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value)))
                    }
                    className="w-12 text-center border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-300 text-gray-800 p-2 rounded-full"
                  >
                    +
                  </button>
                </div>
                <p className="text-xl font-semibold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => {
                    addToCart(selectedFood, quantity);
                    setShowFoodModal(false);
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setShowFoodModal(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories Section */}
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
                  {categoryEmojis[category.categoryName.toLowerCase()] || "📌"}
                </span>
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
              foodsData.map((food) => (
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

<Order cart={cart.map((item) => ({ ...item, quantity: item.quantity || 1 }))} setCart={setCart} />

    </div>
  );
};

export default Homepage;
