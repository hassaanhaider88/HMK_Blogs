"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [AllBlogsData, setAllBlogsData] = useState([]);
  const GetUserIfLoggedIn = async () => {
    try {
      const response = await fetch("/api/GetUser");
      const data = await response.json();
      if (!data) return;
      setUser(data.findUser);
      setIsLoggedIn(true);
      console.log(data);
    } catch (error) {
      toast.erro("User is not logged In");
      console.log(error.massage);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    GetUserIfLoggedIn();
  }, []);
  // yaah se sirf delete a post ka logic laagna hai
  const handleDeletePost = async (DeletedUrl) => {
    const response = await fetch(
      `/api/delete_blog`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DeleteAbleUrl: DeletedUrl,
          DeletedBlogUserId: user._id,
        }),
      },
      { cache: "no-cache" }
    );
    const data = await response.json();
    if (!data) return toast.error("something went wrong..");

    router.push(`/`);
  };

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        IsLoggedIn,
        setIsLoggedIn,
        IsLoading,
        setIsLoading,
        AllBlogsData,
        setAllBlogsData,
        handleDeletePost,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export var UserData = () => {
  return useContext(UserDataContext);
};
