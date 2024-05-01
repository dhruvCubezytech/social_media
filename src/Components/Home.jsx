import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import '../css/Utility.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Comment from './Shared/Comment'

export default function Home() {

    const user = useSelector(state => state.userDetail)
    // console.log(user)
    const [post, setPost] = useState([])
    const [users, setUsers] = useState([])
    const [modalState, setModalState] = useState({
        isVisible: false,
        user: null,
        post: null
    })
    // console.log(modalState)


    const getAllPost = async () => {
        const response = await axios.get('http://localhost:3000/posts')
        setPost(response.data)
    }
    const getAllUsers = async () => {
        let response = await axios.get("http://localhost:3000/users")
        setUsers(response.data)
        // console.log(users)
    }

    const likePost = async (id) => {
        // console.log(post)
        const selectPost = post.filter((item) => {
            return item.id === id
        })
        // console.log(selectPost,id)
        const likes = selectPost[0]?.likes
        // console.log(selectPost)
        // console.log(likes)
        const q = likes?.includes(user.id)
        // console.log(q)
        if (q === false) {
            const response = await axios.patch(`http://localhost:3000/posts/${id}`,{
                likes:[
                    ...likes,
                    user.id
                ]
            })
        }
        else {
            let lik = likes?.filter((item)=>{
                return item !== user.id 
            });
            // console.log(lik)
            const response = await axios.patch(`http://localhost:3000/posts/${id}`,{
                likes:[
                    ...lik
                ]
            })
            console.log()
        }
    }

    useEffect(() => {
        getAllPost()
        getAllUsers()
    }, [likePost])

    return (
        <>
            <div className={`flex ${modalState.isVisible && 'fixed w-full'}`}>
                <Sidebar />
                <div className='border w-full flex justify-center' style={{ marginLeft: '18vw' }}>

                    <div className=' flex justify-between' style={{ width: '1000px' }}>

                        <div className='' style={{ width: '650px' }}>

                            {/* HORIONTAL SCROLL BAR */}
                            <div className=' my-5'>

                                <div className='text-nowrap overflow-x-scroll scrollBar pb-3'>

                                    <div className='inline-block text-center overflow-hidden me-2'>
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt=""
                                            className='w-16 h-16 rounded-full object-cover mx-auto  border-2 border-spacing-2 p-0.5  border-red-600'
                                        />
                                        <small className='text-nowrap'>{`qweqweqweqwe`.slice(0, 10)}</small>
                                    </div>
                                    <div className='inline-block text-center overflow-hidden me-2'>
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt=""
                                            className='w-16 h-16 rounded-full object-cover mx-auto  border-2 border-spacing-2 p-0.5  border-red-600'
                                        />
                                        <small className='text-nowrap'>{`qweqweqweqwe`.slice(0, 10)}</small>
                                    </div>
                                    <div className='inline-block text-center overflow-hidden me-2'>
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt=""
                                            className='w-16 h-16 rounded-full object-cover mx-auto  border-2 border-spacing-2 p-0.5  border-red-600'
                                        />
                                        <small className='text-nowrap'>{`qweqweqweqwe`.slice(0, 10)}</small>
                                    </div>

                                </div>
                            </div>

                            {/* POST SECTION */}
                            <div className='mt-3 mx-24'>
                                {
                                    post.map((item) => {
                                        let extractUserProfile = users.filter((element) => {
                                            return element.id === item.userId
                                        })
                                        // let allLikes = item.likes
                                        let included = item?.likes?.includes(user.id)
                                        // console.log(extractUserProfile[0].id)
                                        // console.log(item.likes.includes(user.id))
                                        return (
                                            <div className='mt-5 pb-5 border-b-2' key={item.id}>
                                                <div className="w-full mb-2 flex items-center">
                                                    <img src={extractUserProfile[0]?.profileImg || 'https://www.svgrepo.com/show/527946/user-circle.svg'} alt=""
                                                        className='w-10 h-10 rounded-full' />
                                                    <p className='ms-2' >{extractUserProfile[0]?.userName}</p>
                                                    <p className='ms-auto font-extrabold'> &#x2022;&#x2022;&#x2022;</p>
                                                </div>
                                                <div>
                                                    <img src={item.img} alt="asd"
                                                        className='h-auto' />
                                                </div>
                                                <div className='mt-2 flex items-center'>
                                                    <i className={`bi bi-heart-fill text-2xl mx-1 ${included ? 'text-red-500' : 'text-slate-400'}`}
                                                        id={item.id}
                                                        onClick={() => { document.getElementById(`${item.id}`).classList.toggle('text-red-500'); likePost(item.id)}}>

                                                    </i>
                                                    <i className="bi bi-chat text-2xl mx-1"
                                                        onClick={() => {
                                                            setModalState(
                                                                {
                                                                    isVisible: true,
                                                                    user: extractUserProfile[0],
                                                                    post: item
                                                                }
                                                            );
                                                        }}
                                                    ></i>
                                                    <i className="bi bi-send text-2xl mx-1"></i>

                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>

                        {/* OTHER ACTIVITIES */}
                        <div className='' style={{ width: '300px' }}>
                            <p className='mt-3'>Users Suggested for You</p>
                            <div>
                                <div className='flex items-center mt-5' >
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt=""
                                        className='w-12 h-12 rounded-full object-cover'
                                    />
                                    <div className='ms-2'>
                                        <p className='mb-0 text-sm font-bold'>name</p>
                                        <p className='text-sm'>user name</p>
                                    </div>
                                    <p className='ms-auto text-sm text-blue-600 font-bold'>Follow</p>
                                </div>
                            </div>
                        </div>

                        {/* MODAL */}
                        {
                            modalState.isVisible && <Comment data={{ modalState, setModalState, users }} />
                        }

                    </div>

                </div>
            </div>
        </>
    )
}
