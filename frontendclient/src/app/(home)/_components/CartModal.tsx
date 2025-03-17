import { XCircle } from "lucide-react";

const CartModal = ({ showCart, setShowCart, cart, createOrder, orders, showOrders, setShowOrders, showInMyBag, setShowInMyBag }: any) => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <XCircle onClick={() => setShowCart(false)} className="cursor-pointer" />
      <div className="flex justify-between mb-4">
        <button
          onClick={() => {
            setShowInMyBag(true);
            setShowOrders(false);
          }}
          className={`px-4 py-2 ${
            showInMyBag ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          } rounded-lg`}
        >
          In My Bag
        </button>
        <button
          onClick={() => {
            setShowOrders(true);
            setShowInMyBag(false);
          }}
          className={`px-4 py-2 ${
            showOrders ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          } rounded-lg`}
        >
          Orders
        </button>
      </div>

      {/* "In My Bag" Section */}
      {showInMyBag && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-lg text-center text-gray-600">Your cart is empty</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg text-gray-800">{item.name} (x{item.quantity})</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <p className="text-xl font-semibold text-gray-900">${item.price * item.quantity}</p>
                </div>
              ))}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  Close Cart
                </button>
                <button
                  onClick={() => {
                    createOrder();
                    setShowCart(false);
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit Order
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* "Orders" Section */}
      {showOrders && (
        <div className="max-h-[60vh] overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-lg text-center text-gray-600">No orders yet.</p>
          ) : (
            <div>
              {orders.map((order) => (
                <div key={order._id} className="mb-6 p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {order.foodOrderItems.map((item) => item.food.name).join(", ")}
                  </h3>
                  <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-500 text-sm">
                    Ordered on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

export default CartModal;
