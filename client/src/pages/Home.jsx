// import axios from "axios";
// import { useEffect, useState } from "react";
// import { CiLocationOn } from "react-icons/ci";
// import { FaCaretRight } from "react-icons/fa6";
// import { MdWorkOutline } from "react-icons/md";
// import { Link } from "react-router-dom";

// const jobUrl = import.meta.env.VITE_JOBS_URL;
// const locationUrl = import.meta.env.VITE_LOCATION_URL;
// const categoryUrl = import.meta.env.VITE_CATEGORY_URL;

// const Home = () => {
//   const [jobs, setJobs] = useState([]);
//   const [location, setLocation] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedLocations, setSelectedLocations] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(jobUrl);
//         setJobs(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const response = await axios.get(locationUrl);
//         setLocation(response.data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchLocation();
//   }, []);

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const response = await axios.get(categoryUrl);
//         setCategory(response.data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchCategory();
//   }, []);

//   const handleLocationChange = (locationTitle) => {
//     setSelectedLocations((prev) =>
//       prev.includes(locationTitle)
//         ? prev.filter((loc) => loc !== locationTitle)
//         : [...prev, locationTitle]
//     );
//   };

//   const handleCategoryChange = (categoryTitle) => {
//     setSelectedCategories((prev) =>
//       prev.includes(categoryTitle)
//         ? prev.filter((cat) => cat !== categoryTitle)
//         : [...prev, categoryTitle]
//     );
//   };

//   const filteredJobs = jobs?.filter((job) => {
//     const matchesSearch =
//       job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.job_technical_skills.some((skill) =>
//         skill.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     const matchesLocation =
//       selectedLocations.length === 0 ||
//       selectedLocations.includes(job.job_location);

//     const matchesCategory =
//       selectedCategories.length === 0 ||
//       selectedCategories.includes(job.job_category);

//     return matchesSearch && matchesLocation && matchesCategory;
//   });

//   return (
//     <main className="px-16 py-3 grid grid-cols-[1fr_4.5fr] gap-4">
//       <section className="py-2">
//         <h3 className="font-medium text-gray-500">
//           {filteredJobs.length} jobs
//         </h3>

//         <div className="py-2">
//           <h2 className="text-2xl font-semibold py-2">Sort & Filter</h2>
//           <p className="text-gray-300 w-full bg-gray-300 h-[1px]" />

//           <div>
//             <h3 className="font-medium flex gap-2 text-blue-500 text-lg py-3 items-center">
//               Locations
//             </h3>
//             {location.map((loc, idx) => (
//               <label
//                 key={idx}
//                 className="flex gap-3 py-1 items-center text-sm text-gray-600 mb-1"
//               >
//                 <input
//                   type="checkbox"
//                   className="accent-blue-600 h-5 w-5"
//                   checked={selectedLocations.includes(loc.location_title)}
//                   onChange={() => handleLocationChange(loc.location_title)}
//                 />
//                 <span>{loc.location_title}</span>
//               </label>
//             ))}
//           </div>

//           <div>
//             <h3 className="font-medium flex gap-2 text-blue-500 text-lg py-3 items-center">
//               Job Category
//             </h3>
//             {category.map((cat, idx) => (
//               <label
//                 key={idx}
//                 className="flex gap-3 py-1 items-center text-sm text-gray-600 mb-1"
//               >
//                 <input
//                   type="checkbox"
//                   className="accent-blue-600 h-5 w-5"
//                   checked={selectedCategories.includes(cat.category_title)}
//                   onChange={() => handleCategoryChange(cat.category_title)}
//                 />
//                 <span>{cat.category_title}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section>
//         <input
//           type="text"
//           placeholder="Search Keywords: Eg:(Python, HR...)"
//           className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-2 px-4 rounded-lg"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         {/* 🔹 Loading / Error Handling */}
//         {loading ? (
//           <p className="text-gray-600 text-center py-4">Loading Jobs...</p>
//         ) : error ? (
//           <p className="text-red-500 text-center py-4">Error: {error}</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
//             {filteredJobs.length > 0 ? (
//               filteredJobs.map((item, index) => (
//                 <div
//                   key={index}
//                   className="border relative border-gray-300 hover:shadow-lg h-max shadow-blue-100 rounded-lg py-6 px-6 pb-10"
//                 >
//                   <Link to={`/job/${item.job_id}`}>
//                     <h1 className="text-blue-500 text-xl inline font-semibold py-2 hover:cursor-pointer hover:underline">
//                       {item.job_title}
//                     </h1>
//                   </Link>
//                   <h3 className="text-xl text-gray-500">
//                     {item.job_experience_level}+ years
//                   </h3>
//                   <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 py-4">
//                     {item.job_technical_skills.map((skill, index) => (
//                       <p
//                         key={index}
//                         className="text-blue-500 bg-blue-100 font-semibold rounded-full px-2 text-nowrap overflow-hidden"
//                       >
//                         {skill}
//                       </p>
//                     ))}
//                   </div>
//                   <p className="bg-gray-200 h-4 rounded-full"></p>
//                   <div className="flex justify-between pt-6 font-medium text-xl">
//                     <p className="flex items-center gap-1">
//                       <CiLocationOn className="text-blue-500 font-bold text-xl" />
//                       {item.job_location}
//                     </p>
//                     <p className="flex items-center gap-1">
//                       <MdWorkOutline className="text-blue-500 font-bold text-xl" />
//                       {item.job_type}
//                     </p>
//                   </div>
//                   <div className="text-red-500 absolute bottom-1 right-4">
//                     <Link to={`/job/${item.job_id}`}>
//                       <p className="flex items-center">
//                         View full details <FaCaretRight />
//                       </p>
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600 text-center py-4">No jobs found.</p>
//             )}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// };

