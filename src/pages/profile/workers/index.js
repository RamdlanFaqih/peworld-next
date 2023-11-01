import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";
import Styles from "./styles.module.css";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import { Tabs } from "flowbite-react";
import Skill from "@/components/skill/skill";
import PortofolioTabs from "./components/PortofolioTab";
import ExperienceTab from "./components/ExperienceTab";
import { FiMapPin } from "react-icons/fi";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function ProfileWorkers() {
  const router = useRouter();
  const [workersProfile, setWorkersProfile] = React.useState("");
  const [userRole, setUserRole] = React.useState("");

  React.useEffect(() => {
    const workers_id = localStorage.getItem("workers_id");
    console.log(workers_id);

    const getWorkers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/workers/getData/${workers_id}`
        );
        console.log(response.data.data.rows[0]);
        setWorkersProfile(response.data.data.rows[0]);
        setUserRole(response.data.data.rows[0].role);
      } catch (error) {
        console.log("get workers failed", error);
      }
    };
    getWorkers();
  }, []);

  const handleEditProfile = () => {
    router.push("/profile/workers/editProfile");
  };

  const profileImage = workersProfile?.image || "/dummyProfile.png";
  const profileName = workersProfile?.name || "Nama Pekerja";
  const profileProfession = workersProfile?.profession || "Profesi";
  const profileResidence = workersProfile?.residence || "Kota, Provinsi";
  const workCategory = workersProfile?.work_category || "Kategori Pekerjaan";
  const profileDescription = workersProfile?.workers_desc || "Deskripsi";
  return (
    <div>
      <div className={Styles.navbar}>
        <Navbar />
      </div>
      <div
        className={`${Styles.bodyContainer} grid grid-cols-1 lg:grid-cols-11 gap-10 p-5 lg:p-0`}
      >
        <div className="col-span-3 mb-10">
          <div className="bg-white rounded-lg">
            <div
              className={`${Styles.imageContainer} row-start-1 flex justify-center`}
            >
              <div style={{ width: "150px", height: "150px" }}>
                <Image
                  src={profileImage}
                  alt="profile picture"
                  width={150}
                  height={150}
                  className={Styles.roundedImage}
                />
              </div>
            </div>
            <div className="row-start-2 px-5">
              <div className={Styles.name}>{profileName}</div>
              <div className={Styles.job}>{profileProfession}</div>
              <div className={`${Styles.location} flex items-center`}>
                <FiMapPin />
                <p className="pl-1">{profileResidence}</p>
              </div>
              <div className={Styles.workCategory}>{workCategory}</div>
              <div className={`${Styles.aboutProfile}`}>
                {profileDescription}
              </div>
            </div>
            <div className={`${Styles.hire} px-5`}>
              {userRole === 0 && (
                <>
                  <Button type="filled" text="Hire" height="50px" />
                </>
              )}
              {userRole === 1 && (
                <>
                  <Button
                    type="filled"
                    text="Edit Profile"
                    height="50px"
                    onClick={handleEditProfile}
                  />
                </>
              )}

              <div className="mt-5">
                <div>Skill</div>
                <div className="flex flex-wrap gap-2">
                  <Skill name="Javascript" />
                  <Skill name="Node JS" />
                </div>
              </div>
            </div>
            <div className="px-5 py-5">
              <div className={Styles.gmail}>Louistommo@gmail.com</div>
              <div className={Styles.instagram}>@Louist91</div>
              <div className={Styles.github}>@Louistommo</div>
              <div className={Styles.gitlab}>@Louistommo91</div>
            </div>
          </div>
        </div>
        <div className="col-span-3 lg:col-start-4 lg:ml-10 lg:col-span-8">
          <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
            className="bg-white rounded-lg"
          >
            <Tabs.Item title="Portofolio">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <PortofolioTabs />
                <PortofolioTabs />
                <PortofolioTabs />
                <PortofolioTabs />
                <PortofolioTabs />
                <PortofolioTabs />
              </div>
            </Tabs.Item>
            <Tabs.Item title="Pengalaman Kerja">
              <div className="grid row-auto">
                <ExperienceTab />
              </div>
            </Tabs.Item>
          </Tabs.Group>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
