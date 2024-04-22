import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "~/components/Layout";
import NewCategory from "~/components/PrintShopView/NewCategory";
import { getCategories } from "../../store/Category/Thunk";
const NewCategoryPage = () => {
  const dispatch = useDispatch();
  const cats = useSelector((state) => state.Category.categories);
  const [triggerFetch, setTriggerFetch] = useState(false);
  useEffect(() => {
    dispatch(getCategories());
  }, [triggerFetch]);

  return (
      <Layout title={"Gena | New Category"}>
        <NewCategory
          triggerFetch={triggerFetch}
          setTriggerFetch={setTriggerFetch}
        />
      </Layout>
  );
};

export default NewCategoryPage;
