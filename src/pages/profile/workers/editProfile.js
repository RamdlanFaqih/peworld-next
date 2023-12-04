import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Footer from "@/components/footer/footer";
import Styles from "./styles.module.css";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import { FiMapPin } from "react-icons/fi";
import { BiSolidPencil } from "react-icons/bi";
import Input from "@/components/input/Input";
import TextArea from "@/components/textArea/TextArea";
import axios from "axios";
import React from "react";
import EditProfiePic from "@/components/editProfilePic/editProfilePic";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const inter = Inter({ subsets: ["latin"] });

export default function EditProfileWorkers() {
  const router = useRouter();
  const [workersProfile, setWorkersProfile] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    profession: "",
    residence: "",
    workplace: "",
    work_category: "",
    workers_desc: "",
  });
  const [skill, setSkill] = React.useState({
    skill_name: "",
  });
  const [experience, setExperience] = React.useState({
    job_position: "",
    company_name: "",
    duration_employement: "",
    experience_desc: "",
  });
  const [portofolio, setPortofolio] = React.useState({
    app_name: "",
    repository: "",
    app_type: "",
    image: "",
  });

  const [appImage, setAppImage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const workers_id = Cookies.get("workers_id");
  const userType = Cookies.get("role");
  console.log(userType);
  console.log(workers_id);

  React.useEffect(() => {
    console.log(workers_id);

    const getWorkers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EXPRESS}/workers/${workers_id}`
        );
        setWorkersProfile(response.data.data.rows[0]);
        setUserRole(response.data.data.rows[0].role);
        console.log(response.data.data.rows[0]);
      } catch (error) {
        console.log("get workers failed", error);
      }
    };
    getWorkers();
  }, [workers_id]);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSkill({
      ...skill,
      [name]: value,
    });
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value,
    });
  };

  const handlePortofolioChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPortofolio({
      ...portofolio,
      [name]: value,
    });
  };

  const handleAppImage = (e) => {
    const uploader = e.target.files[0];
    setAppImage(uploader);
    console.log(uploader);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workers_id = Cookies.get("workers_id");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/update/workers/biodata/${workers_id}`,
        data
      );
      console.log(response.data);
      Swal.fire({
        title: "Sukses!",
        text: "Data diri berhasil diupdate.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log("Update Failed", error);
      Swal.fire("Error!", "Terjadi kesalahan saat update.", "error");
    }
  };

  const handleSkillSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/skill/insert/${workers_id}`,
        skill
      );
      console.log(response.data);
      Swal.fire({
        title: "Sukses",
        text: "Skill Berhasil Ditambahkan",
        icon: "success",
        comfirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log("Error insert skill", error);
      Swal.fire("Error!", "Terjadi kesalahan saat menambahkan Skill.", "error");
    }
  };

  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/experience/insert/data/${workers_id}`,
        experience
      );
      console.log(response.data);
      Swal.fire({
        title: "Sukses",
        text: "Pengalaman Berhasil Ditambahkan",
        icon: "success",
      }).then(() => {
        router.push({
          pathname: `/profile/workers/${workers_id}`,
          query: { userRole: userType, workers_id },
        });
      });
    } catch (error) {
      console.log("Error Insert Experience", error);
    }
  };

  const handlePortofolioSubmit = async (e) => {
    e.preventDefault();

    const portofolioData = new FormData();
    portofolioData.append("app_name", portofolio.app_name);
    portofolioData.append("repository", portofolio.repository);
    portofolioData.append("app_type", portofolio.app_type);
    portofolioData.append("image", appImage);

    console.log(portofolioData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/portofolio/insert/${workers_id}`,
        portofolioData
      );
      console.log(response.data);
      Swal.fire({
        title: "Sukses",
        text: "Portofolio Berhasil Ditambahkan",
        icon: "success",
      }).then(() => {
        router.push({
          pathname: `/profile/workers/${workers_id}`,
          query: { userRole: userType, workers_id },
        });
      });
    } catch (error) {
      console.log("Error inserting portofolio", error);
    }
  };

  const profileImage = workersProfile?.image || "/dummyProfile.png";
  const profileName = workersProfile?.name || "Nama Pekerja";
  const profileProfession = workersProfile?.profession || "Profesi";
  const profileResidence = workersProfile?.residence || "Kota, Provinsi";
  const workCategory = workersProfile?.work_category || "Kategori Pekerjaan";

  return (
    <div>
      <div className={`${Styles.navbar} px-10`}>
        <Navbar />
      </div>
      <div
        className={`${Styles.bodyContainer} px-4 md:px-10 py-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4`}
      >
        <div className="col-span-1 lg:col-span-4">
          <div className="bg-white rounded-lg px-10">
            <div
              className={`${Styles.imageContainer}  flex flex-col items-center justify-center`}
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
              <div className={Styles.job}>{profileProfession}</div>
              <div className={`${Styles.location} flex items-center`}>
                <FiMapPin />
                <p className="pl-1">{profileResidence}</p>
              </div>
              <div className={Styles.workCategory}>{workCategory}</div>
            </div>
          </div>
        </div>
        <div className="col-span-1 col-start-1 lg:col-start-5 lg:col-span-8">
          <div>
            <div className="bg-white rounded-lg">
              <div className="border-b">
                <h1 className="px-5 py-5">Data Diri</h1>
              </div>
              <form onSubmit={handleSubmit} className="px-5">
                <Input
                  type="text"
                  label="Nama Lengkap"
                  placeholder="Masukan Nama Lengkap"
                  name="name"
                  value={data.name}
                  onChange={handleUpdateChange}
                />
                <Input
                  type="text"
                  label="Job Desk"
                  placeholder="Masukan Job Desk"
                  name="profession"
                  value={data.profession}
                  onChange={handleUpdateChange}
                />
                <Input
                  type="text"
                  label="Domisili"
                  placeholder="Masukan Domisili"
                  name="residence"
                  value={data.residence}
                  onChange={handleUpdateChange}
                />
                <Input
                  type="text"
                  label="Tempat Kerja"
                  placeholder="Masukan tempat kerja"
                  name="workplace"
                  value={data.workplace}
                  onChange={handleUpdateChange}
                />
                <Input
                  type="text"
                  label="Jenis Kontrak Kerja"
                  placeholder="Masukan Jenis Kontrak Kerja"
                  name="work_category"
                  value={data.work_category}
                  onChange={handleUpdateChange}
                />
                <TextArea
                  label="Deskripsi Singkat"
                  placeholder="Tuliskan Deskripsi singkat"
                  name="workers_desc"
                  value={data.workers_desc}
                  onChange={handleUpdateChange}
                />
                <Button
                  style="filled"
                  text="Simpan"
                  type="submit"
                  onClick={handleSubmit}
                />
              </form>
            </div>
            <div className="bg-white rounded-lg mt-10">
              <div className="border-b">
                <h1 className="px-5 py-5">Skill</h1>
              </div>
              <div className="px-5">
                <form
                  onSubmit={handleSkillSumbit}
                  className="flex flex-col gap-5"
                >
                  <Input
                    type="text"
                    placeholder="Masukan Keahlian"
                    className="w-full md:w-3/4 lg:w-1/2"
                    height="50px"
                    name="skill_name"
                    value={skill.skill_name}
                    onChange={handleSkillChange}
                  />
                  <Button
                    type="submit"
                    text="Simpan"
                    className="w-full md:w-auto"
                  />
                </form>
              </div>
            </div>

            <div className="bg-white rounded-lg mt-10">
              <div className="border-b">
                <h1 className="px-5 py-5">Pengalaman Kerja</h1>
              </div>
              <form onSubmit={handleExperienceSubmit}>
                <div className="px-5">
                  <Input
                    type="text"
                    label="Posisi"
                    placeholder="Web Developer"
                    name="job_position"
                    value={experience.job_position}
                    onChange={handleExperienceChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5 px-5">
                  <div>
                    <Input
                      type="text"
                      label="Nama Perusahaan"
                      placeholder="PT Harus Bisa"
                      name="company_name"
                      value={experience.company_name}
                      onChange={handleExperienceChange}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Bulan / Tahun"
                      placeholder="Januari / 2018"
                      name="duration_employement"
                      value={experience.duration_employement}
                      onChange={handleExperienceChange}
                    />
                  </div>
                </div>
                <div className="px-5">
                  <TextArea
                    label="Deskripsi Singkat"
                    placeholder="Deskripsi singkat pekerjaan anda"
                    name="experience_desc"
                    value={experience.experience_desc}
                    onChange={handleExperienceChange}
                  />
                </div>
                <div className="h-10 px-5 mt-10 ">
                  <Button type="submit" text="Tambah Pengalaman Kerja" />
                </div>
              </form>
            </div>
            <div className="bg-white rounded-lg my-5">
              <div className="border-b">
                <h1 className="px-5 py-5 mt-10">Portofolio</h1>
              </div>
              <form onSubmit={handlePortofolioSubmit} className="px-5  py-6">
                <div>
                  <Input
                    type="text"
                    label="Nama Aplikasi"
                    placeholder="Masukan Nama Aplikasi"
                    name="app_name"
                    value={portofolio.app_name}
                    onChange={handlePortofolioChange}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    label="Link Repository"
                    placeholder="Masukan Link Repository"
                    name="repository"
                    value={portofolio.repository}
                    onChange={handlePortofolioChange}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="text-indigo-600"
                      name="app_type"
                      value="web"
                      checked={portofolio.app_type === "web"}
                      onChange={handlePortofolioChange}
                    />
                    <span className="ml-2">Aplikasi Web</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="app_type"
                      value="mobile"
                      checked={portofolio.app_type === "mobile"}
                      onChange={handlePortofolioChange}
                    />
                    <span className="ml-2">Aplikasi Mobile</span>
                  </label>
                </div>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleAppImage}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, & JPEG Max. 5 mb
                    </p>
                  </div>
                </div>
                <div className="h-10  mt-10 ">
                  <Button
                    type="submit"
                    style="outline"
                    text="Tambah Portofolio"
                  />
                </div>
              </form>
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
