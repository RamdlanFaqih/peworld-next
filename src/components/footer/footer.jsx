import React from "react";
import Image from "next/image";
import Styles from "./styles.module.css";

const Footer = () => {
  return (
    <>
      <div className={Styles.footer}>
        <div className={Styles.footerDetails}>
          <div className={Styles.brandLight}>
            <Image
              src="/brandLight.svg"
              alt="peworld"
              width={127}
              height={35}
            />
          </div>
          <div className={Styles.footerTextContainer}>
            <p className={Styles.footerText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
        </div>
        <div className={`${Styles.copyright} grid grid-cols-2`}>
          <div className={Styles.author}>
            <p>2020 Pewworld. All right reserved</p>
          </div>
          <div className="flex flex-row justify-end">
            <p className={Styles.phone}>Telepon</p>
            <p className={Styles.email}>Email</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
