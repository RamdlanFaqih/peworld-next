import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import React from "react";
import Styles from "../auth.module.css";
import Button from "@/components/button/button";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const router = useRouter();
  const [recruiters, setRecruiters] = React.useState({
    email: "",
    password: "",
  });
  const [showSuccessAlert, setShowSuccesAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setRecruiters({ ...recruiters, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recruiters.email || !recruiters.password) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/recruiters/login`,
        recruiters
      );
      console.log("Login successful", response.data);
      Cookies.set("token", JSON.stringify(response.data.generateToken));
      Cookies.set("recruiters_id", JSON.stringify(response.data.recruiters_id));
      Cookies.set("role", JSON.stringify(response.data.role));
      setShowSuccesAlert(true);
      setTimeout(() => {
        setShowSuccesAlert(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      console.log("Error", error);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
    }
  };

  return (
    <div className={`bg-gray-100 min-h-screen ${Styles.background}`}>
      <div className={`${Styles.container} container mx-auto`}>
        <div className={`${Styles.content} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10`}>
          <div className={`${Styles.imageContainer} relative md:w-3/5 lg:w-2/3 xl:w-1/2`}>
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
                  Untuk melanjutkan, silakan masuk ke akun Anda.
                </p>
              </div>
              <div className={Styles.inputContainer}>
                <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
                  <label className="font-semibold text-sm">Email</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan alamat email"
                    name="email"
                    value={recruiters.email}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">Kata sandi</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan kata sandi"
                    type="password"
                    name="password"
                    value={recruiters.password}
                    onChange={handleChange}
                  />
                  <div className={Styles.actionContainer}>
                    <div className={Styles.forgotPassword}>
                      <p className="text-end">Lupa kata sandi ?</p>
                    </div>
                    <div className={Styles.buttonContainer}>
                      <Button
                        type="submit"
                        style="custom"
                        height="50px"
                        text="Masuk"
                      />
                      {showSuccessAlert && (
                        <div
                          className={`${Styles.alert} ${Styles.success} text-center mt-4`}
                        >
                          Login berhasil!
                        </div>
                      )}
                      {showErrorAlert && (
                        <div
                          className={`${Styles.alert} ${Styles.error} text-center mt-4`}
                        >
                          Gagal Masuk. Pastikan semua informasi valid.
                        </div>
                      )}
                    </div>
                    <div className={`${Styles.register} text-center`}>
                      <p>
                        Anda belum punya punya akun?
                        <Link
                          href="/auth/recruiters/register"
                          style={{ color: "#fbb017" }}
                        >
                          Daftar disini
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
