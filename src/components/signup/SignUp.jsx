import React,{useState} from 'react'
import authService from '../../appwrite/auth'
import InputBox from '../InputBox'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { login } from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import { data, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function SignUp() {
    const [error,setError]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit,formState: { errors },}=useForm()

    const signup=async(data)=>{
        setError('')
        console.log('signup-data: ',data)
        try {
            const user=await authService.CreateAcount(data)
            console.log('signup-user: ',user)
            if(user){
                const userData=await authService.GetCurrentUser()
                console.log('signup-userData: ',userData)
                if(userData){
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error?.message ||error?.response?.message ||'Something went wrong');
            console.log('signup-error: ',error)}
    }



  return (
    <div className='flex justify-center items-center w-full'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 shadow-lg rounded-xl p-10 backdrop-blur-lg bg-white/10 border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block text-xl  font-extrabold w-full max-w-[110px]'>
                    <span className='text-yellow-500'>S </span>
                    <span className='text-blue-600'>I </span>
                    <span className='text-red-700'>G </span>
                    <span className='text-orange-500'>N </span>
                    <span className='text-green-600'>U </span>
                    <span className='text-pink-600'>P</span>

                </span>
            </div>
            <h2 className='text-center text-2xl font-bold  text-white leading-tight'> Create account</h2>
             <p className='mt-2 text-center text-base text-white'>
                Already have an account?&nbsp;
                <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:text-blue-600 hover:underline'>Login</Link>
            </p>
            {error &&
                <p className='text-red-800 text-center'>{error}</p>
            }
            <form onSubmit={handleSubmit(signup)} className='mt-8'>
                <div className='space-y-5'>
                    <InputBox 
                        label='Name: '
                        placeholder='Enter your name'
                        type='text'
                        {...register('name',{
                            required:true,

                        })}
                    />
                    <InputBox
                        label='Email: '
                        placeholder='Enter your email'
                        error={errors?.email?.message}
                        type='email'
                        {...register('email',{
                            required:true,
                             validate: {
                                    matchPatern: (value) =>
                                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || 'Email address must be a valid address',
    }
                        })}
                    />
                    <InputBox 
                        label='Password: '
                        placeholder='Enter your password'
                        type='password'
                        error={errors?.password?.message}
                        {...register('password',{
                            required:true,
                             minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                    },
                                    validate: {
                                    hasUpper: (value) =>
                                        /[A-Z]/.test(value) || 'Must include at least one uppercase letter',
                                    hasLower: (value) =>
                                        /[a-z]/.test(value) || 'Must include at least one lowercase letter',
                                    hasNumber: (value) =>
                                        /\d/.test(value) || 'Must include at least one number',
                                    hasSymbol: (value) =>
                                        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                        'Must include at least one special character',
                                    },

                        })}
                    />
                    <Button classname='w-full' children={'Register'} type='submit'/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp