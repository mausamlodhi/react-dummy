// import { useTranslation } from "react-i18next";
import { AdminLayout, UserLayout } from "../layouts";
import { userRoutes } from "./User";
// import { NotFound } from "../pages";
import { adminRoutes } from "./Admin";
import { NotFound } from "../pages";

export const routes = () => {
  // const { t } = useTranslation();
  return [
    {
      element: <AdminLayout />,
      children: [...adminRoutes()],
    },
    {
      element: <UserLayout />,
      children: [...userRoutes()],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
};

export const routesList = () => {
  // const { t } = useTranslation();
  let routeArr = [
    ...userRoutes()[0].children,
    ...userRoutes()[1].children,
    ...adminRoutes()[0].children,
    ...adminRoutes()[1].children,
  ];
  return [...routeArr];
};

export const moduleRoutesList = () => {
  // const { t } = useTranslation();
  let routeArr = {
    user: [...userRoutes()[0].children, ...userRoutes()[1].children],
    admin: [...adminRoutes()[0].children, ...adminRoutes()[1].children],
  };
  return routeArr;
};

export const getCompletePathList = () => {
  return routesList().reduce((prev, curr) => {
    prev.push(curr);
    if (curr.children) {
      prev.push(...curr.children);
    }
    return prev;
  }, []);
};
