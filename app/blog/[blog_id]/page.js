'use client'

import Image from 'next/image';
import React,{useState, useEffect} from 'react';
import { FaHeart } from 'react-icons/fa'; 
import { AiOutlineLike } from "react-icons/ai";
import { toast } from 'react-toastify';
import { UserData } from '@/context/UserContext';
import Loading from '../../Loading';
import DOMPurify from 'dompurify';
import { FaChevronUp } from "react-icons/fa";
import Link from 'next/link';

const SingleBlog = ({ params }) => {
  const Blog_id = String(params.blog_id);
  const [ SingleBlog , setSingleBlog ] = useState([])
  const { AllBlogsData , user,setAllBlogsData } = UserData()
  const [isLiked, setIsLiked] = useState(false);
 const [isLoading , setIsLoading] = useState(false)
 const [BlogBody, setBlogBody] = useState('');
 const [ShowScrollButton, setShowScrollButton] = useState(false)
  useEffect(() => {
    GetBlog();
  }, [])
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  async function GetBlog(){
    try{
      setIsLoading(true)
      const res = await fetch(`/api/blog`,{
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       Blog_id : Blog_id
      }),
      cache: 'no-store',
    });
    const BlogData = await res.json();
if(BlogData.succes === 'fasle'){
   setIsLoading(true)
       return toast.error('nothing to show ....')
 }else{
  setSingleBlog(BlogData.data)
  const cleanHTML = DOMPurify.sanitize(BlogData.data.blogBody);
        setBlogBody(cleanHTML);
        setIsLoading(false)
}
}catch(error){
       toast.error(error.message)
       setIsLoading(false)
    }
  }


useEffect(() => {
  if (user?._id && Array.isArray(SingleBlog?.likedBy)) {
    const isLiked = SingleBlog.likedBy.some((likedUser) => likedUser._id === user._id);
    setIsLiked(isLiked);
  }
}, [user, SingleBlog]);


const handleLike = async() => {
  try{
    const res = await fetch('/api/like_blog',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       LikeBlogId : SingleBlog?._id,
       BlogLikeById : user?._id
      }),
      cache: 'no-store',
    });

    const data = await res.json();
    toast.success(data.message)
    console.log(data)
    if(data.message === 'Like Successfully'){
    setIsLiked(true);
    }else{
    setIsLiked(false);
    }
  }catch(error){
    toast.error('User Must Be Log In... ')
    console.log(error.message)
  }
};


return (
   <>
   {
    isLoading ? <Loading /> :  <div className="w-full min-h-screen flex flex-col items-center justify-start py-10 px-5 md:px-20">
   {/* the scroll to top icons */}
   {ShowScrollButton && (
    <div onClick={handleScrollToTop} className="h-12 w-12 animate-bounce group-hover:animate-none cursor-pointer hover:scale-95 duration-300 rounded-full flex justify-center items-center fixed bottom-5 bg-gray-600 right-5 text-white">
      <FaChevronUp/>
    </div>
  )}
    {/* Blog Image */}
    <Image
      src={SingleBlog?.imageUrl}
      width={100}
      height={100}
      className="rounded-lg w-full h-64 md:h-96 object-cover"
      alt="Blog Image"
    />

    {/* Blog Title */}
    <h1 className="text-4xl font-bold py-5 text-center md:text-left md:w-3/4">
     {SingleBlog?.BlogHeading}
    </h1>

    <div className="text-lg font-semibold text-gray-400 leading-relaxed first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 md:w-3/4"
      dangerouslySetInnerHTML={{ __html: BlogBody }}></div>

<div className="w-full mt-10 md:w-3/4">
      <hr className="my-4 border-gray-300" />
      <div className="flex justify-between items-center mt-4">
        
        {/* Like Button */}
        <div
          className={`text-3xl cursor-pointer bg-transparent w-fit duration-300 flex justify-center items-center ${
            isLiked ? 'animate-like rainbow-bg' : 'hover:scale-110'
          }`}
          onClick={handleLike}
        >
          <FaHeart className={`${isLiked ? 'text-red-600' : ''}`} />
        </div>

        {/* Display number of likes */}
        <p className="font-semibold text-gray-500">
          +{SingleBlog?.likedBy?.length} people liked this
        </p>
      </div>

      {/* Liked Users Section */}
      <div className="mt-6 flex cursor-pointer flex-wrap gap-2">
        {SingleBlog?.likedBy?.map((user,idx) => (
          <LiveUserProfile
            key={idx}
            User={user}
          />
        ))}
      </div>
    </div>
  </div>
   }
   </>
  );
};

export default SingleBlog;



const LiveUserProfile = ({User}) => {
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
          <p className="text-xs text-gray-500">{User?.followers.length} followers</p>
        </div>
      )}
    </div>
  );
};


