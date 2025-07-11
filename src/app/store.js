import { configureStore} from '@reduxjs/toolkit'
import conf from '../conf/conf'
import reducer from '../features/authSlice'

const store=configureStore({
    reducer:reducer
})

export default store