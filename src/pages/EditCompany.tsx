import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCompanyMutation,
  useSingleCompanyQuery,
} from "../redux/feature/company/companyApi";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const EditCompany = () => {
  const { id } = useParams();
  const { data: company, isLoading, error } = useSingleCompanyQuery(id);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [
    editCompany,
    { isLoading: editLoading, isError: editError, isSuccess },
  ] = useEditCompanyMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (company.data.registrationDate) {
        setSelectedDate(new Date(`${company.data.registrationDate}`));
      }
      setTitle(company.data.title);
      setEmail(company.data.email);
      setAddress(company.data.address);
      setImage(company.data.image);
    }

    if (isSuccess) {
      toast.dismiss();
      toast.success("Edit company successful");
      navigate("/all-companies");
    }
  }, [isLoading, isSuccess]);

  const handleAddCompany = () => {
    editCompany({
      _id: company.data._id,
      title,
      email,
      address,
      registrationDate: selectedDate,
      image,
    });
  };
  if (isLoading || editLoading) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }
  if (error || editError) {
    return <div>Error</div>;
  }
  return (
    <div className="p-4 md:p-8 lg:p-10 2xl:p-20 flex flex-col items-center w-full lg:w-[75%] 2xl:w-[50%] mx-auto bg-slate-800 text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-7">Edit Company</h1>
      <div className="md:p-3 w-full">
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium" htmlFor="title">
            Title
          </label>
          <input
            defaultValue={company.data.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write the company title"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="title"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="email">
            Email
          </label>
          <input
            defaultValue={company.data.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Write the email name"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="email"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="address">
            Address
          </label>
          <input
            defaultValue={company.data.address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Write the address "
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="address"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium" htmlFor="registrationDate">
            Registration Date(mm/dd/yyyy)
          </label>
          <div className="w-[70%] border border-blue-500 bg-white text-black rounded-md outline-none">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                setSelectedDate(date);
              }}
              className="!w-full px-3 py-2 !outline-none border-none text-black rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="image">
            Image
          </label>
          <input
            defaultValue={company.data.image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Provide img host link"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="image"
            id=""
          />
        </div>
      </div>
      <button
        onClick={handleAddCompany}
        className="bg-green-500 px-12 rounded-md text-white font-semibold py-2"
      >
        Save
      </button>
    </div>
  );
};

export default EditCompany;
