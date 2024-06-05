import React, { useState } from "react";
import { useUpdateEmployeeMutation } from "../redux/feature/company/companyApi";

interface UpdateEmployeeModalProps {
  openEditModal: boolean;
  employeeData: any;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  // confirmUpdated: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const UpdateEmployeeModal = ({
  openEditModal,
  employeeData,
  setOpenEditModal,
}: // confirmUpdated,
UpdateEmployeeModalProps) => {
  const [updateEmployee] = useUpdateEmployeeMutation();

  const [name, setName] = useState(employeeData.name);
  const [email, setEmail] = useState(employeeData.email);
  const [mobile, setMobile] = useState(employeeData.mobile);
  const [address, setAddress] = useState(employeeData.address);

  const handleEmployee = () => {
    console.log(
      "Update employee data",
      employeeData,
      name,
      email,
      mobile,
      address
    );
    updateEmployee({
      _id: employeeData._id,
      name: name ? name : employeeData.name,
      email: email ? email : employeeData.email,
      mobile: mobile ? mobile : employeeData.mobile,
      address: address ? address : employeeData.address,
      assignedCompanyId: employeeData.assignedCompanyId,
      image: employeeData.image,
    });
    setOpenEditModal(false);
    // if (confirmUpdated) {
    //   confirmUpdated(e);
    //   setOpenEditModal(false);
    // }
  };

  return (
    <>
      {openEditModal && (
        <div
          onClick={() => {
            setOpenEditModal(false);
          }}
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-700 ease-in-out ${
            openEditModal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" bg-[#F8F5FA] w-[50%] 2xl:w-[40%] h-auto border-none rounded-md py-4 px-6"
          >
            <div className="md:p-3 w-full">
              <div className="flex justify-center items-center pb-8">
                <img src={employeeData.image} className="w-20 h-20" alt="" />
              </div>
              <div className="flex justify-between items-center my-2">
                <label className="text-xl font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  defaultValue={employeeData.name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Write your name"
                  className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
                  type="text"
                  name="name"
                  id=""
                />
              </div>
              <div className="flex justify-between items-center my-2">
                <label className="text-xl font-medium " htmlFor="email">
                  Email
                </label>
                <input
                  defaultValue={employeeData.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Write the email name"
                  className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
                  type="text"
                  name="email"
                  id=""
                />
              </div>
              <div className="flex justify-between items-center my-2">
                <label className="text-xl font-medium " htmlFor="mobile">
                  Mobile
                </label>
                <input
                  defaultValue={employeeData.mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Write the mobile "
                  className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
                  type="text"
                  name="mobile"
                  id=""
                />
              </div>
              <div className="flex justify-between items-center my-2">
                <label className="text-xl font-medium " htmlFor="address">
                  Address
                </label>
                <input
                  defaultValue={employeeData.address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Write the address "
                  className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
                  type="text"
                  name="address"
                  id=""
                />
              </div>
            </div>

            <div className="flex gap-4 my-4 float-right">
              <button
                onClick={() => setOpenEditModal(false)}
                className="border rounded-lg px-3 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleEmployee();
                }}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateEmployeeModal;
