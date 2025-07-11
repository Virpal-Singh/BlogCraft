import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'



function Profile() {

    const [later,setLater]=useState('')
    const colors = [
  'bg-yellow-600',
  'bg-green-600',
  'bg-lightgreen-600',  // ⚠️ Not a default Tailwind color
  'bg-indigo-600',
  'bg-rose-600',
  'bg-cyan-600',
  'bg-violate-600',     // ⚠️ Likely a typo, should be 'violet'
  'bg-slate-600',
  'bg-gray-600',
  'bg-red-600',
  'bg-orange-600',
  'bg-blue-600'
];

    
    const color=colors[Math.floor(Math.random()*colors.length)]
    const user=useSelector((state)=>state.userData)
    useEffect(()=>{
        if(user){
            setLater(user.name[0].toUpperCase())
        }
    },[user])
    
  return (
    <div className='w-auto h-auto rounded-full flex justify-center'>
        <Link to='/profile' className={`rounded-full p-1 px-3 text-3xl ${color}  text-white text-center`}>
            {later}
        </Link>
    </div>
  )
}

export default Profile