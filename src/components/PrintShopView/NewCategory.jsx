import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  removeCategory,
  updateCategory,
  updateJiraCategoryPoints,
} from "../../../store/Category/Thunk";
import { FaMinusCircle, FaPenSquare } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { RingLoader } from "react-spinners";
import { useState } from "react";
import { getDepartments } from "../../../store/Departments/Thunks";
import { useEffect } from "react";
import { faJira } from "@fortawesome/free-brands-svg-icons";
import { Tooltip } from "antd";
const NewCategory = ({ triggerFetch, setTriggerFetch }) => {
  const [newCatName, setNewCatName] = useState("");
  const [togglePopup, setTogglePopup] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const unsortedCats = useSelector((state) => state.Category.categories);
  const cats = unsortedCats.slice().sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.Account);

  const addCat = async (values) => {
    const token = await sessionStorage.getItem("accessToken");
    dispatch(addCategory({ values, token }));
  };

  const deleteCat = async (id, name) => {
    const token = await sessionStorage.getItem("accessToken");
    Swal.fire({
      title: `Remove ${name}?`,
      text: "All labels and sub-categories within this category will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let timerInterval;
        await Swal.fire({
          title: `Deleting ${name}`,
          html: "This may take some time <br> <b></b> Seconds left.",
          timer: 4000,
          timerProgressBar: true,
          allowOutsideClick: () => {
            const popup = Swal.getPopup();
            popup.classList.remove("swal2-show");
            setTimeout(() => {
              popup.classList.add("animate__animated", "animate__headShake");
            });
            setTimeout(() => {
              popup.classList.remove("animate__animated", "animate__headShake");
            }, 500);
            return false;
          },
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        dispatch(removeCategory({ id, token }));
      }
    });
  };

  const updateJiraPoints = async (name, id, jiraPoints) => {
    const token = sessionStorage.getItem("accessToken")
    const {value: newJiraPoints} = await Swal.fire({
      title: `Update jira points for ${name}?`,
      html: `<small>Category jira points take the least priority</small>`,
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      inputValidator: (value) => {
        if (!value) {
          return "If You are not changing the points, please press cancel";
        }
      },
      inputValue: jiraPoints,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
    })
    if (newJiraPoints) {
      let timerInterval;
      let seconds = (await Math.floor(Math.random() * 8)) + 1;
      const milliseconds = (await seconds) * 1000;
      await Swal.fire({
        title: `Updating Jira Points to ${newJiraPoints}</b>`,
        html: "<b></b>",
        timer: milliseconds,
        timerProgressBar: true,
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return false;
        },
        didOpen: () => {
          dispatch(updateJiraCategoryPoints({ token, id, newJiraPoints }));
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      setTriggerFetch(!triggerFetch);
    }
    
  }






  const updateCat = async (id, name) => {
    const token = sessionStorage.getItem("accessToken");
    const { value: newName } = await Swal.fire({
      title: `Update ${name}'s information?`,
      html: `This will update all necessary data`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      inputValue: name,
      inputValidator: (value) => {
        if (!value) {
          return "If You are not changing the name, please press cancel";
        }
      },
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
    });
    if (newName) {
      let timerInterval;
      let seconds = (await Math.floor(Math.random() * 8)) + 1;
      const milliseconds = (await seconds) * 1000;
      await Swal.fire({
        title: `Updating Category: <b>${name} </b> to <b>${newName}</b>`,
        html: "This may take a couple of seconds, system is changing multiple account information with new data <br> <b></b>",
        timer: milliseconds,
        timerProgressBar: true,
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return false;
        },
        didOpen: () => {
          dispatch(updateCategory({ token, id, newName }));
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      setTriggerFetch(!triggerFetch);
    }
  };

  const showSubCats = (id) => {
    const queryParams = {
      categoryId: id,
    };
    router.push({
      pathname: "/SubCategory",
      query: queryParams,
    });
  };
  const successToast = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
        container: "addToCartToast",
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: "success",
      title: "Category Added!",
    });
  };
  const failureToast = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      iconColor: "orange",
      customClass: {
        popup: "colored-toast",
        container: "addToCartToast",
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: "warning",
      title: "Category Already Exists!",
    });
  };

  const dataForSubmission = {
    name: "",
  };

  const DepartmentPopup = () => {
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
      async function fetchDepartments() {
        const departments = await dispatch(getDepartments());
        setDepartmentList(departments.payload);
      }
      fetchDepartments();
    }, []);

    return (
      <div className="fixed left-0 w-screen h-screen laptop:h-screen bg-slate-400 bg-opacity-80 z-40 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-[#f7f9fc] w-4/5 laptop:w-2/5 laptop:h-[44rem] h-[88rem] rounded-lg px-10 py-5 flex flex-col overflow-y-auto">
          <button
            className="text-2xl self-end hover:bg-[#233043] rounded-full h-8 w-8 hover:text-white transition-all ease-in-out"
            onClick={() => setTogglePopup(!togglePopup)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <Formik
            initialValues={{
              visibility: selectedDepartments,
              name: newCatName,
            }}
            onSubmit={async (values, helpers) => {
              const foundMatch = cats.some(
                (v) => v.name.toLowerCase() == values.name.toLowerCase()
              );
              if (!foundMatch) {
                addCat(values);
                setTogglePopup(!togglePopup);
                helpers.resetForm();
                successToast();
                return;
              }
              failureToast();
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="mt-10">
                <div>
                  <h2 className="text-lg font-semibold">
                    Select departments that should be able to access &apos;
                    <span className="text-orange-500">{newCatName}</span>&apos;
                  </h2>
                </div>
                <div className="flex flex-col gap-3 mt-10">
                  <label>
                    <Field
                      className="mr-5 border"
                      type="checkbox"
                      name="selectAll"
                      checked={
                        values.visibility.length === departmentList.length
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          const allDepartmentIds = departmentList.map(
                            (department) => department._id
                          );
                          setFieldValue("visibility", allDepartmentIds);
                        } else {
                          setFieldValue("visibility", []);
                        }
                      }}
                    />
                    <span className="font-bold">Select All</span>
                  </label>
                  {departmentList.map((department) => (
                    <div key={department._id}>
                      <label>
                        <Field
                          className="mr-5 border"
                          type="checkbox"
                          name="visibility"
                          value={department._id}
                        />
                        {department.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-10">
                  <button
                    type="submit"
                    className="text-white bg-[#1baded] transition-all ease-in-out hover:scale-[102%] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full"
                    disabled={isSubmitting}
                  >
                    submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  return (
    <>
      {togglePopup && <DepartmentPopup />}
      <div className="flex flex-col pl-20 pr-20 pt-20 pb-4">
        <div>
          <div className="flex items-end">
            <div className="mr-auto">
              <h1 className="text-3xl font-medium font-genaPrimary">
                Categories
              </h1>
            </div>
          </div>
          <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
        </div>
        <div
          className={
            "bg-white p-5 rounded-md shadow-md overflow-auto h-[90rem] laptop:h-[44rem]"
          }
        >
          <h1 className="text-xl font-medium mb-10">Categories</h1>
          {cats ? (
            cats.map((c) => (
              <div
                onClick={() => showSubCats(c._id)}
                className={
                  "w-full p-5 border-b hover:bg-gray-100 transition-all ease-in-out cursor-pointer flex justify-between"
                }
                key={c._id}
              >
                <span>{c.name}</span>
                <div className="flex gap-5">
                  {/* <Tooltip title={`
                  Edit Jira Points (${c.jiraPoints ? c.jiraPoints : 'N.A.'})`}>

                  <button className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                  onClick={(event) => {
                    event.stopPropagation()
                    updateJiraPoints(c.name, c._id, c?.jiraPoints)
                  }}>
                  <FontAwesomeIcon icon={faJira} color="#579DFF"/>
                  </button>
                  </Tooltip> */}
                  <Tooltip title="Edit Name">

                  <button
                    className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                    onClick={(event) => {
                      event.stopPropagation(); // Stop propagation here
                      updateCat(c._id, c.name);
                    }}
                    >
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                    </Tooltip>
                    <Tooltip title="Delete Category">

                  <button
                    className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                    onClick={(event) => {
                      event.stopPropagation(); // Stop propagation here
                      deleteCat(c._id, c.name);
                    }}
                    >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                    </Tooltip>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-80 ">
              <RingLoader color="#36d7b7" size={90} />
            </div>
          )}
        </div>
        <div
          className={
            user.accessToken && user.account.privileges == "admin"
              ? "flex flex-col mt-3 relative"
              : "hidden"
          }
        >
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={async (values, helpers) => {
              const foundMatch = cats.some(
                (v) => v.name.toLowerCase() == values.name.toLowerCase()
              );
              if (!foundMatch) {
                setNewCatName(values.name);
                setTogglePopup(!togglePopup);
                helpers.resetForm();
                return;
              }
              failureToast();
            }}
          >
            {({ isSubmitting }) => (
              <Form id="catForm">
                <div className="md:w-6/12 w-2/5 self-center justify-self-center flex">
                  <Field
                    name="name"
                    id="name"
                    type="text"
                    className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500"
                    placeholder="Category Name"
                    required
                  />
                  <button
                    className="bg-blue-300 px-5 ms-5 rounded-lg"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default NewCategory;
