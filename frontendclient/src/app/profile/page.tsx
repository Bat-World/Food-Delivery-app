"use client";

import { sendRequest } from "@/lib/send-request";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserData } from "@/lib/types";
import { useToken } from "@/hooks/TokenContext";
import { useLocation } from "@/hooks/LocationContext";
import { useCallback } from "react";
import Orderhistory from "./_components/OrderHistory";


const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const { token } = useToken();
  const { location } = useLocation();

  const fetchUserData = useCallback(async () => {
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
  }, [token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (!userData) {
    return <div className="text-center text-lg text-gray-700">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <ArrowLeft className="cursor-pointer" onClick={() => router.push("/")} />
      {/* Profile Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userData.email}
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-md mt-6 inline-block max-w-3xl w-full">
          <p className="text-xl text-gray-700">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="text-xl text-gray-700">
            <strong>Address</strong> {location ? `${location.lat}, ${location.lng}` : "Not set"}
          </p>
        </div>
      </div>

      <Orderhistory userData={userData} />

     </div>
  );
};

export default Profile;
