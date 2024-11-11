import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoopService } from "services";
import { logger, modalNotification } from "utils";

import { CommonButton, ModalComponent } from "components";

function PinChannel({
  setPinChannelModal,
  pinChannelModal,
  hidePinChannelModal,
  getLoopData,
  setChannelLoopId,
  channel,
  getPinChannels,
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const onHandlePin = async (channelId) => {
    setLoading(true);
    try {
      let bodyData = {
        channelId,
      };
      const res =
        channel?.channelPin?.id || channel?.pinned === true
          ? await LoopService.UnpinPinChannelService(channelId)
          : await LoopService.addPinChannelService(bodyData);
      if (res?.success) {
        modalNotification({
          type: "success",
          message: res?.message,
        });
        getLoopData();
        setChannelLoopId();
        hidePinChannelModal();
        getPinChannels();
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <ModalComponent
      backdrop
      show={pinChannelModal}
      onHandleCancel={hidePinChannelModal}
      size="md"
      title={
        channel?.channelPin?.id || channel?.pinned === true
          ? t("text.loops.unPin")
          : t("text.loops.pin")
      }
      extraClassName="pinModal"
    >
      <>
        {channel?.channelPin?.id || channel?.pinned === true ? (
          <p className="mb-0">{t("text.loops.unPinChannel")}</p>
        ) : (
          <p className="mb-0">{t("text.loops.pinChannel")}</p>
        )}
        <div className="text-end modalFooter">
          <CommonButton
            onClick={() => setPinChannelModal(false)}
            variant="light"
          >
            {t("text.common.cancel")}
          </CommonButton>

          <CommonButton
            variant="primary"
            loading={loading}
            onClick={() => {
              onHandlePin(
                channel?.channelPin?.id ? channel?.channelPin?.id : channel?.id
              );
            }}
            className="ms-2 ms-md-3"
          >
            {channel?.channelPin?.id || channel?.pinned === true
              ? t("text.createLoop.unPin")
              : t("text.createLoop.pin")}
          </CommonButton>
        </div>
      </>
    </ModalComponent>
  );
}

export default PinChannel;
