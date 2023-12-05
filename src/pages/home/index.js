import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";
import Styles from "./styles.module.css";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button/button";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [workers, setWorkers] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    dataPerPage: 3,
    totalPage: 1,
    totalData: 0,
  });
  const { search: searchQueryFromUrl } = router.query;
  const [searchQuery, setSearchQuery] = React.useState(
    searchQueryFromUrl || ""
  );
  const [sort, setSort] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const userType = Cookies.get("role");

  React.useEffect(() => {
    const { search } = router.query;
    if (search) {
      setSearchQuery(search);
      fetchWorkers(search, sort);
    } else {
      fetchAllWorkers();
    }
  }, [router.query, sort]);

  const fetchAllWorkers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/workers?page=1`
      );
      setWorkers(response.data.result.result.rows);
      setPagination(response.data.result);
      setIsLoading(false);
      console.log(response.data.result.result.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWorkers = async (query, sortOption, page) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_EXPRESS}/workers?search=${query}&sort=${sortOption}&page=${page}`
      );
      setWorkers(response.data.result.result.rows);
      setPagination(response.data.result);
      setIsLoading(false);
      console.log(response.data.result.result.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let queryParam = searchQuery;
    if (!searchQuery) {
      queryParam = "";
    }

    router.push({
      pathname: "/home",
      query: { search: queryParam, sort: sort },
    });

    fetchWorkers(queryParam, sort, 1);
  };
  const handleClickProfile = (workers_id) => {
    const query = {
      workers_id,
      userRole: userType === "0" ? userType : null,
    };
    router.push({
      pathname: `/profile/workers/${workers_id}`,
      query,
    });
  };

  const handlePageChange = (newPage) => {
    fetchWorkers(searchQuery, sort, newPage);
  };

  return (
    <div>
      <div className={`${Styles.navbar} md:px-10`}>
        <Navbar />
      </div>
      <div className={`${Styles.topJobs} md:px-5`}>
        <h1 className={`${Styles.topJobsText}`}>Top Jobs</h1>
      </div>
      <div className={`${Styles.bodyContainer} md:px-5`}>
        {isLoading ? (
          <div className="flex justify-center h-screen">
            <TailSpin
              height={80}
              width={80}
              color="#5e50a1"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div>
            <form className="flex gap-y-2 p-3 bg-white items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch size={23} />
                </div>
                <input
                  className="py-1 pl-10 pr-3 rounded-md w-full outline-none"
                  placeholder="Search for any skill"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className={Styles.sort}>Sort</div>
              <div className="flex-none w-20 md:w-auto">
                <Button
                  style="filled"
                  text="Search"
                  onClick={handleSearch}
                  width="100%"
                />
              </div>
            </form>

            <div
              className={`${Styles.profile} flex flex-col md:items-start justify-center sm:flex-col sm:items-center flex-wrap`}
            >
              {workers.map((item) => (
                <div
                  key={item.workers_id}
                  className={`${Styles.profileRows} flex flex-col md:flex-row items-center justify-between gap-10 w-full`}
                >
                  <div className="flex items-start px-10">
                    <div className={Styles.imageContainer}>
                      <Image
                        src={item.image || "/dummyProfile.png"}
                        alt="profile picture"
                        width={100}
                        height={100}
                        objectFit="cover"
                        className={Styles.roundedImage}
                      />
                    </div>
                  </div>
                  <div className="md:w-8/12 flex flex-col justify-center space-y-2">
                    <div className="flex flex-col justify-center gap-1">
                      <h1 className={Styles.name}>{item.name}</h1>
                      <p className={Styles.job}>{item.profession}</p>
                      <div className={`${Styles.location} flex items-center`}>
                        <FiMapPin />
                        <p className="pl-1">{item.residence}</p>
                      </div>
                    </div>
                    <div
                      className={`${Styles.skillsContainer} flex flex-wrap gap-2`}
                    >
                      <div className={Styles.skillsBox}>
                        <h1 className={Styles.skills}>PHP</h1>
                      </div>
                      <div className={Styles.skillsBox}>
                        <h1 className={Styles.skills}>JavaScript</h1>
                      </div>
                      <div className={Styles.skillsBox}>
                        <h1 className={Styles.skills}>HTML</h1>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`md:w-2/12 flex md:items-end justify-end ${Styles.buttonProfile} `}
                  >
                    <Button
                      style="filled"
                      text="Lihat Profile"
                      onClick={() => handleClickProfile(item.workers_id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`${Styles.pagination} flex items-center justify-center space-x-4 mt-8`}
            >
              <button
                className={`${Styles.buttonPagination} border rounded-sm flex items-center justify-center`}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                <MdOutlineNavigateBefore size={24} color="#DDDDDE" />
              </button>
              {pagination.totalPage > 0 && (
                <div className="flex space-x-2">
                  {[...Array(pagination.totalPage)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`${Styles.buttonPagination} border rounded-sm`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
              <button
                className={`${Styles.buttonPagination} border rounded-sm flex items-center justify-center`}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPage}
              >
                <MdOutlineNavigateNext size={24} color="#DDDDDE" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
