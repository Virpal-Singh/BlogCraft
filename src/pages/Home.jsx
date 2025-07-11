import React,{useEffect,useState} from 'react'
import dbService from '../appwrite/config'
import Postcard from '../components/postcard/Postcard'
import { useSelector } from 'react-redux'
import { Client } from 'appwrite'
import { Link } from 'react-router-dom'

function Home() {
    
    const user=useSelector((state)=>state.status)
    
    const[loding,setLoading]=useState(true)

    const [posts,setPosts]=useState([])

    useEffect(()=>{
        dbService.GetPosts().then((post)=>{
            if(post){
                setPosts(post.documents)
                setLoading(false)
            }
        })
    },[])

    if(!user){
        return(<>
            <div className='h-[300px] flex items-center justify-center'>
                <h1 className='text-green-200 text-3xl sm:text-5xl md:text-[80px] text-center font-bold'>
                    Welcome to the BlogCraft
                </h1>
            </div>
            <div className='text-center text-white text-3xl py-8'>Please Login to see posts</div>
            </>
        )
    }
    if(loding){
        return(
            <div className='text-center  text-white text-3xl py-8'>Loding...</div>
        )
    }
  if(posts.length > 0){
    return(
      <>
  <div>
    <div className='h-[300px] flex items-center justify-center'>
      <h1 className='text-green-200 text-3xl sm:text-5xl md:text-[80px] text-center font-bold'>
        Welcome to the BlogCraft
      </h1>
    </div>

    <div className='w-full md:h-[300px] mb-4 sm:mb-8 px-4 sm:px-0'> {/* Changed h-[300px] to md:h-[300px] */}
      <h1 className='text-center text-3xl text-violet-500'>Features</h1>
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 px-4 sm:px-0">
        <div className="w-[200px] h-[200px] flex items-center justify-center rounded-xl border-1 border-transparent bg-gradient-to-r from-indigo-800 to-violet-600 p-1 hover:from-indigo-700 hover:to-violet-500 transition-all duration-300">
          <Link to='/add-post' className="w-[200px] h-[190px] flex hover:bg-opacity-45 hover:cursor-pointer items-center justify-center bg-gray-900 rounded-lg text-white font-semibold text-xl">
            Create Post
          </Link>
        </div>

        <div className="w-[200px] h-[200px] flex items-center justify-center rounded-xl border-1 border-transparent bg-gradient-to-r from-indigo-800 to-violet-600 p-1 hover:from-indigo-700 hover:to-violet-500 transition-all duration-300">
          <Link to='/my-posts' className="w-[200px] h-[190px] flex items-center hover:bg-opacity-45 hover:cursor-pointer justify-center bg-gray-900 rounded-lg text-white text-xl font-semibold">
            My Posts
          </Link>
        </div>

        <div className="w-[200px] h-[200px] flex items-center justify-center rounded-xl border-1 border-transparent bg-gradient-to-r from-indigo-800 to-violet-600 p-1 hover:from-indigo-700 hover:to-violet-500 transition-all duration-300">
          <Link to='/all-posts' className="w-[200px] h-[190px] flex items-center justify-center hover:bg-opacity-45 hover:cursor-pointer bg-gray-900 rounded-lg text-white text-xl font-semibold">
            All Posts
          </Link>
        </div>
      </div>
    </div>
  </div>

  <div className='bg-gray-950 rounded-xl px-4 sm:px-0'>
    <p className='text-center text-violet-500  m-10  text-3xl'>Here you can find all the latest posts</p>
    <div className={`w-full min-h-[270px] flex flex-wrap p-8 flex-col sm:flex-row items-center`}>
      {posts.map((post) => (
        console.log(post),
        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
          <Postcard {...post} />
        </div>
      ))}
    </div>
  </div>
</>


    )
  }
  else{
    return(
        <div className='py-8 text-center'><h2 className='text-3xl'>NO Posts yet</h2></div>
    )
  }
}

export default Home