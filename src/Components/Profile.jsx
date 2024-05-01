import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Comment from './Shared/Comment'

export default function Profile() {

    let userDetail = useSelector(state => state.userDetail)
    // console.log(userDetail) 
    const name = useRef();
    const userName = useRef();
    const description = useRef();
    const id = useSelector(state => state.userDetail.id)
    const [post, setPost] = useState([])
    const [users, setUsers] = useState([])
    const [modalState, setModalState] = useState({
        isVisible: false,
        user: null,
        post: null
    })
    const [editModal, setEditModal] = useState(false)
    const getPost = async () => {
        const response = await axios.get("http://localhost:3000/posts")
        setPost(response.data)
    }
    const getAllUsers = async () => {
        let response = await axios.get("http://localhost:3000/users")
        setUsers(response.data)
        // console.log(users)
    }

    useEffect(() => {
        getPost()
        getAllUsers()
    }, [])


    const chageUserDetails = async () => {
        let data = {
            name: name.current.value,
            userName: userName.current.value,
            description: description.current.value
        }
        const response = await axios.patch(`http://localhost:3000/users/${userDetail.id}`, data)
        // console.log(response.data)
        // console.log(data)    
    }

    return (
        <div className={`flex ${modalState.isVisible && 'fixed'}`}>
            <Sidebar />
            <div className='container px-20 ' style={{ marginLeft: '18vw' }}>
                <div className='flex justify-center mt-10'>

                    {/* PROFILE PIC */}
                    <div className=''>
                        <img src={userDetail.profileImg || 'https://www.svgrepo.com/show/527946/user-circle.svg'} alt=""
                            className='w-40 h-40 object-cover rounded-full' />
                    </div>
                    {/* PERSONAL INFO */}
                    <div className='ms-10'>
                        <div className='flex items-center'>
                            <p className='me-10 text-xl' >{userDetail.userName}</p>
                            <button className='mx-1 bg-slate-200 rounded px-3 py-1' onClick={() => { setEditModal(true) }}>Edit Profile</button>
                            <button className='mx-1 bg-slate-200 rounded px-3 py-1'>settings</button>
                        </div>
                        <div className='flex space-x-7 mt-6'>
                            <p>{post?.length} posts</p>
                            <p>{userDetail?.followers?.length} followers</p>
                            <p>{userDetail?.following?.length} following</p>
                        </div>
                        <div className='mt-4'>
                            <p className='font-bold'>{userDetail.name}</p>
                            <p className='text-sm'>{userDetail.description}</p>
                        </div>
                    </div>
                </div>
                {/* POSTS */}
                <div className=' mt-6'>
                    <p className='text-center'>POSTS</p>
                    <div className='grid grid-cols-3 gap-1 px-12 mt-5   '>
                        {
                            post.map((item, index) => {
                                let extractUserProfile = users.filter((element) => {
                                    return element.id === item.userId
                                }) 
                                if (item.userId === id) {
                                    return (
                                        <div className="" key={index} onClick={() => {
                                            setModalState(
                                                {
                                                    isVisible: true,
                                                    user: extractUserProfile[0],
                                                    post: item
                                                }
                                            );
                                        }}>
                                            <img src={item.img || 'https://images.pexels.com/photos/10255583/pexels-photo-10255583.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'} alt=""
                                                className=' w-full object-cover rounded-md' />
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            {/* MODAL */}
            {
                editModal &&

                <div className='flex absolute items-center justify-center h-screen top-0 bg-gray-700 bg-opacity-40 w-full'>
                    <div className='bg-white w-80 rounded-lg p-5 box-shadow' >
                        <p className="text-2xl font-bold mb-4 flex">Edit Profile details <i className="bi bi-x-square rounded ms-auto hover:text-red-500" onClick={() => { setEditModal(false) }}></i></p>
                        <p className='mt-5 mb-1'>Name</p>
                        <input type="text" className='border w-full py-1 px-2 rounded focus:outline-none focus:ring focus:ring-blue-300'
                            defaultValue={userDetail?.name}
                            ref={name}
                        />

                        <p className='mt-2 mb-1'>User Name</p>
                        <input type="text" className='border w-full py-1 px-2 rounded focus:outline-none focus:ring focus:ring-blue-300'
                            defaultValue={userDetail?.userName}
                            ref={userName}
                        />

                        <p className='mt-2 mb-1'>Bio</p>
                        <textarea type="text" className='border w-full py-1 px-2 rounded focus:outline-none focus:ring focus:ring-blue-300  ' rows={4}
                            defaultValue={userDetail.description}
                            ref={description}
                        /><br />

                        <div className="">
                            {/* <button className='w-full py-2 me-1 mt-4 px-4 font-bold border bg-slate-400 text-white rounded hover:bg-slate-500'>Cancel</button> */}
                            <button className='w-full bg-blue-500 text-white font-bold mt-2 py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
                                disabled={name === '' || userName === '' || description === '' || name === undefined || userName === undefined || description === undefined}
                                onClick={() => { chageUserDetails(); setEditModal(false) }}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            }

            {/* MODAL */}
            {
                modalState.isVisible && <Comment data={{ modalState, setModalState, users }} />
            }

        </div>
    )
}
