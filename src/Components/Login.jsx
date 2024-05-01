import React, { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setUserDetails } from '../redux/features/userSlice'
import login from "../assets/login.jpg"
import axios from 'axios'
import { useDispatch } from 'react-redux'

export default function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userid, setuserid] = useState()
  const [password, setpassword] = useState()

  const loginUser = async () => {
    // const data= {userid,password}
    // console.log(userid)
    const response = await axios.get('http://localhost:3000/users')
    const data = (response.data)
    data.forEach(element => {
      if (element.userName === userid && element.password === password) {
        dispatch(setUserDetails(element))
        localStorage.setItem("userId",element.id)
        navigate('/')
      }
      else {
        console.log('Please try again!')
      }
    });
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    loginUser()
  }

  return (
    <div className='h-screen flex justify-center items-center' style={{ background: 'linear-gradient(45deg, rgb(253, 244, 181),rgb(206, 219, 252),rgb(251, 214, 212)' }}>
      {/* <img src={login} alt="" className='w-auto h-screem'/> */}
      <div className='border border-gray-500 p-12 rounded-3xl' style={{ width: '400px' }}>
        <form action="">
          <p>Username</p>
          <input type="text" className='border border-gray-500 rounded p-2 bg-transparent w-full'
            placeholder='Enter Usename'
            onChange={(e) => { setuserid(e.target.value) }} />

          <p className='mt-3'>Password</p>
          <input type="password" className='border border-gray-500 rounded p-2 bg-transparent w-full'
            placeholder='Enter Password'
            onChange={(e) => { setpassword(e.target.value) }} /><br />

          <div className='text-center'>
            <button className='mt-7 mb-2 border bg-blue-600 px-4 py-2 font-bold text-white text-xl rounded w-full' onClick={handlesubmit}>Login</button><br />
          </div>
          <small className='font-bold text-gray-400'>Dont Have Account? <Link to='/SignUp' className='text-blue-500 font-bold underline'>Creat One! </Link></small>
        </form>
      </div>
    </div>
  )
}
