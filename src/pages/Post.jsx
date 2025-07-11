import React,{useState,useEffect} from 'react'
import dbService from '../appwrite/config'
import defaulti from '../assets/default.jpg'
import { useNavigate,Link,useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import parse from 'html-react-parser'

function Post() {

    const [post,setPost]=useState(null)
    const {slug}=useParams()
   
    const navigate=useNavigate()
    const userData= useSelector((state)=>state.userData)
    // console.log('userData in post',userData)
    

    useEffect(()=>{
        if(slug){
            dbService.GetPost(slug).then((post)=>{
                if(post) setPost(post);
                else {
                    navigate('/')
                    console.log('No post found with this slug')
                }
            })
        }
        else{
            navigate('/')
            console.log('No slug found')
        }
    },[slug,navigate])

    const deletpost=()=>{
        dbService.DeletPost(post.$id).then((status)=>{
            if(status){
                dbService.DeletFile(post.attachimage)
                navigate('/')
                
            }
        })
    }

  return post ? (
    <div className='py-8 flex flex-col items-center w-full'>
        <div className='w-6/12 flex justify-center mb-4 relative border min-h-[200px] rounded-xl p-2'>
            <img className='rounded-xl text-white' onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop if default image also fails
                            e.target.src = defaulti; // Set to fallback image
                        }} src={dbService.GetFilePrivew(post.attachimage)} alt={post.title} />
    
            {userData && userData.$id === post?.userId && (
                <div className='absolute right-6 top-6'>
                    <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor='bg-green-500' classname='mr-3'>Edit</Button>
                    </Link>
                    <Button bgColor='bg-red-500' onClick={deletpost}>Delete</Button>
                </div>
            )}
        </div>
        <div className='w-full mb-6'>
            <h1 className='text-3xl font-bold font-mono text-white text-center'>{post.title}</h1>
        </div>
        <div className='browser-css text-white w-full px-10 items-baseline text-xl'>{parse(post.content)}</div>
    
    </div>
  ): null
}

export default Post