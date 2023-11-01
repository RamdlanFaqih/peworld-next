import Footer from "@/components/footer/footer";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Styles from "./styles.module.css";
import Image from "next/image";
import Button from "@/components/button/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function ProfileWorkers() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className={Styles.bodyContainer}>
        <div className="bg-white h-50 rounded-lg">
          <div className={`${Styles.displayPicture} pt-10 flex justify-center`}>
            <Image
              src="/dummyProfile.png"
              alt="Profile Company"
              width={150}
              height={150}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div
            className={` ${Styles.profileData} flex flex-col items-center text-center justify-center`}
          >
            <div className={Styles.company}>PT Martabat Jaya Abadi</div>
            <div className={Styles.field}>Financial</div>
            <div className={Styles.residence}>Purwokerto, Jawa Tengah</div>
            <div className={Styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum erat orci, mollis nec gravida sed, ornare quis urna.
              Curabitur eu lacus fringilla, vestibulum risus at.
            </div>
            <div className={Styles.buttonEditProfile}>
              <Link href="/profile/company/editProfile">
                <Button
                  style="filled"
                  height="50px"
                  text="Edit Profile"
                />
              </Link>
            </div>
            <div className="px-5 py-5">
              <div className={Styles.gmail}>Louistommo@gmail.com</div>
              <div className={Styles.instagram}>@Louist91</div>
              <div className={Styles.github}>@Louistommo</div>
              <div className={Styles.gitlab}>@Louistommo91</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
