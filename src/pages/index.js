// export * from "./Auth";
import React from "react";

export * from "./Admin";
export * from "./User";
export const NotFound = React.lazy(() => import("./NotFound"));
