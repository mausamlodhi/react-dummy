import React from "react";
// import { Link } from "react-router-dom";
// import { CommonButton, ModalComponent, Input as TextInput } from "./";
import { Steps } from "antd";
import { useTranslation } from "react-i18next";
import StepOne from "../../../pages/User/Loops/StepForm/StepOne/index.page";
import StepTwo from "../../../pages/User/Loops/StepForm/StepTwo/index.page";
import StepThree from "../../../pages/User/Loops/StepForm/StepThree/index.page";
import { ModalComponent } from "../..";

// import { CommonButton } from "../Button";

function CreateLoop({ current, loopStepModal, hideLoopStepModal, setCurrent }) {
  // const { Dragger } = Upload;
  const { t } = useTranslation();
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  // const JobData = [
  //   {
  //     id: "option",
  //     name: "Option",
  //   },
  //   {
  //     id: "option1",
  //     name: "Option 1",
  //   },
  //   {
  //     id: "option2",
  //     name: "Option 2",
  //   },
  // ];

  const formStep1 = (
    <>
      <div className="loopModal_form">
        <h3>{t("text.createLoop.loopInfo")}</h3>
        <StepOne next={next} />
      </div>
    </>
  );
  const formStep2 = (
    <>
      <div className="loopModal_form">
        <h3>{t("text.createLoop.clientInfo")} </h3>
        <StepTwo next={next} prev={prev} />
      </div>
    </>
  );
  const formStep3 = (
    <>
      <div className="loopModal_form">
        <h3>{t("text.createLoop.insuranceInfo")} </h3>
        <StepThree next={next} prev={prev} />
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
        {/* <div className="stepsBtn d-flex justify-content-between">
          <div>
            {current > 0 && (
              <CommonButton onClick={() => prev()} variant="light">
                Back
              </CommonButton>
            )}
          </div>
          <div>
            {current > 0 && current !== steps.length - 1 && (
              <Link
                onClick={() => next()}
                className="btnSkip me-3 me-lg-4 me-xxl-5"
              >
                Skip
              </Link>
            )}
            {current < steps.length - 1 && (
              <CommonButton
                type="primary"
                onClick={() => next()}
                variant="primary"
              >
                Next
              </CommonButton>
            )}
            {current === steps.length - 1 && (
              <CommonButton
                type="primary"
                onClick={() => hideLoopStepModal()}
                variant="primary"
              >
                Done
              </CommonButton>
            )}
          </div>
        </div> */}
      </ModalComponent>
    </>
  );
}

export default CreateLoop;
