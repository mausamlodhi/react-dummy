import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SocketContext } from "context/socket.context";
import {
  CommonButton,
  ImageElement,
  RippleEffect,
  logoCreater,
} from "../../../components";
import userRoutesMap from "../../../routeControl/userRouteMap";
import {
  checkValidCount,
  checkValidData,
  colorObj,
  logger,
  modalNotification,
  setSessionStorage,
} from "../../../utils";

import {
  CommonService,
  LoopRequestService,
  LoopService,
} from "../../../services";
import CreateLoop from "../Loops/StepForm/index.page";

function LoopsRequest() {
  const { socket } = useContext(SocketContext);
  const { t } = useTranslation();
  const [state, setState] = useState(false);
  const [loopIdData, setLoopIdData] = useState({});
  // const [state02, setState02] = useState(false);
  // const userData = useSelector(selectUserData);
  // const [nextAndSkip, setNextAndSkip] = useState(false);
  // const navigate = useNavigate();
  const [loopStepModal, setLoopStepModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [nexts, setNext] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const navigate = useNavigate();
  const hideLoopStepModal = () => {
    setLoopStepModal(false);
    setTimeout(() => {
      setCurrent(0);
    }, 500);
  };
  const [loopData, setLoopData] = useState([]);
  const [requestLoopData, setRequestLoopData] = useState([]);
  // const [state, setState] = useState([]);
  const [joinLoading, setJoinLoading] = useState(false);

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

  const getLoopRequest = async () => {
    try {
      let queryParams = {};
      const response = await LoopRequestService.getLoopRequest(queryParams);
      if (response?.success) {
        setRequestLoopData(response?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
  };
  const handleJoinChannelRequest = (roomId) => {
    socket?.emit?.("join_single_room", roomId);
  };

  const JoinRequest = async (id) => {
    setJoinLoading(true);
    try {
      const response = await LoopRequestService.joinLoopRequest(id);
      if (response?.success) {
        socket?.emit?.("join_single_room", response?.data?.roomId);
        modalNotification({
          type: "success",
          message: response?.message,
        });
        if (id) {
          handleJoinChannelRequest(id);
          setState([...state, id]);
        } else {
          setState(state);
        }
      }
    } catch (error) {
      logger(error);
    }
    setJoinLoading(false);
  };

  const getCountryList = async () => {
    try {
      const res = await CommonService.countryService();
      const { success, data } = res;
      if (success) {
        setCountryList(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getLoopRequest();
    getCountryList();
  }, []);

  return (
    <>
      <section className="authPage">
        <div className="authPage_form">
          <div className="authPage_form_form">
            <div className="authPage_form_logo">
              <ImageElement
                className="mx-auto d-block"
                source="logo-dark.svg"
                alt="loopity"
              />
            </div>
            <div className="d-flex flex-column authPage_form_field">
              <div className="loopRequest">
                <div className="authPage_form_head">
                  <h1 className="font-bd">{t("text.userAuth.loopCanJoin")}</h1>
                  <span>{t("text.userAuth.startJourneyText")} </span>
                </div>

                <div className="loopRequestJoin">
                  {requestLoopData?.length > 0 &&
                    requestLoopData?.map((item) => (
                      <div className="userBox userBox-recent d-flex align-items-center justify-content-between w-100">
                        <div className="d-flex align-items-sm-center w-100">
                          <div
                            className={`userAvatar userAvatar-lg ${
                              item?.loop?.name
                                ? colorObj?.[
                                    item?.loop?.name?.charAt(0).toLowerCase()
                                  ]
                                : ""
                            }`}
                          >
                            <span>{logoCreater(item?.loop?.name)}</span>
                          </div>
                          <div className="userBox_content d-flex align-items-center flex-wrap flex-sm-nowrap w-100">
                            <div className="mb-2 mb-sm-0 me-sm-4">
                              <h5 className="mb-0">
                                {checkValidData(item?.chatRoom?.roomName)}
                              </h5>
                              <p className="mb-0">
                                Loop -{" "}
                                <strong>
                                  {checkValidData(item?.loop?.name)}{" "}
                                </strong>{" "}
                                |{" "}
                                {checkValidCount(
                                  item?.chatRoom?.chatRoomMemberCount
                                )}{" "}
                                Participants
                                <br />
                                Created by{" "}
                                {checkValidData(item?.chatRoom?.user?.email)}
                              </p>
                            </div>
                            <CommonButton
                              onClick={(e) => {
                                e.preventDefault();
                                JoinRequest(item?.id);
                              }}
                              loading={joinLoading}
                              disabled={
                                state?.length > 0 &&
                                state?.find((el) => el === item?.id && true)
                              }
                              className="btn btn-md btn-primary font-sb"
                            >
                              {state?.length > 0 && state?.includes(item?.id)
                                ? t("text.common.joined")
                                : t("text.common.join")}
                            </CommonButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="loopRequest_create d-sm-flex d-block flex-wrap align-items-center justify-content-between text-sm-start text-center">
                  <p className="mb-2 mb-sm-0">
                    Couldn&apos;t {t("text.userAuth.couldNotFind")}
                    <br className="d-none d-sm-block" />
                    {t("text.userAuth.areLookingFor")}
                  </p>
                  <RippleEffect>
                    <CommonButton
                      variant="info"
                      onClick={() => setLoopStepModal(true)}
                    >
                      {t("text.common.createNewLoop")}
                    </CommonButton>
                  </RippleEffect>
                </div>
                <div className="loopRequest_skip d-flex align-items-center">
                  <Link
                    to={userRoutesMap.LOOPS.path}
                    className="link-secondary font-sb"
                  >
                    {t("text.common.skip")}
                  </Link>
                  <Link
                    to={userRoutesMap.LOOPS.path}
                    className="btn btn-md btn-primary font-sb ms-auto"
                  >
                    <em className="icon-circle-next icon-left" />
                    {t("text.common.next")}
                  </Link>
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
          countryList={countryList}
          nav={() => navigate(userRoutesMap.LOOPS.path)}
        />
      </section>
    </>
  );
}

export default LoopsRequest;
