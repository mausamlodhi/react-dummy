import { ManageParticipants } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.MANAGE_PARTICIPANTS.path,
      name: "Manage Participants",
      key: routesMap.MANAGE_PARTICIPANTS.path,
      // commonRoute: false,
      private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <ManageParticipants />,
    },
  ];
}
