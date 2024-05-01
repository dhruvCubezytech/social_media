import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import Comment from './Shared/Comment'

export default function Explore() {

    const [post, setPost] = useState([])
    const [users, setUsers] = useState([])
    const [modalState, setModalState] = useState({
        isVisible: false,
        user: null,
        post: null
    })

    const getAllPost = async () => {
        const response = await axios.get('http://localhost:3000/posts')
        setPost(response.data)
    }
    const getAllUsers = async () => {
        let response = await axios.get("http://localhost:3000/users")
        setUsers(response.data)
        // console.log(users)
    }

    useEffect(() => {
        getAllPost()
        getAllUsers()
    }, [])

    return (
        <div className={`flex ${modalState.isVisible && 'fixed w-full'}`}>
            <Sidebar />
            <div className='border w-full flex justify-center' style={{ marginLeft: '18vw' }}>

                <div className='mt-10' style={{ width: '1000px' }}>
                    <div className='grid grid-cols-3 gap-1'>

                        {
                            post?.map((item) => {
                                let extractUserProfile = users.filter((element) => {
                                    return element.id === item.userId
                                })
                                return (
                                    <div className="" key={item.id} onClick={() => {
                                        setModalState(
                                            {
                                                isVisible: true,
                                                user: extractUserProfile[0],
                                                post: item
                                            }
                                        );
                                    }}>
                                        <img src={item.img || "https://www.svgrepo.com/show/457693/img.svg"} alt=""
                                            className=' w-full object-cover rounded-md' />
                                    </div>
                                )
                            })
                        }

                    </div>
                    {/* MODAL */}
                    {
                        modalState.isVisible && <Comment data={{ modalState, setModalState, users }} />
                    }
                </div>
            </div>
        </div>
    )
}
