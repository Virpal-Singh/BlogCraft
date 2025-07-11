import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home.jsx'
import Addpost from './pages/Addpost.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import AuthLayout    from './components/AuthLayout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Myposts from './pages/Myposts.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store.js'
import App from './App.jsx'
import { BrowserRouter,createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import AllPosts from './pages/AllPosts.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <LoginPage/>
          </AuthLayout>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayout authentication={false}>
            <SignupPage/>
          </AuthLayout>
        )
      },
      {
        path:'/my-posts',
        element:(
          <AuthLayout authentication>
            <Myposts/>
          </AuthLayout>
        )
      },

      {
        path:'/all-posts',
        element:(
          <AuthLayout authentication>
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path:'/add-post',
        element:(
          <AuthLayout authentication>
            <Addpost/>
          </AuthLayout>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <AuthLayout authentication>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:'/post/:slug',
        element:<Post/>
      },
      {
        path:'/profile',
        element:(
          <AuthLayout authentication>
            <ProfilePage/>
          </AuthLayout>
        )
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
