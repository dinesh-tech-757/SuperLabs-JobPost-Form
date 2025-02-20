import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../index.css";

const jobUrl = import.meta.env.VITE_JOB_URL
const categoryUrl = import.meta.env.VITE_CATEGORY_URL
const locationUrl = import.meta.env.VITE_LOCATION_URL

function EditJobPost({
  setOpen,
  handleOpen,
  isEdit,
  editId,
  setIsEdit,
  job,
  setJob,
}) {

  const [selectedJobTypeValues, setSelectedJobTypeValues] = useState([]);
  const [selectedJobLocationTypeValues, setSelectedJobLocationTypeValues] = useState([]);


  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [jobTechSkills, setJobTechSkills] = useState("");
  const [techSkillsValues, setTechSkillsValues] = useState([]);
  const [education, setEducation] = useState("");
  const [educationalValues, setEducationalValues] = useState([]);
  const [closeDate, setCloseDate] = useState();
  const [createDate, setCreateDate] = useState();
  const [editJobPost, setEditJobPost] = useState([
    {
      job_title: "",
      job_location_type: [],
      job_category: "",
      job_type: [],
      job_location: "",
      job_experience_level: "",
      job_technical_skills: "",
      job_education_qualification: "",
      job_description: "",
      job_interview_rounds: "",
      job_budget: "",
      job_create_date: "",
      job_close_date: "",
      job_status: "",
    },
  ]);


  const fetchSingleJobPost = async () => {
    const jobpost = await axios.get(
      `${jobUrl}/${editId}`
    );
    setEditJobPost(jobpost.data);

   //Job Close Date

setCloseDate(jobpost.data.job_close_date)


   //Job Create Date

setCreateDate(jobpost.data.job_create_date)

    //Job Type

    setSelectedJobTypeValues(jobpost.data.job_type)

    //Job Location Type

    setSelectedJobLocationTypeValues(jobpost.data.job_location_type)


    //Education Qualification
    const uniqueEdu = new Set(jobpost.data.job_education_qualification); 
    setEducationalValues((prevValues) => {
      const combinedValues = new Set([...prevValues, ...uniqueEdu]); 
      return Array.from(combinedValues); // Convert the set back to an array
    });

    // Technical Skills
    const uniqueTech = new Set(jobpost.data.job_technical_skills); 
    setTechSkillsValues((prevValues) => {
      const combinedValues = new Set([...prevValues, ...uniqueTech]); 
      return Array.from(combinedValues); // Convert the set back to an array
    });
  };
  useEffect(() => {
    fetchSingleJobPost();
  }, [editId]);


  useEffect(()=>{
    axios.get(categoryUrl)
    .then((response) => {
      setCategory(response.data);
      })

  },[setCategory])

  useEffect(()=>{
    axios.get(locationUrl)
    .then((response) => {
      setLocation(response.data);
      })

  },[setLocation])

  ///////////////////////////////////////////////////////////////////////




  function handleOpen() {
    setOpen(!open);
  }

  function handleClose() {
    setIsEdit(!isEdit);
  }

  const handleSingleFieldChange = (e) => {
    setEditJobPost({ ...editJobPost, [e.target.name]: e.target.value });
  };



// Job Type

  function handleJobTypeChange(e) {
    const isSelected = e.target.checked;
    const value = e.target.value;
    if( isSelected ){
    setSelectedJobTypeValues( [...selectedJobTypeValues, value ] )
    
    }else{
      setSelectedJobTypeValues ((prevData)=>{
        return prevData.filter((jobType)=> {
          return jobType !== value
        })
      })
      }
  }

  // Job Location Type

  function handleJobLocationTypeChange(e) {
    const isSelected = e.target.checked;
    const value = e.target.value;
    if( isSelected ){
    setSelectedJobLocationTypeValues( [...selectedJobLocationTypeValues, value ] )
    
    }else{
      setSelectedJobLocationTypeValues ((prevData)=>{
        return prevData.filter((jobLocationType)=> {
          return jobLocationType !== value
        })
      })
      }
  }


  // Job Created Date
  

  const handleCreatedDate = (e) => {
    setCreateDate(e.target.value);
    setEditJobPost({ ...editJobPost, job_create_date: createDate });
  };

  // Job Close Date
 

  const handleCloseDate = (e) => {
    setCloseDate(e.target.value);
    setEditJobPost({ ...editJobPost, job_close_date: closeDate });
  };

  // Job Description

  const handleJobDescription = (value) => {
    setEditJobPost({ ...editJobPost, job_description: value });
  };

  // Educational Qualification
 
  const handleInputEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleKeyDownEducation = (e) => {
    if (e.key === "Enter") {
      addEduValue();
    }
  };

  const addEduValue = () => {
    if (education !== "") {
      setEducationalValues([...educationalValues, education]);
      setEducation("");
    }
  };

  const removeEducation = (index) => {
    const newlocationValues = educationalValues.filter((_, i) => i !== index);
    setEducationalValues(newlocationValues);
  };

  // Mandatory Technical Skills
  
  const handleInputTechSkillsChange = (e) => {
    setJobTechSkills(e.target.value);
  };

  const handleKeyDownTechSkills = (e) => {
    if (e.key === "Enter") {
      addTechValue();
    }
  };

  const addTechValue = () => {
    if (jobTechSkills !== "") {
      setTechSkillsValues([...techSkillsValues, jobTechSkills]);
      setJobTechSkills("");
    }
  };

  const removeTechnicalSkills = (index) => {
    const newlocationValues = techSkillsValues.filter((_, i) => i !== index);
    setTechSkillsValues(newlocationValues);
  };

 

 const handleCancel = ()=>{
  setIsEdit(false)
 }



  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .put(
        `${jobUrl}/${editId}`,
        {
          job_title: editJobPost.job_title,
          job_location_type: selectedJobLocationTypeValues,
          job_category: editJobPost.job_category,
          job_type: selectedJobTypeValues,
          job_location: editJobPost.job_location,
          job_experience_level: editJobPost.job_experience_level,
          job_technical_skills: techSkillsValues,
          job_education_qualification: educationalValues,
          job_description: editJobPost.job_description,
          job_interview_rounds: editJobPost.job_interview_rounds,
          job_budget: editJobPost.job_budget,
          job_create_date: createDate,
          job_close_date: closeDate,
          job_status: editJobPost.job_status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setJob(job?.map((j) => (j.job_id === editId ? res.data : j)));
        setIsEdit(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-4  scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-[600px] overflow-y-scroll"
      >
        <DialogHeader className="relative font-Josefin  block space-y-4 pb-6">
          <Typography className="font-Josefin" variant="h4" color="blue-gray">
            Edit your JobPost
          </Typography>
          <Typography className="mt-1 font-Josefin font-medium text-gray-600">
            Complete the form below with your job details.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleClose}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Title
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Job Title"
              name="job_title"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={editJobPost.job_title}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div>

          <div>
      <Typography
        variant="small"
        color="blue-gray"
        className="mb-2 text-left font-Josefin font-medium"
      >
        Job Location Type
      </Typography>
      <div className="flex gap-5 text-base">
        {["Onsite", "Remote", "Hybrid"].map((jobLocationType) => (
          <label key={jobLocationType}>
            <input
              type="checkbox"
              value={jobLocationType}
              checked={selectedJobLocationTypeValues.includes(jobLocationType)}
              onChange={handleJobLocationTypeChange}
              className="mr-2"
            />
            {jobLocationType}
          </label>
        ))}
      </div>
    </div>

          

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Category
            </Typography>
            <div className="flex text-base flex-col items-start font-Josefin ">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 "
                name="job_category"
                value={editJobPost.job_category}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Your Job Category</option>
                {
                  category.map((category) => (
                    <option key={category.category_id} value={category.category_title}>{category.category_title}</option>))
                }
              </select>
            </div>
          </div>

          <div>
      <Typography
        variant="small"
        color="blue-gray"
        className="mb-2 text-left font-Josefin font-medium"
      >
        Job Type
      </Typography>
      <div className="flex gap-5 text-base">
        {["FullTime", "PartTime", "Intership", "Contract"].map((jobType) => (
          <label key={jobType}>
            <input
              type="checkbox"
              value={jobType}
              checked={selectedJobTypeValues.includes(jobType)}
              onChange={handleJobTypeChange}
              className="mr-2"
            />
            {jobType}
          </label>
        ))}
      </div>
    </div>
          
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Location
            </Typography>
            <div className="flex text-base flex-col items-start font-Josefin ">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 "
                name="job_location"
                value={editJobPost.job_location}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Your Job Location</option>
                {
                  location.map((location) => (
                    <option key={location.location_id} value={location.location_title}>{location.location_title}</option>))
                }
              </select>
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Experience Level
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Experience Level"
              name="job_experience_level"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={editJobPost.job_experience_level}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Mandatory Technical Skills
            </Typography>

            <div className="flex flex-col items-start ">
              <div className="flex flex-wrap border border-gray-300 rounded  w-full">
                {techSkillsValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex text-base items-center bg-gray-200 p-1 m-1 rounded"
                  >
                    {value}{" "}
                    <button
                      onClick={() => removeTechnicalSkills(index)}
                      className="bg-red-500 text-white ml-2 px-2 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={jobTechSkills}
                  onChange={handleInputTechSkillsChange}
                  onKeyDown={handleKeyDownTechSkills}
                  placeholder="Enter a value and press Enter"
                  className="flex-grow p-2 text-base border-0 focus:ring-0"
                />
              </div>
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Education Qualification
            </Typography>

            <div className="flex flex-col items-start ">
              <div className="flex flex-wrap border border-gray-300 rounded  w-full">
                {educationalValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex text-base items-center bg-gray-200 p-1 m-1 rounded"
                  >
                    {value}{" "}
                    <button
                      onClick={() => removeEducation(index)}
                      className="bg-red-500 text-white ml-2 px-2 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={education}
                  onChange={handleInputEducationChange}
                  onKeyDown={handleKeyDownEducation}
                  placeholder="Enter a value and press Enter"
                  className="flex-grow p-2 text-base border-0 focus:ring-0"
                />
              </div>
            </div>
          </div>
          <div className="font-Josefin">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium font-Josefin"
            >
              Job Description
            </Typography>
            <div>
              <ReactQuill
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline", "strike"],
                    ["link", "image"],
                    [{ align: [] }],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "list",
                  "bullet",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "link",
                  "image",
                  "align",
                ]}
                className="mb-4 "
                value={editJobPost.job_description}
                onChange={handleJobDescription}
              />
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Interview Rounds
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Interview Rounds"
              name="job_interview_rounds"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={editJobPost.job_interview_rounds}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Budget
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Job Budget"
              name="job_budget"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={editJobPost.job_budget}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Created Date
            </Typography>
            <div>
              <input
                type="date"
                value={createDate}
                className="text-base"
                onChange={(e) => handleCreatedDate(e)}
              />
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Valid Through
            </Typography>
            <div>
              <input
                type="date"
                value={closeDate}
                className="text-base"
                onChange={(e) => handleCloseDate(e)}
              />
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Status
            </Typography>
            <div className="flex text-base flex-col items-start font-Josefin ">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 "
                name="job_status"
                value={editJobPost.job_status}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Status</option>
                <option name="Active" value="Active">
                  Active
                </option>
                <option name="Inactive" value="Inactive">
                  Inactive
                </option>
              </select>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSubmit} className="ml-auto">
            Update
          </Button>
          <Button onClick={handleCancel} className="ml-10 ">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default EditJobPost;
