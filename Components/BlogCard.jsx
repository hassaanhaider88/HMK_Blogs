"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { IoMdShareAlt } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { UserData } from "../context/UserContext";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const BlogCard = ({ blog, BlogAtHomePage }) => {
  const { handleDeletePost, user } = UserData();
  const [isLiked, setIsLiked] = useState(false);
  const [BlogHeadings, setBlogHeadings] = useState("");
  const [IsShowMoreOptions, setIsShowMoreOptions] = useState(false);
  const BlogHeadingLength = blog?.BlogHeading.split(" ").length;
  useEffect(() => {
    const BlogHeadingLength = blog?.BlogHeading.split(" ").length;
    if (BlogHeadingLength > 5) {
      const blogheading = blog?.BlogHeading.split(" ").slice(0, 5).join(" ");
      setBlogHeadings(blogheading);
    } else {
      setBlogHeadings(blog?.BlogHeading);
    }
  }, [blog.BlogHeading]);
  const BlogBody = blog?.blogBody.split(" ").slice(0, 10).join(" ");
  const createdAt = blog?.createdAt.split("").slice(0, 9).join("");
  const BlogCreatedById = blog?.createdBy._id;
  const handleLike = async () => {
    try {
      const res = await fetch("/api/like_blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          LikeBlogId: blog?._id,
          BlogLikeById: user?._id,
        }),
        cache: "no-store",
      });

      const data = await res.json();
      toast.success(data.message);
      if (data.message === "Like Successfully") {
        console.log("like");
        setIsLiked(true);
      } else {
        setIsLiked(false);
        console.log("unlike");
      }
    } catch (error) {
      toast.error("User Must Be Log In... ");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user?._id && Array.isArray(blog?.likedBy)) {
      const isLiked = blog.likedBy.some(
        (likedUser) => likedUser._id === user._id
      );
      setIsLiked(isLiked);
    }
  }, [user, blog]);

  return (
    <>
      <div className="BlogPost bg-gray-200 relative cursor-pointer p-5 hover:shadow-lg rounded-sm  hover:rounded-lg duration-500 shadow-lg">
        {/* Blog Image */}
        <Image
          style={{ width: "100%", height: "250px" }}
          src={blog?.imageUrl}
          width={100}
          height={200}
          alt={BlogHeadings}
          className="hover:scale-110 duration-300 rounded-lg"
        />

        {/* Blog Heading */}
        <h1 className="text-2xl h-[70px] overflow-hidden font-bold mt-4">
          {BlogHeadings} ...
        </h1>

        {/* Blog Excerpt */}
        <p className="font-semibold text-gray-500 mt-2">
          {BlogBody} <span>....</span>{" "}
          <Link
            className="text-nowrap text-gray-600 hover:underline "
            href={`blog/${blog._id}`}
          >
            {" "}
            Read More
          </Link>
        </p>

        {/* Author and Date with Read More Button */}
        <div className="w-full flex justify-between items-center mt-4">
          <p className="CreatedByAndCreatedAt font-semibold text-gray-500">
            <Link
              className="hover:underline duration-300"
              href={`/users/${blog.createdBy._id}`}
            >
              <div className="flex gap-3 items-center">
                {" "}
                <div className="w-7 h-7 rounded-full overflow-hidden">
                  <Image
                    src={blog.createdBy.profilePicture}
                    width={30}
                    height={30}
                  ></Image>
                </div>{" "}
                {blog.createdBy.name}
              </div>
            </Link>
            <div className="flex mt-4 justify-between items-center w-full gap-10">
              <div className="text-nowrap">Created At {createdAt}</div>
              <div
                onClick={() => setIsShowMoreOptions(!IsShowMoreOptions)}
                className="text-3xl rotate-90 bg-transparent hover:text-[#d3d1d1]"
              >
                <CgMoreO />
              </div>
            </div>
          </p>
        </div>
        {IsShowMoreOptions ? (
          <div
            onClick={() => setIsShowMoreOptions(false)}
            className="MoreOptionsDiv  w-full py-6 px-2 rounded-2xl absolute bottom-32 shadow-lg bg-[#000] text-white "
          >
            <MoreOptions
              BlogAtHomePage={BlogAtHomePage}
              BlogId={blog._id}
              IsShowMoreOptions={IsShowMoreOptions}
              setIsShowMoreOptions={setIsShowMoreOptions}
              handleDeletePost={handleDeletePost}
            />
          </div>
        ) : (
          ""
        )}
        <hr className="my-4 border-gray-300" />

        <div className="flex justify-between items-center mt-4">
          <div
            className={`text-3xl cursor-pointer bg-transparent w-fit duration-300 flex justify-center items-center ${
              isLiked ? "animate-like  rainbow-bg" : "hover:scale-110"
            }`}
            onClick={handleLike}
          >
            <FaHeart className={`${isLiked ? "text-red-600" : ""}`} />
          </div>

          {/* User Profile Circles */}
          <div className="flex -space-x-3">
            {/* Outer circle with inner circle structure */}
            {blog?.likedBy?.slice(0, 4).map((user, idx) => {
              return <LiveUserProfile key={idx} User={user} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;

const LiveUserProfile = ({ User }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div
      className="relative group flex flex-col items-center"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Profile Image */}
      <Link href={`/users/${User?._id}`}>
        <img
          src={User?.profilePicture}
          alt={`${User?.name}'s profile`}
          className="w-12 h-12 rounded-full border-2 border-white shadow-lg transition-transform duration-300 transform hover:scale-105"
        />
      </Link>
      {/* User Details Tooltip */}
      {showDetails && (
        <div className="absolute bottom-16 bg-white p-2 rounded-lg shadow-xl text-center w-40">
          <p className="text-sm font-bold text-gray-800">{User?.name}</p>
          <p className="text-xs text-gray-500">
            {User?.followers.length} followers
          </p>
        </div>
      )}
    </div>
  );
};

const MoreOptions = ({
  BlogAtHomePage,
  BlogId,
  handleDeletePost,
  setIsShowMoreOptions,
  IsShowMoreOptions,
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.host + "/blog/" + BlogId)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("Check this out!");
    const body = encodeURIComponent(
      `Hey, check out this link: ${window.location.href}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setIsShowMoreOptions(false);
  };

  return (
    <>
      <div
        onClick={handleCopyUrl}
        className="w-full flex justify-between items-center"
      >
        <p>
          <span>
            <IoMdShareAlt className="inline  hover:text-gray-700 duration-500 text-2xl mr-4" />
          </span>{" "}
          Share With Friends
        </p>
        <button className="inline text-3xl">
          {copied ? <TiTick /> : <MdContentCopy />}
        </button>
      </div>
      <button onClick={handleShareEmail}>
        <span>
          <MdEmail className="inline  hover:text-gray-700 duration-500 text-2xl mr-4" />
        </span>{" "}
        Share via Email
      </button>
      {BlogAtHomePage ? (
        ""
      ) : (
        <button
          className="text-red-600 hover:text-red-400 mt-3 mr-4 duration-500"
          onClick={() => handleDeletePost(BlogId)}
        >
          <span>
            <MdDeleteForever className="inline  text-2xl mr-4" />
          </span>
          Delete Post
        </button>
      )}
    </>
  );
};
