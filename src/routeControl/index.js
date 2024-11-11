import adminRoutes from "./Admin";
import userRoutes from "./User";

const moduleRoutesMap = {
  user: { ...userRoutes },
  admin: { ...adminRoutes },
};
export default moduleRoutesMap;
