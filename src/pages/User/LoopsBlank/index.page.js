import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommonButton, ImageElement } from "../../../components";
import CreateLoop from "../Loops/StepForm/index.page";
import {
  logger,
  removeSessionStorage,
  setSessionStorage,
} from "../../../utils";
import { LoopService } from "../../../services";
import routesMap from "../../../routeControl/userRouteMap";

function LoopsBlank() {
  const [loopStepModal, setLoopStepModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loopData, setLoopData] = useState([]);
  const navigate = useNavigate();
  const [loopIdData, setLoopIdData] = useState({});

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

  useEffect(() => {
    if (loopData?.length > 0) {
      navigate(routesMap.LOOPS.path);
    } else {
      navigate(routesMap.LOOPS_BLANK.path);
    }
  }, [loopData]);

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

  const hideLoopStepModal = () => {
    setLoopStepModal(false);
    removeSessionStorage("step1Data");
    removeSessionStorage("step2Data");
    setTimeout(() => {
      setCurrent(0);
    }, 500);
  };
  return (
    <>
      <div className="chatPage">
        <aside className="chatAside">
          <div className="chatAsideHead d-flex align-items-center">
            <h3 className="chatAsideHead_heading mb-0">Loops</h3>
          </div>
          <div className="chatAside_list">
            <span className="noData font-bd h-100 d-flex align-items-center justify-content-center">
              No Loops!
            </span>
            {/* Your Loops */}
          </div>
          <div className="plusIcon plusIcon-md">
            <Link to="#" onClick={() => setLoopStepModal(true)}>
              <em className="icon-plus" />
            </Link>
          </div>
        </aside>
        <div className="chatRight">
          {/* chatBox */}
          <div className="chatBox d-flex align-items-center">
            <div className="newLoops text-center">
              <h2 className="font-bd">Welcome to the Loopity!</h2>
              <p className="mb-0"> Here are some things to get going...</p>
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
      />
    </>
  );
}

export default LoopsBlank;
