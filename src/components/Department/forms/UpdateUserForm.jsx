import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartments,
  getGroupLead,
  getLeads,
} from "../../../../store/Departments/Thunks";
import { deleteAccount, updateUser } from "../../../../store/Account/thunks";
import Swal from "sweetalert2";
import { formatImgString } from "../../../../func/resuableFunctions";
import useGenaToast from "../../toasts-modals/GenaToast";

const UpdateUserForm = ({ modalState, setModalState, activeUser }) => {
  // ! SCOPED VARIABLES */
  const dept = useSelector((state) => state.Department.departments);
  const leads = useSelector((state) => state.Department.leads);
  const groupLeads = useSelector((state) => state.Department.groupLeads);
  const dispatch = useDispatch();
  const { successToast, errorToast, contextHolder } = useGenaToast();
  const dataForSubmission = {
    firstName: activeUser.firstName,
    lastName: activeUser.lastName,
    userName: activeUser.userName,
    password: "",
    departmentId: activeUser.departmentId,
    email: activeUser.email,
    privileges: activeUser.privileges,
    groupLeadId: activeUser.groupLeadId,
    teamLeadId: activeUser.teamLeadId
  }
  
  // ! SCOPED FUNCTIONS */
  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getLeads());
    dispatch(getGroupLead());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ! RETURNING JSX */
  return (
    
      <div className=" w-full laptop:w-full laptop:h-[32rem] h-[88rem] rounded-lg p-5 flex flex-col">
        {contextHolder}
        <div className="flex mb-5">
          <img
            src={`${formatImgString(activeUser.firstName, activeUser.lastName, "jpg")}`}
            alt={`Employee image`}
            className="h-14 ms-3 rounded-lg"
          />
          <h1 className="font-medium text-xl mt-5 ms-3">
            {activeUser.firstName} {activeUser.lastName}
          </h1>
        </div>

        <Formik
          initialValues={dataForSubmission}
          onSubmit={async (values) => {
            const token = sessionStorage.getItem("accessToken");
            const id = activeUser._id;
            console.log(id)
            if (JSON.stringify(dataForSubmission) != JSON.stringify(values)) {
              dispatch(updateUser({ token, id, values }));
              successToast('User Updated!');
              return;
            }
            errorToast('No Data Changed!');
          }}
        >
          {({ isSubmitting }) => (
            <Form >
  
              <div
                className={`grid justify-items-center gap-8 laptoplg:grid-cols-3 grid-cols-2 max-h-[80rem]`}
              >
                <div className="grow w-full">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500`}
                    placeholder="First"
                    required
                  />
                </div>
                <div className="grow w-full">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required
                  />
                </div>
                <div className="grow w-full">
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="userName"
                    id="signupUserName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. JaneD"
                    required
                  />
                </div>
                <div className="grow w-full">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Set New Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="signupPassword"
                    placeholder="•••••••••"
                    className="bg-gray-50 border
                                     border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 
                                     p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500"
                  />
                </div>
                <div className="grow w-full">
                  <label
                    htmlFor="departmentId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Department <span className="text-red-500">*</span>
                  </label>
                  <Field
                    component="select"
                    name="departmentId"
                    id="departmentId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. Marketing"
                    required
                  >
                    <option value={activeUser.departmentId} selected>
                      {activeUser.department}
                    </option>
                    {dept
                      ? dept.map((d) => (
                          <option value={d._id} key={d._id}>
                            {d.name}
                          </option>
                        ))
                      : null}
                  </Field>
                </div>
                <div className="grow w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="e.g. johnd@inventive-group.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="grow w-full">
                  <label
                    htmlFor="teamLeadId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Team Lead
                  </label>
                  <Field
                    type="select"
                    name="teamLeadId"
                    id="teamLeadId"
                    component="select"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500"
                  >
                    <option value="" selected>
                      Select Team Lead
                    </option>

                    {leads
                      ? leads.map((l) => (
                          <option key={l._id} value={l._id}>
                            {l.firstName} {l.lastName}
                          </option>
                        ))
                      : null}
                  </Field>
                </div>
                <div className="grow w-full">
                  <label
                    htmlFor="groupLead"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Group Lead
                  </label>
                  <Field
                    type="select"
                    name="groupLeadId"
                    id="groupLeadId"
                    component="select"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                                    w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select Group Lead
                    </option>
                    {groupLeads
                      ? groupLeads.map((g) => (
                          <option key={g._id} value={g._id}>
                            {g.firstName} {g.lastName}
                          </option>
                        ))
                      : null}
                  </Field>
                </div>
                <div className="grow w-full">
                  <label
                    htmlFor="groupLead"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Privileges <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="privileges"
                    id="privileges"
                    component="select"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select Privileges
                    </option>
                    <option value="admin">Admin</option>
                    <option value="group-lead">Group Lead</option>
                    <option value="printshop">PrintShop</option>
                    <option value="team-lead">Team Lead</option>
                    <option value="team-member">Team Member</option>
                  </Field>
                </div>
              </div>
              <div className="text-center mt-8 latptop:mt-14">
              <button type="button" onClick={() => {
                setModalState(false)
              }} className="w-44 self-center text-white bg-red-500 hover:bg-red-600
              focus:ring-4 focus:outline-none focus:ring-primary-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center  transform transition-transform duration-300 hover:scale-y-110 me-2">
                Cancel
              </button>
                <button
                  className="w-44 self-center text-white bg-[#1baded] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transform transition-transform duration-300 hover:scale-y-110"
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

  );
};

export default UpdateUserForm;
