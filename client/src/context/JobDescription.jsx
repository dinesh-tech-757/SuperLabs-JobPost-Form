import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const jobpostContext = createContext();

const JobPost = ({ children }) => {
  const [jobpost, setJobPost] = useState([]);

  const fetchAllJobPost = async () => {
    const res = await axios("http://localhost:3000/api/v1/jobpost");
    setJobPost(res.data);
  };

  console.log(jobpost);

  useEffect(() => {
    fetchAllJobPost();
  }, []);

  return (
    <jobpostContext.Provider value={{ jobpost }}>
      {children}
    </jobpostContext.Provider>
  );
};

export default JobPost;
