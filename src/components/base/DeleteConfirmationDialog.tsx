import React from "react";

interface DeleteConfirmationDialogProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDelete: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DeleteConfirmationDialog = ({
  openModal,
  setOpenModal,
  confirmDelete,
}: DeleteConfirmationDialogProps) => {
  const handleDelete = (e: any) => {
    if (confirmDelete) {
      confirmDelete(e);
      setOpenModal(false);
    }
  };

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
                onClick={(e) => {
                  handleDelete(e);
                }}
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
