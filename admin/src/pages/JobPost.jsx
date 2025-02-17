// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { ThemeContext } from "../App";
// import { useContext } from "react";
// import AddJobPost from "../components/AddJobPost";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import EditJobPost from "../components/EditJobPost";
// import ViewJobPost from "../components/ViewJobPost";
// import { Edit, Eye } from "lucide-react";

// function JobPost() {
//   const customStyles = {
//     header: {
//       style: {
//         minHeight: "56px",
//         padding: "200px",
//       },
//     },
//     headRow: {
//       style: {
//         backgroundColor: "#f0f0f0",

//         fontSize: "14px",
//         fontWeight: "bold",
//       },
//     },
//   };
//   const { job, setJob } = useContext(ThemeContext);
//   const [view, setView] = useState(false);
//   const [viewId, setViewId] = useState("");
//   const [isAdd, setIsAdd] = useState(false);
//   const [editId, setEditId] = useState("");
//   const [isEdit, setIsEdit] = useState("");
//   const [filterText, setFilterText] = useState("");
//   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [ok, setOk] = useState(false);
//   const [id, setId] = useState();

//   /////candidates

//   const [viewCandidate, setViewCandidate] = useState();
//   const [candidates, setCandidates] = useState([]);
//   useEffect(() => {
//     fetchCandidates();
//   }, []);

//   const fetchCandidates = async () => {
//     const response = await axios.get("http://localhost:3000/candidates");
//     setCandidates(response.data);
//   };

//   console.log(candidates);

//   console.log(viewCandidate);

//   /////candidates

//   const columns = [
//     {
//       name: "Title",
//       selector: (row) => row.job_title,
//       sortable: true,
//       width: "250px",
//     },
//     {
//       name: "Skills",
//       selector: (row) => row.job_technical_skills,
//       sortable: true,
//       width: "250px",
//     },
//     {
//       name: "Experience",
//       selector: (row) => row.job_experience_level,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.job_status,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="space-x-5">
//           <button
//             className="  rounded-md  border-green-500  border-2 p-[3px] text-green-600 hover:text-green-800"
//             onClick={() => handleEdit(row)}
//           >
//             <Edit size={15} />
//           </button>
//           <button
//             className="border-blue-500 text-blue-500 border-2 p-[3px] rounded-md"
//             // onClick={() => handleDelete(row.job_id)}
//             onClick={() => handleView(row.job_id)}
//           >
//             <Eye size={15} />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//     },
//   ];

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/v1/jobpost").then((res) => {
//       setJob(res.data);
//     });
//   }, [setJob]);

//   const filteredItems = job.filter(
//     (item) =>
//       item.job_title &&
//       item.job_title.toLowerCase().includes(filterText.toLowerCase())
//   );
//   const onFilter = (e) => setFilterText(e.target.value);
//   const handleClear = () => {
//     if (filterText) {
//       setResetPaginationToggle(!resetPaginationToggle);
//       setFilterText("");
//     }
//   };

//   function handleOpen() {
//     setIsAdd(true);
//   }

//   const handleView = (job_id) => {
//     setView(true);
//     setViewId(job_id);
//   };

//   const handleDelete = (job_id) => {
//     setId(job_id);
//     setOk(true);
//   };

//   const handleDeleteItem = (id) => {
//     axios
//       .delete(`http://localhost:3000/api/v1/jobpost/${id}`)
//       .then((response) => {
//         if (response.status === 200) {
//           const filteredItems = job.filter((item) => item.job_id !== id);
//           setJob(filteredItems);
//         }
//       })
//       .catch((error) => {
//         console.error("There was an error deleting the product:", error);
//       });
//   };

//   if (view)
//     return (
//       <ViewJobPost
//         setOpen={setOpen}
//         handleOpen={handleOpen}
//         job={job}
//         view={view}
//         setView={setView}
//         setJob={setJob}
//         viewId={viewId}
//         setViewId={setViewId}
//       />
//     );

//   if (isAdd)
//     return (
//       <AddJobPost
//         handleOpen={handleOpen}
//         setOpen={setOpen}
//         isAdd={isAdd}
//         job={job}
//         setJob={setJob}
//         setIsAdd={setIsAdd}
//       />
//     );

//   const handleEdit = (row) => {
//     setEditId(row.job_id);
//     setIsEdit(true);
//   };
//   if (isEdit)
//     return (
//       <EditJobPost
//         setOpen={setOpen}
//         handleOpen={handleOpen}
//         job={job}
//         setJob={setJob}
//         isEdit={isEdit}
//         editId={editId}
//         setIsEdit={setIsEdit}
//       />
//     );

