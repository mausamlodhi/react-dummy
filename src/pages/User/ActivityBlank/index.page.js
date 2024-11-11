import React, { useState, useEffect } from "react";
import { LoopService } from "services";
import { logger, setSessionStorage } from "utils";
import { CommonButton, CreateLoop, ImageElement } from "../../../components";

function ActivityBlank() {
  const [loopStepModal, setLoopStepModal] = useState(false);
  const hideLoopStepModal = () => {
    setLoopStepModal(false);
    setTimeout(() => {}, 500);
  };
  const [current, setCurrent] = useState(0);
  const [nexts, setNext] = useState(false);
  const [loopIdData, setLoopIdData] = useState({});
  const [loopData, setLoopData] = useState([]);

  const loopDatas = async (id) => {
    try {
      const res = await LoopService.getLoopInformationService(id);
      const { success, data } = res;
      if (success) {
        setLoopIdData(data);
        setSessionStorage("step2Data", data);
      }
    } catch (error) {
      logger(error);
    }
  };
  // const [state, setState] = useState([]);

  const getLoopData = async () => {
    try {
      let queryParams = { scope: "all" };
      const res = await LoopService.getLoopService(queryParams);
      const { data, success } = res;
      if (success) {
        setLoopData(data?.rows);
      }
    } catch (error) {
      logger(error);
    }
  };
  useEffect(() => {
    getLoopData();
  }, []);
  return (
    <>
      <div className="chatPage">
        <aside className="chatAside">
          <div className="chatAsideHead d-flex align-items-center">
            <h3 className="chatAsideHead_heading mb-0">Activity</h3>
          </div>
          <div className="chatAside_list">
            <span className="noData font-bd h-100 d-flex align-items-center justify-content-center">
              No Activities!
            </span>
            {/* Your Loops */}
          </div>
        </aside>
        <div className="chatRight">
          {/* chatBox */}
          <div className="chatBox d-flex align-items-center">
            <div className="newLoops text-center">
              <h2 className="font-bd">Welcome to the Loopity!</h2>
              <p className="mb-0">
                You will see @mentions, reactions and other notifications here.
              </p>
              <ImageElement
                className="img-fluid image"
                source="create-more-loops.svg"
                alt="image"
              />
              <div className="text-center">
                <CommonButton
                  variant="primary"
                  extraClassName="btn-md flex-shrink-0 btn-mw-180"
                  onClick={() => setLoopStepModal(true)}
                >
                  Create Loop
                </CommonButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateLoop
        current={current}
        loopStepModal={loopStepModal}
        hideLoopStepModal={hideLoopStepModal}
        setCurrent={setCurrent}
        setLoopData={setLoopData}
        getLoops={loopDatas}
        getLoopData={getLoopData}
        loopIdData={loopIdData}
        loopData={loopData}
        setNext={setNext}
        nexts={nexts}
      />
    </>
  );
}

export default ActivityBlank;
