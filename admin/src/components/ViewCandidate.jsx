import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const ViewCandidate = ({ id, setViewId }) => {
  const [candidateData, setCandidateData] = useState();

  const fetchCandidate = async () => {
    const res = await axios.get(`http://localhost:3000/candidates/${id}`);
    setCandidateData(res.data);
  };

  console.log(candidateData);

  useEffect(() => {
    fetchCandidate();
  }, [id]);

  return (
    <div>
      <div>
        <button
          onClick={() => setViewId("")}
          className=" px-4 py-2 border rounded-md bg-blue-gray-400"
        >
          Back
        </button>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center space-x-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {candidateData?.first_name} {""} {candidateData?.last_name}
            </h2>
            <p className="text-gray-600">{candidateData?.job_title}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Linkedin</h3>
          <p className="text-gray-600 mt-2">
            <a href={candidateData?.linkedin}>linkedin</a>
          </p>
          <h3 className="text-xl font-semibold text-gray-800">Website</h3>
          <p className="text-gray-600 mt-2">
            <a href={candidateData?.website}>Website</a>
          </p>
        </div>

        {/* <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2"></ul>
        </div> */}

        {/* <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {candidateData?.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div> */}

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Contact</h3>
          <p className="text-gray-600 mt-2">Email: {candidateData?.email}</p>
          <p className="text-gray-600">Phone: {candidateData?.phone}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Documents</h3>
          <p className="text-gray-600 mt-2">
            <a
              href={`http://localhost:3000/uploads/${candidateData?.resume}`}
              download={`http://localhost:3000/uploads/${candidateData?.resume}`}
              target="_blank"
            >
              Resume
            </a>
          </p>
          <p className="text-gray-600">
            <a
              href={`http://localhost:3000/uploads/${candidateData?.cover}`}
              download={`http://localhost:3000/uploads/${candidateData?.cover}`}
              target="_blank"
            >
              Cover Letter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewCandidate;
