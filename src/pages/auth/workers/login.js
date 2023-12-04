import Image from "next/image";
import { Inter } from "next/font/google";
import Styles from "../auth.module.css";
import Button from "@/components/button/button";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const router = useRouter()
  const [workers, setWorkers] = React.useState({
    email: "",
    password: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkers({ ...workers, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workers.email || !workers.password) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/login/workers`,
        workers
      );
      console.log("Login successful", response.data);
      Cookies.set(
        "token",
        (response.data.generateToken)
      );
      Cookies.set(
        "workers_id",
        JSON.stringify(response.data.workers_id)
      );
      Cookies.set(
        "role",
        (response.data.role)
      )
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        router.push("/")
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
      <div className={`container mx-auto ${Styles.container}`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 ${Styles.content}`}>
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
                    value={workers.email}
                    onChange={handleChange}
                  />
                  <label className="font-semibold text-sm">Kata sandi</label>
                  <input
                    className="border py-1 px-2 rounded-md"
                    placeholder="Masukan kata sandi"
                    name="password"
                    type="password"
                    value={workers.password}
                    onChange={handleChange}
                  />
                  <div className={Styles.actionContainer}>
                    <div className={Styles.forgotPassword}>
                      <p className="text-end">Lupa kata sandi ?</p>
                    </div>
                    <div className={Styles.buttonContainer}>
                      <Button
                        type="submit"
                        text="Masuk"
                        style="custom"
                        height="50px"
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
                          href="/auth/workers/register"
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
