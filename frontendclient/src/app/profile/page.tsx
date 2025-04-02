"use client";

import { sendRequest } from "@/lib/send-request";
import { useEffect, useState, } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserData } from "@/lib/types";


const Profile = () => {



  const [userData, setUserData] = useState<UserData | null>(null);
  const userLocation = localStorage.getItem("savedLocation");
  const router = useRouter();

  const fetchUserData = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await sendRequest.get("/user", {
        headers: { Authorization: "Bearer " + token },
      });

      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return <div className="text-center text-lg text-gray-700">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <ArrowLeft className="cursor-pointer" onClick={()=> router.push("/")}/>
      {/* Profile Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userData.email}
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-md mt-6 inline-block max-w-3xl w-full">
          <p className="text-xl text-gray-700">
            <strong>Email:</strong> {userData.email}
          </p>
          {/* <p className="text-xl text-gray-700">
            <strong>Role:</strong> {userData.role}
          </p>
          <p className="text-xl text-gray-700">
            <strong>Status:</strong>{" "}
            {userData.isVerified ? "Verified" : "Not Verified"}
          </p> */}
          <p className="text-xl text-gray-700">
            <strong>Address</strong> {userLocation}
          </p>
        </div>
      </div>

      {/* Order History */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Order History
        </h2>
        {userData.orderedFoods.length > 0 ? (
          userData.orderedFoods.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-md mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Order ID: {order._id}
              </h3>
              <p className="text-lg text-gray-700">Status: {order.status}</p>
              <p className="text-lg text-gray-700">
                Total Price:{" "}
                <strong className="text-red-600">
                  ${order.totalPrice.toFixed(2)}
                </strong>
              </p>
              <div className="flex flex-wrap gap-6 mt-6">
                {order.foodOrderItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-1/3 lg:w-1/4 bg-gray-100 p-4 rounded-xl shadow-md"
                  >
                    <img
                      src={item.food.image}
                      alt={item.food.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {item.food.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ${item.food.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-700">
            No orders placed yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
