import Image from "next/image";
import React from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";
import Styles from "./styles.module.css";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import Skill from "@/components/skill/skill";
import { useRouter } from "next/router";
import { FiMapPin } from "react-icons/fi";
import Input from "@/components/input/Input";
import TextArea from "@/components/textArea/TextArea";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const inter = Inter({ subsets: ["latin"] });

export default function Hire() {
  const router = useRouter();
  const { workers_id } = router.query;
  const recruiters_id = Cookies.get("recruiters_id")
  const [workersProfile, setWorkersProfile] = React.useState("");
  const [skillProfile, setSkillProfile] = React.useState([]);
  const [hireData, setHireData] = React.useState({
    purpose: "",
    email: "",
    phone_number: "",
    hire_desc: "",
    workers_id: workers_id,
    recruiters_id: recruiters_id,
  });

  React.useEffect(() => {
    const getWorkers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EXPRESS}/workers/skill/${workers_id}`
        );
        setWorkersProfile(response.data.rows[0]);

        const skill = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EXPRESS}/skill/workers/${workers_id}`
        );
        setSkillProfile(skill.data.data);
      } catch (error) {
        console.log("get workers failed", error);
      }
    };
    getWorkers();
  }, []);


  const handleChange = (e) => {
    const {name, value} = e.target;
    setHireData({
      ...hireData,
      [name]: value
    })
  };

  const handleHire = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/hire/insert/${recruiters_id}`,
        hireData
      );
      console.log(response.data);
      Swal.fire({
        title: "Sukses!",
        text: "Berhasil Mengirimkan Pesan Hiring.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/")
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire("Error!", "Terjadi kesalahan saat mengirim pesan hiring.", "error");
    }
  }

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
      <div className={`${Styles.bodyContainer}`}>
        <div className="grid grid-cols-1 md:grid-cols-11">
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white rounded-lg px-10">
              <div className={`${Styles.imageContainer} flex justify-center`}>
                <div style={{ width: "150px", height: "150px" }}>
                  <Image
                    src={profileImage}
                    alt="profile picture"
                    width={150}
                    height={150}
                    objectFit="cover"
                    className={Styles.roundedImage}
                  />
                </div>
              </div>
              <div>
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
              <div className={`${Styles.hire} mt-5`}>
                <div className="py-5">
                  <div>Skill</div>
                  <div className="flex gap-2">
                    <Skill name="Javascript" />
                    <Skill name="PHP" />
                    <Skill name="Golang" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 mt-5 md:col-span-7 md:ml-10">
            <div>
              <div>
                <div className={Styles.hireTitle}>Hubungi {profileName}</div>
                <div className={Styles.hireDescription}>
                  Rekrut {profileName} menjadi bagian dari tim kamu
                </div>
              </div>
              <form onSubmit={handleHire} className={Styles.formHire}>
                <div>
                  <Input
                    type="text"
                    label="Tujuan Tentang Pesan Ini"
                    placeholder="Project"
                    name="purpose"
                    value={hireData.purpose}
                    onChange={handleChange}
                  />
                </div>
                {/* <div>
                  <Input
                    type="text"
                    label="Nama Lengkap"
                    placeholder="Masukan Nama Lengkap"
                    name=""
                  />
                </div> */}
                <div>
                  <Input
                    type="text"
                    label="Email"
                    placeholder="Masukan Email"
                    name="email"
                    value={hireData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    label="No Handphone"
                    placeholder="Masukan No Handphone"
                    name="phone_number"
                    value={hireData.phone_number}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextArea
                    type="text"
                    label="Deskripsi"
                    placeholder="Deskripsikan / Jelaskan lebih detail "
                    name="hire_desc"
                    value={hireData.hire_desc}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Button type="submit" style="custom" text="Hire" height="50px" />
                </div>
              </form>
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
