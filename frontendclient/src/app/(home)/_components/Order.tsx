"use client";
import { useState, useEffect } from "react";
import { sendRequest } from "@/lib/send-request";

interface CartItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const Order = ({ cart }: { cart: CartItem[] }) => {
  const [showOrders, setShowOrders] = useState(false);
  const [showInMyBag, setShowInMyBag] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  type Order = {
    _id: string;
    totalPrice: number;
    status: string;
    foodOrderItems: {
      food: {
        name: string;
        price: number;
        image: string;
      };
      quantity: number;
    }[];
  };

  // Fetch orders for the logged-in user
  const fetchOrders = async () => {
    const token = localStorage.getItem("auth_token");

    try {
      const { data: user } = await sendRequest.get("/user", {
        headers: { Authorization: "Bearer " + token },
      });
      setOrders(user.orderedFoods);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (showOrders) {
      fetchOrders();
    }
  }, [showOrders]);

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to the cart before placing an order.");
      return;
    }

    const token = localStorage.getItem("auth_token");

    try {
      // Get user info
      const { data: user } = await sendRequest.get("/user", {
        headers: { Authorization: "Bearer " + token },
      });

      // Prepare order data
      const orderData = {
        totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        user: user._id,
        status: "pending",
        foodOrderItems: cart.map((item) => ({
          food: item._id,
          quantity: item.quantity,
        })),
      };

      
      const response = await sendRequest.post("/food/order", orderData);

      if (response.status === 201) {
        alert("Your order has been placed successfully!");
 
        setCart([]);
        setShowInMyBag(false);
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl h-screen overflow-y-auto bg-[rgb(33,25,34)] flex flex-col items-center py-10 px-6">
      <div className="w-full flex justify-center gap-6 mb-8">
        <button
          onClick={() => {
            setShowInMyBag(true);
            setShowOrders(false);
          }}
          className={`px-8 py-4 rounded-lg transition-colors text-lg font-medium ${
            showInMyBag ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
          } hover:bg-blue-500`}
        >
          In My Bag
        </button>
        <button
          onClick={() => {
            setShowOrders(true);
            setShowInMyBag(false);
          }}
          className={`px-8 py-4 rounded-lg transition-colors text-lg font-medium ${
            showOrders ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
          } hover:bg-blue-500`}
        >
          Orders
        </button>
      </div>

      {/* "In My Bag" Section */}
      {showInMyBag && (
        <div className="w-full bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-lg text-center text-gray-400">Your cart is empty</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-6 p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.name} (x{item.quantity})</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <p className="text-xl font-semibold text-red-400">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="flex justify-center mt-6">
                <button
                  onClick={placeOrder}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition-all duration-300"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* "Orders" Section */}
      {showOrders && (
        <div className="w-full max-h-[70vh] overflow-y-auto bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-lg text-center text-gray-400">No orders yet.</p>
          ) : (
            <div>
              {orders.map((order) => (
                <div key={order._id} className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <h3 className="text-lg font-semibold text-white">
                    {order.foodOrderItems.map((item) => item.food.name).join(", ")}
                  </h3>
                  <p className="text-gray-400">Total Price: ${order.totalPrice.toFixed(2)}</p>
                  <p className="text-gray-400">Status: {order.status}</p>
                  <p className="text-gray-500 text-sm">
                    Ordered on: {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-4">
                    {order.foodOrderItems.map((food, index) => (
                      <div key={index} className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="text-md font-semibold text-white">{food.name}</h4>
                          <p className="text-gray-400">Quantity: {food.quantity}</p>
                        </div>
                        <img
                          src={food.image || "https://via.placeholder.com/100x100"}
                          alt={food.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
