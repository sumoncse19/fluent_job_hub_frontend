import { useState } from "react";
import { usePostCompanyMutation } from "../redux/feature/company/companyApi";
import toast from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";

import { useAppSelector } from "../redux/hook";

const AddNewCompany = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [postCompany, { isLoading }] = usePostCompanyMutation();

  const { user } = useAppSelector((state) => state.user);

  const handleAddCompany = async () => {
    if (title === "" || address === "" || email === "" || image === "") {
      toast.dismiss();
      toast.error("Please fill all the fields");
    } else {
      try {
        const response: any = await postCompany({
          userId: user._id,
          title,
          address,
          email,
          image,
        });

        if (response?.error?.status === 409) {
          toast.dismiss();
          toast.error(response.error.data.message);
        } else {
          toast.dismiss();
          toast.success("Company added successful");
          setTitle("");
          setAddress("");
          setEmail("");
          setImage("");
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
    <div className="p-4 md:p-8 lg:p-12 flex flex-col items-center w-full lg:w-[50%] mx-auto bg-slate-800 text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-7">Add New Company</h1>
      <form
        className="md:p-3 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddCompany();
        }}
      >
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium" htmlFor="title">
            Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
            placeholder="Write company name"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="title"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="address">
            Address
          </label>
          <input
            value={address}
            required={true}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Write the company address"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
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
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Write company email"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="email"
            name="email"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="image">
            Logo
          </label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Provide company logo host link"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="image"
            id=""
          />
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
export default AddNewCompany;
