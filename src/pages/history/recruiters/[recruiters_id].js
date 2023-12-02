import React from "react";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import Image from "next/image";

const getDummyNotifications = () => {
  return [
    {
      id: 1,
      sender: {
        name: "John Doe",
        profilePicture: "/dummyProfile.png",
      },
      message: "Anda telah diterima sebagai kandidat.",
    },
    {
      id: 2,
      sender: {
        name: "Ramdlan Faqih",
        profilePicture: "/dummyProfile.png",
      },
      message: "Anda telah diterima sebagai kandidat.",
    },
  ];
};

export default function HistoryRecruiters() {
  
  const notifications = getDummyNotifications();
  return (
    <>
      <div>
        <div className="px-10">
          <Navbar />
        </div>
        <div className="bg-slate-200 h-screen">
          <div className="px-10">
            <h1>Job Alert recruiters !</h1>
            {notifications.map((notification) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
