
import { Outlet } from "react-router-dom";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import { Category, ClaimType, } from "../../../pages";

export default function route() {
  return [
    {
      path: adminRouteMap.MASTER.path,
      private: true,
      name: "Master",
      key: adminRouteMap.MASTER.path,
      belongsToSidebar: true,
      icon: adminRouteMap.MASTER.icon,
      element: <Outlet />,
      children: [
        {
          path: adminRouteMap.CLAIM_TYPE.path,
          private: true,
          name: "Claim Type",
          key: adminRouteMap.CLAIM_TYPE.path,
          belongsToSidebar: true,
          element: <ClaimType />
        },
        {
          path: adminRouteMap.CATEGORY.path,
          private: true,
          name: "Category",
          key: adminRouteMap.CATEGORY.path,
          belongsToSidebar: true,
          element: <Category />
        },
      ],
    }
  ];
}
