const SuccessJob = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className=" flex flex-col gap-2 items-center justify-center bg-green-600 h-[200px] w-[200px] rounded-md">
        <h1>Applied Successfully</h1>
        <div>
          <a href="/">
            {" "}
            <button className=" px-4 py-2 rounded-lg border bg-green-300">
              Back
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessJob;
