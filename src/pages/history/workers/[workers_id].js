import React from "react";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import styles from "../styles.module.css";
import Footer from "@/components/footer/footer";
import { TailSpin } from "react-loader-spinner";

export default function HistoryWorkers() {
  const [history, setHistory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const workers_id = Cookies.get("workers_id");
  console.log(workers_id);

  React.useEffect(() => {
    console.log("workers_id di useEffect", workers_id);
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EXPRESS}/hire/workers/${workers_id}`
        );
        console.log(response.data.data.rows);
        setHistory(response.data.data.rows);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchHistory();
  }, [workers_id]);

  return (
    <>
      <div>
        <div className="px-10">
          <Navbar />
        </div>
        <div className="bg-slate-200 flex flex-grow flex-col">
          <div className={`${styles.notificationHeader} md:px-10`}>
            <h1 className={`${styles.notificationHeaderText}`}>Notification</h1>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <TailSpin
                height={80}
                width={80}
                color="#5e50a1"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div className={`${styles.bodyContainer} min-h-screen`}>
              {history.map((item, index) => (
                <div key={index} className="my-4 p-4 bg-white rounded-lg">
                  <div className="flex items-center">
                    <Image
                      src={item.image || "/dummyProfile.png"}
                      alt="recruiters image"
                      width={100}
                      height={100}
                      className={`${styles.imageRecruiters} rounded-full mr-4 object-cover`}
                    />
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm italic">
                        {item.job_position} di {item.company}{" "}
                      </p>
                      <p className="text-md">{item.hire_desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
