"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [foodsData, setFoodsData] = useState([]);
  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:9000/food");
      console.log(response);
      setFoodsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  // Handle form submission to add food
  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/food", newFood);
      console.log("Food added:", response);
      setFoodsData((prevFoods) => [...prevFoods, response.data]); // Update local foods data
      setNewFood({ name: "", price: "", description: "", image: "", category: "" }); // Clear form
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Admin - Food Management
      </h1>

      {/* Add Food Form */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Food</h2>
        <form onSubmit={handleAddFood} className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Food Name</label>
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
            <label htmlFor="price" className="block text-gray-700">Price</label>
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
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={newFood.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={newFood.image}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Category</label>
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

      {/* Food Cards Container */}
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
  );
};

export default AdminPage;
