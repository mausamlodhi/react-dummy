import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  MASTER: {
    path: `${baseRoutes.adminBaseRoutes}`,
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-view-grid-sq" />
      </span>
    ),
  },
  CLAIM_TYPE: {
    path: `${baseRoutes.adminBaseRoutes}/claim-type`,
  },
  CATEGORY: {
    path: `${baseRoutes.adminBaseRoutes}/raise-query`,
  },
};

export default accessRoute;