//   return (
//     <div className="px-6  bg-gray-100 rounded-md ">
//       <ToastContainer />
//       <div className="flex  justify-center items-center bg-slate-100">
//         <div className="flex pt-6 flex-col  h-auto w-full   px-6 shadow-lg   rounded-xl  bg-white">
//           <div className="flex justify-between p-4">
//             <h1 className="text-2xl font-bold">JobPost</h1>

//             <div className="flex gap-5">
//               <div className="">
//                 <input
//                   id="search"
//                   type="text"
//                   className=" border-2 p-1 rounded-lg "
//                   placeholder="Filter By Name"
//                   aria-label="Search Input"
//                   value={filterText}
//                   onChange={onFilter}
//                 />
//                 <button
//                   className="bg-black rounded-lg text-white border-2 p-1"
//                   type="button"
//                   onClick={handleClear}
//                 >
//                   Clear
//                 </button>
//               </div>
//               <button
//                 className="w-40 rounded-lg h-8 flex bg-black text-white justify-center items-center"
//                 onClick={handleOpen}
//               >
//                 Create JobPost
//               </button>
//             </div>
//           </div>

//           {ok && (
//             <div className="z-50 absolute  h-full w-full flex  justify-center  pt-5 top-0 left-0">
//               <div className=" w-[400px] h-[200px] flex flex-col gap-5 items-center justify-center bg-blue-300 rounded-3xl">
//                 <h1>Are you sure you want to delete this product?</h1>
//                 <div className=" flex gap-4">
//                   <button
//                     onClick={() => {
//                       handleDeleteItem(id);
//                       setOk(false);
//                     }}
//                     className=" px-4 py-2 rounded-xl bg-red-700"
//                   >
//                     Yes
//                   </button>
//                   <button
//                     onClick={() => setOk(false)}
//                     className=" px-4 py-2 rounded-xl bg-blue-500"
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div>
//             <DataTable
//               columns={columns}
//               data={filteredItems}
//               pagination
//               paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
//               persistTableHead
//               customStyles={customStyles}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobPost;

// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { ThemeContext } from "../App";
// import { useContext } from "react";
// import AddJobPost from "../components/AddJobPost";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import EditJobPost from "../components/EditJobPost";
// import ViewJobPost from "../components/ViewJobPost";
// import { Edit, Eye, EyeClosed } from "lucide-react";

// function JobPost() {
//   const customStyles = {
//     header: {
//       style: {
//         minHeight: "56px",
//         padding: "200px",
//       },
//     },
//     headRow: {
//       style: {
//         backgroundColor: "#f0f0f0",

//         fontSize: "14px",
//         fontWeight: "bold",
//       },
//     },
//   };
//   const { job, setJob } = useContext(ThemeContext);
//   const [view, setView] = useState(false);
//   const [viewId, setViewId] = useState("");
//   const [isAdd, setIsAdd] = useState(false);
//   const [editId, setEditId] = useState("");
//   const [isEdit, setIsEdit] = useState("");
//   const [filterText, setFilterText] = useState("");
//   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [ok, setOk] = useState(false);
//   const [id, setId] = useState();

//   /////candidates

//   const [viewCandidate, setViewCandidate] = useState();
//   const [candidates, setCandidates] = useState([]);
//   useEffect(() => {
//     fetchCandidates();
//   }, []);

//   const fetchCandidates = async () => {
//     const response = await axios.get("http://localhost:3000/candidates");
//     setCandidates(response.data);
//   };

//   console.log(candidates);

//   console.log(viewCandidate);

//   /////candidates

//   const columns = [
//     {
//       name: "Title",
//       selector: (row) => row.job_title,
//       sortable: true,
//       width: "250px",
//     },
//     {
//       name: "Skills",
//       selector: (row) => row.job_technical_skills,
//       sortable: true,
//       width: "250px",
//     },
//     {
//       name: "Experience",
//       selector: (row) => row.job_experience_level,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.job_status,
//       sortable: true,
//     },
//     {
//       name: "Candidates",
//       cell: (row) => (
//         <button
//           className="border-blue-500 text-blue-500 border-2 p-[3px] rounded-md"
//           onClick={() => handleViewCandidates(row.job_title)}
//         >
//           View Candidates
//         </button>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="space-x-5">
//           <button
//             className="  rounded-md  border-green-500  border-2 p-[3px] text-green-600 hover:text-green-800"
//             onClick={() => handleEdit(row)}
//           >
//             <Edit size={15} />
//           </button>
//           <button
//             className="border-blue-500 text-blue-500 border-2 p-[3px] rounded-md"
//             // onClick={() => handleDelete(row.job_id)}
//             onClick={() => handleView(row.job_id)}
//           >
//             <Eye size={15} />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//     },
//   ];

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/v1/jobpost").then((res) => {
//       setJob(res.data);
//     });
//   }, [setJob]);

