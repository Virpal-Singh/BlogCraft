import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import {login as authlogin} from '../../features/authSlice'
import Button from '../Button'
import InputBox from '../InputBox'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

export default function Login() {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState('')

    const login=async(data)=>{
        setError('')
        try {
            const session= await authService.Login(data)
            if(!session){
                throw new Error('Session is not returend')
            }
            const userData =await authService.GetCurrentUser()
            if(!userData){
                throw new Error('could not fetch user')
            }
            dispatch(authlogin(userData))
            navigate('/')
                
            
        } catch(error) {
            console.log(error)
            setError( error?.message ||error?.respoce?.message|| error ||'something went wrong')

        }
    }

  return (
    <div className='flex justify-center items-center w-full '>
        <div className='mx-auto w-full max-w-lg shadow-lg  rounded-xl p-10 border-black/10 backdrop-blur-lg bg-white/10 dark:bg-gray-800/20'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block text-xl font-extrabold w-full max-w-[100px]'>
                    <span className='text-yellow-500'>L </span>
                    <span className='text-blue-600'>O </span>
                    <span className='text-red-700'>G </span>
                    <span className='text-orange-500'>I </span>
                    <span className='text-green-600'>N</span>

                </span>
            </div>
            <h2 className='text-center text-2xl text-white font-bold leading-tight'> Sign in to your account</h2>
            <p className='mt-2 text-center text-white text-base '>
                Don&apos;t have any account?&nbsp;
                <Link to='/signup' className='font-medium text-primary transition-all hover:text-blue-600 duration-200 hover:underline'>Sign Up</Link>
            </p>
            {error &&
                <p className='text-rose-500 text-center'>{error}</p>
            }
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <InputBox
                        label='Email: '
                        placeholder='Enter your email'
                        type='email'
                        {...register('email',{
                            required:true,
                            validate:{
                                matchPatern:(value)=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || 'Email address muse be a valid address',
                            },
                        })}
                    />
                    <InputBox 
                        label='Password: '
                        placeholder='Enter your password'
                        type='password'
                        {...register('password',{
                            required:true,

                        })}
                    />
                    <Button classname='w-full' children={'Sign in'} type='submit'/>
                </div>
            </form>
        </div>
    </div>
  )
}
