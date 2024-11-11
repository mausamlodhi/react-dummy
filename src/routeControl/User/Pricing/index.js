import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  PRICING: {
    path: `${baseRoutes.userBaseRoutes}pricing`,
  },
  PAYMENT_SUMMARY: {
    path: `${baseRoutes.userBaseRoutes}payment-summary`,
  },
  PAYMENT_MODE: {
    path: `${baseRoutes.userBaseRoutes}payment-mode`,
  },
};

export default accessRoute;
