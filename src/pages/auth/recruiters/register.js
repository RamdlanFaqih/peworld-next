import Image from "next/image";
import { Inter } from "next/font/google";
import Styles from "../auth.module.css";
import axios from "axios";
import Button from "@/components/button/button";
import React from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  const [recruitersData, setRecruitersData] = React.useState({
    name: "",
    email: "",
    company: "",
    job_position: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecruitersData({ ...recruitersData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !recruitersData.name ||
      !recruitersData.email ||
      !recruitersData.company ||
      !recruitersData.job_position ||
      !recruitersData.phone_number ||
      !recruitersData.password ||
      !recruitersData.confirmPassword
    ) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
      return;
    }
    if (recruitersData.password !== recruitersData.confirmPassword) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/recruiters/register`,
        recruitersData
      );
      console.log("Data Terkirim", response.data);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(true);
      }, 3000);
    } catch (error) {
      console.log("Error", error);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(true);
      }, 3000);
    }
  };
  return (
    <div className="">
      <div className={Styles.container}>
        <div className={`${Styles.content} grid grid-cols-2`}>
          <div className={`${Styles.imageContainer} relative`}>
            <div className={`${Styles.overlay}`}></div>
            <div className={`${Styles.logo} absolute z-10`}>
              <Image
                src="/brandLight.svg"
                alt="peworld"
                width={86}
                height={24}
              />
            </div>
            <Image src="/hero.jpeg" alt="hero" fill={true} objectFit="cover" />
            <h1 className={`${Styles.heroTitle} absolute z-10 text-white`}>
              Temukan developer berbakat & terbaik di berbagai bidang keahlian
            </h1>
          </div>

          <div>
            <div className={Styles.loginContainer}>
              <div className={Styles.greetings}>
                <h1 className={Styles.halo}>Halo, Pewpeople</h1>
                <p className={Styles.desc}>
                  Selamat datang di Peworld! Silakan lengkapi formulir
                  pendaftaran untuk memulai pencarian talenta terbaik untuk tim.
                </p>
              </div>
              <div className={Styles.inputContainer}>
                <form className="flex flex-col gap-y-1" onSubmit={handleSubmit}>
                  <label className="font-semibold text-sm">Nama</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan Nama Panjang"
                    name="name"
                    value={recruitersData.name}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">Email</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan alamat email"
                    name="email"
                    value={recruitersData.email}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">Perusahaan</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan nama perusahaan"
                    name="company"
                    value={recruitersData.company}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">Jabatan</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Posisi di perusahaan anda"
                    name="job_position"
                    value={recruitersData.job_position}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">No Handphone</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan no handphone"
                    name="phone_number"
                    value={recruitersData.phone_number}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">Kata Sandi</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan Kata Sandi"
                    type="password"
                    name="password"
                    value={recruitersData.password}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Konfirmasi Kata Sandi"
                    name="confirmPassword"
                    value={recruitersData.confirmPassword}
                    onChange={handleChange}
                  />
                  <div className={Styles.actionContainer}>
                    <div className={Styles.buttonContainer}>
                      <Button
                        type="submit"
                        style="custom"
                        height="45px"
                        text="Daftar"
                      />
                      {showSuccessAlert && (
                        <div className="alert success">
                          Registrasi berhasil! Silakan masuk untuk melanjutkan.
                        </div>
                      )}
                      {showErrorAlert && (
                        <div className="alert error">
                          Gagal mendaftar. Pastikan semua informasi valid.
                        </div>
                      )}
                    </div>
                    <div className={`${Styles.register} text-center`}>
                      <p>
                        Anda sudah punya akun?
                        <Link
                          href="/auth/workers/login"
                          style={{ color: "#fbb017" }}
                        >
                          Masuk disini
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
