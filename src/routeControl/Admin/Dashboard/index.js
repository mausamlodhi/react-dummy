import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
    DASHBOARD: {
      path: `${baseRoutes.adminBaseRoutes}/dashboard`,
      icon: (
        <span className="nk-menu-icon">
          <em className="icon ni ni-grid-alt" />
        </span>
      ),
    },
  };
  
  export default accessRoute;
  