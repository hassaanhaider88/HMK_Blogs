import SixBlogsDisplaySec from "@/Components/SixBlogsDisplaySec";
import NavBar from "@/Components/NavBar";
import Image from "next/image";
import Link from "next/link";
import SwiperHero from "@/Components/Swiper_Hero";
import Animation from "@/Components/Animation";
// import Search from '../public/SearchIcon'

export default function Home() {
  return (
    <>
      <div className="MainHero w-full  bg-black text-white">
        <div className="px-10 md:py-10 py-5 md:px-20 sm:mt-0 mt-24">
          <SwiperHero />
        </div>
        <div className="w-full flex justify-center hover:scale-95 duration-300 items-center">
          <Link
            href={"/create"}
            className="py-2 hover:border-gray-700 cursor-pointer border-white border-2 px-5 hover:scale-95 duration-300 rounded-[20px]  w-fit ml-1 outline-none  font-semibold text-gray-300 bg-transparent "
          >
            Create New Blog
          </Link>
        </div>
        {/* Blogs Display Section */}
        <SixBlogsDisplaySec />s
      </div>
    </>
  );
}
