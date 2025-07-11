import React, { useState } from 'react'
import blog from '../../assets/blogcraft01.png'
import { Link,NavLink } from 'react-router-dom'
import Logoutbtn from './Logoutbtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isAction } from '@reduxjs/toolkit'
import Profile from '../Profile/Profile'


function Header() {
  const [isOpen,setIsOpen]=useState(false)
  const navigate=useNavigate()
  const authstatus=useSelector((state)=>state.status) 
  const navItems=[
    {
        name:'Home',
        slug:'/',
        active:true
    },
    {
        name:'Login',
        slug:'/login',
        active:!authstatus
    },
    {
        name:'Signup',
        slug:'/signup',
        active:!authstatus
    },
    {
        name:'My Posts',
        slug:'/my-posts',
        active:authstatus
    },

    {
        name:'All Posts',
        slug:'/all-posts',
        active:authstatus
    },
    {
        name:'Add Post',
        slug:'/add-post',
        active:authstatus
    }
  ]
  return (
    <header className="bg-gray-900 text-white dark:bg-gray-900 dark:text-gray-200 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src={blog} alt="logo" className="h-[70px] w-auto" />
                   
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {navItems.map((item)=>
                        item.active ? (
                            
                            <NavLink 
                                    key={item.name} 
                                    to={item.slug}
                                    className={({ isActive }) => 
                                        `hover:text-blue-400 transition ${isActive ? 'text-blue-400' : ''}`
                                    }
                                    >
                                    {item.name}
                            </NavLink>
                        ):(null)
                    )}
                    {authstatus ? <Profile/> : null}
                    {authstatus ? <Logoutbtn/>:null }
                  
                    
                </nav>
                

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-800 dark:bg-gray-900 flex flex-col items-start">
                    {navItems.map((item)=>
                        item.active ? (
                             <Link key={item.name} to={item.slug} className="hover:text-blue-400 transition">{item.name}</Link>
                        ):(null)
                    )}
                    {authstatus ? <Profile/> : null}
                    {authstatus ? <Logoutbtn/>:null }
                    
                </div>
            )}
        </header>
  )
}

export default Header
//bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition