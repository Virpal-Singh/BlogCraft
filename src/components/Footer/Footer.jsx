import React from 'react'
import blog from '../../assets/blogcraft01.png'
import { Link,NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Footer() {

    const navigate=useNavigate()
  return (
    <footer className="bg-gray-900 text-white py-8  dark:bg-gray-900 dark:text-gray-200">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
                <img className='w-auto h-[70px] mx-auto' src={blog} alt="" />
                <p>
                    <span className='inline text-2xl font-bold text-blue-400'>B</span>
                    logCraft is the all-in-one solution for productivity and team collaboration.
                </p>
            </div>
            <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li><Link to="/all-posts" className="hover:text-blue-500 dark:hover:text-white ">All Posts</Link></li>
                    <li><Link to="/add-post" className="hover:text-blue-500 dark:hover:text-white">Add Post</Link></li>
                    <li><Link to="/my-posts" className="hover:text-blue-500 dark:hover:text-white">My Blogs</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                <ul className="space-y-2">
                    <li><Link to="#" className="hover:text-gray-300 dark:hover:text-white">77virpalsinh77@gmail.com</Link></li>
                    <li><Link to="#" className="hover:text-gray-300 dark:hover:text-white"></Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                    <button onClick={()=>{window.location.href='https://github.com/Virpal-Singh'}} className='hover:text-blue-400 dark:hover:text-blue-300'>Git-Hub</button>
                    <button onClick={()=>{window.location.href='https://www.linkedin.com/in/virpal-sinh-222851314'}} className='hover:text-blue-400 dark:hover:text-blue-300'>Linkedin</button>
                </div>
            </div>
        </div>
        <div className="text-center mt-8">
            <p>© 2025 BlogCraft. All rights reserved.</p>
        </div>
    </div>
</footer>
  )
}

export default Footer