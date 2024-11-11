import { PaymentMode, PaymentSummary, Pricing } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.PRICING.path,
      name: "Pricing",
      key: routesMap.PRICING.path,
      // commonRoute: false,
      // private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <Pricing />,
    },
    {
      path: routesMap.PAYMENT_SUMMARY.path,
      name: "Payment Summary",
      key: routesMap.PAYMENT_SUMMARY.path,
      // commonRoute: false,
      // private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <PaymentSummary />,
    },
    {
      path: routesMap.PAYMENT_MODE.path,
      name: "Payment Mode",
      key: routesMap.PAYMENT_MODE.path,
      // commonRoute: false,
      // private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <PaymentMode />,
    }
  ];
}
