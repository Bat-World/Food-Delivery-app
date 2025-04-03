import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { UserData } from "@/lib/types";
import { sendRequest } from "@/lib/send-request";

export const Orders = ({}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      setLoading(true);
      const response = await sendRequest.get("/user", {
        headers: { Authorization: "Bearer " + token },
      });

      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-full max-h-[70vh] overflow-y-auto bg-[rgb(33,25,34)] rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-6">Your Orders</h2>
      {loading ? (
        <ShoppingCart className="animate-slide text-white" />
      ) : userData?.orderedFoods.length === 0 ? (
        <p className="text-lg text-center text-gray-400">No orders yet.</p>
      ) : (
        <div>
          {userData && userData.orderedFoods.length > 0 ? (
            userData.orderedFoods.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-xl shadow-md mb-8"
              >
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
                        className="w-full h-a object-cover rounded-xl mb-4"
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
      )}
    </div>
  );
};
