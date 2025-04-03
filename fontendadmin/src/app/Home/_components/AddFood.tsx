"use client";

import React, { useState, ChangeEvent } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Food } from "@/lib/types";
import { sendRequest } from "@/lib/send-request";

interface CloudinaryUploadWidgetInfo {
  secure_url: string;
}

interface AddFoodProps {
  setFoodsData: React.Dispatch<React.SetStateAction<Food[]>>;
}

const AddFood = ({ setFoodsData }: AddFoodProps) => {
  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null); 

  const handleAddFood = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      const response = await sendRequest.post<Food>("/food", newFood, {
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
      setImagePreview(null); 
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  return (
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
        <div className="mb-4">
          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={(res) => {
              setNewFood((prev) => ({
                ...prev,
                image: (res.info as CloudinaryUploadWidgetInfo).secure_url,
              }));
              setImagePreview((res.info as CloudinaryUploadWidgetInfo).secure_url); // Set image preview URL
            }}
          >
            {({ open }) => {
              return (
                <button
                  className="text-white bg-black py-2 px-4 rounded-md"
                  onClick={() => open()}
                >
                  Upload Food Image
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Food Preview"
              className="w-32 h-32 object-cover mx-auto border rounded-md"
            />
          </div>
        )}
        
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
