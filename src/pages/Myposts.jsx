import React,{useState,useEffect} from 'react'
import Postcard from '../components/postcard/Postcard'
import dbService from '../appwrite/config'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

function Myposts() {
    const [loading,setLoading]=useState(true)
    const [posts,setPosts]=useState([])
    const userData=useSelector((state)=>state.userData)
    useEffect(()=>{
        try {
            dbService.GetPosts([Query.equal('userId', userData.$id)]).then((res)=>{
                if(res){
                    setPosts(res.documents)
                    setLoading(false)
                }
            })
        } catch (error) {
            console.log('Myposts-Error: ',error)
        }
    },[])


    if(loading){
        return (
            <div className='text-center text-white text-3xl py-8'>Loading...</div>
        )
    }
    if(!posts || posts.length===0){
        return (
            <div className='text-center text-white text-3xl py-8'>No posts found</div>
        ) 
    }
    return (
       <div className='w-full p-8'>
        <h1 className='text-5xl text-teal-400  hover:text-cyan-600 duration-150 font-mono mb-2 text-center'>My Posts</h1>
        <div className='flex flex-wrap  flex-col sm:flex-row items-ceneter'>
            {
                posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post}/>
                    </div>
                ))
            }
        </div>
    </div>
    )
}

export default Myposts  