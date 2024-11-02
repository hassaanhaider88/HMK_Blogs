'use client'

import { useState } from 'react';
import Image from 'next/image'
import UploadCLD from '../../Components/UploadCLD'
import { toast } from 'react-toastify';
import  { UserData } from '../../context/UserContext'
import Loading from '../loading';
import { useRouter } from  'next/navigation'

const SignUp = () => {

  const router = useRouter();
  const {  user, setUser, IsLoading , setIsLoading  } = UserData();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      return toast.error('Please select an image.');
    }
  
    if (password !== confirmPassword) {
      return toast.error('Passwords must match.');
    }
  
    try {
      setIsLoading(true)
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          image, 
        }),
        cache: 'no-store',
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success('User signed up successfully!');
           setIsLoading(false)
           setUser(data.newUser)
           window.localStorage.setItem('UserName',data.newUser.username);
           window.localStorage.setItem('UserImg',data.newUser.profilePicture);

          router.push('/')
      } else {
        const error = await response.json();
           setIsLoading(false)
        return toast.error(error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };
  
return (
    <>
    {
      IsLoading  ? <Loading /> : <>
      <div className="flex justify-center items-center py-5 bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 md:w-1/2 w-full p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-white mb-4">Sign Up</h2>
        
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="image">User Image</label>
          <div className='w-full h-[120px] rounded-xl text-3xl flex justify-center items-center mt-2 bg-black'>
            {
            image !== null ? <Image  src={image} alt={"userPicture"} width={100} height={100} /> : <UploadCLD setImage={setImage} image={image}></UploadCLD > 
            }
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 outline-none text-white"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 outline-none text-white"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 outline-none text-white"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 outline-none text-white"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 text-white">
          Sign Up
        </button>
      </form>
     </div>
      </>
    }
    </>
)}
export default SignUp;
