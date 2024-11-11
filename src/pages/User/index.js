import React from "react";

export const Home = React.lazy(() => import("./Home/index.page"));
export const Login = React.lazy(() => import("./Login/index.page"));
export const Signup = React.lazy(() => import("./Signup/index.page"));
export const Faq = React.lazy(() => import("./Faq/index.page"));

export const ManageCms = React.lazy(() => import("./ManageCms/index.page"));
export const LoopsJoin = React.lazy(() => import("./LoopsJoin/index.page"));
export const LoopsRequest = React.lazy(() =>
  import("./LoopsRequest/index.page")
);
export const Loops = React.lazy(() => import("./Loops/index.page"));
export const Activity = React.lazy(() => import("./Activity/index.page"));
export const Search = React.lazy(() => import("./Search/index.page"));
export const ManageParticipants = React.lazy(() =>
  import("./ManageParticipants/index.page")
);
export const ContactList = React.lazy(() => import("./ContactList/index.page"));
export const Chat = React.lazy(() => import("./Chat/index.page"));
export const Profile = React.lazy(() => import("./Profile/index.page"));
export const LoopsBlank = React.lazy(() => import("./LoopsBlank/index.page"));
export const Pricing = React.lazy(() => import("./Pricing/index.page"));
export const PaymentMode = React.lazy(() => import("./PaymentMode/index.page"));
export const PaymentSummary = React.lazy(() =>
  import("./PaymentSummary/index.page")
);
export const NewLoops = React.lazy(() => import("./NewLoops/index.page"));
export const VideoCall = React.lazy(() => import("./VideoCall/index.page"));
export const ActivityBlank = React.lazy(() =>
  import("./ActivityBlank/index.page")
);
export const ChatBlank = React.lazy(() => import("./ChatBlank/index.page"));
export const RaiseQuery = React.lazy(() => import("./RaiseQuery/index.page"));
