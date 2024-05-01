import React, { useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function CreatePost() {

    const [img, setImg] = useState('')
    const [caption, setCaption] = useState('')
    const userId = useSelector(state => state.userDetail.id)
    const comments = []
    const likes = []

    //hello
    const handleAddPost = async (e) => {
        e.preventDefault();
        let data = { userId, img, caption, comments, likes }
        const response = await axios.post("http://localhost:3000/posts", data)
        console.log(response)
        setImg('')
        setCaption('')
    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className='border w-full h-screen flex justify-center items-center bg-black bg-opacity-20' style={{ marginLeft: '18vw' ,background: 'linear-gradient(45deg, rgb(253, 244, 181),rgb(206, 219, 252),rgb(251, 214, 212)'}}>
                <div className='p-5 border bg-white rounded-xl shadow-2xl' style={{ height: '800px', width: '900px',backgroundColor:'lavender' }}>

                    <div>
                        <p className='pb-4 text-xl font-bold border-b border-slate-400 text-center'>Create New Post</p>
                    </div>

                    {/* URL SECTION */}
                    <div className=' mt-7 h-auto' >
                        <p className='font-bold text-slate-500'>Please enter the URL of Picture!</p>
                        <input type="text" className='p-2 ps-0 w-full text-center  bg-transparent border-b border-slate-400 focus:border-slate-700 focus:outline-none'
                            placeholder='Enter the URl'
                            value={img}
                            onChange={(e) => { setImg(e.target.value) }} />
                    </div>

                    {/* CAPTION SECTION */}
                    <div className='flex mt-10 h-4/6'>
                        <div className='w-1/2 px-8 '>
                            <div className=' p-5 rounded-lg h-full box-shadow border border-slate-200'>
                                <p className='font-bold text-slate-500'>Enter The Caption</p>
                                <textarea className='mt-4 p-3 w-full text-wrap bg-transparent border border-slate-300 rounded-md overflow-visible'
                                    placeholder='Write Caption as long as you like.'
                                    value={caption}
                                    onChange={(e) => { setCaption(e.target.value) }} />
                            </div>
                        </div>
                        <div className='w-1/2  rounded-lg box-shadow'>
                            <img src={img} alt="Enter correct Url"
                                className='h-full w-full object-cover rounded-lg' />
                        </div>
                    </div>

                    {/* ADD BUTTON */}
                    <div className='flex mt-5'>
                        <button className='ms-auto me-3 mt-auto p-2 px-4 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700'
                            disabled={img === '' || caption === ''}
                            onClick={handleAddPost}>Add Post</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
