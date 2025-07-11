import React,{ useEffect ,useState,useCallback}  from 'react'
import InputBox from '../InputBox'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import Select from '../Select'
import RTE from '../rte/RTE'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../../appwrite/config'
import {useNavigate} from 'react-router-dom'


function PostForm({post}) {

    const { register, handleSubmit, control,watch,setValue,getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status|| 'active',
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.userData)
    
   

    const submit= async (data)=>{
        console.log('Submitted data:', data)

        if(post){
            console.log('clik on edit and i am here')
            const file=data.image[0] ? await dbService.UploadFile(data.image[0]) : null
            if(file){
                await dbService.DeletFile(post.attachimage)
            }

            const dbpost= await dbService.UpdatePost(post.$id,{...data,attachimage:file?.$id || post.attachimage})

            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }
        else{
            const file=data.image[0] ? await dbService.UploadFile(data.image[0]) : null
            if(file){
                const fileID= file.$id
                data.attachimage=fileID
                const dbspost =await dbService.CreatePost({...data,userId:userData.$id})
                if(dbspost){
                    navigate(`/post/${dbspost.$id}`)
                }
            }
        }
    }


    useEffect(() => {
                if (post?.slug) {
                    setValue('slug', post.slug);
                } else if (post?.title) {
                    const slug = slugTransform(post.title);
                    setValue('slug', slug);
                }
            }, [post, setValue]);


   const slugTransform = (value) => {
            if (!value || typeof value !== 'string') return '';
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w-]/g, '') // only keep letters, numbers, underscores and dashes, no spaces!
                .replace(/-+/g, '-')    // collapse multiple dashes
                .replace(/^[-_]+|[-_]+$/g, ''); // trim leading/trailing dashes or underscores
            };

    useEffect(() => {
        const subcription = watch((value,{name})=>{
            if(name === 'title'){
                const slug = slugTransform(value.title,{shoudValidate: true})
                setValue('slug',slug)
            }
        })

        return () => {
            subcription.unsubscribe()
        }
    },[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)}  className='flex m-5 flex-wrap  flex-col sm:flex-row'>
        <div className=' px-2 w-full sm:w-2/3'>
            <InputBox
                label='Title: '
                placeholder='Enter post title'
                className='mb-4 h-10 p-2'
                {...register('title', { required: true })}
            />
            <InputBox
                label='Slug: '
                placeholder='Enter post slug'
                className='mb-4 h-10 p-2'
                {...register('slug', { required: true })}
                onInput={(e)=>{
                    const slug = slugTransform(e.target.value)
                    setValue('slug',slug)
                }}
            />
            <RTE
                name='content'
                label='Content'
                control={control}
                defaultValue={post ? post.content : ''}
            />
        </div>
        <div className=' px-2 w-full sm:w-1/3 mt-4 sm:mt-0'>
            <InputBox
                label='Attach Image: '
                type='file'
                accept='image/*'
                className='mb-4'
                {...register('image',{required: !post})}
            />
            {post && (
                <div className='mb-4 w-full'>
                    <img className='rounded-lg' src={dbService.GetFilePrivew(post.attachimage)} alt={post.title} />
                </div>
            )}
            <Select
                label='Status: '
                options={["active",'inactive']}
                className='mb-4 rounded-xl'
                {...register('status', { required: true })}
            />
            <Button
                type='submit'
                bgColor={post ? 'bg-green-500' : undefined}
                classname='w-full rounded-xl'
                children={post ? 'Update Post' : 'Create Post'}
            />
        </div>
    </form>
  )
}

export default PostForm