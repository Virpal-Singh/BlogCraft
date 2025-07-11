import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    classname='',
    ...props

}) {
  return (
    <button className={`rounded border border-transparent hover:border-blue-500 transition duration-300 hover:bg-blue-800 py-1 px-2 ${bgColor} ${textColor} ${classname}`} {...props} >{children}</button>
  )
}

export default Button