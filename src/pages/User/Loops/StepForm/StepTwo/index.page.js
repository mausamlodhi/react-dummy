import React, { useState } from "react";
import { LoopStepTwoForm } from "../../../../../components";
import {
  getSessionStorage,
  logger,
  modalNotification,
  removeSessionStorage,
} from "../../../../../utils";
import { LoopService } from "../../../../../services";

function StepTwo({
  next,
  current,
  prev,
  countryList,
  getState,
  stateList,
  userData,
  setCurrent,
  getLoops,
  step2Data,
  setEditLoopModal,
  getLoopData,
  getLoop,
  nexts,
  stateListLoading,
}) {
  const id = userData?.id;
  const [loading, setLoading] = useState(false);
  const step1Data = getSessionStorage("step1Data");

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      let bodyData = { ...values };
      if (values.note === "") {
        delete bodyData.note;
      }
      bodyData.countryCode = `${values.countryCode}`;
      bodyData.altCountryCode = `${values.altCountryCode}`;
      delete values.countryCode;
      delete values.altCountryCode;
      const res = step2Data
        ? await LoopService.updateClientService(bodyData, Number(step2Data?.id))
        : await LoopService.addClientService(bodyData, Number(id));
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        if (next) {
          next();
          getLoopData();
          getLoop(id);
        } else if (setEditLoopModal) {
          getLoops(id);
          getLoopData();
          removeSessionStorage("step1Data");
          removeSessionStorage("step2Data");
          setEditLoopModal(false);
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <LoopStepTwoForm
      onSubmit={onSubmit}
      current={current}
      nex={next}
      prev={prev}
      countryList={countryList}
      getState={getState}
      stateList={stateList}
      loading={loading}
      setCurrent={setCurrent}
      loopIdData={step2Data || step1Data}
      nexts={nexts}
      stateListLoading={stateListLoading}
    />
  );
}

export default StepTwo;