//   const filteredItems = job.filter(
//     (item) =>
//       item.job_title &&
//       item.job_title.toLowerCase().includes(filterText.toLowerCase())
//   );
//   const onFilter = (e) => setFilterText(e.target.value);
//   const handleClear = () => {
//     if (filterText) {
//       setResetPaginationToggle(!resetPaginationToggle);
//       setFilterText("");
//     }
//   };

//   function handleOpen() {
//     setIsAdd(true);
//   }

//   const handleView = (job_id) => {
//     setView(true);
//     setViewId(job_id);
//   };

//   const handleViewCandidates = (job_title) => {
//     const jobCandidates = candidates.filter(
//       (candidate) => candidate.job_title === job_title
//     );
//     setViewCandidate(jobCandidates);
//   };

//   const handleDelete = (job_id) => {
//     setId(job_id);
//     setOk(true);
//   };

//   const handleDeleteItem = (id) => {
//     axios
//       .delete(`http://localhost:3000/api/v1/jobpost/${id}`)
//       .then((response) => {
//         if (response.status === 200) {
//           const filteredItems = job.filter((item) => item.job_id !== id);
//           setJob(filteredItems);
//         }
//       })
//       .catch((error) => {
//         console.error("There was an error deleting the product:", error);
//       });
//   };

//   if (view)
//     return (
//       <ViewJobPost
//         setOpen={setOpen}
//         handleOpen={handleOpen}
//         job={job}
//         view={view}
//         setView={setView}
//         setJob={setJob}
//         viewId={viewId}
//         setViewId={setViewId}
//       />
//     );

//   if (isAdd)
//     return (
//       <AddJobPost
//         handleOpen={handleOpen}
//         setOpen={setOpen}
//         isAdd={isAdd}
//         job={job}
//         setJob={setJob}
//         setIsAdd={setIsAdd}
//       />
//     );

//   const handleEdit = (row) => {
//     setEditId(row.job_id);
//     setIsEdit(true);
//   };
//   if (isEdit)
//     return (
//       <EditJobPost
//         setOpen={setOpen}
//         handleOpen={handleOpen}
//         job={job}
//         setJob={setJob}
//         isEdit={isEdit}
//         editId={editId}
//         setIsEdit={setIsEdit}
//       />
//     );

//   return (
//     <div className="px-6  bg-gray-100 rounded-md ">
//       <ToastContainer />
//       <div className="flex  justify-center items-center bg-slate-100">
//         <div className="flex pt-6 flex-col  h-auto w-full   px-6 shadow-lg   rounded-xl  bg-white">
//           <div className="flex justify-between p-4">
//             <h1 className="text-2xl font-bold">JobPost</h1>

//             <div className="flex gap-5">
//               <div className="">
//                 <input
//                   id="search"
//                   type="text"
//                   className=" border-2 p-1 rounded-lg "
//                   placeholder="Filter By Name"
//                   aria-label="Search Input"
//                   value={filterText}
//                   onChange={onFilter}
//                 />
//                 <button
//                   className="bg-black rounded-lg text-white border-2 p-1"
//                   type="button"
//                   onClick={handleClear}
//                 >
//                   Clear
//                 </button>
//               </div>
//               <button
//                 className="w-40 rounded-lg h-8 flex bg-black text-white justify-center items-center"
//                 onClick={handleOpen}
//               >
//                 Create JobPost
//               </button>
//             </div>
//           </div>

