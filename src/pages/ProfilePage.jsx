import React,{useState,useEffect} from 'react'
import Postcard from '../components/postcard/Postcard'
import dbService from '../appwrite/config'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

function ProfilePage() {

    
    const [loading,setLoading]=useState(true)
    const [posts,setPosts]=useState([])
    const userData=useSelector((state)=>state.userData)
    
    
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
     useEffect(()=>{
             if(userData){
                 setLater(userData.name[0].toUpperCase())
             }
         },[userData])

    useEffect(()=>{     
        try {
            dbService.GetPosts([Query.equal('userId', userData.$id)]).then((res)=>{
                if(res){
                    setPosts(res.documents)
                    setLoading(false)
                }
            })
        } catch (error) {
            console.log('ProfilePage-Error: ',error)
        }
    },[userData])
    if(loading){
        return (
            <div className='text-center text-white text-3xl py-8'>Loading...</div>
        )
    }
  return (
    <>
        <div className='w-full h-full flex  justify-center'>
            <div className='w-auto h-auto rounded-full flex mt-10 justify-center'>
            <div className={`rounded-full p-1 px-8 text-[60px] ${color}  text-white text-center`}>
                {later}
            </div>
        </div>
        </div>
        <div className='w-full text-3xl mt-5 text-center text-white mb-5 font-bold'>{userData.name}</div>
        { posts.length > 0 ? (
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
        </div>):(
            <div className='text-center text-white mt-10 text-3xl py-8'>No posts found</div>
        )}
    </>
  )
}

export default ProfilePage