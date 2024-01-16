import { configureStore } from "@reduxjs/toolkit";

import AccountReducer from "./Account/Slice";
import MaterialReducer from "./Material/Slice";
import CategoryReducer from "./Category/Slice";
import SubCategoryReducer from "./Sub-Category/Slice";
import LabelReducer from "./Label/Slice";
import OrderReducer from "./Orders/Slice";
import DepartmentReducer from "./Departments/Slice";
import PrintShopReducer from "./PrintShop/Slice";
import ExportReducer from "./Exporter/Slice";
import TicketReducer from "./Tickets/Slice";
export const store = configureStore({
  reducer: {
    Account: AccountReducer,
    Material: MaterialReducer,
    Category: CategoryReducer,
    SubCategory: SubCategoryReducer,
    Label: LabelReducer,
    Orders: OrderReducer,
    Department: DepartmentReducer,
    PrintShop: PrintShopReducer,
    Exporter: ExportReducer,
    Tickets: TicketReducer,
  },
});
