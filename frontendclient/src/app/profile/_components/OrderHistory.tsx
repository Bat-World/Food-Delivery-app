interface UserData {
  orderedFoods: {
    _id: string;
    status: string;
    totalPrice: number;
    foodOrderItems: {
      food: {
        image: string;
        name: string;
        price: number;
      };
      quantity: number;
    }[];
  }[];
}

const Orderhistory = ({ userData }: { userData: UserData }) => {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Order History
        </h2>
        {userData.orderedFoods.length > 0 ? (
          userData.orderedFoods.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h3 className="text-xl font-semibold text-gray-800">
                Order ID: {order._id}
              </h3>
              <p className="text-lg text-gray-700">Status: {order.status}</p>
              <p className="text-lg text-gray-700">
                Total Price:{" "}
                <strong className="text-red-600">${order.totalPrice.toFixed(2)}</strong>
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
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ${item.food.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-700">No orders placed yet.</p>
        )}
      </div>
    );
  };

  
  export default Orderhistory;
