import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  USER_MANAGEMENT: {
    path: `${baseRoutes.adminBaseRoutes}/user-management`,
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-users" />
      </span>
    ),
  },
  USER_DETAILS: {
    path: `${baseRoutes.adminBaseRoutes}/user-details`,
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-users" />
      </span>
    ),
  },
};

export default accessRoute;
