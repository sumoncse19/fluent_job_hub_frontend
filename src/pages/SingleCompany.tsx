import {
  useGetReviewsQuery,
  usePostReviewMutation,
  useSingleCompanyQuery,
} from "../redux/feature/company/companyApi";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import DeleteConfirmationDialog from "../components/base/DeleteConfirmationDialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ReviewInterface } from "../types/companyType";

const SingleCompany = () => {
  const [openModal, setOpenModal] = useState(false);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const { data: company, isLoading, error } = useSingleCompanyQuery(id);
  const {
    data: reviews,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetReviewsQuery(id);
  const [
    postReview,
    { isLoading: postLoading, isError: postError, isSuccess },
  ] = usePostReviewMutation();
  const { user } = useAppSelector((state) => state.user);

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
                onClick={() => setOpenModal(true)}
                className="bg-red-500 px-3 py-2 rounded-lg"
              >
                Delete Company
              </button>
            </div>
          )}
        </div>
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
        <p>No Reviews Found</p>
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
      />
    </>
  );
};

export default SingleCompany;
