import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";
import Styles from "./styles.module.css";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className={Styles.navbar}>
        <Navbar />
      </div>
      <div className={Styles.topJobs}>
        <h1 className={`${Styles.topJobsText}`}>Top Jobs</h1>
      </div>
      <div className={`${Styles.bodyContainer}`}>
        <div>
          <form className="flex gap-y-2 p-3 bg-white items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch size={23} />
              </div>
              <input
                className="py-1 pl-10 pr-3 rounded-md w-full outline-none"
                placeholder="Search for any skill"
              />
            </div>
            <div className={Styles.sort}>Sort</div>
            <div className="flex-none w-20 md:w-auto">
              <Button style="filled" text="Search" width="100%" />
            </div>
          </form>

          <div
            className={`${Styles.profile} md:flex md:items-center md:justify-center sm:flex-col sm:items-start`}
          >
            <div
              className={`${Styles.profileRows} grid grid-cols-12 gap-4 md:w-full`}
            >
              <div className="col-span-2 flex justify-center items-center">
                <div>
                  <Image
                    src="/hero.jpeg"
                    alt="profile picture"
                    width={100}
                    height={100}
                   
                    objectFit="contain"
                    className={Styles.roundedImage}
                  />
                </div>
              </div>
              <div className="col-start-3 col-span-6 flex flex-col justify-center">
                <div className="flex flex-col justify-center gap-1">
                  <h1 className={Styles.name}>Louis Tomlinson</h1>
                  <p className={Styles.job}>Web Developer</p>
                  <div className={`${Styles.location} flex items-center`}>
                    <FiMapPin />
                    <p className="pl-1">Lorem Ipsum</p>
                  </div>
                </div>
                <div
                  className={`${Styles.skillsContainer} flex flex-wrap gap-2`}
                >
                  <div className={Styles.skillsBox}>
                    <h1 className={Styles.skills}>PHP</h1>
                  </div>
                  <div className={Styles.skillsBox}>
                    <h1 className={Styles.skills}>JavaScript</h1>
                  </div>
                  <div className={Styles.skillsBox}>
                    <h1 className={Styles.skills}>HTML</h1>
                  </div>
                </div>
              </div>
              <div className="col-start-11 col-span-2 flex items-center justify-center md:w-full sm:w-auto">
                <div>
                  <Button type="filled" text="Lihat Profile" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${Styles.pagination} flex items-center justify-center space-x-4 mt-8`}
          >
            <button
              className={`${Styles.buttonPagination} border rounded-sm flex items-center justify-center`}
            >
              <MdOutlineNavigateBefore size={24} color="#DDDDDE" />
            </button>
            <div className="flex space-x-2">
              <button
                className={`${Styles.buttonPagination} border rounded-sm`}
              >
                1
              </button>
            </div>
            <button
              className={`${Styles.buttonPagination} border rounded-sm flex items-center justify-center`}
            >
              <MdOutlineNavigateNext size={24} color="#DDDDDE" />
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
