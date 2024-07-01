import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUpload } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { updateSerialLabel } from "../../../store/Label/Thunks";

const SerialUpdateForm = ({ serialModal, setSerialModal }) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.Account.account);
  const labels = useSelector((state) => state.Label.activeLabels);
  const [files, setFiles] = useState([new File([""], "blank.pdf", { type: "application/pdf" })]);
  const [labelName, setLabelName] = useState({
    fileName: "",
    bulkFileName: "",
  });
  const [activeLabel, setActiveLabel] = useState({
    fileName: "",
    bulkFileName: "",
    currentSerialNum: "",
    unitPack: "",
  });

  useEffect(() => {
    setFiles([new File([""], "blank.pdf", { type: "application/pdf" })]);
    const labelData = labels.find((label) => label._id === serialModal.labelId);
    const data = serialModal.isOpen
      ? {
          fileName: labelData?.fileName || "",
          bulkFileName: labelData?.bulkFileName || "",
          currentSerialNum: labelData?.currentSerialNum || "",
          unitPack: labelData?.unitPack || "",
        }
      : {
          fileName: "",
          bulkFileName: "",
          currentSerialNum: "",
          unitPack: "",
        };
    setActiveLabel(data);
  }, [serialModal]);

  const confirmUpdate = async (formData, pdfData) => {
    let token = account.accessToken;
    Swal.fire({
      title: `Make these updates to this label?`,
      text: "This will only update orders that haven't started processing.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Updated!", `Label has been updated`, "success");
        await dispatch(updateSerialLabel({ formData, pdfData, token }));
        setSerialModal((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleFileInputChange = (e) => {
    const fieldName = e.target.name;
    const newFile = e.target.files[0]
    if (fieldName === 'bulkFileName') {
      setFiles((prev) => {
        return [prev[0], newFile];
      });
    }
    if (fieldName === 'fileName') {
      setFiles((prev) => {
        return [newFile, prev[1]];
      });
    }

    setActiveLabel((prev) => {
      return {
        ...prev,
        [fieldName]: e.target.files[0].name,
      };
    });

    setLabelName((prev) => {
      return {
        ...prev,
        [fieldName]: e.target.files[0].name,
      };
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

  const pushFiles = () => {
    if (files.length > 0) {
      if (files.length === 1 && files[0].name === 'blank.pdf'){
        return null
      }
      return new Promise((resolve) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          formData.append("pdf", file);
        }
        resolve(formData);
      });
    }
    return null;
  };

  const handleSubmit = async (values) => {
    try {
      const sanitizedData = {
        id: values.id,
        fileName: values.fileName.name || activeLabel.fileName,
        bulkFileName: values.bulkFileName.name || activeLabel.bulkFileName,
        currentSerialNum:
          values.currentSerialNum || Number(activeLabel.currentSerialNum),
        unitPack: values.unitPack || Number(activeLabel.unitPack),
      };

      const pdfData = await pushFiles();

      await confirmUpdate(sanitizedData, pdfData);
    } catch (error) {
      console.log(
        "%cSerialUpdateForm.jsx line:52 error",
        "color: #26bfa5;",
        error
      );
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
          onSubmit={async (values) => {
            handleSubmit(values);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="mt-10">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Display Label
                </label>
                <label
                  htmlFor="fileName"
                  className="mb-3 mt-3 text-sm font-medium text-gray-900 block truncate"
                >
                  <span className="flex w-[180px] justify-center items-center bg-gray-300 hover:bg-gray-400 mb-2 px-4 py-2 rounded-sm cursor-pointer">
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                    Upload Label
                  </span>
                  <span className="mt-2 truncate">{labelName.fileName}</span>
                </label>
                <Field
                  type="file"
                  accept=".pdf"
                  name="fileName"
                  id="fileName"
                  onChange={handleFileInputChange}
                  className="absolute top-0 left-0 opacity-0 h-[1px] w-[1px]"
                ></Field>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Kanban Label
                </label>
                <label
                  htmlFor="bulkFileName"
                  className="mb-3 mt-3 text-sm font-medium text-gray-900 block truncate"
                >
                  <span className="flex w-[180px] justify-center items-center bg-gray-300 hover:bg-gray-400 mb-2 px-4 py-2 rounded-sm cursor-pointer">
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                    Upload Kanban Label
                  </span>
                  <span className="mt-2 truncate">
                    {labelName.bulkFileName}
                  </span>
                </label>
                <Field
                  type="file"
                  accept=".pdf"
                  name="bulkFileName"
                  id="bulkFileName"
                  onChange={handleFileInputChange}
                  className="absolute top-0 left-0 opacity-0 h-[1px] w-[1px]"
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
