'use client'

import BlogCard from "@/Components/BlogCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserData } from '@/context/UserContext';
import Loading from '../../loading';
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function UserProfile({params}) {
  const router = useRouter();
  const {user, setUser,AllBlogsData, setAllBlogsData } = UserData();
  const SUserId = params.user_id; 
  const [SUser, setSUser] = useState(null); //SUser select user
  const [IsLoading , setIsLoading] = useState(false);
  const [loggedUserAlsoSelectedUser, setLoggedUserAlsoSelectedUser] = useState(false); // the users which logged in also watch his won profile
  const [userNameInLC,setUserNameInLC] = useState('');
  const [BtnLoading , setBtnLoading]= useState(false);
  const [IsInFollowing, setIsInFollowing] = useState(false)
  const [BlogAtHomePage,setBlogAtHomePage] = useState(true)
  const GetUserWichIsSelected = async ()=>{
  try {
    setIsLoading(true);
    const response = await fetch(`/api/users/${SUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        SelectUserId: SUserId,
        LoggedInUserId : user?._id,
      })  
   },{ cache : 'no-cache' } );
    const data = await response.json();
    if(data  === false){
      setLoggedUserAlsoSelectedUser(true)
      setSUser(user);
      setBlogAtHomePage(false) // the delete option will be show 
    }else{
      if(data.status === '404'){
      setLoggedUserAlsoSelectedUser(false)
        router.push('/')
        toast.error('User Does Not Exist..')
      }else{
      setSUser(data.SUser);
      setIsInFollowing(data.IsFollow);
      console.log('data',data);
      setLoggedUserAlsoSelectedUser(false)
      setBlogAtHomePage(true)
      }
    }
    setIsLoading(false);
  } catch (error) {
    console.log(error.massage, 'wrong');
    toast.error('please log in First')
    setIsLoading(false);
  }
}

useEffect(() => {
  GetUserWichIsSelected();
}, [IsInFollowing]);


const handleLogOut  = async  ()=>{
try {
  setBtnLoading(true)
  const res = await fetch(`/api/users/${user._id}`, { method: 'GET' });
  const data = await res.json();
toast.success('SuccessFully LogOut');
setUser(null)
setBtnLoading(false)
router.push('/')

} catch (error) {
  toast.error('Error While Log Outing User',error);
  console.log(error)
  setBtnLoading(false)
}
}


const handleFollowing= async ()=>{
try {
setBtnLoading(true)
   setIsInFollowing(prevState => !prevState);
  const response = await fetch(`/api/follow_user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      SelectUserId: SUserId,
      LoggedInUserId : user?._id,
    })  
 });
  const data = await response.json();
  if(data.IsFollow){
    toast.success('Successfully UnFollowed!')
    setIsInFollowing(data.IsFollow);
    setBtnLoading(false)
  }else{
    toast.success('Successfully Follow!')
    setIsInFollowing(data.IsFollow);
    setBtnLoading(false)
  }
} catch (error) {
  setIsInFollowing(prevState => !prevState); 
  toast.error("something went wrong..")
  setBtnLoading(false)
}
}



return (
<>

{
      IsLoading   ?    <Loading />   :  <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-700">
            <img src={SUser?.profilePicture} alt="Profile" className="w-full h-full object-cover" />
          </div>
          
          {/* User Info */}
          <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
            <h1 className="text-3xl font-semibold">{SUser?.name}</h1>
            <p className="text-gray-400">@{SUser?.username}</p>
            <p className="mt-4 text-gray-300">Here I'm Using HMK Blog.</p>

            {/* Follow / Unfollow Button */}
            {
              loggedUserAlsoSelectedUser ?  <button onClick={handleLogOut} className="mt-6 bg-transparent hover:border-gray-700 border-2 text-white py-2 px-6 rounded-full transition-all">
            { BtnLoading ? "Loading.." : "Log Out"}
            </button>  : <button onClick={handleFollowing} className="mt-6 bg-blue-900 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-all">
            {
            IsInFollowing ? " Followed": 
             BtnLoading ?  "Loading.." : "Follow"
            }            
            </button>
            }
            
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 flex justify-between items-center text-center border-t border-gray-700 pt-6">
          <div>
            <h3 className="text-xl font-bold">{SUser?.CreatedBlogs.length}</h3>
            <p className="text-gray-400">Posts</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{SUser?.followers.length}</h3>
            <p className="text-gray-400">Followers</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{SUser?.following.length}</h3>
            <p className="text-gray-400">Following</p>
          </div>
        </div>
      </div>
    
    <div className="w-full h-5 bg-black "></div>

    {/* Blogs Display Section */}

{
  SUser?.CreatedBlogs.length === 0 ?  <div className='w-full py-20 flex flex-col justify-center items-center'>
  <h1>Could'n find any blogs </h1> 
  {
   loggedUserAlsoSelectedUser  ?   <button className="w-fit text-nowrap flex justify-center hover:scale-95 duration-300 items-center gap-1 mt-10 border border-gray-300 rounded-lg py-1  px-2 ">
   <Link href={'/create'} className="py-2 cursor-pointer w-fit ml-1 outline-none  font-semibold text-gray-300 bg-transparent ">Create New Blog</Link>
   </button>   :   <button className="w-fit text-nowrap flex justify-center hover:scale-95 duration-300 items-center gap-1 mt-10 border border-gray-300 rounded-lg py-1  px-2 ">
  <Link href={'/'} className="py-2 cursor-pointer w-fit ml-1 outline-none  font-semibold text-gray-300 bg-transparent ">Back To Home</Link>
  </button>
  }
  </div>  :  
<section className="w-full mt-10 px-10 py-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 items-center justify-center bg-[#929090] text-black">
        {
          SUser?.CreatedBlogs.map((blog,index)=>{
            console.log(blog)
            return <BlogCard  key={index} blog={blog} BlogAtHomePage={BlogAtHomePage} /> 
          })
        }
</section>
}

    </div>
  }


</>
);
}
