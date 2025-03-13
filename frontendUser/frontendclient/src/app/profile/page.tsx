import { sendRequest } from "@/lib/send-request";
import { useEffect } from "react";


const  Profile = () => {

    const fetchUserData =  async() => {
 try {
      const response = await sendRequest.get("/login");

      if (response.status === 200) {
    
      }
    } catch (error) {
      console.error("Login error:", error);
   
    } finally {

    }
    }

    useEffect(() => {
        fetchUserData();
    },[])

    return(
        <div>this is profile page</div>
    );
}

export default Profile;