import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  MANAGE_ROLES: {
    path: `${baseRoutes.adminBaseRoutes}/manage-roles`,
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-security" />
      </span>
    ),
  },
};

export default accessRoute;
