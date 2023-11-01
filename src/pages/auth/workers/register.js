import Image from "next/image";
import { Inter } from "next/font/google";
import Styles from "../auth.module.css";
import Button from "@/components/button/button";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  const router = useRouter();
  const [workersData, setWorkersData] = React.useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkersData({ ...workersData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !workersData.name ||
      !workersData.email ||
      !workersData.phone_number ||
      !workersData.password ||
      !workersData.confirmPassword
    ) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
      return;
    }

    if (workersData.password !== workersData.confirmPassword) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/workers/register`,
        workersData
      );
      console.log("Data terkirim:", response.data);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        router.push("/auth/workers/login")
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
        
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
                  Selamat datang di Pewrold! Silakan lengkapi formulir
                  pendaftaran untuk memulai perjalanan karier Anda bersama kami.
                </p>
              </div>
              <div className={Styles.inputContainer}>
                <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
                  <label className="font-semibold text-sm">Nama</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan Nama Panjang"
                    name="name"
                    value={workersData.name}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">Email</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan alamat email"
                    name="email"
                    value={workersData.email}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">No Handphone</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan no handphone"
                    name="phone_number"
                    value={workersData.phone_number}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">Kata Sandi</label>
                  <input
                    className="border-slate-200 py-1 px-2 rounded-md"
                    placeholder="Masukan Kata Sandi"
                    type="password"
                    name="password"
                    value={workersData.password}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    className="border-slate-200 py-1 px-2 rounded-md"
                    placeholder="Konfirmasi Kata Sandi"
                    type="password"
                    name="confirmPassword"
                    value={workersData.confirmPassword}
                    onChange={handleChange}
                  />
                  <div className={Styles.actionContainer}>
                    <div className={Styles.buttonContainer}>
                      <Button
                        text="Daftar"
                        style="custom"
                        height="45px"
                        type="submit"
                      />
                      {showSuccessAlert && (
                        <div className={`${Styles.alert} ${Styles.success} text-center mt-4`}>
                          Registrasi berhasil! Silakan masuk untuk melanjutkan.
                        </div>
                      )}
                      {showErrorAlert && (
                        <div className={`${Styles.alert} ${Styles.error} text-center mt-4`}>
                          Gagal mendaftar. Pastikan semua informasi valid.
                        </div>
                      )}
                    </div>
                    <div className={`${Styles.register} text-center`}>
                      <p>
                        Anda sudah punya akun?{" "}
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
