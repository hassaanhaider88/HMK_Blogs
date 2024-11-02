"use client";
import { CldUploadWidget } from "next-cloudinary";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useEffect } from "react";

const UploadCLD = ({ setImage, image }) => {
  // Function to disable scrolling
  const disableScroll = () => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
  };

  // Function to enable scrolling
  const enableScroll = () => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = ""; // Restore scrolling
    }
  };

  useEffect(() => {
    return () => {
      // Ensure scrolling is re-enabled when the component unmounts
      enableScroll();
    };
  }, []);

  return (
    <CldUploadWidget
      uploadPreset="hmkpreset"
      onSuccess={({ event, info }) => {
        if (event === "success") {
          setImage(info.secure_url);
        }
        enableScroll(); // Re-enable scrolling after the upload is successful
      }}
      onOpen={() => {
        disableScroll(); // Disable scrolling when the widget opens
      }}
      onClose={() => {
        enableScroll(); // Re-enable scrolling when the widget closes
      }}
    >
      {({ open }) => {
        return (
          <button
            className="text-4xl"
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission or default action
              open(); // Open the Cloudinary widget
            }}
          >
            <IoCloudUploadOutline />
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadCLD;
