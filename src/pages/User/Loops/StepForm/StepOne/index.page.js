import React, { useEffect, useState } from "react";
import { LoopStepOneForm } from "../../../../../components";
import {
  logger,
  modalNotification,
  setSessionStorage,
} from "../../../../../utils";
import { AdminMasterServices, LoopService } from "../../../../../services";

function StepOne({
  next,
  userData,
  getLoopData,
  loopId,
  getLoop,
  loopLoading,
  setLoopId,
  setNext,
  setEditLoopModal,
  hideEditLoop,
}) {
  const [loading, setLoading] = useState(false);
  const id = userData?.id;
  const [claimType, setClaimType] = useState([]);
  const [claimLoad, setClaimLoad] = useState(false);

  const getClaimType = async () => {
    setClaimLoad(true);
    try {
      const res = await AdminMasterServices.getClaimType();
      if (res?.success) {
        setClaimType(res?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setClaimLoad(false);
  };

  useEffect(() => {
    getClaimType();
  }, []);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      let bodyData = { ...values };
      const res = id
        ? await LoopService.updateLoopService(bodyData, id)
        : await LoopService.addLoopService(bodyData);
      const { success, message, data } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        if (id) {
          hideEditLoop();
        }

        if (!id && !loopId && next) {
          setSessionStorage("step1Data", data);
        }
        if (next) {
          next();
          if (getLoop) {
            getLoop();
          }
        } else if (loopId) {
          getLoopData(loopId);
          getLoop(loopId);
          setEditLoopModal(false);
        } else {
          getLoopData();
          getLoop(userData?.id);
          setLoopId();
        }
        if (setNext && id === undefined) {
          setNext(true);
        } else {
          setNext(false);
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <LoopStepOneForm
        onSubmit={onSubmit}
        loading={loading}
        userData={userData}
        claimLoad={claimLoad}
        claimType={claimType}
        loopLoading={loopLoading}
      />
    </>
  );
}

export default StepOne;
