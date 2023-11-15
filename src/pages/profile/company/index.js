import Footer from "@/components/footer/footer";
import { Cookie, Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Styles from "./styles.module.css";
import Image from "next/image";
import Button from "@/components/button/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function ProfileWorkers() {
  const router = useRouter();
  const [recruitersProfile, setRecruitersProfile] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const recruiters_id = Cookies.get("recruiters_id");
  console.log(recruiters_id);

  React.useEffect(() => {
    const getRecruiters = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_CSR}/recruiters/${recruiters_id}`
        );
        setRecruitersProfile(response.data.data.rows[0]);
        console.log(response.data.data.rows[0]);
        setUserRole(response.data.data.rows[0].recruiters_role);
      } catch (error) {
        console.log("get recruiters failed", error);
      }
    };
    getRecruiters();
  }, []);

  const handleEditProfile = () => {
    router.push(`/profile/company/${recruiters_id}`)
  }

  const profileImage = recruitersProfile?.image || "/dummyProfile.png";
  const profileName = recruitersProfile?.name || "Recruiters Name";
  const profileField = recruitersProfile?.field|| "Recruiters Field";
  const profileCity = recruitersProfile?.city || "Recruiters City";
  const profileDesc = recruitersProfile?.recruiters_desc || "Recruiters Descriptions";
  const profileEmail = recruitersProfile?.email || "Recruiters Email";
  const profilePhoneNumber = recruitersProfile?.phone_number || "Recruiters Phone Number";
  const profileLinkedin = recruitersProfile?.linkedin || "Recruiters Linkedin";

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className={Styles.bodyContainer}>
        <div className="bg-white h-50 rounded-lg">
          <div className={`${Styles.displayPicture} pt-10 flex justify-center`}>
            <Image
              src={profileImage}
              alt="Profile Company"
              width={150}
              height={150}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div
            className={` ${Styles.profileData} flex flex-col items-center text-center justify-center`}
          >
            <div className={Styles.company}>{profileName}</div>
            <div className={Styles.field}>{profileField}</div>
            <div className={Styles.residence}>{profileCity}</div>
            <div className={Styles.description}>
              {profileDesc}
            </div>
            <div className={Styles.buttonEditProfile}>
                <Button
                  style="filled"
                  height="50px"
                  text="Edit Profile"
                  onClick={handleEditProfile}
                />
            </div>
            <div className="px-5 py-5">
              <div className={Styles.gmail}>{profileEmail}</div>
              {/* <div className={Styles.instagram}>@Louist91</div> */}
              <div className={Styles.github}>{profilePhoneNumber}</div>
              <div className={Styles.gitlab}>{profileLinkedin}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
