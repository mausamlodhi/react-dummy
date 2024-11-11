import React, { useEffect, useState } from "react";
import { AdminManageCms } from "../../../../../services/Admin/ManageCms/index.service";
import { logger, modalNotification } from "../../../../../utils";
import { AddEditFaqForm } from "../../../../../components";

function AddEditFAQs({ rowData, onHandleCancel, getFAQsData, tableReset }) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState();

  const getSingleFaqsData = async () => {
    try {
      const res = await AdminManageCms.getSingleFAQsService(rowData.id);
      const { success, data } = res;
      if (success) {
        setInitialData(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (rowData?.id) {
      getSingleFaqsData();
    }
  }, []);

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      let bodyData = {
        answer: value.answer,
        question: value.question,
      };
      const response = rowData?.id
        ? await AdminManageCms.updateFAQsService(bodyData, rowData.id)
        : await AdminManageCms.addFaq(bodyData);
      const { message, success } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        getFAQsData();
        tableReset();
        onHandleCancel();
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <AddEditFaqForm
        onSubmit={onSubmit}
        loading={loading}
        rowData={rowData}
        initialData={initialData}
        hideFaqEditModal={onHandleCancel}
      />
    </>
  );
}

export default AddEditFAQs;
