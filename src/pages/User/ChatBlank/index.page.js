import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CommonButton, ImageElement } from "components";

import CreateLoop from "../Loops/StepForm/index.page";

function ChatBlank({ getLoops, getLoopData, loopIdData, Ptext }) {
  const { t } = useTranslation();
  const [loopStepModal, setLoopStepModal] = useState(false);

  const hideLoopStepModal = () => {
    setLoopStepModal(false);
  };
  const [current, setCurrent] = useState(0);
  const [nexts, setNext] = useState(false);

  return (
    <>
      <div className="chatBox d-flex align-items-center">
        <div className="newLoops text-center">
          <>
            <h2 className="font-bd">{t("text.chat.welcomeToTheLoopity")}</h2>
            <p className="mb-0">
              {" "}
              {Ptext || <> {t("text.chat.hereAreSomeThingsToGetGoing")}...</>}
            </p>
          </>
          <ImageElement
            className="img-fluid image"
            source="create-more-loops.svg"
            alt="image"
          />
          <CommonButton
            variant="primary"
            extraClassName="btn-md flex-shrink-0 btn-mw-180"
            onClick={() => {
              setLoopStepModal(true);
              setCurrent(0);
            }}
          >
           {t("text.chat.createLoop")}
          </CommonButton>
        </div>
      </div>
      <CreateLoop
        current={current}
        loopStepModal={loopStepModal}
        hideLoopStepModal={hideLoopStepModal}
        setCurrent={setCurrent}
        getLoops={getLoops}
        getLoopData={getLoopData}
        loopIdData={loopIdData}
        setNext={setNext}
        nexts={nexts}
      />
    </>
  );
}

export default ChatBlank;
