import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios, { all } from 'axios'
import { setUserDetails } from '../redux/features/userSlice'
import { combineSlices } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

export default function Search() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userDetail)
    const [users, setUsers] = useState([])
    const [filterUsers, setFIlterUsers] = useState([])
    const [searchedUser, setSearchedUser] = useState()
    const [post, setPost] = useState([])
    const [allFollowings, setAllFollowings] = useState([]);

    const getusers = async () => {
        let response = await axios.get("http://localhost:3000/users")
        setUsers(response.data)
        // console.log(users)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const value = e.target.value;
        if (value !== '') {
            setFIlterUsers(users.filter(item => {
                return item?.userName.toLowerCase().includes(value.toLowerCase())
            }))
        }
    }

    const setuserDetails = async (id) => {
        // USER DETAIL
        const response = await axios.get('http://localhost:3000/users')
        let userData = (response.data)
        const searchedUsers = userData.filter(item => {
            return item.id === id
        })
        // console.log(searchedUsers[0])
        setSearchedUser(searchedUsers[0])
        // setAllFollowings(searchedUsers.following)

        // USER'S POST
        const post = await axios.get("http://localhost:3000/posts")
        let userPost = (post.data)
        const searchedPost = userPost.filter(item => {
            return item.userId === id
        })
        setPost(searchedPost)
    }

    // ADD AND REMOVE THE USER FROM FOLLOWING
    const addToFollowers = async () => {
        setAllFollowings(user.following)
        const response = await axios.patch(`http://localhost:3000/users/${user.id}`, {
            following: [
                ...allFollowings,
                searchedUser.id
            ]
        }) 
        dispatch(setUserDetails(response.data))
        
        //OPPOSITE USER EFFECT
        const otherResponse = await axios.patch(`http://localhost:3000/users/${searchedUser.id}`, {
            followers: [
                ...searchedUser.followers,
                user.id
            ]
        }) 
        setuserDetails(searchedUser.id)

    }
    // console.log(searchedUser.followers)
    const removeFollowing = async () => {
        setAllFollowings(user.following.filter((item) => {
            return item !== searchedUser.id
        }))
        // console.log(allFollowers)
        const response = await axios.patch(`http://localhost:3000/users/${user.id}`, {
            following: [
                ...allFollowings
            ]
        }) 
        dispatch(setUserDetails(response.data))
        
        //OPPOSITE USER EFFECT
        let newfolowers = searchedUser.followers.filter((item)=>{
            return item !== user.id
        })
        const otherResponse = await axios.patch(`http://localhost:3000/users/${searchedUser.id}`, {
            followers: [
                ...newfolowers
            ]
        })
        setuserDetails(searchedUser.id)
    }

    // console.log(searchedUser?.name)
    useEffect(() => {
        getusers()
    }, [])

    return (
        <div className='flex'>
            <Sidebar />
            <div className='h-screen px-3 border-e' style={{ marginLeft: '18vw', width: '30vw' }}>


                <p className='my-10 font-mediumm text-3xl'>Search</p>
                <input type="text" className='py-2 px-3 mb-5  border-2 bg-slate-100 w-full rounded-md'
                    placeholder='Search'
                    // value={username}
                    onChange={(e) => handleSearch(e)}
                />
                <div className='px-3'>
                    {
                        filterUsers.map((item, index) => {
                            return (
                                <div className='flex items-center hover:bg-slate-100 py-2 px-2 my-2 rounded-lg' key={index} onClick={() => { setuserDetails(item.id) }}>
                                    <img src={item.profileImg || `https://www.svgrepo.com/show/527946/user-circle.svg`} alt=""
                                        className='w-12 h-12 rounded-full object-cover'
                                    />
                                    <div className='ms-2'>
                                        <p className='mb-0 text-sm font-bold'>{item.userName}</p>
                                        <p className='text-sm'>{item.name}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            {/* SEARCHED PERSONED SECTION */}
            <div className='container px-20 h-screen overflow-scroll'  >
                {searchedUser && <>

                    <div className='flex justify-center mt-10'>
                        {/* PROFILE PIC */}
                        <div div className=''>
                            <img src={searchedUser?.profileImg || "https://www.svgrepo.com/show/527946/user-circle.svg"} alt=""
                                className='w-40 h-40 object-cover rounded-full' />
                        </div>
                        {/* PERSONAL INFO */}
                        <div className='ms-10'>
                            <div className='flex items-center'>
                                <p className='me-10 text-xl' >{searchedUser?.userName}</p>
                                {
                                    // user?.followers.includes(searchedUser.id) ? <>
                                    
                                    user.following.includes(searchedUser.id) ? <>
                                        <button className='mx-1 bg-slate-500 rounded px-3 py-1 text-white' onClick={() => { removeFollowing() }}>Unfollow</button>
                                    </> : <>
                                        <button className='mx-1 bg-blue-500 rounded px-3 py-1 text-white' onClick={() => { addToFollowers() }}>Follow</button>
                                    </>
                                }
                                <button className='mx-1 bg-slate-200 rounded px-3 py-1'>Message</button>
                                <button className='mx-1'>&#x2022;&#x2022;&#x2022;</button>
                            </div>
                            <div className='flex space-x-7 mt-6'>
                                <p>{post?.length} posts</p>
                                <p>{searchedUser?.followers?.length} followers</p>
                                <p>{searchedUser?.following?.length} following</p>
                            </div>
                            <div className='mt-4'>
                                <p className='text-sm'>{searchedUser?.name}</p>
                                <p className='text-sm'>{searchedUser?.description}</p>
                            </div>
                        </div>
                        {/* POSTS */}
                    </div>
                    <div className=' mt-6'>
                        <p className='text-center'>POSTS</p>
                        <div className='grid grid-cols-3 gap-1 px-12 mt-5   '>
                            {
                                post.map((item, index) => {
                                    return (
                                        <div className="" key={index}>
                                            <img src={item.img || "https://images.pexels.com/photos/10255583/pexels-photo-10255583.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} alt=""
                                                className=' w-full object-cover rounded-md' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>}
            </div>
        </div >

    )
}
