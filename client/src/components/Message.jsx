// export default Message;

// import React, { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";

// const Message = ({ message }) => {
//     const scroll = useRef();
//     const { authUser } = useSelector(store => store.user);

//     // Determine if the message was sent by the logged-in user
//     const fromMe = message?.senderId?._id === authUser?._id;

//     // Set chat alignment classes based on who sent the message
//     const chatAlignment = fromMe ? "chat-end" : "chat-start";

//     // Use the profile photo of the sender
//     const profilePic = fromMe ? authUser?.profilePhoto : message?.senderId?.profilePhoto;

//     // Format the timestamp from the database
//     const messageTime = new Date(message?.createdAt).toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit'
//     });

//     // This effect will now run every time the messages array changes,
//     // ensuring it scrolls to the latest message.
//     useEffect(() => {
//         scroll.current?.scrollIntoView({ behavior: "smooth" });
//     }, [message]); // Dependency on 'message' ensures it re-runs for new messages

//     return (
//         // Attach the ref here to scroll the entire message bubble into view
//         <div ref={scroll} className={`chat ${chatAlignment}`}>
//             <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                     <img
//                         alt="User avatar"
//                         src={profilePic || "https://placehold.co/40x40/000000/FFFFFF?text=?"} // Fallback image
//                     />
//                 </div>
//             </div>
//             <div className="chat-header text-xs opacity-50 text-white">
//                 <time>{messageTime}</time>
//             </div>
//             <div className="chat-bubble">{message?.message}</div>
//         </div>
//     );
// };

// export default Message;

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector((store) => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const messageTime = new Date(message?.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div
            ref={scroll}
            className={`chat ${message?.senderId === authUser?._id ? "chat-end" : "chat-start"
                }`}
        >
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={
                            message?.senderId === authUser?._id
                                ? authUser?.profilePhoto
                                : selectedUser?.profilePhoto
                        }
                    />
                </div>
            </div>
            <div className="chat-header">
                <div className="text-xs opacity-50 text-white">
                    <time>{messageTime}</time>
                </div>
            </div>
            <div
                className={`chat-bubble ${message?.senderId !== authUser?._id ? "bg-gray-200 text-black" : ""
                    } `}
            >
                {message?.message}
            </div>
        </div>
    );
};

export default Message;
