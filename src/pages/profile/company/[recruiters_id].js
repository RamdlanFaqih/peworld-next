import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";
import Styles from "./edit.module.css";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import { FiMapPin } from "react-icons/fi";
import Input from "@/components/input/Input";
import TextArea from "@/components/textArea/TextArea";
import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import EditProfiePicRecruiters from "@/components/editProfilePic/recruiters";
import { BiSolidPencil } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";

export default function EditProfileCompany() {
  const [recruitersProfile, setRecruitersProfile] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState("");
  const [data, setData] = React.useState({
    company: "",
    field: "",
    city: "",
    recruiters_desc: "",
    email: "",
    phone_number: "",
    linkedin: "",
  });
  const recruiters_id = Cookies.get("recruiters_id");
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const getRecruiters = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EXPRESS}/recruiters/${recruiters_id}`
        );
        setRecruitersProfile(response.data.data.rows[0]);
        console.log(response.data.data.rows[0]);
        setUserRole(response.data.data.rows[0].recruiters_role);
        setIsLoading(false);
      } catch (error) {
        console.log("get recruiters failed", error);
      }
    };
    getRecruiters();
  }, [recruiters_id]);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/recruiters/update/profile/${recruiters_id}`,
        data
      );
      console.log(response.data);
      router.push("/profile/company");
    } catch (error) {
      console.log("Update Failed:", error);
    }
  };

  const profileImage = recruitersProfile?.image || "/dummyProfile.png";
  const profileName = recruitersProfile?.name || "Recruiters Name";
  const profileField = recruitersProfile?.field || "Recruiters Field";
  const profileCity = recruitersProfile?.city || "Recruiters City";
  return (
    <div>
      <div className="px-10">
        <Navbar />
      </div>
      <div className={`${Styles.bodyContainer}`}>
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
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            <div className="col-span-1">
              <div className="bg-white rounded-lg px-10 mb-4">
                <div
                  className={`${Styles.imageContainer} flex flex-col items-center justify-center`}
                >
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
                  <div
                    className="flex items-center justify-center"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <BiSolidPencil />
                    Edit
                  </div>
                </div>
                <div>
                  <div className={Styles.name}>{profileName}</div>
                  <div className={Styles.job}>{profileField}</div>
                  <div className={`${Styles.location} flex items-center`}>
                    <FiMapPin />
                    <p className="pl-1">{profileCity}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:ml-5 col-span-3">
              <div className="bg-white rounded-lg pb-10 mb-5">
                <div className="border-b">
                  <h1 className="px-5 py-5">Data Diri</h1>
                </div>
                <form onSubmit={handleSubmit} className="px-5">
                  <Input
                    type="text"
                    label="Nama Perushaan"
                    placeholder="Masukan Nama Perusahaan"
                    name="company"
                    value={data.company}
                    onChange={handleUpdateChange}
                  />
                  <Input
                    type="text"
                    label="Bidang"
                    placeholder="Masukan bidang perusahaan ex : Financial "
                    name="field"
                    value={data.field}
                    onChange={handleUpdateChange}
                  />
                  <Input
                    type="text"
                    label="Kota"
                    name="city"
                    value={data.city}
                    onChange={handleUpdateChange}
                    placeholder="Masukan Kota"
                  />
                  <TextArea
                    label="Deskripsi Singkat"
                    placeholder="Tuliskan Deskripsi singkat"
                    name="recruiters_desc"
                    value={data.recruiters_desc}
                    onChange={handleUpdateChange}
                  />
                  <Input
                    type="text"
                    label="Email"
                    placeholder="Masukan Email"
                    name="email"
                    value={recruitersProfile.email}
                  />
                  <Input
                    type="text"
                    label="Instagram"
                    placeholder="Masukan Nama Instagram"
                  />
                  <Input
                    type="text"
                    label="Nomor Telepon"
                    placeholder="Masukan Nomor Telepon"
                    name="phone_number"
                    value={data.phone_number}
                    onChange={handleUpdateChange}
                  />
                  <Input
                    type="text"
                    label="Linkedin"
                    placeholder="Masukan Linkedin"
                    name="linkedin"
                    value={data.linkedin}
                    onChange={handleUpdateChange}
                  />
                  <Button type="submit" style="outline" text="Simpan" />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <EditProfiePicRecruiters onClose={() => setIsModalOpen(false)} />
      )}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
