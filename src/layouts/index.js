import React from "react";

export { default as AppLayout } from "./App/index.layout";

// export const AppLayout = Lazy(()=>import("./Auth/index.layout"));
export const MainLayout = React.lazy(() => import("./Main/index.layout"));
export const AuthLayout = React.lazy(() => import("./Auth/index.layout"));
export const AdminLayout = React.lazy(() => import("./Admin/index.layout"));
export const AdminPublicLayout = React.lazy(() => import("./Admin/public.layout"));
export const AdminPrivateLayout = React.lazy(() => import("./Admin/private.layout"));

export const UserLayout = React.lazy(() => import("./User/index.layout"));
export const PublicLayout = React.lazy(() => import("./User/public.layout"));
export const PrivateLayout = React.lazy(() => import("./User/private.layout"));