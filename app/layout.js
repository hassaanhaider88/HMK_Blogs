import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import Animation from "@/Components/Animation";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDataProvider } from '@/context/UserContext'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "HMK Blogs  || Hassaan Haider  || HMK CodeWeb",
  description: "My first Next Js Project in Next js Bloging Website Funlly functional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
          <Animation />
          <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="dark" />

       <div className="text-white">
       </div>
       <UserDataProvider >
       <NavBar/>
        {children}
        <Footer/>
      </UserDataProvider>
      </body>
    </html>
  );
}
