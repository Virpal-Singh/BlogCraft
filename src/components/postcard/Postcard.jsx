import React from 'react'
import defaulti from '../../assets/default.jpg'
import dbService from '../../appwrite/config'
import {Link,NavLink} from 'react-router-dom'
function Postcard({
    $id,title,attachimage
    
}) {
  console.log('Image preview URL:', dbService.GetFilePrivew(attachimage))
  return (
    <Link to={`/post/${$id}`}> 
  <div className='w-[300px]  bg-gray-800 border border-transparent hover:border-blue-500 transition duration-300 rounded-xl p-2 flex flex-col justify-around sm:min-h-[200px] min-h-[250px]'>
  <div className='w-full flex justify-center mb-4'>
    <img 
      src={dbService.GetFilePrivew(attachimage)} 
      onError={(e) => {
            console.log('Error loading image:', e);
            e.target.onerror = null; // Prevent infinite loop if default image also fails
            e.target.src = defaulti; // Set to fallback image
            }}
      className='rounded-xl text-white w-full object-cover sm:h-[160px] h-[180px]' 
      alt={title} 
    />
  </div>
  <h2 className='text-xl font-bold font-sans text-center text-white'>{title}</h2>
</div>

</Link>

  )
}

export default Postcard