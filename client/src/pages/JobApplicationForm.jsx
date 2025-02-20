import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const candiUrl = import.meta.env.VITE_CANDIDATES_URL

function JobApplicationForm() {
  const { job } = useParams();
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    resume: null,
    cover: null,
    job_title: job,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    await axios.post(candiUrl, data);

    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      linkedin: "",
      website: "",
      resume: null,
      cover: null,
      job_title: job,
    });
    navigate("/success");
  };

  return (
    <div className="flex flex-col gap-5 px-10 py-10 max-w-3xl mx-auto">
      <NavLink to={`/job/${id}`} className="text-red-600 flex items-center">
        <ArrowBackIosIcon /> <p>Back to Job Description</p>
      </NavLink>
      <h2 className="lg:text-3xl text-2xl text-gray-600 font-bold">{job}</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full"
      >
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold">Personal Information</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="relative mb-6 w-full md:w-[48%]">
              <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                First Name*
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="block w-full h-11 px-5 py-2.5 bg-white drop-shadow-lg leading-7 text-base font-normal text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                required
              />
            </div>
            <div className="relative mb-6 w-full md:w-[48%]">
              <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                Last Name*
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal drop-shadow-lg text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="relative mb-6 w-full md:w-[48%]">
              <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal drop-shadow-lg text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                required
              />
            </div>
            <div className="relative mb-6 w-full md:w-[48%]">
              <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                Phone*
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal drop-shadow-lg text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="relative mb-6 ">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Resume/CV*
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="w-full text-gray-500 border shadow-lg font-medium text-base file:cursor-pointer cursor-pointer file:text-black file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-700 rounded"
            required
          />
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold">Additional Information</h3>

          <div className="relative mb-6">
            <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
              Cover Letter
            </label>
            <input
              type="file"
              name="cover"
              onChange={handleFileChange}
              className="w-full text-gray-500 shadow-lg border font-medium text-base file:cursor-pointer cursor-pointer file:text-black file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-700 rounded"
            />
          </div>
          <div className="relative mb-6">
            <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
              LinkedIn Profile*
            </label>
            <input
              type="url"
              name="linkedin"
              placeholder="Please mention your LinkedIn profile"
              value={formData.linkedin}
              onChange={handleChange}
              className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal drop-shadow-lg text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
          <div className="relative mb-6">
            <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
              Website
            </label>
            <input
              type="url"
              name="website"
              placeholder="Please mention your website"
              value={formData.website}
              onChange={handleChange}
              className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal drop-shadow-lg text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full md:w-52 h-12 bg-red-600 hover:bg-red-800 transition-all duration-700 rounded-md drop-shadow-lg text-white text-base font-semibold leading-6 mb-6"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobApplicationForm;