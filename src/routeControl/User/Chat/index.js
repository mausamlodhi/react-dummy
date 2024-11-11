import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  CHAT: {
    path: `${baseRoutes.userBaseRoutes}chat`,
  },
  CHAT_BLANK: {
    path: `${baseRoutes.userBaseRoutes}chat-blank`,
  },
};

export default accessRoute;
