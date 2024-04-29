import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "~/components/layouts/Layout";
import { getDepartments } from "../../store/Departments/Thunks";
import { api } from "../../axiosService";
import DepartmentList from "~/components/Department/DepartmentList";

const Departments = () => {
  const dispatch = useDispatch();
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);
  useEffect(() => {
    dispatch(getDepartments());
  }, [triggerUseEffect]);
  return (
    <Layout title={"Gena | Departments"}>
      <div>
        <DepartmentList triggerUseEffect={triggerUseEffect}
          setTriggerUseEffect={setTriggerUseEffect}/>
      </div>
    </Layout>
  );
};

export default Departments;
