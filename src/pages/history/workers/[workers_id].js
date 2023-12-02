import React from "react";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import styles from "../styles.module.css"


export default function HistoryWorkers() {
  const [history, setHistory] = React.useState([]);
  const workers_id = Cookies.get("workers_id");
  console.log(workers_id);
 
  React.useEffect(() => {
    console.log("workers_id di useEffect", workers_id);
    const fetchHistory = async () => {
      try{
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EXPRESS}/hire/workers/${workers_id}`
        );
        console.log(response.data.data.rows);
        setHistory(response.data.data.rows)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchHistory()
  }, [workers_id])

  return (
    <>
      <div>
        <div className="px-10">
          <Navbar />
        </div>
        <div className="bg-slate-200 h-screen">
          <div className={`${styles.notificationHeader} md:px-10`}>
            <h1 className={`${styles.notificationHeaderText}`}>Notification</h1>
          </div>
          <div className="px-10">
            {/* {notifications.map((notification) => (
              <div key={notification.id} className="my-4 p-4 bg-white rounded-lg">
                <div className="flex items-center">
                  <img
                    src={notification.sender.profilePicture}
                    alt={notification.sender.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{notification.sender.name}</h3>
                    <p>{notification.message}</p>
                  </div>
                </div>
              </div>
            ))} */}
            {history.map((item, index) => (
              <div key={index} className="my-4 p-4 bg-white rounded-lg">
                <div className="flex items-center">
                  <Image 
                    src={item.image || "/dummyProfile.png"}
                    alt="recruiters image"
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p>{item.hire_desc}</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
