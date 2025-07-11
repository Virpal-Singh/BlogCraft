import React,{useId} from 'react'

function Select(
    {options,
    label,
    className='',
    ...props},ref
){

    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id}></label>}
        <select {...props} ref={ref} id={id} className={`${className} px-3 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}>
            {options?.map((option,index)=>(
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select )