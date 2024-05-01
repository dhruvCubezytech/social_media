import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function SignUp() {

    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        userName: '',
        password: ''
    })

    const handlechange = (e) => {
        const { name, value } = (e.target)
        // console.log(name, value)
        setData({
            ...data,
            [name]:value
        })
    }

    const SignUpUser = async () => {
        // console.log(userid)
        const response = await axios.post('http://localhost:3000/users', data)
        console.log(response.data)
        navigate('/login')
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        SignUpUser()
        // console.log(data)
    }

    return (
        <div className='h-screen flex justify-center items-center' style={{ background: 'linear-gradient(45deg, rgb(253, 244, 181),rgb(206, 219, 252),rgb(251, 214, 212)' }}>
            {/* <img src={login} alt="" className='w-auto h-screem'/> */}
            <div className='border border-gray-500 p-12 rounded-3xl' style={{ width: '400px' }}>
                <form action="">

                    <p>Full Name</p>
                    <input type="text" className='border border-gray-500 rounded  p-2 bg-transparent w-full'
                        placeholder='Enter First name'
                        name="name"
                        onChange={(e) => { handlechange(e) }} />


                    <p className='mt-3'>User Name</p>
                    <input type="text" className='border border-gray-500 rounded  p-2 bg-transparent w-full'
                        placeholder='Enter Usename' 
                        name="userName"
                        onChange={(e) => { handlechange(e) }}/><br />

                    <p className='mt-3'>Password</p>
                    <input type="Password" className='border border-gray-500 rounded  p-2 bg-transparent w-full'
                        placeholder='Enter password' 
                        name="password"
                        onChange={(e) => { handlechange(e) }}/><br />

                    <div className='text-center'>
                        <button className='mt-5 mb-2 border rounded bg-blue-600 px-4 py-2 font-bold text-white text-xl w-full'
                            onClick={handlesubmit}>SignUp</button><br />

                    </div>
                    <small className='font-bold text-gray-400'>Already Have Account? <Link to='/Login' className='text-blue-500 font-bold underline'>Login!</Link></small>
                </form>
            </div>
        </div>
    )
}
