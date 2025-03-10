"use client";

import { useState, useEffect } from "react";
import { CircleUser, ShoppingCart } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { Plus } from "lucide-react";

const Homepage = () => {
  const [hovered, setHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foodsData, setFoodsData] = useState<Food[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false); 
  const [cart, setCart] = useState<Food[]>([]); // For storing cart items
  const [cartNotification, setCartNotification] = useState<string | null>(null); 
  const [showFoodModal, setShowFoodModal] = useState(false); // For the individual food card modal
  const [selectedFood, setSelectedFood] = useState<Food | null>(null); // The food item selected for the modal
  const [quantity, setQuantity] = useState<number>(1); // For the quantity of the selected food
  const [totalPrice, setTotalPrice] = useState<number>(0); // For calculating the total price

  interface Food {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  }

  const fetchFoods = async () => {
    try {
      const categoryResponse = await axios.get(
        "http://localhost:9000/food/category"
      );
      const foodsResponse = await axios.get("http://localhost:9000/food");
      setCategories(categoryResponse.data);
      setFoodsData(foodsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const addToCart = (food: Food, quantity: number) => {
    const foodWithQuantity = { ...food, quantity };
    setCart([...cart, foodWithQuantity]);
    setCartNotification(`${food.name} (x${quantity}) has been added to the cart!`);
    setTimeout(() => setCartNotification(null), 3000); // Clear notification after 3 seconds
  };

  const filteredFoods = selectedCategory
    ? foodsData.filter((food) => food.category === selectedCategory)
    : foodsData;

  // Update total price when quantity changes
  useEffect(() => {
    if (selectedFood) {
      setTotalPrice(selectedFood.price * quantity);
    }
  }, [quantity, selectedFood]);

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-black relative">
        <h1 className="text-2xl text-white">NomNom</h1>
        <div className="flex space-x-4 relative">
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <CircleUser className="text-white cursor-pointer" />
            <div
              className={`absolute right-0 top-10 w-48 p-4 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out 
                ${
                  hovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
            >
              <h4 className="font-bold text-gray-800">John Doe</h4>
              <p className="text-sm text-gray-600">johndoe@example.com</p>
              <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600">
                Logout
              </button>
            </div>
          </div>
          <ShoppingCart
            className="text-white cursor-pointer"
            onClick={() => setShowCart(!showCart)} // Toggle cart modal visibility
          />
        </div>
      </header>

      <Image
        src="/banner.png"
        alt="Banner"
        layout="responsive"
        width={400}
        height={100}
      />

      {/* Cart Notification */}
      {cartNotification && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-6 rounded-md">
          {cartNotification}
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-lg text-center text-gray-600">Your cart is empty</p>
            ) : (
              <div>
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg text-gray-800">
                        {item.name} (x{item.quantity})
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">${item.price * item.quantity}</p>
                  </div>
                ))}
                <div className="mt-4">
                  <button
                    onClick={() => setShowCart(false)} // Close the cart modal
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                  >
                    Close Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Food Card Modal (when plus is clicked) */}
      {showFoodModal && selectedFood && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800">{selectedFood.name}</h2>
            <img
              src={selectedFood.image || "https://via.placeholder.com/400x400"}
              alt={selectedFood.name}
              className="w-full h-48 object-cover my-4"
            />
            <p className="text-gray-600">{selectedFood.description}</p>
            <p className="text-xl font-semibold text-gray-900 mt-4">
              ${selectedFood.price}
            </p>

            {/* Quantity and Total Price */}
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
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-12 text-center border border-gray-300 rounded"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-300 text-gray-800 p-2 rounded-full"
                >
                  +
                </button>
              </div>
              <p className="text-xl font-semibold text-gray-900">${totalPrice.toFixed(2)}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => {
                  addToCart(selectedFood, quantity); // Add food to cart with quantity
                  setShowFoodModal(false); // Close food card modal
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setShowFoodModal(false)} // Close food card modal
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Foods Section */}
      <div className="w-full h-[80vw] bg-white mt-20 flex flex-col gap-20">
        <div className="flex flex-wrap justify-center gap-6">
          {filteredFoods.length === 0 ? (
            <p className="text-lg text-center text-gray-600">Loading...</p>
          ) : (
            filteredFoods.map((food) => (
              <div
                key={food._id}
                className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden relative"
              >
                <img
                  src={food.image || "https://via.placeholder.com/400x400"}
                  alt={food.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute right-6 bottom-20 bg-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                  <Plus
                    className="text-white"
                    onClick={() => {
                      setSelectedFood(food); // Set selected food
                      setShowFoodModal(true); // Show food card modal
                    }}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800">{food.name}</h2>
                  <p className="text-gray-600 mt-2">{food.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-semibold text-gray-900">${food.price}</p>
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

export default Homepage;
