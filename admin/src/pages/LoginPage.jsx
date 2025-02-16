import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
      email: '',
      password: ''
  })
  const handleChanges = (e) => {
    setValues({...values, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/auth/login', values);
        if (response.status === 200) {
          console.log(response)
          localStorage.setItem('token', response.data.token)
            navigate('/')
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please check your username and password and try again.")
    }
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/150x50?text=BeautyBarn+Logo" // Replace with actual logo URL
            alt="BeautyBarn Logo"
            className="h-12"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">
          Login to SuperLabs JobPost
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Email"
              name="email"
              onChange={handleChanges}
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Password"
              name="password"
              onChange={handleChanges}
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
            Continue
          </button>

          {/* Forgot Password */}
          {/* <p className="text-center text-sm text-gray-600 mt-4">
            <a href="#" className="text-pink-500 hover:underline">
              Forgot Password?
            </a>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;


// export default function LoginPage() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
//         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your username"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// const LoginPage = () => {
//     return (
//       <main className="bg-gradient-to-br from-gray-300 to-gray-500 flex justify-center items-center w-screen h-screen">
//         <div className="bg-white shadow-lg rounded-2xl px-8 py-10 w-96">
//           <h1 className="text-center text-4xl font-bold text-gray-700 mb-6">Login</h1>
          
//           <form className="space-y-6">
//             <div>
//               <label htmlFor="username" className="block text-gray-600 text-lg font-medium mb-1">
//                 Username
//               </label>
//               <input 
//                 type="text" 
//                 id="username" 
//                 name="username" 
//                 required 
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
  
//             <div>
//               <label htmlFor="password" className="block text-gray-600 text-lg font-medium mb-1">
//                 Password
//               </label>
//               <input 
//                 type="password" 
//                 id="password" 
//                 name="password" 
//                 required 
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
  
//             <button 
//               type="submit" 
//               className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </main>
//     );
//   };
  
//   export default LoginPage;
