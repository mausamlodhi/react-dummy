import React from "react";
import { withTranslation } from "react-i18next";
import { SubscriptionFilterForm} from "../../../index";

function ManageSubscriptionFilter() {
  const submit = (formData)=>{
    console.log(formData);
  }
  const arrayOfData = [
    { id: "all", name: "All" },
    {
      id: "active",
      name: "Active",
    },
    {
      id: "inactive",
      name: "Inactive",
    },
  ];

  return (
    <SubscriptionFilterForm 
    arrayOfData={arrayOfData}
    submit={submit}
    />
  );
}

export default withTranslation()(ManageSubscriptionFilter);
