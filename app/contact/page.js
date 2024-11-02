'use client'

import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/');
    toast.success('Thanks For Contacting Us!');
  };

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-700">
          Contact Us
        </h1>
        <p className="text-center text-lg md:text-2xl text-gray-300 mb-16 leading-relaxed">
          Have any questions or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="email">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full resize-none p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
