import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const candidatesUrl = import.meta.env.VITE_CANDIDATES_URL;
const uploadsUrl = import.meta.env.VITE_UPLOADS_URL;

const ViewCandidate = ({ id, setViewId }) => {
  const [candidateData, setCandidateData] = useState();

  const fetchCandidate = async () => {
    const res = await axios.get(`${candidatesUrl}/${id}`);
    setCandidateData(res.data);
  };

  useEffect(() => {
    fetchCandidate();
  }, [id]);

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <button
        onClick={() => setViewId("")}
        className="flex items-center px-4 py-2 mb-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
      >
        <ArrowLeft className="mr-2" /> Back
      </button>
      <div className="p-6 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center space-x-6 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {candidateData?.first_name} {candidateData?.last_name}
            </h2>
            <p className="text-gray-600">{candidateData?.job_title}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">LinkedIn</h3>
          <p className="text-blue-600 mt-2">
            <a
              href={candidateData?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {candidateData?.linkedin}
            </a>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Website</h3>
          <p className="text-blue-600 mt-2">
            <a
              href={candidateData?.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {candidateData?.website}
            </a>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Contact</h3>
          <p className="text-gray-600 mt-2">Email: {candidateData?.email}</p>
          <p className="text-gray-600">Phone: {candidateData?.phone}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Documents</h3>
          <p className="text-blue-600 mt-2">
            <a
              href={`${uploadsUrl}/${candidateData?.resume}`}
              download={`${uploadsUrl}/${candidateData?.resume}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </p>
          <p className="text-blue-600">
            <a
              href={`${uploadsUrl}/${candidateData?.cover}`}
              download={`${uploadsUrl}/${candidateData?.cover}`}
              target="_blank"
              rel="noopener noreferrer"
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
