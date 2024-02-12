import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Login,
  ForgotPassword,
  Register,
  Error,
  Landing,
  EmailVerification,
  LinkVerification,
  RestaurantHome,
  AdminLogin,
  IndividualLogin,
  IndividualForgotPassword,
} from "./pages";

import {
  DashboardLayout,
  AddBasicDetails,
  AddCustomer,
  AddEmploymentDetails,
  BasicDetails,
  Customers,
  Dashboard,
  EmploymentDetails,
  Passbook,
  Settings,
  AddNewAccess,
  Support,
  SalesManagement,
  TotalSales,
  OnlineOrders,
  TakeAway,
  Dining,
  VendorManagement,
  Invoice,
  VendorSettings,
  AddInvoice,
  AddVendor,
  UpdateInvoice,
  UpdateVendor,
  UpdateCustomer,
  UpdateBasicDetails,
  UpdateEmploymentDetails,
  MenuManagement,
  Categories,
  Menu,
  AddNewMenuItem,
  UpdateMenuItem,
  OrderManagement,
  UpdateEmployeeAccess,
  AddTable,
  UpdateTable,
  PosManagement,
  TableDetails,
  CaptainPassbook,
  CaptainManagement,
} from "./pages/admindashboardpages";

import {
  PosCustomers,
  PosDashboard,
  PosDashboardLayout,
  PosSelectCustomer,
  PosUpdateCustomer,
  PosSupport,
  PosLeads,
  PosAddLead,
  PosUpdateLead,
  PosPassbook,
  // PosAddTodaysExpenses,
  PosUpdateTodaysExpenses,
  PosMenu,
  PosTakeAwayPage,
  PosDineInPage,
} from "./pages/posdashboardpages";
import {
  CaptainDashboardLayout,
  CaptainDashboard,
  CaptainCustomers,
  CaptainSelectCustomer,
  CaptainUpdateCustomer,
  CaptainSupport,
  CaptainLeads,
  CaptainAddLead,
  CaptainUpdateLead,
  CaptainMenu,
} from "./pages/captaindashboard";

