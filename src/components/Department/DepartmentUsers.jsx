import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersInDepartment } from "../../../store/Departments/Thunks";
import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { Modal, Statistic } from "antd";
import UserList from "../Users/UserList";
import CountUp from 'react-countup';

const DepartmentUsers = () => {
  // ! SCOPED VARIABLES */
  const dispatch = useDispatch();
  const router = useRouter();
  const users = useSelector((state) => state.Department.users);
  const [deptName, setDeptName] = useState(null);
  const [open, setOpen] = useState(false);
  // ! SCOPED FUNCTIONS */
  const formatter = (value) => <CountUp end={value} separator="," />;
  useEffect(() => {
    const { departmentId } = router.query;
    const { name } = router.query;
    if (departmentId) {
      dispatch(getUsersInDepartment(departmentId));
      setDeptName(name);
    }
  }, [router.query, open]);

  // ! RETURNING JSX */
  return (
    <div>
      <div className="flex flex-col pl-20 pr-20 pt-20 pb-4">
        <div className={""}>
          <div className="flex items-end">
            <div className="mr-auto">
              <h1 className="text-3xl font-medium font-genaPrimary flex">
                {deptName} | Team <span className="flex">(<Statistic value={users.length} formatter={formatter}/>)</span>
              </h1>
            </div>
          </div>
          <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
        </div>
        <UserList open={open} setOpen={setOpen} users={users} />
      </div>
    </div>
  );
};

export default DepartmentUsers;
