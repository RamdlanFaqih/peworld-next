import { useRouter } from "next/router";
import Styles from "./styles.module.css";
import Image from "next/image";
import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";


const PortofolioTabs = () => {
  const router = useRouter();
  const [portofolio, setPortofolio] = React.useState([]);
  const workers_id = router.query.workers_id;
  const [isLoading, setIsLoading] = React.useState(true)
  console.log(workers_id);

  React.useEffect(() => {
    const getPortofolio = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EXPRESS}/portofolio/workers/${workers_id}`
        );
        setPortofolio(response.data.data.rows);
        setIsLoading(false)
        console.log("ini portofolio", response.data.data.rows);
      } catch (error) {
        console.log("get experience failed", error);
        setIsLoading(false)
      }
    };
    getPortofolio();
  }, [workers_id]);

  const handleDelete = async (portofolio_id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/portofolio/delete/${portofolio_id}`
      )
      
      Swal.fire({
        title: "Sukses!",
        text: "Data diri berhasil dihapus",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log("failed to delete recipe", error);
    }
  }
  return (
    <>
    {isLoading ? (
      <div className="flex justify-center">
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
    ): (
      portofolio.map((item, index) => (
        <div key={index} className="flex flex-col items-center relative">
          <Image
            src={item.image}
            alt="hero"
            width={219}
            height={148}
            className={`rounded-lg ${Styles.imagePortofolio}`}
            style={{ width: "219px", height: "148px", objectFit: "cover" }}
          />
          <div className={Styles.portofolio}>{item.app_name}</div>
          <span onClick={() => handleDelete(item.portofolio_id)} className={`${Styles.deleteIcon} absolute right-6`}>
            <FaTrash />
          </span>
        </div>
      ))
    )}
     
    </>
  );
};

export default PortofolioTabs;
