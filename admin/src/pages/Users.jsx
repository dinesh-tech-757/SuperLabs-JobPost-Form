import { useEffect, useRef, useState } from "react";
import axios from "axios";
// import PropTypes from "prop-types";
// import { Edit, Trash2 } from "lucide-react";
// import { Eye, EyeOff } from "lucide-react";

const Users = ({ onClose }) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  })
  const handleChanges = (e) => {
    setValues({...values, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/auth/register', values);
        if (response.status === 201) {
            alert(response.data)
        }
    } catch (err) {
        console.log(err)
    }
  }
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="p-6 border bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={handleChanges}
          className="border p-2 rounded-md w-full mb-4 outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={handleChanges}
          className="border p-2 rounded-md w-full mb-4 outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={handleChanges}
          className="border p-2 rounded-md w-full mb-4 outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div className="flex gap-3 justify-end">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [userForm, setUserForm] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [visiblePasswords, setVisiblePasswords] = useState({});

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     axios
//       .get(`http://localhost:3000/api/v1/users`)
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error("Error fetching users:", err));
//   };

//   const handleFormSubmit = (updatedUser, action) => {
//     if (action === "add") {
//       setUsers([...users, updatedUser]);
//     } else if (action === "update") {
//       setUsers(users.map((user) => (user.user_id === updatedUser.user_id ? updatedUser : user)));
//     }
//     setUserForm(false);
//     setEditData(null);
//   };

//   const handleEdit = (user) => {
//     setEditData(user);
//     setUserForm(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       axios
//         .delete(`http://localhost:3000/api/v1/users/${id}`)
//         .then(() => {
//           setUsers(users.filter((user) => user.user_id !== id));
//         })
//         .catch((err) => console.error("Error deleting user:", err));
//     }
//   };

//   const togglePasswordVisibility = (userId) => {
//     setVisiblePasswords((prev) => ({
//       ...prev,
//       [userId]: !prev[userId],
//     }));
//   };

//   return (
//     <main className="flex flex-col items-center w-full px-6 ">
//       <div className="w-full  bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center pb-4 border-b">
//           <h1 className="text-2xl font-bold text-gray-700">Users</h1>
//           <button
//             onClick={() => {
//               setEditData(null);
//               setUserForm(true);
//             }}
//             className="text-sm font-medium border bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             + Add User
//           </button>
//         </div>

//         {/* {userForm && <AddUsers onClose={() => setUserForm(false)} onSubmit={handleFormSubmit} editData={editData} />} */}

//         {/* <div className="mt-6 overflow-x-auto">
//           <table className="w-full min-w-full border-collapse">
//             <thead className="bg-gray-100">
//               <tr className="text-sm font-semibold text-gray-700">
//                 <th className="py-3 px-4 border text-start">S.No</th>
//                 <th className="py-3 px-4 border text-start">User Name</th>
//                 <th className="py-3 px-4 border text-start">User Email</th>
//                 <th className="py-3 px-4 border text-start">Password</th>
//                 <th className="py-3 px-4 border text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.isArray(users) && users.length > 0 ? (
//                 users.map((user, index) => (
//                   <tr key={user.user_id} className="border-b hover:bg-gray-50 transition">
//                     <td className="py-3 px-4">{index + 1}</td>
//                     <td className="py-3 px-4">{user.user_title}</td>
//                     <td className="py-3 px-4">{user.user_email}</td>
//                     <td className="py-3 px-4 flex items-center space-x-2">
//                       <span>{visiblePasswords[user.user_id] ? user.user_password : "•".repeat(8)}</span>
//                       <button onClick={() => togglePasswordVisibility(user.user_id)} className="ml-2">
//                         {visiblePasswords[user.user_id] ? <EyeOff size={18} /> : <Eye size={18} />}
//                       </button>
//                     </td>
//                     <td className="py-1 px-1 space-x-3 text-center">
//                       <button onClick={() => handleEdit(user)} className="text-green-600 hover:text-green-800">
//                         <Edit size={20} />
//                       </button>
//                       <button onClick={() => handleDelete(user.user_id)} className="text-red-600 hover:text-red-800">
//                         <Trash2 size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="py-4 text-center text-gray-500">No users available.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div> */}
//       </div>
//     </main>
//   );
// };

// AddUsers.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

export default Users;