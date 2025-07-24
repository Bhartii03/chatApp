import { useState, useEffect } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Homepage from './components/HomePage.jsx'
import Signup from './components/Signup.jsx' 
import Login from './components/Login.jsx'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { setOnlineUsers } from './redux/userSlice.js'
import { setSocket } from './redux/socketSlice';
import { BASE_URL } from './main.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Homepage/> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
]);

function App() {
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.user);
  // const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if(authUser){
      const socket = io(`${BASE_URL}`, {
        query:{
          userId:authUser._id
        }
      });
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });
      return ()=> socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser])
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
