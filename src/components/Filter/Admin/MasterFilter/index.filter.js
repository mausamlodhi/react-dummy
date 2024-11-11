import React from "react";
import { withTranslation } from "react-i18next";
import { MasterFilterForm } from "../../../Form";

function MasterFilter({onSubmit,onReset,filterData,arrayOfData}) {
  return (
    <MasterFilterForm 
    arrayOfData={arrayOfData}
    onSubmit={onSubmit}
    filterData={filterData}
    onReset={onReset}
    />
  );
}

export default withTranslation()(MasterFilter);
