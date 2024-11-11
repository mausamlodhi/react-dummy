import { Chat, ChatBlank } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.CHAT.path,
      name: "Chat",
      key: routesMap.CHAT.path,
      // commonRoute: false,
      private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <Chat />,
    },
    {
      path: routesMap.CHAT_BLANK.path,
      name: "ChatBlank",
      key: routesMap.CHAT_BLANK.path,
      // commonRoute: false,
      // private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <ChatBlank />,
    },
  ];
}
