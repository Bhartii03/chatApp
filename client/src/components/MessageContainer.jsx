import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";


const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  if (!selectedUser) {
    return (
      <div className="md:min-w-[550px] flex flex-col items-center justify-center">
        <h1 className="text-4xl text-white font-bold">Hi, {authUser?.fullName}</h1>
        <h1 className="text-2xl text-white">Let's start a conversation</h1>
      </div>
    );
  }

  return (
    <div className="md:min-w-[550px] flex flex-col">
      <div className="flex gap-2 bg-zinc-800 text-white px-4 py-2 mb-2">
        <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
          <div className="w-10 rounded-full">
            <img src={selectedUser?.profilePhoto} alt="user profile" />
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <div className="flex justify-between gap-2">
            <p>{selectedUser?.fullName}</p>
          </div>
        </div>
      </div>
      <Messages />
      <SendInput />
    </div>
  );
};

export default MessageContainer;