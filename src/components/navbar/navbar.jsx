import Image from "next/image";
import { Inter } from "next/font/google";
import Button from "../button/button";
import Styles from "./styles.module.css";
import { FiMail, FiBell } from "react-icons/fi";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  return (
    <div className={`${Styles.container} grid grid-cols-2 py-5`}>
      <div>
      <Link href="/">
          <Image src="/brand.svg" alt="peworld" width={127} height={35} />
        </Link>
      </div>
      <div className="col-start-2 flex items-center justify-end gap-10">
        <FiBell size={24} color="#9B9B9B" />
        <FiMail size={24} color="#9B9B9B" />
        <Image
          src="/hero.jpeg"
          alt="profile picture"
          width={32}
          height={32}
          className={Styles.roundedImage}
        />
      </div>
    </div>
  );
}
