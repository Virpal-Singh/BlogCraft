import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import authservice from './appwrite/auth'
import { login,logout } from './features/authSlice'
import { BrowserRouter} from 'react-router-dom'
import bg from './assets/bg_web.jpg'

function App() {
  const [loding,setLoding]=useState(true)
  const dispatch=useDispatch()

  useEffect(() => {
    authservice.GetCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((e)=>console.log(e))
    .finally(setLoding(false))
  }, [])
  

  if(!loding){
    return(
      <>
        <Header/>
         <div className={`w-screen min-h-screen bg-[url('./assets/bg_web.jpg')] bg-top bg-repeat-y `} style={{backgroundImage:`url(${bg})`}}> 
           {<Outlet/>}
        </div>
        <Footer/>
     </>
    )
  }
  else{
    return(
      <div className='text-center text-white text-3xl'>Loding....</div>
    )
  }
}

export default App
