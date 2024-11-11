import React from "react";
import { Helmet } from "react-helmet-async";

export default function MetaTags({ title, description }) {
  return (
    <Helmet>
      <title>{title ?? ""} | Loopity</title>
      <meta name="description" content={description ?? ""} />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
