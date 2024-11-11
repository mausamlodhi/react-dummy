import authRoute from "./Auth/index.route";
import videoCallRoute from "./VideoCall/index.route";

export default function route(t) {
  return [
    ...authRoute(t),
    ...videoCallRoute(t)
  ];
}
