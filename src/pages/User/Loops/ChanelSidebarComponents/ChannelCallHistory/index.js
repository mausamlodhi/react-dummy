import React, { useState, useEffect, useCallback, useRef } from "react";
// import { Dropdown } from "react-bootstrap";
import { t } from "i18next";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import { CallHistoryServices } from "services";
import useDebounce from "hooks/useDebounce";
import { GlobalLoader, ImageElement, NoDataFound } from "../../../../../components";
import { actionFormatter, logger, totalTimeDifference } from "../../../../../utils";

export default function ChannelCallHistory({
  setRemoveCallHistory,
  myRef,
  setSidebarOpenKey,
  selectLoopRoom
}) {

  const perPageData = 15;
  const [offsetCount,setOffsetCount] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [callHistoryData, setCallHistoryData] = useState([]);
  const debounce = useDebounce();
  const inputValue = useRef(null);

  const getCallHistoryData = async (data) => {
    try {
      setCallHistoryData([]);
      setLoading(true);
      const queryParams = {
        limit : 15,
        callType: filter,
        search: data?.search
      }
      const response = await CallHistoryServices.getCallHistory(selectLoopRoom?.id, queryParams);
      if (response?.success) {
        setCallHistoryData(response?.data?.rows);
        setCount(response?.data?.count);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  }

  const getMoreCallHistoryData = async (data) => {
    setLoading(true);
    try {
      const queryParams = {
        limit : 15,
        offset : perPageData*offsetCount,
        callType: filter,
        search: data?.search
      }
      const response = await CallHistoryServices.getCallHistory(selectLoopRoom?.id, queryParams);
      if (response?.success) {
        setCallHistoryData([...callHistoryData,...response?.data?.rows]);
        setOffsetCount(offsetCount+1);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  }

  const handleSearch = useCallback(
    debounce((inputVal) => {
      getCallHistoryData({ search: inputVal });
    }, 1400),
    [],
  );

  const options = () => {
    let optionArray = [
      {
        name: t("text.loops.chat"),
        path: "#",
        action: "confirm",
        icon: "icon-chat",
        onClickHandle: () => {
          document.body.click();
        },
      },
      {
        name: t("text.loops.remove"),
        path: "#",
        action: "confirm",
        icon: "icon-trash",
        onClickHandle: () => {
          document.body.click();
          setRemoveCallHistory(true);
        },
      },
    ];
    return optionArray;
  };

  const callIcons = () => {
    let iconArray = [
      {
        name: t("text.loops.allCalls"),
        path: "#",
        action: "confirm",
        icon: "icon-call",
        onClickHandle: () => {
          setFilter("");
        },
      },
      {
        name: t("text.loops.missedCalls"),
        path: "#",
        action: "confirm",
        icon: "icon-missed-call",
        itemClassName: "missed",
        onClickHandle: () => {
          setFilter("missed");
        },
      },
      {
        name: t("text.loops.incomingCalls"),
        path: "#",
        action: "confirm",
        icon: "icon-incoming-call",
        onClickHandle: () => {
          setFilter("incoming");
        },
      },
      {
        name: t("text.loops.outgoingCalls"),
        path: "#",
        action: "confirm",
        icon: "icon-outgoing-call",
        onClickHandle: () => {
          setFilter("outgoing");
        },
      },
    ];
    return iconArray;
  };

  useEffect(() => {
    getCallHistoryData();
  }, [selectLoopRoom, filter])
  return (
    <div className="rightBarDetail vh-100" ref={myRef}>
      <div className="rightBarDetail_header align-items-center d-flex position-relative">
        <h4 className="w-100 font-bd">{t("text.loops.callHistory")}</h4>
        <Link
          to="#"
          onClick={() => setSidebarOpenKey("")}
          className="closeBar position-static flex-shrink-0"
        >
          <em className="icon icon-close" />
        </Link>
      </div>
      <div className="rightBarDetail_filter d-flex align-items-center">
        <div className="searchBox">
          <div className="form-group mb-0">
            <div className="form-control-wrap">
              <input
                ref={inputValue}
                className="form-control bg-white"
                placeholder="Search Call-history by Name"
                onChange={() => handleSearch(inputValue.current?.value)}
                type="text"
                icon={
                  <div className="form-icon">
                    <em className="icon-search" />
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <div className="filterIcon filterIcon-calls  flex-shrink-0"
        >
          {actionFormatter(
            callIcons(),
            "ellipseDrop d-inline-block",
            "icon-filter",
            "d-inline-flex align-items-center",
            "dropdown-menu-end",
            "dropdown-item",
            true,
          )}
        </div>
      </div>
      <div className="rightBarDetail_participants"
      id="moreCalls">
        {loading && callHistoryData?.length < perPageData ? <GlobalLoader /> :
          callHistoryData?.length ?
            <div className="participantsList">
              <InfiniteScroll
                dataLength={perPageData}
                hasMore={callHistoryData?.length < count}
                next={() => {
                 getMoreCallHistoryData();

                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "inherit",
                }}
                scrollableTarget="moreCalls"
                loader={loading && <Spin />}
              >
                {callHistoryData?.map((item, index) => (
                  <div
                    key={index}
                    className="participantsList_item d-flex align-items-center"
                  >
                    <div
                      key={index}
                      className="user d-flex align-items-center overflow-hidden"
                    >
                      <div className="user_image flex-shrink-0 position-relative">
                        <div className="userAvatar">
                          <ImageElement previewSource={item?.caller?.profileImageUrl} alt="user" />
                        </div>
                        <span className="statusdot statusdot-available" />
                      </div>
                      <div className="user_info overflow-hidden">
                        <h4 className="font-bd text-truncate">{`${item?.caller?.firstName} ${item?.caller?.lastName}`}</h4>
                        <p
                          className={
                            item?.callType === "missed"
                              ? "callStatus font-sb missed"
                              : "callStatus font-sb"
                          }
                        >
                          <em
                            className={
                              item?.callType === "incoming"
                                ? "icon-incoming-call"
                                : item?.callType === "missed"
                                  ? "icon-missed-call"
                                  : "icon-outgoing-call"
                            }
                          />
                          {item?.callType}
                        </p>
                      </div>
                    </div>
                    <div
                      key={index}
                      className="user_action user_action-history  ms-auto"
                    >
                      <p className="mb-0">
                        <span>{totalTimeDifference(
                          item?.createdAt,
                        )}</span>
                      </p>
                      <ul className="list-unstyled mb-0 d-flex align-items-center">
                        <li>
                          <Link to="#">
                            <span className="icon-video">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <span className="icon-phone" />
                          </Link>
                        </li>
                        <li>
                          {actionFormatter(
                            options(item),
                            "ellipseDrop d-inline-block",
                            "icon-ellipse",
                            "d-inline-flex align-items-center",
                            "dropdown-menu-end",
                            "dropdown-item",
                            true,
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </div> :
            <NoDataFound />
        }
      </div>
    </div>
  );
}
