import { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import { useGetCompaniesQuery } from "../redux/feature/company/companyApi";
import { CompanyInterface } from "../types/companyType";

import "react-datepicker/dist/react-datepicker.css";

const AllCompanies = () => {
  const { data, isLoading, error } = useGetCompaniesQuery(undefined);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  // const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allCompanies, setAllCompanies] = useState<CompanyInterface[]>([]);
  const [selectDate, setSelectDate] = useState<Date | null | undefined>(null);

  useEffect(() => {
    if (data?.data) {
      setAllCompanies([...data.data]);
    }
  }, [data, isLoading]);

  useEffect(() => {
    let filteredData = [];

    if (searchText !== "") {
      filteredData = data.data.filter((company: any) => {
        const lowercasedSearchText = searchText.toLowerCase();
        return (
          company.title.toLowerCase().includes(lowercasedSearchText) ||
          company.email.toLowerCase().includes(lowercasedSearchText) ||
          company.address.toLowerCase().includes(lowercasedSearchText)
        );
      });
    } else {
      filteredData = data.data;
    }
    setAllCompanies(filteredData);
  }, [searchText, selectedCategory, selectDate, data?.data]);

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="w-[90%] mx-auto relative flex flex-col">
      <div className="">
        <form>
          <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-0 py-2">
            <div className="w-full flex h-10">
              <input
                type="search"
                className="block p-2.5 w-full z-20 text-sm text-white bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500  rounded-l-md"
                placeholder="Search by Name, Email, Address..."
                required
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setSelectedCategory("All Category");
                  setSelectDate(null);
                }}
              />
              <button
                type="submit"
                className="p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-40 md:mt-20">
        {allCompanies?.length > 0 &&
          allCompanies.map((company: CompanyInterface) => (
            <CompanyCard key={company?._id} company={company} />
          ))}
      </div>
    </div>
  );
};

export default AllCompanies;
