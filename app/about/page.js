import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <section className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            About HMK Blogs
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
            Welcome to <span className="font-bold">HMK Blogs</span>, where we
            inspire and guide you to create your own trending blogs. Whether
            you're a seasoned writer or a newbie, we've got the tools and
            community to help you shine.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-500">
              Learn Blogging
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Explore comprehensive tutorials, tips, and guides that teach you
              how to start and grow a successful blog.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Create Blogs
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Use our easy-to-follow tools to create beautiful, engaging blogs
              that stand out and attract readers.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Grow Your Audience
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Learn how to grow your blog and reach a larger audience with our
              in-depth marketing strategies and tools.
            </p>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            At <span className="font-bold">HMK Blogs</span>, we believe in
            empowering every individual to share their voice and ideas. Our
            mission is to make blogging accessible, enjoyable, and successful
            for everyone, regardless of skill level.
          </p>
        </section>

        <section className="flex justify-center">
          <Link
            href="/contact"
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Join the Community
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
