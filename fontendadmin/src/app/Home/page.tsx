"use client";

import { sendRequest } from "@/lib/send-request";
import { ChangeEvent, useEffect, useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

const AdminPage = () => {
  const [foodsData, setFoodsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [showFoods, setShowFoods] = useState(true);
  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const fetchFoods = async () => {
    try {
      const response = await sendRequest.get("/food");
      setFoodsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await sendRequest.get("/food/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdersData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchOrders();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      console.log(token);
      const response = await sendRequest.post("/food", newFood, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFoodsData((prevFoods) => [...prevFoods, response.data]);
      setNewFood({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Tab Navigation */}
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

      {/* Add Food Form */}
      {showFoods && (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Food
          </h2>
          <form
            onSubmit={handleAddFood}
            className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Food Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newFood.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newFood.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newFood.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <CldUploadWidget
              uploadPreset="ml_default"
              onSuccess={(res) => {      
                setNewFood((prev) => { console.log(prev);
                 return {
                  ...prev,
                  image: res.info!.secure_url ,
                }});
              }}
              // onError={(err) => {
              //   console.error(err);
              // }
              // }
            >
              {({ open }) => {
                return (
                  <button
                    className="text-white bg-black"
                    onClick={() => open()}
                  >
                    Upload Food Image
                  </button>
                );
              }}
            </CldUploadWidget>
            {/* <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={newFood.image}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div> */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={newFood.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Add Food
            </button>
          </form>
        </div>
      )}

      {/* Foods Display */}
      {showFoods && (
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
      )}

      {/* Orders Display */}
      {showOrders && (
        <div className="flex flex-wrap justify-center gap-6">
          {ordersData.length === 0 ? (
            <p className="text-lg text-center text-gray-600">Loading...</p>
          ) : (
            ordersData.map((order) => (
              <div
                key={order._id}
                className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Order ID: {order._id}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Total Price: ${order.totalPrice}
                  </p>
                  <p className="text-gray-600 mt-2">Status: {order.status}</p>
                  {order.user && (
                    <p className="text-gray-600 mt-2">
                      User Email: {order.user.email}
                    </p>
                  )}
                  <h3 className="text-lg font-semibold text-gray-700 mt-4">
                    Ordered Items:
                  </h3>
                  <ul>
                    {order.foodOrderItems.map((item, idx) => (
                      <li key={idx} className="text-gray-600">
                        Item {idx + 1}: Quantity - {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
