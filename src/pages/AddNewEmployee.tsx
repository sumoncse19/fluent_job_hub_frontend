import { useEffect, useState } from "react";
import {
  useGetCompaniesQuery,
  usePostEmployeeMutation,
} from "../redux/feature/company/companyApi";
import toast from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";

// import { useAppSelector } from "../redux/hook";

const AddNewEmployee = () => {
  const { data, isLoading: companyLoading } = useGetCompaniesQuery(undefined);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
  const [assignedCompanyId, setAssignedCompanyId] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [postEmployee, { isLoading }] = usePostEmployeeMutation();

  // const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (data) {
      setCompanyData(data.data);
    }
  }, [data, companyLoading]);

  const handleAddEmployee = async () => {
    if (
      name === "" ||
      address === "" ||
      email === "" ||
      mobile === "" ||
      assignedCompanyId === ""
    ) {
      toast.dismiss();
      toast.error("Please fill all the fields");
    } else {
      try {
        const response: any = await postEmployee({
          name,
          address,
          email,
          mobile,
          image,
          assignedCompanyId,
        });

        if (response?.error?.status === 409) {
          toast.dismiss();
          toast.error(response.error.data.message);
        } else {
          toast.dismiss();
          toast.success("Employee added successful");
          setName("");
          setAddress("");
          setEmail("");
          setImage("");
          setMobile("");
          setAssignedCompanyId("");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 flex flex-col items-center w-full lg:w-[75%] 2xl:w-1/2 mx-auto bg-slate-800 text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-7">Add New Employee</h1>
      <form
        className="md:p-3 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddEmployee();
        }}
      >
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium" htmlFor="name">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write employee name"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="name"
            required={true}
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="address">
            Address
          </label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Write the employee address"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            required={true}
            name="address"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Write employee email"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="email"
            required={true}
            name="email"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="mobile">
            Mobile
          </label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Write employee mobile number"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="number"
            required={true}
            name="mobile"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="image">
            Employee Img
          </label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Provide employee img"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="image"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="image">
            Select Company
          </label>
          <select
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            onChange={(e) => {
              setAssignedCompanyId(e.target.value);
              console.log(e.target.value, "here the select");
            }}
          >
            {companyData.length > 0 &&
              companyData.map((company: any) => (
                <option key={company._id} value={company._id}>
                  {company.title}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className=" bg-green-500 px-12 rounded-md text-white font-semibold py-2"
        >
          Save
        </button>
      </form>
    </div>
  );
};
export default AddNewEmployee;
