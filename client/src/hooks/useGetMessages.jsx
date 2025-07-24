import React, {useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { setMessages } from '../redux/messageSlice';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../main.jsx';


const useGetMessages = () => {
    const {selectedUser} = useSelector(store=> store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("i am not");
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser?._id}`)
                console.log(res)
                dispatch(setMessages(res.data));
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser])
}

export default useGetMessages;