// backend imports
import DashboardAccess from "./AcessManager/AccessAtDashboard";
import ReduxReset from "./AcessManager/ReduxReset";
import EmployAccess from "./AcessManager/EmployAccess";
import PosAccess from "./AcessManager/PosAccess";
import CaptainAccess from "./AcessManager/CaptainAccess";
import { Toaster } from "react-hot-toast";
import AddMenuCategory from "./pages/admindashboardpages/menumanagement/AddMenuCategory";
import UpdateMenuCategory from "./pages/admindashboardpages/menumanagement/UpdateMenuCategory";
import PosOnlineData from "./pages/posdashboardpages/posonline/PosOnlineData";
import PosAddTodaysOpeningBalance from "./pages/posdashboardpages/pospassbook/PosAddTodaysOpeningBalance";
import PosAddTodaysExpense from "./pages/posdashboardpages/pospassbook/PosAddTodaysExpense";
import PosAddTodaysClosing from "./pages/posdashboardpages/pospassbook/PosAddTodaysClosing";
import TodaysOpening from "./pages/posdashboardpages/pospassbook/TodaysOpening";
import TodaysExpense from "./pages/posdashboardpages/pospassbook/TodaysExpense";
import PosTodaysClosing from "./pages/posdashboardpages/pospassbook/PosTodaysClosing";
import StockManagement from "./pages/admindashboardpages/stockmanagement/StockManagemnet";
import StockIn from "./pages/admindashboardpages/stockmanagement/StockIn";
import StockOut from "./pages/admindashboardpages/stockmanagement/StockOut";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "link-verification/token/:token",
        element: <LinkVerification />,
      },
      {
        path: "email-verification",
        element: <EmailVerification />,
      },
      {
        path: "admin-login",
        element: (
          <>
            <ReduxReset />
            <AdminLogin />,
          </>
        ),
      },
      {
        path: "employee-login",
        element: (
          <>
            <EmployAccess />
            <IndividualLogin />,
          </>
        ),
      },
      {
        path: "individual-forgot-password",
        element: <IndividualForgotPassword />,
      },
      {
        path: "restaurant-home",
        element: (
          <>
            <ReduxReset />
            <RestaurantHome />,
          </>
        ),
      },
      {
        path: "dashboard",
        element: (
          <>
            <DashboardAccess />
            <DashboardLayout />
          </>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "pos-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <PosManagement />
              },
              {
                path: "pos-passbook",
                element: <Passbook />,
              },

            ],
          },
          {
            path: "sales-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <SalesManagement />,
              },
              {
                path: "total-sales",
                element: <TotalSales />,
              },
              {
                path: "online-orders",
                element: <OnlineOrders />,
              },
              {
                path: "take-away",
                element: <TakeAway />,
              },
              {
                path: "dining",
                element: <Dining />,
              },
            ],
          },
          {
            path: "vendor-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <VendorManagement />,
              },
              {
                path: "invoice",
                element: <Invoice />,
              },
              {
                path: "add-invoice",
                element: <AddInvoice />,
              },
              {
                path: "update-invoice",
                element: <UpdateInvoice />,
              },
              {
                path: "vendor-settings",
                element: <VendorSettings />,
              },
              {
                path: "add-vendor",
                element: <AddVendor />,
              },
              {
                path: "update-vendor",
                element: <UpdateVendor />,
              },
            ],
          },
          {
            path: "employee-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <BasicDetails />,
              },
              {
                path: "basic-details",
                element: <BasicDetails />,
              },
              {
                path: "add-basic-details",
                element: <AddBasicDetails />,
              },
              {
                path: "update-basic-details/:employId",
                element: <UpdateBasicDetails />,
              },
              {
                path: "employment-details",
                element: <EmploymentDetails />,
              },
              {
                path: "add-employment-details",
                element: <AddEmploymentDetails />,
              },
              {
                path: "update-employment-details/:employId",
                element: <UpdateEmploymentDetails />,
              },
            ],
          },
          {
            path: "customer-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Customers />,
              },
              {
                path: "add-customer",
                element: <AddCustomer />,
              },
              {
                path: "update-customer/:Id",
                element: <UpdateCustomer />,
              },
            ],
          },
          {
            path: "stock-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <StockManagement />,
              }, {
                path: "stock-in",
                element: <StockIn />,
              },
              {
                path: "stock-out",
                element: <StockOut />,
              },
            ],
          },
          {
            path: "menu-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <MenuManagement />,
              },
              {
                path: "menu",
                element: <Menu />,
              },
              {
                path: "add-new-menu-item",
                element: <AddNewMenuItem />,
              },
              {
                path: "update-menu-item/:menuId",
                element: <UpdateMenuItem />,
              },
              {
                path: "categories",
                element: <Categories />,
              },
              {
                path: "new-categories",
                element: <AddMenuCategory />,
              },
              {
                path: "update-category/:categoryId",
                element: <UpdateMenuCategory />,
              },
            ],
          },
          {
            path: "order-management",
            element: <OrderManagement />,
          },
          {
            path: "captain-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <CaptainManagement />,
              },
              {
                path: "table-details",
                element: <TableDetails />
              },
              {
                path: "add-table",
                element: <AddTable />,
              },
              {
                path: "update-table/:tableId",
                element: <UpdateTable />,
              },
              {
                path: "captain-passbook",
                element: <CaptainPassbook />
              },
            ],
          },
          {
            path: "settings",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Settings />,
              },
              {
                path: "add-new-access",
                element: <AddNewAccess />,
              },
              {
                path: "update-employee-access",
                element: <UpdateEmployeeAccess />,
              },
            ],
          },
          {
            path: "support",
            element: <Support />,
          },
        ],
      },
      {
        path: "pos-dashboard",
        element: (
          <>
            <PosAccess />
            <PosDashboardLayout />
          </>
        ),
        children: [
          {
            index: true,
            element: (
              <>
                <PosDashboard />,
              </>
            ),
          },

          {
            path: "pos-menu",
            element: <PosMenu />,
          },
          {
            path: "pos-takeaway",
            element: <PosTakeAwayPage />,
          },
          {
            path: "pos-online",
            element: <PosOnlineData />,
          },
          {
            path: "pos-dinein",
            element: <PosDineInPage />,
          },
          {
            path: "pos-leads",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <PosLeads />,
              },
              {
                path: "pos-add-lead",
                element: <PosAddLead />,
              },
              {
                path: "pos-update-lead/:leadId",
                element: <PosUpdateLead />,
              },
            ],
          },
          {
            path: "pos-customers",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <PosCustomers />,
              },
              {
                path: "select-customer",
                element: <PosSelectCustomer />,
              },
              {
                path: "update-customer",
                element: <PosUpdateCustomer />,
              },
            ],
          },
          {
            path: "pos-passbook",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <PosPassbook />,
              },
              {
                path: "todays-opening",
                element: <TodaysOpening />,
              },
              {
                path: "todays-closing",
                element: <PosTodaysClosing />,
              },
              {
                path: "todays-expense",
                element: <TodaysExpense />,
              },
              {
                path: "add-todays-expense",
                element: <PosAddTodaysExpense />,
              },
              {
                path: "add-todays-opening-balance",
                element: <PosAddTodaysOpeningBalance />,
              },
              {
                path: "add-todays-closing",
                element: <PosAddTodaysClosing />,
              },
              {
                path: "update-todays-closing",
                element: <PosUpdateTodaysExpenses />,
              },
            ],
          },
          {
            path: "support",
            element: <PosSupport />,
          },
        ],
      },
      {
        path: "captain-dashboard",
        element: (
          <>
            <CaptainAccess />
            <CaptainDashboardLayout />
          </>
        ),
        children: [
          {
            index: true,
            element: <CaptainDashboard />,
          },
          {
            path: "captain-menu",
            element: <CaptainMenu />,
          },
          {
            path: "captain-leads",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <CaptainLeads />,
              },
              {
                path: "captain-add-lead",
                element: <CaptainAddLead />,
              },
              {
                path: "captain-update-lead/:leadId",
                element: <CaptainUpdateLead />,
              },
            ],
          },
          {
            path: "captain-customers",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <CaptainCustomers />,
              },
              {
                path: "select-customer",
                element: <CaptainSelectCustomer />,
              },
              {
                path: "update-customer",
                element: <CaptainUpdateCustomer />,
              },
            ],
          },
          {
            path: "support",
            element: <CaptainSupport />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