//           {ok && (
//             <div className="z-50 absolute  h-full w-full flex  justify-center  pt-5 top-0 left-0">
//               <div className=" w-[400px] h-[200px] flex flex-col gap-5 items-center justify-center bg-blue-300 rounded-3xl">
//                 <h1>Are you sure you want to delete this product?</h1>
//                 <div className=" flex gap-4">
//                   <button
//                     onClick={() => {
//                       handleDeleteItem(id);
//                       setOk(false);
//                     }}
//                     className=" px-4 py-2 rounded-xl bg-red-700"
//                   >
//                     Yes
//                   </button>
//                   <button
//                     onClick={() => setOk(false)}
//                     className=" px-4 py-2 rounded-xl bg-blue-500"
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div>
//             <DataTable
//               columns={columns}
//               data={filteredItems}
//               pagination
//               paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
//               persistTableHead
//               customStyles={customStyles}
//             />
//           </div>

//           {/* {viewCandidate && (
//             <div className="mt-4">
//               <h2 className="text-xl font-bold">Candidates</h2>
//               <ul>
//                 {viewCandidate.map((candidate) => (
//                   <li key={candidate.id}>
//                     {candidate.first_name} {""} {candidate.last_name}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )} */}

//           {viewCandidate && (
//             <div className="mt-4">
//               <div className=" flex items-center justify-between">
//                 {" "}
//                 <h2 className="text-xl font-bold">Candidates</h2>
//                 <button onClick={() => setViewCandidate("")}>
//                   <EyeClosed />
//                 </button>
//               </div>
//               <hr />
//               <table className="min-w-full bg-white mt-5">
//                 <thead className="">
//                   <tr className="">
//                     <th className="py-2 text-start">First Name</th>
//                     <th className="py-2 text-start">Last Name</th>
//                     <th className="py-2 text-start">LinkedIn</th>
//                     <th className="py-2 text-start">Website</th>
//                     <th className="py-2 text-start">Resume</th>
//                     <th className="py-2 text-start">Cover Letter</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {viewCandidate.map((candidate) => (
//                     <tr key={candidate.id}>
//                       <td className="border px-4 py-2">
//                         {candidate.first_name}
//                       </td>
//                       <td className="border px-4 py-2">
//                         {candidate.last_name}
//                       </td>
//                       <td className="border px-4 py-2">
//                         <a
//                           href={candidate.linkedin}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           LinkedIn
//                         </a>
//                       </td>
//                       <td className="border px-4 py-2">
//                         <a
//                           href={candidate.website}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           Website
//                         </a>
//                       </td>
//                       <td className="border px-4 py-2">
//                         <a
//                           href={`http://localhost:3000/uploads/${candidate?.resume}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="bg-gray-400 p-1"
//                         >
//                           Resume
//                         </a>
//                       </td>
//                       <td className="border px-4 py-2">
//                         <a
//                           href={`http://localhost:3000/uploads/${candidate?.cover}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="bg-gray-400 p-1"
//                         >
//                           Cover Letter
//                         </a>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobPost;

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ThemeContext } from "../App";
import { useContext } from "react";
import AddJobPost from "../components/AddJobPost";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EditJobPost from "../components/EditJobPost";
import ViewJobPost from "../components/ViewJobPost";
import { Edit, Eye, EyeClosed } from "lucide-react";

