"use client";

import React, { useState } from "react";
import { CartType } from "@/lib/types";
import { sendRequest } from "@/lib/send-request";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";
import { useToken } from "@/hooks/TokenContext";
import { useLocation } from "@/hooks/LocationContext";

interface InMyBagProps {
  setShowInMyBag: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InMyBag: React.FC<InMyBagProps> = ({ setShowInMyBag }) => {
  const { token } = useToken();
  const { location } = useLocation();
  const [cart, setCart] = useState<CartType>(() => {
    if (typeof window !== "undefined")
      return JSON.parse(localStorage.getItem("cart") || "{}");
    return {};
  });

  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!token) {
      toast("Please login to place an order.", { type: "error" });
      return;
    }

    if (!location) {
      toast("Please select a location before placing an order.", {
        type: "error",
      });
      return;
    }

    if (Object.keys(cart).length === 0) {
      toast(
        "Your cart is empty. Add items to the cart before placing an order.",
        { type: "error" }
      );
      return;
    }

    try {
      setLoading(true); // Start loading

      const { data: user } = await sendRequest.get("/user", {
        headers: { Authorization: "Bearer " + token },
      });

      const orderData = {
        totalPrice: Object.values(cart).reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        user: user._id,
        status: "pending",
        foodOrderItems: Object.values(cart).map((item) => ({
          food: item._id,
          quantity: item.quantity,
        })),
      };

      const response = await sendRequest.post("/food/order", orderData);

      if (response.status === 201) {
        toast("Your order has been placed successfully!", { type: "success" });
        localStorage.setItem("cart", JSON.stringify({}));
        setCart({});
        setShowInMyBag(false);
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      toast("Failed to place order. Please try again.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-6">Your Cart</h2>
      {Object.values(cart).length === 0 ? (
        <p className="text-lg text-center text-gray-400">Your cart is empty</p>
      ) : (
        <div>
          {Object.values(cart).map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-6 p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {item.name} (x{item.quantity})
                </h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <p className="text-xl font-semibold text-red-400">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-center mt-6">
            <button
              onClick={placeOrder}
              disabled={loading}
              className="bg-red-400 px-8 py-3 rounded-lg text-white hover:scale-105 transition-all duration-300"
            >
              {loading ? (
                <ShoppingCart className="animate-slide" />
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
