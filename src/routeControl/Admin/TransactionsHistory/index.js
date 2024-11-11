import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
    TRANSACTIONS_HISTORY: {
      path: `${baseRoutes.adminBaseRoutes}/transactions-history`,
      icon: (
        <span className="nk-menu-icon">
          <em className="icon ni ni-repeat" />
        </span>
      ),
    }
  };
  
  export default accessRoute;
  