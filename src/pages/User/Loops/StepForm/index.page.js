import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { CommonButton, ModalComponent, Input as TextInput } from "./";
import { Steps } from "antd";
import { useTranslation } from "react-i18next";
import { CommonService } from "services";
import { ModalComponent } from "../../../../components";
import StepOne from "./StepOne/index.page";
import StepTwo from "./StepTwo/index.page";
import StepThree from "./StepThree/index.page";
import {
  getSessionStorage,
  logger,
  removeSessionStorage,
} from "../../../../utils";

// import { CommonButton } from "../Button";

function CreateLoop({
  current,
  loopStepModal,
  hideLoopStepModal,
  setCurrent,
  countryList,
  states,
  getStates,
  getLoops,
  getLoopData,
  loopIdData,
  setNext,
  nexts,
  nav,
}) {
  const [stateList, setStateList] = useState([]);

  const getStateList = async (value) => {
    try {
      let queryParams = {
        countryId: Number(value),
      };

      const res = await CommonService.stateService(queryParams);
      const { success, data } = res;
      if (success) {
        setStateList(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (loopIdData?.countryId) {
      getStateList(loopIdData?.countryId);
    }
  }, [loopIdData]);

  useEffect(() => {
    if (loopStepModal === false) {
      removeSessionStorage("step1Data");
      removeSessionStorage("step2Data");
    }
  }, [loopStepModal]);

  const step1Data = getSessionStorage("step1Data");
  const step2Data = getSessionStorage("step2Data");
  // const { Dragger } = Upload;
  const { t } = useTranslation();
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    if (current === 1) {
      setCurrent(0);
    } else {
      setCurrent(current - 1);
    }
  };

  const formStep1 = (
    <>
      <div className="loopModal_form">
        <h3>{t("text.createLoop.loopInfo")}</h3>
        <StepOne
          next={next}
          userData={step1Data}
          getLoop={getLoopData}
          // getLoopData={getLoopData}
          setNext={setNext}
        />
      </div>
    </>
  );
  const formStep2 = (
    <>
      <div className="loopModal_form">
        <h3>{t("text.createLoop.clientInfo")} </h3>
        <StepTwo
          next={next}
          prev={prev}
          current={current}
          countryList={countryList}
          getState={getStates || getStateList}
          stateList={states || stateList}
          userData={step1Data}
          step2Data={step2Data}
          nexts={nexts}
          setCurrent={setCurrent}
          getLoop={getLoops}
          getLoopData={getLoopData}
          loopIdData={loopIdData}
        />
      </div>
    </>
  );
  const formStep3 = (
    <>
      <div className="loopModal_form">
        <h3>{t("text.createLoop.insuranceInfo")} </h3>
        <StepThree
          next={next}
          prev={prev}
          hideLoopStepModal={hideLoopStepModal}
          userData={step1Data || step2Data}
          getLoops={getLoops}
          step2Data={step2Data}
          nexts={nexts}
          nav={nav}
        />
      </div>
    </>
  );
  // const formStep4 = (
  //   <>
  //     <div className="loopModal_form">
  //       <h3>Company Information </h3>
  //       <form>
  //         <Row>
  //           <Col lg="6">
  //             <div className="form-group">
  //               <div className="form-label-group">
  //                 <label className="form-label" htmlFor="name">
  //                   Company Name
  //                 </label>
  //               </div>
  //               <div className="form-control-wrap">
  //                 <TextInput
  //                   id="name"
  //                   className="form-control form-control-lg"
  //                   name="name"
  //                   disabled={false}
  //                   variant="standard"
  //                   type="name"
  //                   placeholder="Company Name"
  //                   setFieldValue=""
  //                   icon=""
  //                 />
  //               </div>
  //             </div>
  //           </Col>
  //           <Col lg="6" />
  //           <Col lg="6">
  //             <div className="form-group">
  //               <div className="form-label-group">
  //                 <label className="form-label" htmlFor="name">
  //                   Upload Company Logo
  //                 </label>
  //               </div>
  //               <div className="form-control-wrap">
  //                 <Dragger>
  //                   <p className="ant-upload-drag-icon">
  //                     <em className="icon-file-download" />
  //                   </p>
  //                   <p className="ant-upload-text">
  //                     Drag and Drop or browse to choose file
  //                   </p>
  //                 </Dragger>
  //               </div>
  //             </div>
  //           </Col>
  //         </Row>
  //       </form>
  //     </div>
  //   </>
  // );
  const steps = [
    {
      title: "Loop Info",
      content: formStep1,
    },
    {
      title: "Client",
      content: formStep2,
    },
    {
      title: "Insurance",
      content: formStep3,
    },
    // {
    //   title: 'Company Info',
    //   content: formStep4,
    // },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <>
      <ModalComponent
        backdrop
        show={loopStepModal}
        onHandleCancel={hideLoopStepModal}
        size="lg"
        title={t("text.createLoop.createNewLoop")}
        subTitle={t("text.createLoop.createLoopToCommunicate")}
        extraClassName="loopModal"
      >
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>
      </ModalComponent>
    </>
  );
}

export default CreateLoop;
