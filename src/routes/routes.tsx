import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Auth from "../pages/auth";
import NotFound from "../pages/NotFound";
import AllCompanies from "../pages/AllCompanies";

import PrivateRoute from "./PrivateRoute";
import AddNewCompany from "../pages/AddNewCompany";
import AddNewEmployee from "../pages/AddNewEmployee";
import SingleCompany from "../pages/SingleCompany";
import EditCompany from "../pages/EditCompany";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-companies",
        element: <AllCompanies />,
      },
      {
        path: "/add-new-company",
        element: (
          <PrivateRoute>
            <AddNewCompany />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-new-employee",
        element: (
          <PrivateRoute>
            <AddNewEmployee />
          </PrivateRoute>
        ),
      },
      {
        path: "/company/:id",
        element: <SingleCompany />,
      },
      {
        path: "/edit-company/:id",
        element: (
          <PrivateRoute>
            <EditCompany />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
