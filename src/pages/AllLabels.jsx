import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "~/components/Layout";
import { getLabels } from "../../store/Label/Thunks";
import UpdateLabels from "~/components/UpdateLabels";
import SerialUpdateForm from "~/components/PrintShopView/SerialUpdateForm";

const AllLabels = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.Label.activeLabels);
  const [serialModal, setSerialModal] = useState({
    labelId: "",
    isOpen: false,
  });
  useEffect(() => {
    const activeCategory = router.query.categoryId;
    const activeSubCategoryId = router.query.subCategoryId;
    dispatch(getLabels({ activeCategory, activeSubCategoryId }));
  }, [router]);
  return (
    <Layout title={"Gena | Departments"}>
      <div>
        <UpdateLabels
          serialModal={serialModal}
          setSerialModal={setSerialModal}
        />
        {serialModal.isOpen && (
          <SerialUpdateForm
            serialModal={serialModal}
            setSerialModal={setSerialModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default AllLabels;
