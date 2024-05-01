import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setUserDetails } from "./redux/features/userSlice"
import axios from "axios"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import Home from "./Components/Home"
import Explore from "./Components/Explore"
import Search from "./Components/Search"
import Profile from "./Components/Profile"
import CreatePost from "./Components/CreatePost"
import Messages from "./Components/Messages"

function App() {

  // console.log(useSelector(state => state))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const refresh = async () => {
    const response = await axios.get('http://localhost:3000/users')
    const userId = localStorage.getItem('userId')
    // console.log(userId)
    response.data.forEach(element => {
      if (element.id == userId) {
        dispatch(setUserDetails(element))
        // console.log("success")
      }
      else {
        // console.log("error")
      }
    })
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Explore' element={<Explore />} />
        <Route path='/Search' element={<Search />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/CreatePost' element={<CreatePost />} />
        <Route path='/Messages' element={<Messages />} />
      </Routes>
    </>
  )
}

export default App
