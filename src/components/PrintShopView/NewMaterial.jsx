import React from "react";
import { Formik, Field, Form } from "formik";
import { createNewMaterial } from "../../../store/Material/Thunks";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import useGenaToast from "../toasts-modals/GenaToast";

const NewMaterial = ({
  modal,
  setModal,
  activeCategory,
  setActiveCategory,
  materialsArray,
  individualMatCard,
  fetchMaterials,
}) => {
  const dispatch = useDispatch();
  const {successToast, errorToast, contextHolder} = useGenaToast()
  
  return (
    <div className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}>
      {contextHolder}
      <div className="flex items-end">
        <div className="mr-auto">
          <h1 className="text-3xl font-medium font-genaPrimary">
            Create A New Material
          </h1>
        </div>
      </div>
      <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
      <div
        className={
          "flex gap-10 flex-col items-center overflow-auto h-[90rem] laptop:h-[44.5rem] pb-5"
        }
      >
        <div
          className={
            "laptop:w-3/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg"
          }
        >
          <Formik
            initialValues={{name: ""}}
            onSubmit={async (values, helpers) => {
              try {
                const token = sessionStorage.getItem("accessToken");
                const foundMatch = materialsArray.some(
                (v) => v.name.toLowerCase() == values.name.toLowerCase()
                );
                if (!foundMatch) {
                  await dispatch(createNewMaterial({ token, values }));
                  await fetchMaterials();
                  successToast(`${values.name} added to Gena!`);
                  helpers.resetForm();
                  return;
                }
              } catch (error) {
                console.log(error)
                errorToast("Error Occurred", error.message);
              }
              
            }}
          >
            {({ isSubmitting }) => (
              <Form id="newLabelForm">
                <div className="flex justify-around gap-8">
                  <div className="grow">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-lg font-medium text-gray-900"
                    >
                      New Material Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="materialName"
                      className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                        dark:focus:border-blue-500"
                      placeholder='e.g. "REG"'
                      required
                    />
                  </div>
                </div>
                <div className="w-full">
                  <button
                    className="bg-[#28aeeb] w-full transition-all ease-in-out hover:scale-[101%] mt-5 p-2 px-5 rounded-lg text-white"
                    type="submit"
                  >
                    submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-20">
            <div className="text-xl font-medium">Materials</div>
            <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
            <div>{individualMatCard}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMaterial;
