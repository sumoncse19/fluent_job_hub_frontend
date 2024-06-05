import { Link } from "react-router-dom";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#141e30] text-white p-5 md:p-10 lg:p-20">
      <div className="flex justify-between">
        <div className="flex gap-20">
          <ul className="flex flex-col items-start space-y-2">
            <li>
              <button>
                <Link to="/" className="whitespace-nowrap">
                  Home
                </Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/all-companies" className="whitespace-nowrap">
                  All Companies
                </Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/add-new-company" className="whitespace-nowrap">
                  Add Company
                </Link>
              </button>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>Support</li>
            <li>Careers</li>
          </ul>
          <ul className="space-y-2">
            <li>List your gear</li>
            <li>Contact team</li>
          </ul>
        </div>
      </div>
      <div className="flex w-full mt-20 gap-5">
        <p>Privacy Policy</p>
        <p>Terms & Condition</p>
        <p className="ml-auto"> &#169; FLUENT JOB HUB {year}</p>
      </div>
    </div>
  );
}