// export default Home;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { CiLocationOn } from "react-icons/ci";
// import { FaCaretRight } from "react-icons/fa6";
// import { MdWorkOutline } from "react-icons/md";
// import { Link } from "react-router-dom";

// const jobUrl = import.meta.env.VITE_JOBS_URL;
// const locationUrl = import.meta.env.VITE_LOCATION_URL;
// const categoryUrl = import.meta.env.VITE_CATEGORY_URL;

// const Home = () => {
//   const [jobs, setJobs] = useState([]);
//   const [location, setLocation] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedLocations, setSelectedLocations] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [locationSearch, setLocationSearch] = useState("");
//   const [categorySearch, setCategorySearch] = useState("");
//   const [isLocationOpen, setIsLocationOpen] = useState(true);
//   const [isCategoryOpen, setIsCategoryOpen] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(jobUrl);
//         setJobs(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const response = await axios.get(locationUrl);
//         setLocation(response.data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchLocation();
//   }, []);

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const response = await axios.get(categoryUrl);
//         setCategory(response.data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchCategory();
//   }, []);

//   const handleLocationChange = (locationTitle) => {
//     setSelectedLocations((prev) =>
//       prev.includes(locationTitle)
//         ? prev.filter((loc) => loc !== locationTitle)
//         : [...prev, locationTitle]
//     );
//   };

//   const handleCategoryChange = (categoryTitle) => {
//     setSelectedCategories((prev) =>
//       prev.includes(categoryTitle)
//         ? prev.filter((cat) => cat !== categoryTitle)
//         : [...prev, categoryTitle]
//     );
//   };

//   const filteredJobs = jobs?.filter((job) => {
//     const matchesSearch =
//       job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.job_technical_skills.some((skill) =>
//         skill.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     const matchesLocation =
//       selectedLocations.length === 0 ||
//       selectedLocations.includes(job.job_location);

//     const matchesCategory =
//       selectedCategories.length === 0 ||
//       selectedCategories.includes(job.job_category);

//     return matchesSearch && matchesLocation && matchesCategory;
//   });

//   const filteredLocations = location.filter((loc) =>
//     loc.location_title.toLowerCase().includes(locationSearch.toLowerCase())
//   );

//   const filteredCategories = category.filter((cat) =>
//     cat.category_title.toLowerCase().includes(categorySearch.toLowerCase())
//   );

//   return (
//     <main className="px-16 py-3 grid grid-cols-[1fr_4.5fr] gap-4">
//       <section className="py-2">
//         <h3 className="font-medium text-gray-500">
//           {filteredJobs.length} jobs
//         </h3>

//         <div className="py-2">
//           <h2 className="text-2xl font-semibold py-2">Sort & Filter</h2>
//           <p className="text-gray-300 w-full bg-gray-300 h-[1px]" />

