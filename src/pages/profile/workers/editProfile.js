import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";
import Styles from "./styles.module.css";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import { FiMapPin } from "react-icons/fi";
import { BiSolidPencil } from "react-icons/bi"
import Input from "@/components/input/Input";
import TextArea from "@/components/textArea/TextArea";
import axios from "axios";
import React from "react";
import EditProfiePic from "@/components/editProfilePic/editProfilePic";

const inter = Inter({ subsets: ["latin"] });


export default function EditProfileWorkers() {
  const [workersProfile, setWorkersProfile] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
      <div className={`${Styles.bodyContainer}`}>
        <div className="grid grid-cols-11">
          <div className="col-span-3 ">
            <div className="bg-white rounded-lg px-10">
              <div className={`${Styles.imageContainer}  flex flex-col items-center justify-center`}>
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
                <div className="flex items-center justify-center" onClick={() => setIsModalOpen(true)}> <BiSolidPencil/>Edit</div>
              </div>
              <div>
                <div className={Styles.name}>{profileName}</div>
                <div className={Styles.job}>{profileProfession}</div>
                <div className={`${Styles.location} flex items-center`}>
                  <FiMapPin />
                  <p className="pl-1">{profileResidence}</p>
                </div>
                <div className={Styles.workCategory}>{workCategory}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Button style="filled" text="Simpan" />
              <Button style="outline" text= "Batal" />
            </div>
          </div>
          <div className="col-start-4 ml-10 col-span-9">
            <div>
              <div className="bg-white rounded-lg">
                <div className="border-b">
                  <h1 className="px-5 py-5">Data Diri</h1>
                </div>
                <div className="px-5">
                  <Input
                    type="text"
                    label="Nama Lengkap"
                    placeholder="Masukan Nama Lengkap"
                  />
                  <Input
                    type="text"
                    label="Job Desk"
                    placeholder="Masukan Job Desk"
                  />
                  <Input
                    type="text"
                    label="Domisili"
                    placeholder="Masukan Domisili"
                  />
                  <Input
                    type="text"
                    label="Tempat Kerja"
                    placeholder="Masukan tempat kerja"
                  />
                  <TextArea
                    label="Deskripsi Singkat"
                    placeholder="Tuliskan Deskripsi singkat"
                  />
                </div>
              </div>
              <div className="bg-white rounded-lg mt-10">
                <div className="border-b">
                  <h1 className="px-5 py-5">Skill</h1>
                </div>
                <div className="px-5">
                  <div className="flex gap-5">
                    <Input
                      type="text"
                      placeholder="Masukan Nama Lengkap"
                      width="720px"
                      height="50px"
                    />
                    <Button
                      type="filled"
                      text="simpan"
                      width="80px"
                      height="50px"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg mt-10">
                <div className="border-b">
                  <h1 className="px-5 py-5">Pengalaman Kerja</h1>
                </div>
                <div>
                  <div className="px-5">
                    <Input
                      type="text"
                      label="Posisi"
                      placeholder="Web Developer"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5 px-5">
                    <div>
                      <Input
                        type="text"
                        label="Nama Perusahaan"
                        placeholder="PT Harus Bisa"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Bulan / Tahun"
                        placeholder="Januari / 2018"
                      />
                    </div>
                  </div>
                  <div className="px-5">
                    <TextArea
                      label="Deskripsi Singkat"
                      placeholder="Deskripsi singkat pekerjaan anda"
                    />
                  </div>
                  <div className="h-10 px-5 mt-10 ">
                    <Button type="outline" text="Tambah Pengalaman Kerja" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg my-5">
                <div className="border-b">
                  <h1 className="px-5 py-5 mt-10">Portofolio</h1>
                </div>
                <div className="px-5  py-6">
                  <div>
                    <Input
                      type="text"
                      label="Nama Aplikasi"
                      placeholder="Masukan Nama Aplikasi"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Link Repository"
                      placeholder="Masukan Link Repository"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-indigo-600"
                        name="platform"
                        value="web"
                      />
                      <span className="ml-2">Aplikasi Web</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-indigo-600"
                        name="platform"
                        value="mobile"
                      />
                      <span className="ml-2">Aplikasi Mobile</span>
                    </label>
                  </div>
                  <div className="h-10  mt-10 ">
                    <Button type="outline" text="Tambah Portofolio" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <EditProfiePic onClose={() => setIsModalOpen(false)} />}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
