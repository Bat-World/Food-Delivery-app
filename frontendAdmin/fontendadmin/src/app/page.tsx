import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sidebar } from "@/components/Sidebar";

const orders = [
  { id: 1, customer: "Test@gmail.com", food: "2 foods", date: "2024/12/20", total: "$26.97", address: "12-р хороо, СБД", status: "Pending" },
  { id: 2, customer: "Test@gmail.com", food: "2 foods", date: "2024/12/20", total: "$26.97", address: "12-р хороо, СБД", status: "Delivered" },
  { id: 3, customer: "Test@gmail.com", food: "2 foods", date: "2024/12/20", total: "$26.97", address: "12-р хороо, СБД", status: "Cancelled" },
];

export default function AdminPage() {
  const [selectedDate, setSelectedDate] = useState("13 June 2023 - 14 July 2023");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Orders</h1>
          <Button variant="outline">Change delivery state</Button>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Food</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Delivery Address</TableHead>
                  <TableHead>Delivery State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.food}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