//           <div>
//             <h3
//               className="font-medium flex gap-2 text-blue-500 text-lg py-3 items-center cursor-pointer"
//               onClick={() => setIsLocationOpen(!isLocationOpen)}
//             >
//               Locations
//             </h3>
//             {isLocationOpen && (
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Search Locations"
//                   className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-2 px-4 rounded-lg mb-2"
//                   value={locationSearch}
//                   onChange={(e) => setLocationSearch(e.target.value)}
//                 />
//                 {filteredLocations.map((loc, idx) => (
//                   <label
//                     key={idx}
//                     className="flex gap-3 py-1 items-center text-sm text-gray-600 mb-1"
//                   >
//                     <input
//                       type="checkbox"
//                       className="accent-blue-600 h-5 w-5"
//                       checked={selectedLocations.includes(loc.location_title)}
//                       onChange={() => handleLocationChange(loc.location_title)}
//                     />
//                     <span>{loc.location_title}</span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div>
//             <h3
//               className="font-medium flex gap-2 text-blue-500 text-lg py-3 items-center cursor-pointer"
//               onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//             >
//               Job Category
//             </h3>
//             {isCategoryOpen && (
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Search Categories"
//                   className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-2 px-4 rounded-lg mb-2"
//                   value={categorySearch}
//                   onChange={(e) => setCategorySearch(e.target.value)}
//                 />
//                 {filteredCategories.map((cat, idx) => (
//                   <label
//                     key={idx}
//                     className="flex gap-3 py-1 items-center text-sm text-gray-600 mb-1"
//                   >
//                     <input
//                       type="checkbox"
//                       className="accent-blue-600 h-5 w-5"
//                       checked={selectedCategories.includes(cat.category_title)}
//                       onChange={() => handleCategoryChange(cat.category_title)}
//                     />
//                     <span>{cat.category_title}</span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       <section>
//         <input
//           type="text"
//           placeholder="Search Keywords: Eg:(Python, HR...)"
//           className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-2 px-4 rounded-lg"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         {/* 🔹 Loading / Error Handling */}
//         {loading ? (
//           <p className="text-gray-600 text-center py-4">Loading Jobs...</p>
//         ) : error ? (
//           <p className="text-red-500 text-center py-4">Error: {error}</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
//             {filteredJobs.length > 0 ? (
//               filteredJobs.map((item, index) => (
//                 <div
//                   key={index}
//                   className="border relative border-gray-300 hover:shadow-lg h-max shadow-blue-100 rounded-lg py-6 px-6 pb-10"
//                 >
//                   <Link to={`/job/${item.job_id}`}>
//                     <h1 className="text-blue-500 text-xl inline font-semibold py-2 hover:cursor-pointer hover:underline">
//                       {item.job_title}
//                     </h1>
//                   </Link>
//                   <h3 className="text-xl text-gray-500">
//                     {item.job_experience_level}+ years
//                   </h3>
//                   <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 py-4">
//                     {item.job_technical_skills.map((skill, index) => (
//                       <p
//                         key={index}
//                         className="text-blue-500 bg-blue-100 font-semibold rounded-full px-2 text-nowrap overflow-hidden"
//                       >
//                         {skill}
//                       </p>
//                     ))}
//                   </div>
//                   <p className="bg-gray-200 h-4 rounded-full"></p>
//                   <div className="flex justify-between pt-6 font-medium text-xl">
//                     <p className="flex items-center gap-1">
//                       <CiLocationOn className="text-blue-500 font-bold text-xl" />
//                       {item.job_location}
//                     </p>
//                     <p className="flex items-center gap-1">
//                       <MdWorkOutline className="text-blue-500 font-bold text-xl" />
//                       {item.job_type}
//                     </p>
//                   </div>
//                   <div className="text-red-500 absolute bottom-1 right-4">
//                     <Link to={`/job/${item.job_id}`}>
//                       <p className="flex items-center">
//                         View full details <FaCaretRight />
//                       </p>
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600 text-center py-4">No jobs found.</p>
//             )}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// };

// export default Home;

import axios from "axios";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaCaretRight } from "react-icons/fa6";
import { MdWorkOutline } from "react-icons/md";
import { Link } from "react-router-dom";

import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

