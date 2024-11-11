import React from "react";
import { Link } from "react-router-dom";

function PageHeader({ children, heading, backButton = false, backPath = "#" }) {
  return (
    <>
      <div className="nk-block-head-content">
        { backButton && 
          <div className="nk-block-head-sub">
            <Link className="back-to" to={backPath}><em className="icon ni ni-arrow-left"/><span>Back</span></Link>
          </div>
        }
        <h3 className="nk-block-title page-title">{heading}</h3>
        <div className="nk-block-des">
          {children}
        </div>
      </div>
    </>
  );
}

export default PageHeader;
