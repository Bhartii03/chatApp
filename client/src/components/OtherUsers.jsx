// import React from 'react'
// import OtherUser from './OtherUser'
// import useGetOtherUsers from '../hooks/useGetOtherUsers'
// import { useSelector } from 'react-redux'

// const OtherUsers = () => {
//     useGetOtherUsers();
//     const {otherUsers} = useSelector(store=>store.user);
//     if(!otherUsers) return;
//   return (
//     <div className='overflow-auto h-full'>
//         {
//             otherUsers?.map((user) => {
//                 return (
//                     <OtherUser key={user._id} user={user}/>
//                 )
//             })
//         }
//     </div>
//   )
// }

// export default OtherUsers

import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';

// The component now receives the list of users to display as a prop.
// It no longer needs to access the Redux store directly.
const OtherUsers = ({ users }) => {
    // The hook to fetch users is still called here to ensure the master list is always available in Redux for the Sidebar to use.
    useGetOtherUsers();

    return (
        <div className='py-2 flex-1 overflow-auto'>
            {/* The component now maps over the 'users' prop that it receives from the Sidebar */}
            {users && users.map((user) => {
                return (
                    <OtherUser key={user._id} user={user} />
                )
            })}
        </div>
    )
}

export default OtherUsers;

