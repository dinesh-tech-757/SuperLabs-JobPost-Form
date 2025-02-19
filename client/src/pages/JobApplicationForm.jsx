import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const candidatesUrl = import.meta.env.VITE_CANDIDATES_URL

function JobApplicationForm() {
  const { job } = useParams();

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

    await axios.post(candidatesUrl, data);

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
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        {job}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              First Name*
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Last Name*
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Phone*
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Resume/CV*
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Cover Letter
          </label>
          <input
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            type="file"
            name="cover"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            LinkedIn Profile*
          </label>
          <input
            name="linkedin"
            type="text"
            placeholder="Please mention your LinkedIn profile"
            value={formData.linkedin}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg w-full shadow-md transition duration-300"
        >
          Apply
        </button>
      </form>
    </div>
  );
}

export default JobApplicationForm;
