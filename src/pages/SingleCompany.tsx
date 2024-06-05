import {
  useDeleteCompanyMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
  useGetReviewsQuery,
  usePostReviewMutation,
  useSingleCompanyQuery,
} from "../redux/feature/company/companyApi";

import { MdDelete, MdOutlineEdit } from "react-icons/md";
import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import DeleteConfirmationDialog from "../components/base/DeleteConfirmationDialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ReviewInterface } from "../types/companyType";
import UpdateEmployeeModal from "../components/UpdateEmployee";

const SingleCompany = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isDeleteCompany, setIsDeleteCompany] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState("");
  const [actionEmployeeId, setActionEmployeeId] = useState("");
  const [review, setReview] = useState("");
  const { id } = useParams();
  const { data: company, isLoading, error } = useSingleCompanyQuery(id);
  const [deleteCompany, { isSuccess: deleteCompanySuccess }] =
    useDeleteCompanyMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const {
    data: reviews,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetReviewsQuery(id);
  const navigate = useNavigate();
  const { data: employees, isLoading: employeeLoading } =
    useGetEmployeeQuery(id);
  const [
    postReview,
    { isLoading: postLoading, isError: postError, isSuccess },
  ] = usePostReviewMutation();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (deleteCompanySuccess) {
      toast.dismiss();
      toast.success("Company deleted successfully");
      setOpenModal(false);
      navigate("/all-companies");
    }
  }, [deleteCompanySuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Review added successfully");
      setReview("");
    }
  }, [isSuccess]);

  const handleSubmitReview = () => {
    if (!user._id) {
      toast.dismiss();
      return toast.error("Please login");
    }
    if (review !== "") {
      postReview({ userId: user._id, companyId: id, review: review });
    } else {
      toast.dismiss();
      toast.error("Please write something!");
    }
  };

  const confirmDelete = () => {
    if (isDeleteCompany) {
      deleteCompany(id);
      setIsDeleteCompany(false);
    } else {
      deleteEmployee(actionEmployeeId);
      console.log("From confirmDelete", actionEmployeeId);
    }
  };

  // const confirmUpdated = () => {
  //   console.log("confirmUpdated")
  // }

  useEffect(() => {
    console.log(employees, "employees", employeeLoading);
  }, [employees, employeeLoading]);

  if (isLoading || reviewLoading || postLoading) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }
  if (error || reviewError || postError) {
    return <div>Error</div>;
  }
  return (
    <>
      <div className="flex flex-wrap gap-4 max-w-7xl mx-auto items-center border-b border-gray-300 py-5">
        <div className="md:pr-5">
          <img src={company?.data?.image} alt="" />
        </div>

        <div className="pl-4 space-y-3">
          <h1 className="text-3xl font-semibold">{company?.data?.title}</h1>
          <p className="text-xl">Email: {company?.data?.email}</p>
          <p className="text-xl">Address: {company?.data?.address}</p>
          <p className="text-xl">
            Registration Date:{" "}
            {dayjs(company?.data?.registrationDate).format("YYYY-MM-DD")}
          </p>

          {user._id && user._id == company.data.userId && (
            <div className="flex gap-4">
              <Link
                to={`/edit-company/${id}`}
                className="bg-green-400 px-3 py-2 rounded-lg"
              >
                Edit Company
              </Link>
              <button
                onClick={() => {
                  setOpenModal(true);
                  setIsDeleteCompany(true);
                }}
                className="bg-red-500 px-3 py-2 rounded-lg"
              >
                Delete Company
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="py-5">
        <h2 className="text-center font-bold text-xl">
          Employee list of this organization
        </h2>

        {employeeLoading ? (
          <div>Loading ...</div>
        ) : (
          <div>
            {employees.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-10 md:px-0 py-10">
                {employees.map((employee: any) => {
                  return (
                    <div
                      key={employee._id}
                      className="flex justify-center gap-4 border-b border-gray-300 bg-gray-300 p-4 relative"
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src={employee.image}
                          alt=""
                          className="w-20 h-20 rounded-full"
                        />
                      </div>

                      <div className="flex flex-col">
                        <p className="font-semibold">Name: {employee.name}</p>
                        <p>
                          <span className="font-semibold">Email: </span>
                          {employee.email}
                        </p>
                        <p>
                          <span className="font-semibold">Mobile: </span>
                          {employee.mobile}
                        </p>
                        <p>
                          <span className="font-semibold">Address: </span>
                          {employee.address}
                        </p>
                      </div>

                      <div
                        className="absolute p-3 bg-slate-500 rounded-full translate-x-1/2 -translate-y-1/2 right-0 cursor-pointer"
                        onClick={() => {
                          setActionEmployeeId(employee._id);
                          setSelectedEmployeeData(employee);
                          setOpenEditModal(true);
                        }}
                      >
                        <MdOutlineEdit />
                      </div>

                      <div
                        className="absolute p-3 bg-red-400 rounded-full bottom-0 left-0 w-fit h-fit cursor-pointer"
                        onClick={() => {
                          setOpenModal(true);
                          setActionEmployeeId(employee._id);
                        }}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>In this company have no employee</div>
            )}
          </div>
        )}
      </div>

      {reviews.length > 0 ? (
        <div className="flex flex-wrap gap-4 my-5">
          {reviews.map((review: ReviewInterface) => {
            return (
              <div
                key={review._id}
                className="flex justify-center gap-4 border-b border-gray-300 bg-gray-300 p-4"
              >
                <div className="flex justify-center items-center">
                  <img
                    src="https://e7.pngegg.com/pngimages/419/473/png-clipart-computer-icons-user-profile-login-user-heroes-sphere-thumbnail.png"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">{review.user.name}</p>
                  <p>{review.review}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="py-2">No Reviews Found</p>
      )}

      <textarea
        className="mt-2 p-2 block w-[100%] md:w-[50%] resize-none border"
        rows={4}
        cols={40}
        placeholder="Type your review"
        name="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <button
        id="save-button"
        className="bg-black text-white rounded px-5 py-2 mt-2 mb-5"
        onClick={handleSubmitReview}
      >
        Review
      </button>
      <DeleteConfirmationDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        confirmDelete={confirmDelete}
      />
      <UpdateEmployeeModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        employeeData={selectedEmployeeData}
        // confirmUpdated={confirmUpdated}
      />
    </>
  );
};

export default SingleCompany;
