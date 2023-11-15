import React from "react";
import { Modal } from "flowbite-react";
import { useRouter } from "next/router";
import Button from "../button/button";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditProfiePicRecruiters({ onClose }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = React.useState("");
  const [showImage, setShowImage] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [recruitersProfile, setRecruitersProfile] = React.useState("");
  const recruiters_id = Cookies.get("recruiters_id");
  console.log(recruiters_id);

  React.useEffect(() => {

    const getRecruiters = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/recruiters/getData/${recruiters_id}`
        );
        console.log(response.data.data.rows[0]);
        setWorkersProfile(response.data.data.rows[0]);
        setUserRole(response.data.data.rows[0].role);
      } catch (error) {
        console.log("get recruiters failed", error);
      }
    };
    getRecruiters();
  }, []);


  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected Image File:", file);
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setShowImage(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error reading the file:", error);
    };    
  console.log(reader);
    if (file) {
      reader.readAsDataURL(file);

      setSelectedImage(e.target.files[0])
    }
  };

  // console.log(selectedImage);
  

  const handleUpload = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("image", selectedImage);
  
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_CSR}/recruiters/update/image_profile/${recruiters_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log(response);
      onClose();
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
    }
  };


  return (
    <>
      <Modal show={true} size="lg" popup onClose={onClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900 text-center"
            >
              Edit Profile Picture
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-update-recruiters"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-update-recruiters"
                      name="file-update-recruiters"
                      type="file"
                      className="sr-only"
                      onChange={handleChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, & JPEG Max. 5 mb
                </p>
              </div>
            </div>
            {showImage && (
              <Image
                src={showImage}
                width={100}
                height={100}
                className="mt-4 rounded-lg max-w-full"
                alt="Profile Picture"
              />
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Button style="filled" text="Simpan" onClick={handleUpload} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
