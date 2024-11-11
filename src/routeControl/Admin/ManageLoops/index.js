import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
    MANAGE_LOOPS: {
      path: `${baseRoutes.adminBaseRoutes}/manage-loops`,
      icon: (
        <span className="nk-menu-icon">
          <em className="icon ni ni-layers" />
        </span>
      ),
    },
    LOOPS_DETAILS: {
      path: `${baseRoutes.adminBaseRoutes}/loops-details`,
      icon: (
        <span className="nk-menu-icon">
          <em className="icon ni ni-layers" />
        </span>
      ),
    },
  };
  
export default accessRoute;
  

  