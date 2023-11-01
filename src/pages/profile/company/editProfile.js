import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";
import Styles from "./edit.module.css";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import { FiMapPin } from "react-icons/fi";
import Input from "@/components/input/Input";
import TextArea from "@/components/textArea/TextArea";
import axios from "axios";
import React from "react";


export default function EditProfileCompany() {
  return (
    <div>
      <div className={Styles.navbar}>
        <Navbar />
      </div>
      <div className={`${Styles.bodyContainer}`}>
        <div className="grid grid-cols-11">
          <div className="col-span-3 ">
            <div className="bg-white rounded-lg px-10">
              <div className={`${Styles.imageContainer}  flex justify-center`}>
                <div style={{ width: "150px", height: "150px" }}>
                  <Image
                    src="/dummyProfile.png"
                    alt="profile picture"
                    width={150}
                    height={150}
                    objectFit="cover"
                    className={Styles.roundedImage}
                  />
                </div>
              </div>

              <div>
                <div className={Styles.name}>PT Adijaya</div>
                <div className={Styles.job}>Financial</div>
                <div className={`${Styles.location} flex items-center`}>
                  <FiMapPin />
                  <p className="pl-1">Purwokerto, Jawa Tengah</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-start-4 ml-10 col-span-9">
            <div>
              <div className="bg-white rounded-lg">
                <div className="border-b">
                  <h1 className="px-5 py-5">Data Diri</h1>
                </div>
                <div className="px-5">
                  <Input
                    type="text"
                    label="Nama Perushaan"
                    placeholder="Masukan Nama Perusahaan"
                  />
                  <Input
                    type="text"
                    label="Bidang"
                    placeholder="Masukan bidang perusahaan ex : Financial "
                  />
                  <Input type="text" label="Kota" placeholder="Masukan Kota" />
                  <TextArea
                    label="Deskripsi Singkat"
                    placeholder="Tuliskan Deskripsi singkat"
                  />
                  <Input
                    type="text"
                    label="Email"
                    placeholder="Masukan Email"
                  />
                  <Input
                    type="text"
                    label="Instagram"
                    placeholder="Masukan Nama Instagram"
                  />
                  <Input
                    type="text"
                    label="Nomor Telepon"
                    placeholder="Masukan Nomor Telepon"
                  />
                  <Input
                    type="text"
                    label="Linkedin"
                    placeholder="Masukan Linkedin"
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
