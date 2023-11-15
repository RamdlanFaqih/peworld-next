import { useRouter } from "next/router";
import Styles from "./styles.module.css";
import Image from "next/image";
import axios from "axios";
import React from "react";
import Cookies from "js-cookie";

const PortofolioTabs = () => {
  const router = useRouter();
  const [portofoliio, setPortofolio] = React.useState([]);
  const workers_id = Cookies.get("workers_id");

  React.useEffect(() => {
    const getPortofolio = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_CSR}/portofolio/workers/${workers_id}`
        );
        setPortofolio(response.data.data.rows);
      } catch (error) {
        console.log("get experience failed", error);
      }
    };
    getPortofolio();
  }, [workers_id]);
  return (
    <>
      {portofoliio.map((item, index) => (
        <div key={index} className="flex flex-col items-center bg-blue-100">
          <Image
            src={item.image}
            alt="hero"
            width={219}
            height={148}
            className={`rounded-lg`}
            style={{width: '219px', height: '148px', objectFit: 'cover'}}
          />
          <div className={Styles.portofolio}>{item.app_name}</div>
        </div>
      ))}
    </>
  );
};

export default PortofolioTabs;
