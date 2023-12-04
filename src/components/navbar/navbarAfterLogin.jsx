import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Button from "../button/button";
import Styles from "./styles.module.css";
import Link from "next/link";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function NavbarAfterLogin() {
  const userType = Cookies.get("role"); //
  const workers_id = Cookies.get("workers_id");
  const recruiters_id = Cookies.get("recruiters_id");
  const router = useRouter();

  let profileLink = `/profile/workers/${workers_id}`;
  let query = { userRole: userType, workers_id };
  if (userType === "0") {
    profileLink = `/profile/company`;
    query = {};
  }
  const handleProfileClick = () => {
    router.push({
      pathname: profileLink,
      query,
    });
  };

  return (
    <div
      className={`${Styles.container} flex flex-col md:flex-row justify-between py-5 px-4 md:px-10 lg:px-20 xl:px-32`}
    >
      <div className="mb-4 md:mb-0">
        <Link href="/">
          <Image
            src="/brand.svg"
            alt="peworld"
            width={127}
            height={35}
            layout="fixed"
            style={{ width: "127px", height: "35px" }}
          />
        </Link>
      </div>
      <div className="col-start-5 text-end flex flex-row">
        <div className="hidden md:flex px-10">
          <Link href="/home">Home</Link>
        </div>
        <div>
          <Button
            type="filled"
            text="Profile"
            width="100px"
            onClick={handleProfileClick}
          />
        </div>
      </div>
    </div>
  );
}
