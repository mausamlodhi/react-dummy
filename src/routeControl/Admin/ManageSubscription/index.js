import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  MANAGE_SUBSCRIPTION: {
    path: `${baseRoutes.adminBaseRoutes}/manage-subscription`,
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-invest" />
      </span>
    ),
  }
};

export default accessRoute;
