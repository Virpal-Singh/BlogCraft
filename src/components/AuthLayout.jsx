import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
 export default function Protected({children,authentication = true}) {

    const navigate=useNavigate()
    const [loder,setLoder]=useState(true)
    const authstatus=useSelector((state)=>state.status)
 
    useEffect(()=>{
          
        if( authentication && authstatus!==authentication){
            navigate('/login')
        }
        else if( !authentication && authstatus!==authentication){
            navigate('/')
        }
        setLoder(false)
    },[authstatus,navigate,authentication])
  return loder ? <h1>Loding...</h1> : <>{children}</>
}

