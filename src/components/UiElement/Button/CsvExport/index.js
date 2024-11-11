import React from "react";
import { Link } from "react-router-dom";

export default function CsvExport() {
  return (
    <>
      <Link to="#" className="btn btn-white btn-outline-light">
        <em className="icon ni ni-download-cloud" />
        <span>Export CSV</span>
      </Link>
    </>
  );
}
