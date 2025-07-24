// // import React from 'react'
// // import { BiSearchAlt2 } from "react-icons/bi";
// // import OtherUsers from './OtherUsers';

// // function Sidebar() {
// //   return (
// //     <div className='border-r border-slate-500 p-4 flex flex-col'>
// //       <form action="" className='flex items-center gap-2'>
// //         <input
// //             className='input input-bordered rounded-md '
// //             type='text'
// //             placeholder='Search...'
// //         />
// //         <button type='submit' className='btn border-slate-500 bg-gray-700 text-white'>
// //             <BiSearchAlt2 className='w-6 h-6 outline-none'/>
// //         </button>
// //       </form>
// //       <div className='divider px-3'></div>
// //       <OtherUsers/>
// //     </div>
// //   )
// // }

// // export default Sidebar

// import React, { useState } from "react";
// import { BiSearchAlt2 } from "react-icons/bi";
// import OtherUsers from "./OtherUsers";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';

// const Sidebar = () => {
//   const [search, setSearch] = useState("");
//   const { otherUsers } = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
//       navigate("/login");
//       toast.success(res.data.message);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const searchSubmitHandler = (e) => {
//     e.preventDefault();
//     const conversationUser = otherUsers?.find((user) =>
//       user.fullName.toLowerCase().includes(search.toLowerCase())
//     );
//     if (conversationUser) {
//       dispatch(setOtherUsers([conversationUser]));
//     } else {
//       toast.error("User not found!");
//     }
//   };
//   return (
//     <div className="border-r border-slate-500 p-4 flex flex-col">
//       <form
//         onSubmit={searchSubmitHandler}
//         action=""
//         className="flex items-center gap-2"
//       >
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="rounded-md px-4 py-2 bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
//           type="text"
//           placeholder="Search..."
//         />
//         <button
//           type="submit"
//           className="p-2 rounded-md border border-white bg-transparent hover:bg-white hover:text-black transition"
//         >
//           <BiSearchAlt2 className="w-6 h-6" />
//         </button>
//       </form>

//       <div className="divider px-3"></div>
//       <OtherUsers />
//       <div>
//         <button onClick={logoutHandler} className="btn btn-sm">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { BASE_URL } from '../main.jsx';

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUsers(otherUsers);
    } else {
      const foundUsers = otherUsers?.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(foundUsers);
    }
  }, [search, otherUsers]); 

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (search.trim() !== "" && filteredUsers.length === 0) {
      toast.error("User not found!");
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-full">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md px-4 py-2 bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full"
          type="text"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="p-2 rounded-md border border-white bg-transparent hover:bg-white hover:text-black transition"
        >
          <BiSearchAlt2 className="w-6 h-6" />
        </button>
      </form>

      <div className="divider px-3"></div>

      {/* Pass the filtered list to the OtherUsers component as a prop */}
      <OtherUsers users={filteredUsers} />

      <div className="mt-auto">
        {" "}
        {/* This pushes the logout button to the bottom */}
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
