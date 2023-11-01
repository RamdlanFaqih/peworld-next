import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";
import Styles from "./styles.module.css";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import { Tabs } from "flowbite-react";
import Skill from "@/components/skill/skill";
import PortofolioTabs from "./components/PortofolioTab";
import ExperienceTab from "./components/ExperienceTab";
import { FiMapPin } from "react-icons/fi";
import Input from "@/components/input/Input";
import TextArea from "@/components/textArea/TextArea";

const inter = Inter({ subsets: ["latin"] });

export default function Hire() {
  return (
    <div>
      <div className={Styles.navbar}>
        <Navbar />
      </div>
      <div className={`${Styles.bodyContainer}`}>
        <div className="grid grid-cols-11">
          <div className="col-span-4 ">
            <div className="bg-white rounded-lg px-10">
              <div
                className={`${Styles.imageContainer} row-start-1 flex justify-center`}
              >
                <div style={{ width: "150px", height: "150px" }}>
                  <Image
                    src="/hero.jpeg"
                    alt="profile picture"
                    width={150}
                    height={150}
                    objectFit="cover"
                    className={Styles.roundedImage}
                  />
                </div>
              </div>
              <div>
                <div className={Styles.name}>Louis Tomlinson</div>
                <div className={Styles.job}>Web Developer</div>
                <div className={`${Styles.location} flex items-center`}>
                  <FiMapPin />
                  <p className="pl-1">Purwokerto, Jawa Tengah</p>
                </div>
                <div className={Styles.workCategory}>Freelancer</div>
                <div className={`${Styles.aboutProfile}`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum erat orci, mollis nec gravida sed, ornare quis
                  urna. Curabitur eu lacus fringilla, vestibulum risus at.
                </div>
              </div>
              <div className={`${Styles.hire} row-start-3`}>
                <div className="py-5">
                  <div>Skill</div>
                  <div className="flex gap-2">
                    <Skill name="Javascript" />
                    <Skill name="PHP" />
                    <Skill name="Golang" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-start-5 ml-10 col-span-12 ">
            <div>
              <div>
                <div className={Styles.hireTitle}>Hubungi Louis Tomlinson</div>
                <div className={Styles.hireDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  euismod ipsum et dui rhoncus auctor.
                </div>
              </div>
              <div  className={Styles.formHire}>
                <div>
                  <div className="mt-5">
                    <label htmlFor="message" className="text-sm">
                      Tuliskan tentang pesan ini
                    </label>
                    <div>
                      <select
                        id="country"
                        name="country"
                        autocomplete="country-name"
                        className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      >
                        <option>Projek</option>
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <Input
                    type="text"
                    label="Nama Lengkap"
                    placeholder="Masukan Nama Lengkap"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    label="Email"
                    placeholder="Masukan Email"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    label="No Handphone"
                    placeholder="Masukan No Handphone"
                  />
                </div>
                <div>
                  <TextArea
                    type="text"
                    label="Deskripsi"
                    placeholder="Deskripsikan / Jelaskan lebih detail "
                  />
                </div>
              </div>
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
