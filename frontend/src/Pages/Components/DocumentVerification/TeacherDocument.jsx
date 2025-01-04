import React, { useState, useEffect } from "react";
import Input from "../DocumentVerification/InputComponent/Input.jsx";
import InputUpload from "../DocumentVerification/Inputupload/InputUpload.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import logo from "../../Images/logo.svg";

const TeacherDocument = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const { Data } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  // Timeout implementation
  const fetchDataWithTimeout = async (url, options) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout after 5 seconds

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal, // Attach the abort controller
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Request timed out");
      } else {
        throw new Error(error.message);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true); // Show loader while fetching
        const response = await fetchDataWithTimeout(`/api/teacher/TeacherDocument/${Data}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        console.log("Updating Data"); // Update data state
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoader(false); // Hide loader once data is fetched
      }
    };

    getData();
  }, [Data]); // Add `Data` as dependency to refetch when params change

  const [formData, setFormData] = useState({
    Phone: "",
    Address: "",
    Experience: "",
    SecondarySchool: "",
    SecondaryMarks: "",
    HigherSchool: "",
    HigherMarks: "",
    UGcollege: "",
    UGmarks: "",
  });

  useEffect(() => {
    // Update formData when data is fetched
    if (data) {
      setFormData({
        Phone: data.Phone || "",
        Address: data.Address || "",
        Experience: data.Experience || "",
        SecondarySchool: data.SecondarySchool || "",
        SecondaryMarks: data.SecondaryMarks || "",
        HigherSchool: data.HigherSchool || "",
        HigherMarks: data.HigherMarks || "",
        UGcollege: data.UGcollege || "",
        UGmarks: data.UGmarks || "",
      });
    }
  }, [data]); // Re-run when data changes

  const handleFileChange = (fileType, e) => {
    setFormData({
      ...formData,
      [fileType]: e.target.files[0],
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      console.log(formData);
      console.log(formDataObj);
      const response = await fetch(`/api/teacher/verification/${Data}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
      setLoader(false);
      if (!response.ok) {
        setError(response.message);
      } else {
        console.log("Form submitted successfully!");
        navigate("/pending");
      }
    } catch (e) {
      setLoader(false);
      setError(`Error: ${e.message}`);
    }
  };

  return (
    <>
      {loader && (
        <div className="absolute top-[40%] left-[45%] translate-x-[50%] translate-y-[50%]">
          <RotatingLines
            visible={true}
            height="100"
            width="100"
            color="#0D286F"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <span className="text-white text-xl ml-1">Uploading ...</span>
        </div>
      )}
      <div className="flex items-center gap-[20rem] px-32 py-2 bg-[#0D286F]">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-14" alt="" />
          <h1 className="text-2xl text-[#4E84C1] font-bold">LearnBridge</h1>
        </div>
        <h2 className="text-white text-xl">Document Verification (Teacher)</h2>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <p className="text-[#4E84C1] p-5 px-10">Personal Information</p>
        <div className="flex flex-wrap gap-20 px-36 mb-10">
          <Input
            label={"First Name"}
            placeholder={"First Name"}
            value={data.Firstname}
            readonly
          />
          <Input
            label={"Last Name"}
            placeholder={"Last Name"}
            value={data.Lastname}
            readonly
          />
          <Input
            label={"Phone No."}
            placeholder={"Phone No."}
            value={formData.Phone}
            onChange={(e) => handleInputChange("Phone", e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-20 px-36">
          <Input
            label={"Home Address"}
            placeholder={"Home Address"}
            value={formData.Address}
            onChange={(e) => handleInputChange("Address", e.target.value)}
          />
          <Input
            label={"Experience (years)"}
            placeholder={"Experience (years)"}
            value={formData.Experience}
            onChange={(e) => handleInputChange("Experience", e.target.value)}
          />
        </div>

        <p className="text-[#4E84C1] p-5 px-10 pt-10">Educational Information</p>
        <div className="border h-full mx-36 relative">
          {/* Secondary */}
          <div className="flex flex-row gap-7 ">
            <div className="bg-[#0D286F] p-[1rem] m-3 rounded-sm">
              <p className="text-white text-sm">Secondary</p>
            </div>
            <Input
              placeholder={"10th Board Name"}
              value={formData.SecondarySchool}
              onChange={(e) => handleInputChange("SecondarySchool", e.target.value)}
            />
            <Input
              placeholder={"Total Marks (%)"}
              value={formData.SecondaryMarks}
              onChange={(e) => handleInputChange("SecondaryMarks", e.target.value)}
            />
          </div>
          <hr />
          
          {/* Higher Secondary */}
          <div className="flex flex-row gap-7 items-center">
            <div className="bg-[#0D286F] p-[1rem] m-1 rounded-sm">
              <p className="text-white text-sm">Higher Secondary</p>
            </div>
            <Input
              placeholder={"12th Board Name"}
              value={formData.HigherSchool}
              onChange={(e) => handleInputChange("HigherSchool", e.target.value)}
            />
            <Input
              placeholder={"Total Marks (%)"}
              value={formData.HigherMarks}
              onChange={(e) => handleInputChange("HigherMarks", e.target.value)}
            />
          </div>
          <hr />

          {/* Graduation */}
          <div className="flex flex-row gap-7">
            <div className="bg-[#0D286F] p-[1rem] m-3 rounded-sm">
              <p className="text-white text-sm">Graduation</p>
            </div>
            <Input
              placeholder={"Graduation University Name"}
              value={formData.UGcollege}
              onChange={(e) => handleInputChange("UGcollege", e.target.value)}
            />
            <Input
              placeholder={"CGPA"}
              value={formData.UGmarks}
              onChange={(e) => handleInputChange("UGmarks", e.target.value)}
            />
          </div>
          <hr />
        </div>

        {error && <p className="text-white text-xl m-5 text-center">!! {error}</p>}
        <div className="bg-[#0D286F] p-3 m-6 rounded-md w-[7rem] ml-[85%] cursor-pointer">
          <button className="text-white text-sm" type="submit">
            Submit ▶️
          </button>
        </div>
      </form>
    </>
  );
};

export default TeacherDocument;
