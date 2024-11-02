"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { UserData } from "@/context/UserContext";
import Loading from "../app/loading";

const SixBlogsDisplaySec = () => {
  const { user, setUser, AllBlogsData, setAllBlogsData } = UserData();
  const [isLoading, setIsLoading] = useState(false);
  const [SixFilteredBlogs, setSixFilteredBlogs] = useState([]);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };
  const GetAllBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("api/get_blogs", { cashe: "no-cache" });
      const data = await res.json();
      if (data) {
        const shuffledBlogs = shuffleArray(data.allBlogs);
        setAllBlogsData(data.allBlogs);
        const FilterPost = data.allBlogs.splice(0, 6);
        setSixFilteredBlogs(FilterPost);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetAllBlogs();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="w-full mt-10 px-10 py-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 items-center justify-center bg-white text-black">
          {SixFilteredBlogs &&
            SixFilteredBlogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} BlogAtHomePage={true} />
            ))}
        </section>
      )}
    </>
  );
};

export default SixBlogsDisplaySec;
