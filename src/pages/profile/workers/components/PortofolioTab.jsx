import Styles from "./styles.module.css";
import Image from "next/image";

const PortofolioTabs = () => {
  return (
    <div className="flex flex-col items-center">
        <Image src="/WebDummy.jpg" alt="hero" width={219} height={148} className={`${Styles.image} rounded-lg`} />
      <div className={Styles.portofolio}>
        Web E-Commerce Blanja
      </div>
    </div>
  );
};

export default PortofolioTabs;
