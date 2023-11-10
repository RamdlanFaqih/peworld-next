import Image from "next/image";
import { Inter } from "next/font/google";
import NavbarBeforeLogin from "@/components/navbar/navbarBeforeLogin";
import Styles from "./styles.module.css";
import Button from "@/components/button/button";
import { FaCheck } from "react-icons/fa";
import CardOpinion from "@/components/cardOpinion/cardOpinion";
import Footer from "@/components/footer/footer";
import NavbarAfterLogin from "@/components/navbar/navbarAfterLogin";
import React from "react";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!Cookies.get("token"));
    }
  }, []);
  return (
    <div className={`${Styles.navbar} py-5`}>
      {isLoggedIn ? (
        <div className={`${Styles.navbar} py-5`}>
          <NavbarAfterLogin />
        </div>
      ) : (
        <div className={`${Styles.navbar} py-5`}>
          <NavbarBeforeLogin />
        </div>
      )}

      {/* first rows */}
      <div
        className={`${Styles.row} container mx-auto px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10`}
      >
        <div
          className={`${Styles.gettingStarted} flex flex-col justify-center`}
        >
          <div>
            <h1 className={Styles.tagline}>
              Talenta terbaik negri untuk perubahan revolusi 4.0
            </h1>
            <p className={Styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div className={Styles.button}>
            <Button type="filled" text="Mulai dari sekarang" height="40px" />
          </div>
        </div>
        <div className="container">
          <div className={Styles.image}>
            <Image
              src="/hero.jpeg"
              alt="hero"
              width={500}
              height={500}
              layout="fixed"
            />
          </div>
        </div>
      </div>

      {/* second rows */}
      <div
        className={`${Styles.secondRow} container mx-auto px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10`}
      >
        <div className={`container`}>
          <div className={Styles.image2}>
            <Image
              src="/hero2.jpeg"
              alt="hero"
              width={496}
              height={496}
              layout="fixed"
            />
          </div>
        </div>
        <div className="container">
          <div
            className={`${Styles.gettingStarted} flex flex-col justify-center`}
          >
            <div>
              <h1 className={Styles.tagline}>
                Kenapa harus mencari talent di Peworld
              </h1>
            </div>
            <div className={`${Styles.tickList} mt-2`}>
              <div className={`${Styles.tickItem}`}>
                <FaCheck className={Styles.tickIcon} />
                <span className={Styles.tickText}>
                  Lorem Ipsum dolor sit amet
                </span>
              </div>
              <div className={`${Styles.tickItem}`}>
                <FaCheck className={Styles.tickIcon} />
                <span className={Styles.tickText}>
                  Lorem Ipsum dolor sit amet
                </span>
              </div>
              <div className={`${Styles.tickItem}`}>
                <FaCheck className={Styles.tickIcon} />
                <span className={Styles.tickText}>
                  Lorem Ipsum dolor sit amet
                </span>
              </div>
              <div className={`${Styles.tickItem}`}>
                <FaCheck className={Styles.tickIcon} />
                <span className={Styles.tickText}>
                  Lorem Ipsum dolor sit amet
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* third rows */}
      <div
        className={`${Styles.secondRow} container mx-auto px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10`}
      >
        <div className={`container`}>
          <div
            className={`${Styles.gettingStarted} flex flex-col justify-center`}
          >
            <div>
              <h1 className={Styles.tagline}>Skill Talent</h1>
              <p className={Styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>
            <div className={`${Styles.tickList} mt-2 grid grid-cols-2`}>
              <div className="left">
                <div className={`${Styles.tickItem}`}>
                  <FaCheck className={Styles.tickIcon} />
                  <span className={Styles.tickText}>Java</span>
                </div>
                <div className={`${Styles.tickItem}`}>
                  <FaCheck className={Styles.tickIcon} />
                  <span className={Styles.tickText}>Kotlin</span>
                </div>
                <div className={`${Styles.tickItem}`}>
                  <FaCheck className={Styles.tickIcon} />
                  <span className={Styles.tickText}>PHP</span>
                </div>
                <div className={`${Styles.tickItem}`}>
                  <FaCheck className={Styles.tickIcon} />
                  <span className={Styles.tickText}>JavaScript</span>
                </div>
              </div>
              <div className="right">
                <div className={`${Styles.tickItem}`}>
                  <FaCheck className={Styles.tickIcon} />
                  <span className={Styles.tickText}>Golang</span>
                </div>
                <div className={`${Styles.tickItem}`}>
                  <FaCheck className={Styles.tickIcon} />
                  <span className={Styles.tickText}>C++</span>
                </div>
                <div className={`${Styles.tickItem}`}>
                  <FaCheck className={Styles.tickIcon} />
                  <span className={Styles.tickText}>Ruby</span>
                </div>
                <div className={`${Styles.tickItem}`}>
                  <FaCheck className={Styles.tickIcon} />
                  <span className={Styles.tickText}>10+ Bahasa lainnya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={Styles.image2}>
            <Image
              src="/hero2.jpeg"
              alt="hero"
              width={496}
              height={496}
              layout="fixed"
            />
          </div>
        </div>
      </div>

      {/* fourth rows */}
      <div
        className={`${Styles.fourthRow} bg-slate-50 container mx-auto px-3 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24`}
      >
        <div className={`${Styles.titleOpinionContainer} mb-10 text-center`}>
          <h1 className={Styles.titleOpinion}>Their opinion about peworld</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          <div className="flex justify-end">
            <CardOpinion />
          </div>
          <div className="flex justify-center">
            <CardOpinion />
          </div>
          <div className="flex justify-start">
            <CardOpinion />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
