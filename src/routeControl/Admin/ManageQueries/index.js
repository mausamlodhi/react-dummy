
import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  MANAGE_QUERIES: {
    path: `${baseRoutes.adminBaseRoutes}`,
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-emails" />
      </span>
    ),
  },
  PENDING_QUERIES: {
    path: `${baseRoutes.adminBaseRoutes}/pending-queries`,
  },
  REPLIED_QUERIES: {
    path: `${baseRoutes.adminBaseRoutes}/replied-queries`,
  }
};

export default accessRoute;
