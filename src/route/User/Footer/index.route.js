import { Outlet } from "react-router-dom";

// import {
//   Home,

// } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.HOME.path,
      private: false,
      name: "",
      key: routesMap.HOME.path,
      belongsToFooter: true,
      commonRoute: true,
      element: <Outlet />,
      children: [
        {
          path: routesMap.HOME.path,
          name: "",
          key: routesMap.HOME.path,
          commonRoute: true,
          private: false,
          belongsToFooter: true,
          element: <></>,
        },
        {
          path: routesMap.HOME.path,
          name: "",
          key: routesMap.HOME.path,
          commonRoute: true,
          private: false,
          belongsToFooter: true,
          element: <></>,
        },
        {
          path: routesMap.HOME.path,
          name: "",
          key: routesMap.HOME.path,
          commonRoute: true,
          private: false,
          belongsToFooter: true,
          element: <></>,
        },
      ],
    },
    {
      path: routesMap.HOME.path,
      private: false,
      name: "",
      key: routesMap.HOME.path,
      belongsToFooter: true,
      commonRoute: true,
      element: <Outlet />,
      children: [
        {
          path: routesMap.HOME.path,
          name: "",
          key: routesMap.HOME.path,
          commonRoute: true,
          private: false,
          belongsToFooter: true,
          element: <></>,
        },
        {
          path: routesMap.HOME.path,
          name: "",
          key: routesMap.HOME.path,
          commonRoute: true,
          private: false,
          belongsToFooter: true,
          element: <></>,
        },
        {
          path: routesMap.HOME.path,
          name: "",
          key: routesMap.HOME.path,
          commonRoute: true,
          private: false,
          belongsToFooter: true,
          element: <></>,
        },
      ],
    },
  ];
}
