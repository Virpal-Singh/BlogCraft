import React,{useEffect,useState} from 'react'
import PostForm from '../components/Post-form/PostForm'
import dbService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {

    const [post,setpost]=useState(null)
    const {slug}=useParams()
    console.log('slug:',slug)
    const navigate=useNavigate()

    useEffect(()=>{
        console.log('useEffect called with slug:', slug)
        // Check if slug is defined before making the API call
        if(slug){
            dbService.GetPost(slug).then((post)=>{
                if(post){
                    setpost(post)
                }
                else{
                    navigate('/')
                }
            })
        }
    },[navigate,slug])

  return post ? (
    <div className='py-8'>
            <PostForm post={post}/>
    </div>
  ):null
}

export default EditPost