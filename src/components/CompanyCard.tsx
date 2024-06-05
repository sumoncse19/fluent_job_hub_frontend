import { useNavigate } from "react-router-dom";
import { CompanyInterface } from "../types/companyType";
import dayjs from "dayjs";
import { useState } from "react";

const CompanyCard = ({ company }: { company: CompanyInterface }) => {
  const navigate = useNavigate();
  const [hoverItemId, setHoverItemId] = useState("");
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex justify-center items-center w-full border rounded-lg h-full">
        <div
          className="bg-white rounded-lg w-full h-full hover:bg-gray-200 shadow-md flex flex-col md:flex-row grow card text-grey-darkest cursor-pointer"
          onClick={() => navigate(`/company/${company._id}`)}
          onMouseEnter={() => setHoverItemId(company._id)}
          onMouseLeave={() => setHoverItemId("")}
        >
          <img
            className="w-full md:w-1/2 h-[400px] md:h-full rounded-l-lg flex flex-col grow"
            src={company?.image}
            alt="Room Image"
          />
          <div className="w-full flex flex-col">
            <div className="p-4 pb-0 flex-1">
              <h3 className=" mb-4 text-2xl font-bold text-grey-darkest">
                {company?.title}
              </h3>
              <div className="text-lg flex items-center mb-2">
                Email: {company?.email}
              </div>
              <div className="text-lg flex items-center mb-2">
                Address: {company.address}
              </div>
              <div className="text-lg flex items-center mb-2">
                Registration Data:{" "}
                {dayjs(company.registrationDate).format("YYYY-MM-DD")}
              </div>
            </div>

            <div
              className={` px-3 py-2 flex items-center justify-between transition hover:bg-gray-400 ${
                hoverItemId === company._id ? "bg-gray-400" : "bg-gray-200"
              }`}
              onClick={() => navigate(`/company/${company._id}`)}
            >
              Details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
