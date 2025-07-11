import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'

function Logoutbtn() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logouthandler=()=>{
      console.log('logout clicked')
        authService.Logout()
        .then(()=>{
            dispatch(logout())
            navigate('/')
          

        })
    }
  return (
    <button onClick={logouthandler} className=' bg-blue-500 hover:bg-blue-800 text-white px-2 text-center py-2 rounded-md'>Logout</button>
  )
}

export default Logoutbtn