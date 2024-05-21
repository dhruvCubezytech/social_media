import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios, { all } from 'axios'

export default function Comment(props) {

    // const user = useSelector(state => state.userDetail)
    // console.log(user)
    const [data, setData] = useState(props.data)
    const [post, setPost] = useState(props.data.modalState.post)
    const [user, setUser] = useState(props.data.modalState.user)
    const [Comments, setComments] = useState(props.data.modalState.post.comments)
    const [comment, setComment] = useState('')
    const postId = props.data.modalState.post.id

    const getAllComment = async() => {
        const response = await axios.get(`http://localhost:3000/posts/${postId}`);
        setComments(response.data.comments)
        // console.log(response.data.comments)
    }

    const handleComment = async (e) => {
        e.preventDefault()
        try {
            const data = {
                userId: user.id,
                text: comment
            }
            const response = await axios.patch(`http://localhost:3000/posts/${postId}`, {
                comments: [
                    ...Comments,
                    {
                        userId: user.id,
                        text: comment
                    }
                ]
            })
            setComment('')
            // console.log(response.data)
        } catch (e) {
            console.log("error", e)
        }
    }

    useEffect(() => {
        getAllComment()
    }, [handleComment])


    return (
        <div className='flex h-screen w-full absolute items-center justify-center  top-0 left-0 bg-gray-700 bg-opacity-40 '>
            <div className='h-full flex bg-white rounded-lg box-shadow' style={{ height: '90vh' }}>

                <div className='object-cover' style={{ width: '500px' }}>
                    <img src={post.img || "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600"} alt=""
                        className='h-full rounded-lg' />
                </div>
                <div className="flex flex-col justify-between h-full" style={{ width: '400px' }}>

                    {/* POST USERS DETAIL */}
                    <div className="px-4 py-4 flex items-center">
                        <img src={data?.modalState?.user?.profileImg || 'https://www.svgrepo.com/show/527946/user-circle.svg'} alt=""
                            className='w-10 h-10 rounded-full' />
                        <div>
                            <p className='ms-2 font-bold' >{data?.modalState?.user?.userName}</p>
                            <small className='ms-2'>{data?.modalState?.user?.name}</small>
                        </div>
                        <i className="bi bi-three-dots ms-auto me-2 px-2 py-1 rounded hover:bg-slate-200"></i>
                        <i className=" bi bi-x-lg px-2 py-1 rounded hover:bg-slate-200"
                            onClick={() => {
                                props.data.setModalState({
                                    isVisible: false,
                                    user: null,
                                    post: null
                                })
                            }}>
                        </i>
                    </div>

                    {/* ALL COMMENTS */}
                    <div className='px-4 border h-full overflow-y-scroll scroll-bar'>
                        {
                            Comments?.map((item, index) => {
                                const user = data.users.filter((element) => {
                                    return element.id === item.userId
                                })
                                // console.log(allComments)
                                return (
                                    <div className="mt-3 flex" key={index}>
                                        <img src={user[0]?.profileImg || 'https://www.svgrepo.com/show/527946/user-circle.svg'} alt=""
                                            className='w-10 h-10 rounded-full' />
                                        <div>
                                            <p className='ms-2 font-bold' >{user[0]?.userName}</p>
                                            <small className='ms-2'>{user[0]?.name}</small>
                                        </div>
                                        <small className='ms-1'>{item.text}</small>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <form action="" onSubmit={(e) => { handleComment(e) }}>

                        <div className='mt-auto'>
                            <input type="text" placeholder='Add Comment ...' className='border w-full py-5 px-2 ps-3 focus:outline-none '
                                value={comment}
                                onChange={(e) => { setComment(e.target.value) }} />
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}
