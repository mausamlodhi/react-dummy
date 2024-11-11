import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoopStepThreeForm } from "../../../../../components";
import { LoopService } from "../../../../../services";
import {
  logger,
  modalNotification,
  removeSessionStorage,
} from "../../../../../utils";
import routesMap from "../../../../../routeControl/userRouteMap";

function StepThree({
  hideLoopStepModal,
  prev,
  userData,
  setEditLoopModal,
  step3Data,
  getLoops,
  loops,
  getLoopData,
  step2Data,
  loopStepModal,
  nexts,
  nav,
}) {
  const id = userData?.id;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loopStepModal && loopStepModal === false) {
      setLoading(false);
    }
  }, [loopStepModal]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      let bodyData = { ...values };
      if (values.additionalNote === "") {
        delete bodyData.additionalNote;
      }
      bodyData.countryCode = `${values.countryCode}`;
      bodyData.altCountryCode = `${values.altCountryCode}`;
      delete values.countryCode;
      delete values.altCountryCode;
      const res = step3Data
        ? await LoopService.updateInsuranceService(bodyData, Number(id))
        : await LoopService.addInsuranceService(bodyData, Number(id));
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        if (hideLoopStepModal) {
          hideLoopStepModal();
          removeSessionStorage("step1Data");
        }
        if (getLoops) {
          getLoops(id);
        }
        loops();
        getLoopData(id);
        setEditLoopModal(false);
        navigate(routesMap.LOOPS.path);
      }
      navigate(routesMap.LOOPS.path);
      if (nav) {
        nav();
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  return (
    <LoopStepThreeForm
      onSubmit={onSubmit}
      prev={prev}
      loading={loading}
      userData={step3Data}
      step2Data={step2Data}
      hideLoopStepModal={hideLoopStepModal}
      nexts={nexts}
      nav={nav}
    />
  );
}

export default StepThree;
