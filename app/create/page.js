'use client';

import React, { useState } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import UploadCLD from '../../Components/UploadCLD'
import { useRouter } from 'next/navigation';
import { UserData } from '@/context/UserContext'
import Loading from '../loading'



export default function CreateBlog() {
  const router = useRouter();
  const { user  }  = UserData();
  const [AIImageToText, setAIImageToText] = useState('')
  const [BLGImage, setBLGImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [AIpreview, setAIPreview] = useState(null)
  const [heading, setHeading] = useState('');
  const [blogBody, setBlogBody] = useState('');
  const [uploadMode, setUploadMode] = useState('upload');
  const [IsLoading , setLoading] = useState(false)
  const [AIImageUrl , setAIImageUrl] = useState(null)
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (heading && blogBody) {
      setLoading(true)
        const fetchData = await fetch('/api/create_blog', {
         method: 'POST',
         headers : {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({
          heading,
          blogBody,
          imageUrl: uploadMode === 'ai' ? AIpreview : BLGImage,
          author: user._id,
  })},
{ cache : 'no-cache' }
)
  const data = await fetchData.json()
  if(!data) return toast.error('somthing went wrong...')
    
    toast.success('Blog created successfully!');
    router.push('/')
    console.log(data)
    setLoading(false)
    } else {
      toast.error('Please fill all fields!');
    setLoading(false)
    }
  };


return (
   <>
   {
        IsLoading ? <Loading />  :  <div className="min-h-screen bg-black text-white p-8">
    <h1 className="md:text-6xl sm:text-4xl text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-700">Add A New Blog</h1>
      <div className="md:px-20 px-5">
        <div className="flex gap-4">
          <button
            type="button"
            className={`py-2 px-4 rounded ${uploadMode === 'upload' ? 'bg-blue-500' : 'bg-gray-500'}`}
            onClick={() => setUploadMode('upload')}
          >
            Upload Own Image
          </button>
        </div>
      </div>
      
        <div className="mx-10 w-full my-8 flex justify-center py-5  ">
          {BLGImage ? <div className="mt-4">
              <p className="mb-2">Image Preview:</p>
              <img src={BLGImage} alt="Preview" className="w-64 h-64 object-cover rounded" />
            </div>  : <UploadCLD style={{background: '#0004'}} setImage={setBLGImage} image={BLGImage}></UploadCLD >
          }
        </div>
<form onSubmit={handleSubmit} className="space-y-6">
      <div className="md:px-20 px-5">
        <label className="block mb-2 font-semibold">Blog Heading:</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full p-2 rounded bg-transparent  outline-none  text-white"
          placeholder="Enter your blog heading ...."
        />
      </div>
      <div className='md:px-20 px-5'>
        <label className="block mb-2 font-semibold">Blog Body:</label>
        <ReactQuill
          value={blogBody}
          onChange={setBlogBody}
          theme="snow"
          className="h-[60vh] text-white"
          placeholder="Write your blog content here..."
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link', 'image'],
              [{ 'align': [] }],
              ['clean'],
            ],
          }}
          formats={[
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike',
            'list', 'bullet', 'align',
            'link'
          ]}
          editorProps={{ spellCheck: false }}
        />
      </div>

      <button
        type="submit"
        className="w-fit relative left-[50%] -translate-x-[50%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Blog
      </button>
    </form>
  </div>
   }
   </>
  );
}
