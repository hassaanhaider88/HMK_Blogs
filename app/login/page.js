'use client'
import { useState } from 'react';
import Loading from '../loading';
import { UserData } from '@/context/UserContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {  user, setUser, IsLoading , setIsLoading  } = UserData();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        cache: 'no-store',
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success('User Loged In successfully!');
        console.log(data)
        router.push('/')
        setIsLoading(false)
           setUser(data.FindUser)
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
    IsLoading ? <Loading/> :  <div className="flex justify-center items-center min-h-screen bg-gray-900">
    <form onSubmit={handleSubmit} className="bg-gray-800 md:w-1/2 w-full p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-white mb-4">Login</h2>
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
      <button type="submit" className="w-1/2 relative left-[50%] -translate-x-[50%] p-2 bg-blue-600 rounded hover:bg-blue-700 text-white">
        Login
      </button>
    </form>
  </div>
   }
   </>
  );
};

export default Login;
