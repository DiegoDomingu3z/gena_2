import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DepartmentView from "~/components/Department/DepartmentView";
import Layout from "~/components/layouts/Layout";
import { getDepartments } from "../../store/Departments/Thunks";
import { api } from "../../axiosService";

const Departments = () => {
  const dispatch = useDispatch();
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);
  useEffect(() => {
    dispatch(getDepartments());
  }, [triggerUseEffect]);
  return (
    <Layout title={"Gena | Departments"}>
      <div>
        <DepartmentView
          triggerUseEffect={triggerUseEffect}
          setTriggerUseEffect={setTriggerUseEffect}
        />
      </div>
    </Layout>
  );
};

export default Departments;
