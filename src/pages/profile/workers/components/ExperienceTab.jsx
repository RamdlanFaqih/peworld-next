import Styles from "./styles.module.css";
import Image from "next/image";

const ExperienceTab = () => {
  return (
    <div className="grid grid-cols-12">
      <div className={`${Styles.logo} col-span-2 flex items-center justify-center`}>
        <Image src="https://freelogopng.com/images/all_img/1656181199icon-shopee-png.png"
        alt="perusahaan"
        width={74}
        height={74}
        style={{width: "74px", height: "74px"}} />
      </div>
      <div className="col-start-3 col-span-10">
        <div className={Styles.role}>Engineer</div>
        <div className={Styles.company}>Shoppe</div>
        <div className={Styles.date}>
          July 2019 - January 2020 <span>6 Month</span>
        </div>
        <div className={Styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          erat orci, mollis nec gravida sed, ornare quis urna. Curabitur eu
          lacus fringilla, vestibulum risus at.
        </div>
      </div>
    </div>
  );
};

export default ExperienceTab;
