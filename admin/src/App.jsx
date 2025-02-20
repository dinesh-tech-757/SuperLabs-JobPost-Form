import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "@mantine/core/styles.css";
import Dashboard from "./pages/Dashboard";
import Location from "./pages/Location";
import Users from "./pages/Users";

export const ThemeContext = createContext();
import { MantineProvider } from "@mantine/core";
import Category from "./pages/Category";
import Home from "./pages/Home";
import LoginPage from "./components/LoginPage";
import axios from "axios";
import JobPost from "./pages/JobPost";
import NoPage from "./components/NoPage";
import Candidates from "./pages/Candidates";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [job, setJob] = useState([]);

  const fetchAllData = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/jobpost");
    setJob(res.data);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const name = localStorage.getItem("email");

  if (name == "admin@superlabs.com") {
    return (
      <MantineProvider>
        <div className="font-Josefin">
          <ThemeContext.Provider value={{ job, setJob }}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Home />}>
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="jobpost" element={<JobPost />} />
                    <Route path="location" element={<Location />} />
                    <Route path="category" element={<Category />} />
                    <Route path="candidates" element={<Candidates />} />
                  </Route>
                </Route>
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </ThemeContext.Provider>
        </div>
      </MantineProvider>
    );
  } else {
    return (
      <MantineProvider>
        <div className="font-Josefin">
          <ThemeContext.Provider value={{ job, setJob }}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Home />}>
                    <Route index element={<Dashboard />} />
                    <Route path="jobpost" element={<JobPost />} />
                    <Route path="location" element={<Location />} />
                    <Route path="category" element={<Category />} />
                    {/* <Route path="users" element={<Users />} /> */}
                    <Route path="candidates" element={<Candidates />} />
                  </Route>
                </Route>
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </ThemeContext.Provider>
        </div>
      </MantineProvider>
    );
  }

  // return (
  //   <MantineProvider>
  //     <div className="font-Josefin">
  //       <ThemeContext.Provider value={{ job, setJob }}>
  //         <BrowserRouter>
  //           <Routes>
  //             <Route path="/login" element={<LoginPage/>} />
  //             <Route element={<ProtectedRoute />}>
  //               <Route path="/" element={<Home />}>
  //                 <Route index element={<Dashboard />} />
  //                 <Route path="jobpost" element={<JobPost />} />
  //                 <Route path="location" element={<Location />} />
  //                 <Route path="category" element={<Category />} />
  //                 <Route path="users" element={<Users />} />
  //                 <Route path="candidates" element={<Candidates />} />
  //               </Route>
  //             </Route>
  //             <Route path="*" element={<NoPage />} />
  //           </Routes>
  //         </BrowserRouter>
  //       </ThemeContext.Provider>
  //     </div>
  //   </MantineProvider>
  // );
}

export default App;
