import { useDispatch, useSelector } from "react-redux";
import { updateSerialLabel } from "../../../store/Label/Thunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import { useState } from "react";

const SerialUpdateForm = ({ serialModal, setSerialModal }) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.Account.account);
  const labels = useSelector((state) => state.Label.activeLabels);
  const [activeLabel, setActiveLabel] = useState({
    fileName: "",
    bulkFileName: "",
    currentSerialNum: "",
    unitPack: "",
  });

  useEffect(() => {
    setActiveLabel(() => {
      const labelData = labels.filter(
        (label) => label._id === serialModal.labelId
      );
      return {
        fileName: `${labelData[0].pdfPath}/${labelData[0].fileName}`,
        bulkFileName: `${labelData[0].pdfBulkPath}/${labelData[0].bulkFileName}`,
        currentSerialNum: labelData[0].currentSerialNum,
        unitPack: labelData[0].unitPack,
      };
    });
  }, [serialModal]);

  const updateSerialLabel = (formData) => {
    let token = account.accessToken;
    Swal.fire({
      title: `Make these updates to this label?`,
      text: "This will only update orders that haven't started processing.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Updated!", `Label has been updated`, "success");
        dispatch(updateSerialLabel({ formData, token }));
      }
    });
  };

  const handleInputChange = (e) => {
    setActiveLabel((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleFileChange = (fieldName, filePath) => {
    const match = filePath?.match(/\\([^\\]+)$/);

    if (match && match[1]) {
      return match[1];
    }
  };
  return (
    <div className="fixed left-0 top-0 w-screen h-screen laptop:h-screen bg-slate-400 bg-opacity-80 z-40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-[#f7f9fc] w-3/5 laptop:w-2/5 laptop:h-[44rem] h-[44rem] rounded-lg px-10 py-5 flex flex-col">
        <button
          onClick={() => setSerialModal({ labelId: "", isOpen: false })}
          className="text-2xl self-end hover:bg-[#233043] rounded-full h-8 w-8 hover:text-white transition-all ease-in-out"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h1 className="font-semibold text-lg">Update Label Information</h1>
        <Formik
          initialValues={{
            id: serialModal?.labelId,
            fileName: activeLabel.fileName,
            bulkFileName: activeLabel.bulkFileName,
            currentSerialNum: activeLabel.currentSerialNum,
            unitPack: activeLabel.unitPack,
          }}
          onSubmit={async (values, helpers) => {
            try {
              const token = sessionStorage.getItem("accessToken");
              const parsedFileName = await handleFileChange(
                "fileName",
                values.fileName
              );
              const parsedBulkFileName = await handleFileChange(
                "bulkFileName",
                values.bulkFileName
              );
              const sanitizedData = {
                id: values.id,
                fileName: parsedFileName,
                bulkFileName: parsedBulkFileName,
                currentSerialNum:
                  values.currentSerialNum ||
                  Number(activeLabel.currentSerialNum),
                unitPack: values.unitPack || Number(activeLabel.unitPack),
              };
              console.log(sanitizedData);
              await updateSerialLabel(sanitizedData);
              // helpers.resetForm();
            } catch (error) {
              console.log(
                "%cSerialUpdateForm.jsx line:52 error",
                "color: #26bfa5;",
                error
              );
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="mt-10">
                <label
                  htmlFor="fileName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Display Label
                </label>
                <Field
                  type="file"
                  name="fileName"
                  id="fileName"
                  className="bg-gray-50 border border-gray-300
              text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-5"
                ></Field>
                <label
                  htmlFor="bulkFileName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Kanban Label
                </label>
                <Field
                  type="file"
                  name="bulkFileName"
                  id="bulkFileName"
                  className="bg-gray-50 border border-gray-300
                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-5"
                ></Field>
                <label
                  htmlFor="currentSerialNum"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Serial number to start at
                </label>
                <Field
                  type="number"
                  name="currentSerialNum"
                  id="currentSerialNum"
                  value={activeLabel.currentSerialNum}
                  onChange={(e) => handleInputChange(e)}
                  className="bg-gray-50 border border-gray-300
                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-5"
                ></Field>
                <label
                  htmlFor="unitPack"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Number of labels to print
                </label>
                <Field
                  type="number"
                  name="unitPack"
                  id="unitPack"
                  value={activeLabel.unitPack}
                  onChange={(e) => handleInputChange(e)}
                  className="bg-gray-50 border border-gray-300
                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-5"
                ></Field>
                <button
                  className="bg-[#28aeeb] p-2 px-5 rounded-lg text-white w-full"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SerialUpdateForm;
