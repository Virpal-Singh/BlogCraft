import React ,{useId, useRef}from 'react'

const InputBox=React.forwardRef(({
    lable,
    type='text',
    error,
    className='',
    ...props
}, ref)=>{
    const id=useId()
    return(
        <div className='w-full'>
            {lable && 
                <label className='inline-block mb-1 pl-1' htmlFor={id}>{lable}</label>
            }
            <input type={type} className={` hover:border-blue-500 transition duration-300 rounded-lg bg-white text-black px-2 py-1 outline-none focus:bg-gray-50 duration:200 border border-gray-200 w-full ${className}`}  ref={ref} id={id} {...props}/>
             {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    )
})

export default InputBox