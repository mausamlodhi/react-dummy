import React, { useState } from "react";
import { Link } from "react-router-dom";
// import ExportButton from "../../Button/Export/index.btn";
import {
  CsvExport,
  FilterButton,
  CreateButton,
  ActionButton,
} from "../../UiElement";

function ListingHeader({
  btnText,
  btnArray,
  onHandleShow,
  popover,
  extraBtnText,
  extraBtnClass,
  extraBtnIconClass,
  onExtraButtonHandleShow,
  icon,
  setVisible,
  visible,
  // csvData = [],
  // fileName = "",
}) {
  const [filterToggle, setFilterToggle] = useState(false);
  return (
    <>
      {/* <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between"> */}
      <div className="nk-block-head-content">
        <div className="toggle-wrap nk-block-tools-toggle">
          <Link
            to="#"
            className="btn btn-icon btn-trigger toggle-expand mr-n1"
            data-target="more-options"
            onClick={() => setFilterToggle(!filterToggle)}
          >
            <em className="icon ni ni-more-v" />
          </Link>
          <div
            className={`toggle-expand-content ${
              filterToggle ? "expanded" : ""
            }`}
            // className="toggle-expand-content"
            data-content="more-options"
          >
            <ul className="nk-block-tools g-3 ">
              {btnArray.includes("filter") && (
                <li>
                  <FilterButton
                    className="bg-black border-transparent"
                    popover={popover}
                    setVisible={setVisible}
                    visible={visible}
                  />
                </li>
              )}
              {btnArray.includes("csvExport") && (
                <li>
                  <CsvExport
                    // data={csvData}
                    // fileName={fileName}
                    extraClassName={`btn btn-white btn-outline-light `}
                  >
                    <em className="icon ni ni-download-cloud" />
                    <span> Export CSV </span>
                  </CsvExport>
                </li>
              )}
              {btnArray.includes("create") && (
                <li className="nk-block-tools-opt">
                  <CreateButton
                    icon={icon}
                    onHandleShow={onHandleShow}
                    btnText={btnText}
                  />
                </li>
              )}
              {btnArray.includes("extraButton") && (
                <li className="nk-block-tools-opt">
                  <ActionButton
                    extraBtnClass={extraBtnClass}
                    onHandleAction={onExtraButtonHandleShow}
                    btnText={extraBtnText}
                    icon={extraBtnIconClass}
                  />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
}

export default ListingHeader;
