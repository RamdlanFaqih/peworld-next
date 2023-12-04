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
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps({ query }) {
  const workers_id = query.workers_id;
  const userRole = query.userRole
  console.log("userRole dari ssr", userRole);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_EXPRESS}/workers/skill/${workers_id}`
    );
    const workersProfile = response.data.rows[0];
    const skill = await axios.get(
      `${process.env.NEXT_PUBLIC_API_EXPRESS}/skill/workers/${workers_id}`
    );
    const skillProfile = skill.data.data;

    return {
      props: {
        workersProfile,
        skillProfile,
        workers_id,
        userRole,
      },
    };
  } catch (error) {
    console.log("Error Fetching Data", error);

    return {
      props: {
        workersProfile: {},
        skillProfile: [],
        workers_id: "",
        userRole: "0"
      },
    };
  }
}

export default function ProfileWorkers({
  workersProfile,
  skillProfile,
  workers_id,
  userRole
}) {
  const router = useRouter();

  console.log("ini userRole", userRole);

  const handleEditProfile = () => {
    router.push(`/profile/workers/editProfile`);
  };

  const handleHire = () => {
    router.push(`/profile/workers/hire?workers_id=${workers_id}`);
  };

  const profileImage = workersProfile?.workers_image || "/dummyProfile.png";
  const profileName = workersProfile?.workers_name || "Nama Pekerja";
  const profileProfession = workersProfile?.workers_profession || "Profesi";
  const profileResidence =
    workersProfile?.workers_residence || "Kota, Provinsi";
  const workCategory =
    workersProfile?.workers_work_category || "Kategori Pekerjaan";
  const profileDescription =
    workersProfile?.workers_workers_desc || "Deskripsi";
  return (
    <div>
      <div className={`${Styles.navbar} px-10`}>
        <Navbar />
      </div>
      <div
        className={`${Styles.bodyContainer} grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-10 p-5 lg:p-0`}
      >
        <div className="profile sm:col-span-1 md:col-span-4 lg:col-span:3 mb-10">
          <div className="bg-white rounded-lg">
            <div
              className={`${Styles.imageContainer} row-start-1 flex justify-center `}
            >
              <div className="w-full h-auto flex items-center justify-center">
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
              {userRole === "0" && (
                <>
                  <Button
                    type="filled"
                    text="Hire"
                    height="50px"
                    onClick={handleHire}
                  />
                </>
              )}
              {userRole === "1" && (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {skillProfile.map((item, index) => (
                    <Skill key={index} name={item.skill_name} />
                  ))}
                </div>
              </div>
            </div>
            <div className="px-5 py-5">
              <div className={Styles.gmail}>{workersProfile.workers_email}</div>
              <div className={Styles.instagram}>
                {workersProfile.workers_instagram_url}
              </div>
              <div className={Styles.github}>
                {workersProfile.workers_github_url}
              </div>
              <div className={Styles.gitlab}>
                {workersProfile.workers_gitlab_url}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-start-5 lg:col-span-8 lg:ml-10">
          <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
            className="bg-white rounded-lg"
          >
            <Tabs.Item title="Portofolio">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
