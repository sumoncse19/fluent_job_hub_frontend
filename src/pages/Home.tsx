import { useGetCompaniesQuery } from "../redux/feature/company/companyApi";
import { CompanyInterface } from "../types/companyType";
import CompanyCard from "../components/CompanyCard";
import { useEffect, useState } from "react";

const Home = () => {
  const { data, isLoading } = useGetCompaniesQuery(undefined);
  const [allCompanies, setAllCompanies] = useState<CompanyInterface[]>([]);

  useEffect(() => {
    if (data?.data) {
      const reversedAndSliced = [...data.data].reverse().slice(0, 10);
      setAllCompanies(reversedAndSliced);
    }
  }, [data, isLoading]);

  return (
    <div>
      <h2 className="text-center text-3xl font-bold">
        Recent registered company
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-20 px-4 md:px-8 lg:px-10">
        {allCompanies?.length > 0 &&
          allCompanies.map((company: CompanyInterface) => (
            <CompanyCard key={company?._id} company={company} />
          ))}
      </div>
    </div>
  );
};

export default Home;
