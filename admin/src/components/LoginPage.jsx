// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const loginUrl = import.meta.env.VITE_AUTH_URL;

// const Login = () => {
//   const navigate = useNavigate()
//   const [values, setValues] = useState({
//       email: '',
//       password: ''
//   })
//   const handleChanges = (e) => {
//     setValues({...values, [e.target.name]:e.target.value})
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post(loginUrl, values);
//         console.log(response)
//         if (response.status === 200) {
//           localStorage.setItem('token', response.data.token)
//           localStorage.setItem('email', response.data.data.rows[0].email)
//           localStorage.setItem('username', response.data.data.rows[0].username)
//             navigate('/')
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//         alert("Login failed. Please check your username and password and try again.")
//     }
//   }
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         {/* Logo */}
//         <div className="flex justify-center">
//           <img
//             src="https://via.placeholder.com/150x50?text=BeautyBarn+Logo" // Replace with actual logo URL
//             alt="BeautyBarn Logo"
//             className="h-12"
//           />
//         </div>

//         {/* Title */}
//         <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">
//           Login to SuperLabs JobPost
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mt-6">
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//               placeholder="Email"
//               name="email"
//               onChange={handleChanges}
//             />
//           </div>

//           <div className="mb-4 relative">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//               placeholder="Password"
//               name="password"
//               onChange={handleChanges}
//             />
//             {/* Toggle Password Visibility */}
//             <button
//               type="button"
//               className="absolute right-3 top-10 text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
//             Continue
//           </button>

//           {/* Forgot Password */}
//           {/* <p className="text-center text-sm text-gray-600 mt-4">
//             <a href="#" className="text-pink-500 hover:underline">
//               Forgot Password?
//             </a>
//           </p> */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const loginUrl = import.meta.env.VITE_AUTH_URL;

// const Login = () => {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChanges = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(loginUrl, values);
//       console.log(response);
//       if (response.status === 200) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("email", response.data.user.email);
//         localStorage.setItem("username", response.data.user.username);
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert(
//         "Login failed. Please check your username and password and try again."
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         {/* Logo */}
//         <div className="flex justify-center">
//           <img
//             src="https://via.placeholder.com/150x50?text=BeautyBarn+Logo" // Replace with actual logo URL
//             alt="BeautyBarn Logo"
//             className="h-12"
//           />
//         </div>

//         {/* Title */}
//         <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">
//           Login to SuperLabs JobPost
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mt-6">
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 text-sm font-medium mb-2"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//               placeholder="Email"
//               name="email"
//               onChange={handleChanges}
//             />
//           </div>

//           <div className="mb-4 relative">
//             <label
//               htmlFor="password"
//               className="block text-gray-700 text-sm font-medium mb-2"
//             >
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//               placeholder="Password"
//               name="password"
//               onChange={handleChanges}
//             />
//             {/* Toggle Password Visibility */}
//             <button
//               type="button"
//               className="absolute right-3 top-10 text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "🙈" : "👁"}
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
//           >
//             Continue
//           </button>

//           {/* Forgot Password */}
//           {/* <p className="text-center text-sm text-gray-600 mt-4">
//             <a href="#" className="text-pink-500 hover:underline">
//               Forgot Password?
//             </a>
//           </p> */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loginUrl = import.meta.env.VITE_AUTH_URL;

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors as user types
  };

  // Email validation using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields
    if (!values.email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(values.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!values.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if form is invalid

    try {
      const response = await axios.post(loginUrl, values);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("username", response.data.user.username);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(
        "Login failed. Please check your username and password and try again."
      );
    }
  };

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
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChanges}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChanges}
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
            {errors.password && (
              <span className="text-red-600 text-sm">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
