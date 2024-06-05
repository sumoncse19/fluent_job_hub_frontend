import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDeleteCompanyMutation } from "../../redux/feature/company/companyApi";

interface DeleteConfirmationDialogProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteConfirmationDialog = ({
  openModal,
  setOpenModal,
}: DeleteConfirmationDialogProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteCompany, { isLoading, isError, isSuccess }] =
    useDeleteCompanyMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Company deleted successfully");
      setOpenModal(false);
      navigate("/all-companies");
    }
  }, [isSuccess]);

  const handleDelete = () => {
    deleteCompany(id);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }
  if (isError) {
    console.log("err");
  }
  return (
    <>
      {openModal && (
        <div
          onClick={() => {
            setOpenModal(false);
          }}
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-700 ease-in-out ${
            openModal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" bg-[#F8F5FA] h-auto border-none rounded-[20px] py-4 px-6"
          >
            <p>Are you sure want to delete this company?</p>
            <div className="flex gap-4 my-4 float-right">
              <button
                onClick={() => setOpenModal(false)}
                className="border rounded-lg px-3 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmationDialog;
