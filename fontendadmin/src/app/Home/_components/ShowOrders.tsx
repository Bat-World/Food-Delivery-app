"use client";

import React, { useEffect, useState } from "react";
import { sendRequest } from "@/lib/send-request";
import { Order } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AddFoodProps {
  showOrders: boolean;
}

const ShowOrders = ({ showOrders }: AddFoodProps) => {
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  // Fetch orders from the API
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
    fetchOrders();
  }, []);

  // Render orders table only if showOrders is true
  if (showOrders) {
    return (
      <div className="flex flex-col gap-6">
        {/* Orders Table Section */}
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead className="text-right">Total Price</TableHead>
              <TableHead>Ordered Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              ordersData.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.user?.email}</TableCell>
                  <TableCell className="text-right">
                    ${order.totalPrice}
                  </TableCell>
                  <TableCell>
                    <ul>
                      {order.foodOrderItems.map((item, idx) => (
                        <li key={idx} className="text-gray-600">
                          Item {idx + 1}: Quantity - {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  return null; // If showOrders is false, don't render anything
};

export default ShowOrders;
