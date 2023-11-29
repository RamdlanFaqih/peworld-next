import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Button from "../button/button";
import Styles from "./styles.module.css";
import { FiMail, FiBell } from "react-icons/fi";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  const userType = Cookies.get("role");
  const workers_id = Cookies.get("workers_id");
  const recruiters_id = Cookies.get("recruiters_id");
  const [users, setUsers] = React.useState("");
  const [isDropdownVisible, setDropdownVisible] = React.useState(false);

  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  let profileLink = `/profile/workers/${workers_id}`;
  if (userType === "0") {
    profileLink = `/profile/company`;
    
  }
  const handleProfileClick = () => {
    router.push({
      pathname: profileLink,
      query: { userRole: userType, workers_id },
    });
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("workers_id");
    Cookies.remove("recruiters_id");
    Cookies.remove("role");

    router.push("/")
  }
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;

        if (userType === "0") {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_CSR}/recruiters/${recruiters_id}`
          );
        } else if (userType === "1") {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_CSR}/workers/${workers_id}`
          );
        }
        console.log(response.data.data.rows[0]);
        setUsers(response.data.data.rows[0]);
      } catch (error) {
        console.log("Error Fetching Users", error);
      }
    };
    if (userType && (workers_id || recruiters_id)) {
      fetchUsers();
    }
  }, [userType, workers_id, recruiters_id]);
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
        <div className="position-relative" onClick={toggleDropdown}>
          <Image
            src={users.image || "/hero.jpeg"}
            alt="profile picture"
            width={32}
            height={32}
            className={Styles.roundedImage}
          />
          {isDropdownVisible && (
            <div className={Styles.dropdown}>
              <p className={Styles.item} onClick={handleProfileClick}>Profile</p>
              <p className={Styles.item} onClick={handleLogout}>Log Out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
