import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/Category/Thunk";
import { Formik, Field } from "formik";
import { getAllSubCats } from "../../store/Sub-Category/Thunks";
import { getLabels, searchLabel } from "../../store/Label/Thunks";
import { getAccount } from "../../store/Account/thunks";
import { Input, Space } from "antd";
import Layout from "~/components/layouts/Layout";
import LabelCard from "~/components/Labels/LabelCard";
import CartCanvasDrawer from "~/components/cart/CartCanvasDrawer";
import useDebounce from "~/hooks/useDebounce";

const StartNewOrder = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const cats = useSelector((state) => state.Category.categories);
  const subCats = useSelector((state) => state.SubCategory.subCats);
  const basket = useSelector((state) => state.Orders.labelBasket);
  const [activeSubCats, setActiveSubCats] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(null);
  const [toggleCartCanvas, setToggleCartCanvas] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const account = useSelector((state) => state.Account.account);
  const [render, setRender] = useState(false);
  const debouncedField = useDebounce(searchInput, 600);

  const filterSubCats = (event) => {
    let id = event.target.value;
    let cat = cats.filter((c) => c._id == id);
    setActiveCategory(cat[0]._id);
    let filteredSubCats = subCats.filter((c) => c.categoryId == id);
    setActiveSubCats(filteredSubCats);
  };

  const handleSearch = (data) => {
    let token = account.departmentId;
    dispatch(searchLabel({ data, token }));
    setSearchInput(data);
  };

  useEffect(() => {
    handleSearch(debouncedField);
  }, [debouncedField]);

  const singleSubCat = (event) => {
    let id = event.target.value;
    setActiveSubCategoryId(id);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getCategories());
    dispatch(getAllSubCats());
    dispatch(getAccount(token));
  }, []);

  useEffect(() => {
    if (activeCategory && activeSubCategoryId) {
      dispatch(getLabels({ activeCategory, activeSubCategoryId }));
    }
  }, [activeCategory, activeSubCategoryId]);

  return (
    <Layout title={"Gena | New Order"}>
      <CartCanvasDrawer
        toggleCartCanvas={toggleCartCanvas}
        setToggleCartCanvas={setToggleCartCanvas}
        render={render}
      />
      <div className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}>
        <div className="flex items-end ">
          <div className="mr-auto">
            <h1 className="text-3xl font-medium">Labels</h1>
          </div>
        </div>
        <div className="mb-5 mt-5 border-t border-gray-300 rounded-full" />
        <div className="flex mb-5 justify-between items-start">
          <Formik
            initialValues={{
              categoryId: "",
              subCategoryId: "",
            }}
          >
            <div className="flex items-center gap-5 mb-20 laptop:mb-10">
              <Field
                onChange={filterSubCats}
                value={activeCategory ?? ""}
                type="text"
                component="select"
                name="categoryId"
                className="select w-52 max-w-xs select-bordered select-sm"
              >
                <option disabled value="">
                  Select Category
                </option>
                {cats
                  ? cats.map((c) => {
                      let departmentId = account.departmentId;
                      if (c.visibility.includes(departmentId)) {
                        return (
                          <option id={c._id} key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        );
                      }
                    })
                  : null}
              </Field>
              <Field
                onChange={singleSubCat}
                value={activeSubCategoryId ?? ""}
                type="text"
                component="select"
                name="subCategoryId"
                className="select w-52 max-w-xs select-bordered select-sm"
              >
                <option value="">Select Sub-Category</option>
                {activeSubCats
                  ? activeSubCats.map((a) => (
                      <option key={a._id} value={a._id} id={a._id}>
                        {a.name}
                      </option>
                    ))
                  : null}
              </Field>
              {(activeCategory || activeSubCats) && (
                <span
                  className="btn btn-sm bg-accent hover:bg-accent hover:bg-opacity-90"
                  onClick={() => {
                    setActiveCategory("");
                    setActiveSubCats("");
                    setActiveSubCategoryId("");
                  }}
                >
                  Clear
                </span>
              )}
            </div>
          </Formik>
          <div className="flex items-start justify-end gap-5 md:w-3/5 lg:w-2/5">
            <Search
              placeholder="type label name"
              allowClear
              onSearch={(e) => console.log(e)}
              style={{
                width: 200,
              }}
              onChange={(e) => setSearchInput(e.target.value)}
              id="labelSearch"
              name="labelSearch"
            />
            <div className="relative indicator">
              <button onClick={() => setToggleCartCanvas(!toggleCartCanvas)}>
                <span className="indicator-item badge badge-neutral">
                  {basket.length}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16"
                      stroke="#233043"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="">
          {(activeCategory || searchInput) && (
            <LabelCard
              setToggleCartCanvas={setToggleCartCanvas}
              toggleCartCanvas={toggleCartCanvas}
              setRender={setRender}
              render={render}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StartNewOrder;
