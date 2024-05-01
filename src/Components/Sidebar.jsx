import React from 'react'
import {Link} from 'react-router-dom'
import '../css/Sidebar.css'

export default function Sidebar() {
    return (
        <>
            <div className='sidebar h-screen fixed border'>
                <div className='  flex flex-col h-full max-h-full'>
                    <div className='mt-10 mb-6'>
                        <h1 className='mx-4 ps-3 py-2 font-serif text-2xl font-bold'><i>Instagram</i></h1>
                    </div>
                    <div className='align-middle'>
                        <Link to='/'><p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100 '><i className="bi bi-house-door-fill text-2xl font-bold pe-3"></i>Home</p></Link>
                        <Link to='/Search'><p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100 '><i className="bi bi-search text-2xl font-bold pe-3"></i>Search</p></Link>
                        <Link to='/Explore'><p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100 '><i className="bi bi-compass text-2xl font-bold pe-3"></i>Explore</p></Link>
                        {/* <p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100 '><i className="bi bi-film text-2xl font-bold pe-3"></i>Reels</p> */}
                        <Link to='/messages'><p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100 '><i className="bi bi-chat-dots text-2xl font-bold pe-3"></i>Messages</p></Link>
                        {/* <p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100 '><i className="bi bi-heart text-2xl font-bold pe-3"></i>Notifications</p> */}
                        <Link to='/CreatePost'><p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100 '><i className="bi bi-plus-circle text-2xl font-bold pe-3"></i>Create</p></Link>
                        <Link to='/Profile'><p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100 '><i className="bi bi-person-circle text-2xl font-bold pe-3"></i>Profile</p></Link>
                    </div>
                    <div className='mt-auto  mb-5'>
                        <p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100'><i className="bi bi-threads text-2xl font-bold pe-3"></i>Threads</p>
                        <p className='mt-3 mx-4 ps-3 py-2 rounded-lg hover:bg-slate-100'><i className="bi bi-list text-2xl font-bold pe-3"></i>More</p>
                    </div>
                </div>
            </div>
        </>
    )
}
