import { ContactList } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.CONTACT_LIST.path,
      name: "Search",
      key: routesMap.CONTACT_LIST.path,
      commonRoute: false,
      private: true,
      withAuth: true,
      belongsToHeader: true,
      element: <ContactList />,
    },
  ];
}