const jobUrl = import.meta.env.VITE_JOBS_URL;
const locationUrl = import.meta.env.VITE_LOCATION_URL;
const categoryUrl = import.meta.env.VITE_CATEGORY_URL;

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(jobUrl);
        setJobs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(locationUrl);
        setLocation(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(categoryUrl);
        setCategory(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCategory();
  }, []);

  const handleLocationChange = (locationTitle) => {
    setSelectedLocations((prev) =>
      prev.includes(locationTitle)
        ? prev.filter((loc) => loc !== locationTitle)
        : [...prev, locationTitle]
    );
  };

  const handleCategoryChange = (categoryTitle) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryTitle)
        ? prev.filter((cat) => cat !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  const filteredJobs = jobs?.filter((job) => {
    const matchesSearch =
      job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.job_technical_skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.job_location);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.job_category);

    return matchesSearch && matchesLocation && matchesCategory;
  });

  const filteredLocations = location.filter((loc) =>
    loc.location_title.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredCategories = category.filter((cat) =>
    cat.category_title.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <main className="px-16 py-3 grid grid-cols-[1fr_4.5fr] gap-4">
      <section className="py-2">
        <h3 className="font-medium text-gray-500">
          {filteredJobs.length} jobs
        </h3>

        <div className="py-2">
          <h2 className="text-2xl font-semibold py-2">Sort & Filter</h2>
          <p className="text-gray-300 w-full bg-gray-300 h-[1px]" />

          <div>
            <h3
              className="font-medium flex gap-2 text-blue-500 text-lg py-3 items-center cursor-pointer"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <p>Location</p>
              <ArrowDropDownCircleIcon />
            </h3>
            {isLocationOpen && (
              <div>
                <input
                  type="text"
                  placeholder="Search Locations"
                  className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-2 px-4 rounded-lg mb-2"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                />
                {filteredLocations
                  .slice(0, showAllLocations ? filteredLocations.length : 5)
                  .map((loc, idx) => (
                    <label
                      key={idx}
                      className="flex gap-3 py-1 items-center text-sm text-gray-600 mb-1"
                    >
                      <input
                        type="checkbox"
                        className="accent-blue-600 h-5 w-5"
                        checked={selectedLocations.includes(loc.location_title)}
                        onChange={() =>
                          handleLocationChange(loc.location_title)
                        }
                      />
                      <span>{loc.location_title}</span>
                    </label>
                  ))}
                {filteredLocations.length > 5 && (
                  <button
                    className="text-blue-500 text-sm mt-2"
                    onClick={() => setShowAllLocations(!showAllLocations)}
                  >
                    {showAllLocations ? "View Less" : "View More"}
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <h3
              className="font-medium flex  gap-2 text-blue-500 text-lg py-3 items-center cursor-pointer"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <p>Job Categories</p>
              <ArrowDropDownCircleIcon />
            </h3>
            {isCategoryOpen && (
              <div>
                <input
                  type="text"
                  placeholder="Search Categories"
                  className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-2 px-4 rounded-lg mb-2"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />
                {filteredCategories
                  .slice(0, showAllCategories ? filteredCategories.length : 5)
                  .map((cat, idx) => (
                    <label
                      key={idx}
                      className="flex gap-3 py-1 items-center text-sm text-gray-600 mb-1"
                    >
                      <input
                        type="checkbox"
                        className="accent-blue-600 h-5 w-5"
                        checked={selectedCategories.includes(
                          cat.category_title
                        )}
                        onChange={() =>
                          handleCategoryChange(cat.category_title)
                        }
                      />
                      <span>{cat.category_title}</span>
                    </label>
                  ))}
                {filteredCategories.length > 5 && (
                  <button
                    className="text-blue-500 text-sm mt-2"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                  >
                    {showAllCategories ? "View Less" : "View More"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <input
          type="text"
          placeholder="Search Keywords: Eg:(Python, HR...)"
          className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-2 px-4 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* 🔹 Loading / Error Handling */}
        {loading ? (
          <p className="text-gray-600 text-center py-4">Loading Jobs...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-4">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((item, index) => (
                <div
                  key={index}
                  className="border relative border-gray-300 hover:shadow-lg h-max shadow-blue-100 rounded-lg py-6 px-6 pb-10"
                >
                  <Link to={`/job/${item.job_id}`}>
                    <h1 className="text-blue-500 text-xl inline font-semibold py-2 hover:cursor-pointer hover:underline">
                      {item.job_title}
                    </h1>
                  </Link>
                  <h3 className="text-xl text-gray-500">
                    {item.job_experience_level}+ years
                  </h3>
                  <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 py-4">
                    {item.job_technical_skills.map((skill, index) => (
                      <p
                        key={index}
                        className="text-blue-500 bg-blue-100 font-semibold rounded-full px-2 text-nowrap overflow-hidden"
                      >
                        {skill}
                      </p>
                    ))}
                  </div>
                  <p className="bg-gray-200 h-4 rounded-full"></p>
                  <div className="flex justify-between pt-6 font-medium text-xl">
                    <p className="flex items-center gap-1">
                      <CiLocationOn className="text-blue-500 font-bold text-xl" />
                      {item.job_location}
                    </p>
                    <p className="flex items-center gap-1">
                      <MdWorkOutline className="text-blue-500 font-bold text-xl" />
                      {item.job_type}
                    </p>
                  </div>
                  <div className="text-red-500 absolute bottom-1 right-4">
                    <Link to={`/job/${item.job_id}`}>
                      <p className="flex items-center">
                        View full details <FaCaretRight />
                      </p>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-4">No jobs found.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