function JobPost() {
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
        padding: "200px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f0f0f0",

        fontSize: "14px",
        fontWeight: "bold",
      },
    },
  };
  const { job, setJob } = useContext(ThemeContext);
  const [view, setView] = useState(false);
  const [viewId, setViewId] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  const [id, setId] = useState();

  /////candidates

  const [viewCandidate, setViewCandidate] = useState();
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const response = await axios.get("http://localhost:3000/candidates");
    setCandidates(response.data);
  };

  console.log(candidates);

  console.log(viewCandidate);

  /////candidates

  const columns = [
    {
      name: "Title",
      selector: (row) => row.job_title,
      sortable: true,
      width: "250px",
    },
    {
      name: "Skills",
      selector: (row) => row.job_technical_skills,
      sortable: true,
      width: "250px",
    },
    {
      name: "Experience",
      selector: (row) => row.job_experience_level,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.job_status,
      sortable: true,
    },
    {
      name: "Candidates",
      cell: (row) => (
        <button
          className="border-blue-500 text-blue-500 border-2 p-[3px] rounded-md"
          onClick={() => handleViewCandidates(row.job_title)}
        >
          View Candidates
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-5">
          <button
            className="  rounded-md  border-green-500  border-2 p-[3px] text-green-600 hover:text-green-800"
            onClick={() => handleEdit(row)}
          >
            <Edit size={15} />
          </button>
          <button
            className="border-blue-500 text-blue-500 border-2 p-[3px] rounded-md"
            // onClick={() => handleDelete(row.job_id)}
            onClick={() => handleView(row.job_id)}
          >
            <Eye size={15} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/jobpost").then((res) => {
      setJob(res.data);
    });
  }, [setJob]);

  const filteredItems = job.filter(
    (item) =>
      item.job_title &&
      item.job_title.toLowerCase().includes(filterText.toLowerCase())
  );
  const onFilter = (e) => setFilterText(e.target.value);
  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  function handleOpen() {
    setIsAdd(true);
  }

  const handleView = (job_id) => {
    setView(true);
    setViewId(job_id);
  };

  const handleViewCandidates = (job_title) => {
    const jobCandidates = candidates.filter(
      (candidate) => candidate.job_title === job_title
    );
    setViewCandidate(jobCandidates);
  };

  const handleDelete = (job_id) => {
    setId(job_id);
    setOk(true);
  };

  const handleDeleteItem = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/jobpost/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const filteredItems = job.filter((item) => item.job_id !== id);
          setJob(filteredItems);
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the product:", error);
      });
  };

  if (view)
    return (
      <ViewJobPost
        setOpen={setOpen}
        handleOpen={handleOpen}
        job={job}
        view={view}
        setView={setView}
        setJob={setJob}
        viewId={viewId}
        setViewId={setViewId}
      />
    );

  if (isAdd)
    return (
      <AddJobPost
        handleOpen={handleOpen}
        setOpen={setOpen}
        isAdd={isAdd}
        job={job}
        setJob={setJob}
        setIsAdd={setIsAdd}
      />
    );

  const handleEdit = (row) => {
    setEditId(row.job_id);
    setIsEdit(true);
  };
  if (isEdit)
    return (
      <EditJobPost
        setOpen={setOpen}
        handleOpen={handleOpen}
        job={job}
        setJob={setJob}
        isEdit={isEdit}
        editId={editId}
        setIsEdit={setIsEdit}
      />
    );

  const candidateColumns = [
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "LinkedIn",
      cell: (row) => (
        <a href={row.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      ),
      sortable: false,
    },
    {
      name: "Website",
      cell: (row) => (
        <a href={row.website} target="_blank" rel="noopener noreferrer">
          Website
        </a>
      ),
      sortable: false,
    },
    {
      name: "Resume",
      cell: (row) => (
        <a
          href={`http://localhost:3000/uploads/${row.resume}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      ),
      sortable: false,
    },
    {
      name: "Cover Letter",
      cell: (row) => (
        <a
          href={`http://localhost:3000/uploads/${row.cover}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cover Letter
        </a>
      ),
      sortable: false,
    },
  ];

  return (
    <div className="px-6  bg-gray-100 rounded-md ">
      <ToastContainer />
      <div className="flex  justify-center items-center bg-slate-100">
        <div className="flex pt-6 flex-col  h-auto w-full   px-6 shadow-lg   rounded-xl  bg-white">
          <div className="flex justify-between p-4">
            <h1 className="text-2xl font-bold">JobPost</h1>

            <div className="flex gap-5">
              <div className="">
                <input
                  id="search"
                  type="text"
                  className=" border-2 p-1 rounded-lg "
                  placeholder="Filter By Name"
                  aria-label="Search Input"
                  value={filterText}
                  onChange={onFilter}
                />
                <button
                  className="bg-black rounded-lg text-white border-2 p-1"
                  type="button"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
              <button
                className="w-40 rounded-lg h-8 flex bg-black text-white justify-center items-center"
                onClick={handleOpen}
              >
                Create JobPost
              </button>
            </div>
          </div>

          {ok && (
            <div className="z-50 absolute  h-full w-full flex  justify-center  pt-5 top-0 left-0">
              <div className=" w-[400px] h-[200px] flex flex-col gap-5 items-center justify-center bg-blue-300 rounded-3xl">
                <h1>Are you sure you want to delete this product?</h1>
                <div className=" flex gap-4">
                  <button
                    onClick={() => {
                      handleDeleteItem(id);
                      setOk(false);
                    }}
                    className=" px-4 py-2 rounded-xl bg-red-700"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setOk(false)}
                    className=" px-4 py-2 rounded-xl bg-blue-500"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              persistTableHead
              customStyles={customStyles}
            />
          </div>

          {viewCandidate && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Candidates</h2>
                <button onClick={() => setViewCandidate("")}>
                  <EyeClosed />
                </button>
              </div>
              <hr />
              <DataTable
                columns={candidateColumns}
                data={viewCandidate}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10]}
                customStyles={customStyles}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPost;
