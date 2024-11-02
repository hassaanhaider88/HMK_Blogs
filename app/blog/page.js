'use client'

import Image from 'next/image'
import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import BlogCard from '@/Components/BlogCard';
import { UserData } from '@/context/UserContext';
import Loading from '../loading'
const BlogPage = () => {
  const { user, setUser, AllBlogsData, setAllBlogsData } = UserData();
  const [isLoading, setisLoading] = useState(false)
  const [AllBlogs , setAllBlogs ] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      if (AllBlogsData.length === 0) {
        const res = await fetch('api/get_blogs', { cache: 'no-cache' });
        const data = await res.json();
        if (data && data.data && data.data.allBlogs) {
          setAllBlogs(data.data.allBlogs);
        }
      } else {
        setAllBlogs(AllBlogsData);
      }
    };
  
    fetchBlogs();
  }, [AllBlogsData]);
  
return (
    <>
    {
      isLoading ? <Loading /> : (
          <section className="w-full mt-10 px-10 py-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 items-center justify-center bg-white text-black">
              {
                 AllBlogsData && AllBlogsData.map((blog, index) => (  
                      <BlogCard key={index} blog={blog} BlogAtHomePage={true}/>  
                  ))
              }

          </section>
      )
  }
  </>
  )
}

export default BlogPage