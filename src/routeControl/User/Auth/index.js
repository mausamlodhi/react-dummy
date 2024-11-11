import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  LANDING_PAGE: {
    path: `${baseRoutes.userBaseRoutes}`,
  },
  FAQ: {
    path: `${baseRoutes.userBaseRoutes}faq`,
  },
  PRIVACY_POLICY: {
    path: `${baseRoutes.userBaseRoutes}privacy-policy`,
  },
  Terms_And_Condition: {
    path: `${baseRoutes.userBaseRoutes}terms-and-condition`,
  },
  LOGIN: {
    path: `${baseRoutes.userBaseRoutes}login`,
  },
  SIGNUP: {
    path: `${baseRoutes.userBaseRoutes}signup`,
  },
  LOOPSJOIN: {
    path: `${baseRoutes.userBaseRoutes}loops-Join`,
  },
  LOOPSREQUEST: {
    path: `${baseRoutes.userBaseRoutes}loops-request`,
  },
  // HOME: {
  //   path: `${baseRoutes.userBaseRoutes}home`,
  // },
};

export default accessRoute;
