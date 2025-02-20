// const SuccessJob = () => {
//   return (
//     <div className=" h-screen flex items-center justify-center">
//       <div className=" flex flex-col gap-2 items-center justify-center bg-green-600 h-[200px] w-[200px] rounded-md">
//         <h1>Applied Successfully</h1>
//         <div>
//           <a href="/">
//             {" "}
//             <button className=" px-4 py-2 rounded-lg border bg-green-300">
//               Back
//             </button>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessJob;

const SuccessJob = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 items-center justify-center bg-white p-8 shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-2xl font-semibold text-green-600">
          Application Successful!
        </h1>
        <p className="text-gray-700">
          Thank you for applying. We will review your application and get back
          to you soon.
        </p>
        <a href="/">
          <button className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-300">
            Back to Home
          </button>
        </a>
      </div>
    </div>
  );
};

export default SuccessJob;
