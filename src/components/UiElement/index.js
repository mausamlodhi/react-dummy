import loadable from "@loadable/component";

export * from "./Button";
export const Breadcrumb = loadable(() => import("./Breadcrumb/index"));
export const AuthLogo = loadable(() => import("./AuthLogo/index"));
export const TabComponent = loadable(() => import("./Tabs/index"));
export const GlobalLoader = loadable(() => import("./GlobalLoader/index"));
export const FileUploader = loadable(() => import("./FileUploader/index"));
export const Charts = loadable(() => import("./Chart/index"));
export const ModalComponent = loadable(() => import("./Modal/Index"));
export const DataTable = loadable(() => import("./DataTable/index"));
export const Pagination = loadable(() => import("./Pagination/index"));
export const ActionDropdown = loadable(() => import("./ActionDropdown/index"));
export const SweetAlert = loadable(() => import("./SweetAlert/index"));
export const TextEditor = loadable(() => import("./TextEditor/index"));
export const ImageElement = loadable(() => import("./ImageElement/index"));
export const RippleEffect = loadable(() => import("./RippleEffect/index"));

export const UserHeader = loadable(() => import("./Header/index"));
export const UserFooter = loadable(() => import("./Footer/index"));
export const LoginHeader = loadable(() => import("./LoginHeader/index"));
export const ChatSearchBar = loadable(() => import("./ChatSearchBar/index"));
export const SearchMember = loadable(() => import("./SearchMember/index"));
export const LoginSidebar = loadable(() => import("./LoginSidebar/index"));
export const ChatSidebar = loadable(() => import("./ChatSidebar/index"));
export const AudioCall = loadable(() => import("./AudioCall/index"));
export const CreateLoop = loadable(() => import("./CreateLoop/index"));
export const ManageRoles = loadable(() => import("./ManageRoles/index"));
export const AcountSidebar = loadable(() => import("./AcountSidebar/index"));
export const AccordionComponent = loadable(() =>
  import("./AccordionComponent/index")
);
export const LinkComponent = loadable(() => import("./LinkComponent/index"));
export const NoDataFound = loadable(() => import("./NoDataFound/index"));
