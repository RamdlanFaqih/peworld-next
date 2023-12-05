// ... (existing imports)
import Styles from "./styles.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { TailSpin } from "react-loader-spinner";

const ExperienceTab = () => {
  const router = useRouter();
  const [experience, setExperience] = React.useState([]);
  const workers_id = router.query.workers_id;
  const [isLoading, setIsLoading] = React.useState(true); // Initialize with true
  console.log(workers_id);

  React.useEffect(() => {
    const getExperience = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EXPRESS}/experience/workers/${workers_id}`
        );
        setExperience(response.data.data.rows);
        setIsLoading(false);
      } catch (error) {
        console.log("get experience failed", error);
        setIsLoading(false); // Set loading to false even in case of an error
      }
    };
    getExperience();
  }, [workers_id]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center h-screen">
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
        experience.map((item, index) => (
          <div key={index} className="grid grid-cols-12 mb-10">
            <div
              className={`${Styles.logo} col-span-2 flex items-center justify-center`}
            >
              <Image
                src="/logoBlanja.png"
                alt="perusahaan"
                width={74}
                height={74}
                style={{ width: "74px", height: "74px" }}
              />
            </div>
            <div className="col-start-3 col-span-10">
              <div className={Styles.role}>{item.job_position}</div>
              <div className={Styles.company}>{item.company_name}</div>
              <div className={Styles.date}>{item.duration_employement}</div>
              <div className={Styles.description}>{item.experience_desc}</div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ExperienceTab;
