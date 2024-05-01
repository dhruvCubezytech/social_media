import React,{useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'

export default function Messages() {

    const [post, setPost] = useState([])
    const [users, setUsers] = useState([])

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
        <div className='flex'>
            <Sidebar />
            <div className='h-screen px-3 border-e' style={{ marginLeft: '18vw', width: '40vw' }}>
                <p className='my-10 font-mediumm text-3xl'>Messages</p>
                <div className='border'>
                    qwe
                </div>
            </div>
            {/* SEARCHED PERSONED SECTION */}
            <div className='container px-20 h-screen overflow-scroll'  >
                <div className="border">
                    qwe
                </div>
            </div>
        </div>
    )
}
