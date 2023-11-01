import Image from "next/image";
import { Inter } from "next/font/google";
import Button from "../button/button";
import Styles from "./styles.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function NavbarAfterLogin() {
  const userType = localStorage.getItem("role"); // Ambil jenis pengguna dari localStorage

  let profileLink = "/profile/workers";
  if (userType === "0") {
    profileLink = "/profile/company";
  }

  return (
    <div className={`${Styles.container} grid grid-cols-6 py-5`}>
      <div>
        <Link href="/">
          <Image src="/brand.svg" alt="peworld" width={127} height={35} />
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/home">Home</Link>
      </div>
      <div className="col-start-6 text-end">
        <Link href={profileLink}> {/* Gunakan tautan profil yang sudah ditentukan */}
          <Button type="filled" text="Profile" width="100px" />
        </Link>
      </div>
    </div>
  );
}
