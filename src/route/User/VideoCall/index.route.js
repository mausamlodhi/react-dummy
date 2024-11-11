import AgoraCall from "components/Chat/agoraCall";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.VIDEO.path,
      name: "Video Call",
      key: routesMap.VIDEO.path,
      // commonRoute: false,
      private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <AgoraCall />,
    },
  ];
}
