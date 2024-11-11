/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import { Nav, Spinner, Tab } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchService } from "services";
import { dateToFromNowDaily, logger, userChatStatusOptions } from "utils";
import GlobalLoader from "components/UiElement/GlobalLoader";
import { ImageElement } from "components";
import { SocketContext } from "context/socket.context";

function Search() {
  const perPageData = 10;
  const location = useLocation();
  const navigate = useNavigate();
  const { socketStateHandler } = useContext(SocketContext);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [count,setCount] = useState(0);
  const [infiniteState,setInfiniteState] = useState(true);
  const { getUserChatStatus, handleSetViewInChatGlobal } = socketStateHandler;
  const [state, setState] = useState({
    peopleData : [],
    peopleDataCount : 0,
    fileData : [],
    fileDataCount : 0,
    messageData : [],
    messageDataCount : 0
  });
  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key),
    }));
  };
  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };
  const inputValue = location?.state?.inputValue;
  const getList = async (status) => {
    try {
      if(!status)
        setLoading(true);
      const queryParams = {
        search: inputValue,
        type: activeTab === "all" ? "" : activeTab,
      };
      const response =
        inputValue?.length >= 0 && (await SearchService.search(queryParams));
      if (response?.success) {
        handleStateChange({
          peopleData: response?.data?.peopleData?.rows,
          peopleDataCount : response?.data?.peopleData?.count,
          fileDataCount : response?.data?.filesData?.count,
          messageDataCount : response?.data?.messageData?.count ,
          fileData : response?.data?.filesData?.rows,
          messageData : response?.data?.messageData?.rows
        })
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
    setInfiniteState(true);
  };

  const getMoreList = async () => {
    try {
      setInfiniteState(false)
      const queryParams = {
        search: inputValue,
        type: activeTab === "all" ? "" : activeTab,
        limit : perPageData,
        offset : perPageData*(count+1)
      };
      const response =
        inputValue?.length >= 0 && (await SearchService.search(queryParams));
      if (response?.success) {
        handleStateChange({
          peopleData: response?.data?.peopleData?.rows && [...state?.peopleData,...response?.data?.peopleData?.rows],
          fileData: response?.data?.fileData?.rows && [...state?.fileData,...response?.data?.filesData?.rows],
          messageData : response?.data?.messageData?.rows && [...state?.messageData,...response?.data?.messageData?.rows]
        })
      }
    } catch (error) {
      logger(error);
    }
    setCount(count+1);
    setInfiniteState(true);

  };

  const handleNavigateToMsg = (details) => {
    const isLoop = details?.message?.loop;
    navigate(`/${isLoop ? "loops" : "chat"}`);
    handleSetViewInChatGlobal(details);
  };

  useEffect(() => {
      
      getList();
  }, [activeTab, inputValue]);
  return (
    <>
      <div className="searchPage">
        <Tab.Container
          id="left-tabs-example"
          activeKey={activeTab}
          onSelect={handleTabSelect}
        >
          <div className="searchPage_tabs d-flex align-items-center">
            <h1 className="font-bd m-0">Search</h1>
            <Nav variant="tabs" className="border-0">
              <Nav.Item>
                <Nav.Link eventKey="all">All</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="people" id="people">People</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="message" id="messages">Messages</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="files" id="file">Files</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="searchPage_cnt"
           >
            {loading ? (
              <GlobalLoader />
            ) : (
              <Tab.Content>
                <Tab.Pane eventKey="all">
                  {state?.peopleData?.length > 0 && (
                    <div className="resultSec">
                      <h3 className="resultSec_title font-bd">People</h3>
                      {state?.peopleData?.length > 0 ? (
                        <div>
                          {state?.peopleData?.slice(0,5)?.map((item, idx) => (
                            <div key={idx} className="resultSec_list_item">
                              <div className="resultSec_list_item resultSec_list_item-people">
                                <Link
                                  className="d-inline-flex align-items-center"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigateToMsg({
                                      ...item,
                                      type: "people",
                                    });
                                  }}
                                >
                                  <div className="userImg position-relative">
                                    <div className="userAvatar">
                                      <ImageElement
                                        className="img-fluid"
                                        previewSource={item?.profileImageUrl}
                                        alt="profile"
                                      />
                                      <span
                                        className={`statusdot statusdot-${
                                          userChatStatusOptions[
                                            getUserChatStatus(item?.id)
                                          ]?.key
                                        }`}
                                      />
                                    </div>
                                  </div>
                                  <div className="userInfo">
                                    <h4 className="font-sb">{`${item?.firstName} ${item?.lastName}`}</h4>
                                    <p className="message mb-0">
                                      {item?.email}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          ))}
                          {state?.peopleDataCount>5 &&
                          <Link
                          className="link-primary"
                          eventKey="all"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("people");
                            getList()
                            document.body.click();
                          }}
                        >
                          More People
                        </Link>}
                        </div>
                      ) : (
                        <spna>No Records Found</spna>
                      )}
                    </div>
                  )}
                  {state?.messageDataCount > 0 && (
                    <div className="resultSec">
                      <h3 className="resultSec_title font-bd">Messages</h3>
                      {state?.messageData?.length > 0 ? (
                          <div className="resultSec_list">
                            {state?.messageData?.slice(0,5)?.map((item, idx) => (
                              <div key={idx} className="resultSec_list_item">
                                <Link
                                  className="d-inline-flex"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigateToMsg(item);
                                  }}
                                  to="#"
                                >
                                  <div className="userImg position-relative">
                                    <div className="userAvatar">
                                      <ImageElement
                                        className="img-fluid"
                                        previewSource={
                                          item?.message?.user?.profileImageUrl
                                        }
                                        alt="profile"
                                      />
                                    </div>
                                    <span
                                      className={`statusdot statusdot-${
                                        userChatStatusOptions[
                                          getUserChatStatus(
                                            item?.message?.fromId,
                                          )
                                        ]?.key
                                      }`}
                                    />
                                  </div>
                                  <div className="userInfo">
                                    <h4 className="font-sb">
                                      {`${item?.message?.user?.firstName} ${item?.message?.user?.lastName}`}{" "}
                                      <span>
                                        {dateToFromNowDaily(
                                          item?.message?.createdAt,
                                        )}
                                      </span>
                                    </h4>
                                    <p className="info">
                                      {item?.message?.message}
                                    </p>
                                    <p className="message mb-0">
                                      {item?.message?.message}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            ))}
                            {state?.messageDataCount>5 && 
                            <Link className="link-primary"
                              onClick={(e)=>{
                                e.preventDefault();
                                setActiveTab("message")
                                getList();
                              }}
                            >
                            More Messages
                          </Link>}
                          </div>
                      ) : (
                        <span>No Records Found</span>
                      )}
                    </div>
                  )}
                  {state?.fileDataCount > 0 && (
                    <div className="resultSec">
                      <h3 className="resultSec_title font-bd">Files</h3>
                      {state?.fileDataCount > 0 ? (
                        <div className="resultSec_list">
                          {state?.fileData?.slice(0,5)?.map((item, idx) => (
                            <div key={idx} className="resultSec_list_item">
                              {item?.message?.messageMedia?.map(
                                (media, index) => (
                                  <Link
                                    key={index}
                                    className="d-inline-flex mt-2"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNavigateToMsg(item);
                                    }}
                                  >
                                    <div className="userImg position-relative">
                                      <div className="userAvatar">
                                        <ImageElement
                                          className="img-fluid"
                                          previewSource={media?.mediaImageUrl}
                                          alt="files"
                                        />
                                      </div>
                                    </div>
                                    <div className="userInfo">
                                      <h4 className="font-sb">
                                        {media?.mediaName}
                                      </h4>
                                      <p className="info">
                                        {item?.message?.loop?.name} &gt;{" "}
                                        {item?.message?.chatRoom?.roomName}
                                      </p>
                                      <p className="info mb-0">
                                        Modified By{" "}
                                        <b>{`${item?.message?.user?.firstName} ${item?.message?.user?.lastName}`}</b>{" "}
                                        {dateToFromNowDaily(media?.createdAt)}
                                      </p>
                                    </div>
                                  </Link>
                                ),
                              )}
                            </div>
                          ))}
                          {state?.fileDataCount>5 &&
                          <Link
                          to="#"
                          className="link-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("files");
                            getList();
                          }}
                        >
                          More Files
                        </Link>}
                        </div>
                      ) : (
                        <span>No Records Found</span>
                      )}
                    </div>
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="people" id="peoples">
                  <div className="resultSec">
                    <h3 className="resultSec_title font-bd">Peoples</h3>
                    {state?.peopleDataCount > 0 ? (
                      <div className="resultSec_list">
                        <InfiniteScroll 
                          dataLength={perPageData*count}
                          hasMore={state?.peopleData?.length < state?.peopleDataCount && infiniteState}
                          next={()=>{
                            getMoreList();
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "inherit",
                          }}
                          scrollableTarget="peoples"
                          loader={<Spinner className="ms-5"/>}
                        >
                        {state?.peopleData?.map((item, idx) => (
                          <div key={idx} className="resultSec_list_item">
                            <Link
                              className="d-inline-flex align-items-center"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavigateToMsg({
                                  ...item,
                                  type: "people",
                                });
                              }}
                            >
                              <div className="userImg position-relative">
                                <div className="userAvatar">
                                  <ImageElement
                                    className="img-fluid"
                                    previewSource={item?.profileImageUrl}
                                    alt="profile"
                                  />
                                </div>
                                <span
                                  className={`statusdot statusdot-${
                                    userChatStatusOptions[
                                      getUserChatStatus(item?.id)
                                    ]?.key
                                  }`}
                                />
                              </div>
                              <div className="userInfo">
                                <h4 className="font-sb">{` ${item?.firstName} ${item?.lastName}`}</h4>
                                <p className="message mb-0">{item?.email}</p>
                              </div>
                            </Link>
                          </div>
                        ))}
                        </InfiniteScroll>
                      </div>
                    ) : (
                      <span>No Records Found</span>
                    )}
                    {/* <Link to="#" className="link-primary">More People</Link> */}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="message"
                  id="more_message"
                >
                  <div className="resultSec">
                    <h3 className="resultSec_title font-bd">Messages</h3>
                    {state?.messageData?.length > 0 ? (
                      <div className="resultSec_list">
                          <InfiniteScroll 
                          dataLength={perPageData*count}
                          hasMore={state?.messageData?.length < state?.messageDataCount && infiniteState}
                          next={()=>{
                            getMoreList();
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "inherit",
                          }}
                          scrollableTarget="more_message"
                          loader={<Spinner className="ms-5"/>}
                        >
                          {state?.messageData?.map((item, idx) => (
                          <div key={idx} className="resultSec_list_item">
                            <Link
                              className="d-inline-flex"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavigateToMsg(item);
                                document.body.click();
                              }}
                            >
                              <div className="userImg position-relative">
                                <div className="userAvatar">
                                  <ImageElement
                                    className="img-fluid"
                                    previewSource={
                                      item?.message?.user?.profileImageUrl
                                    }
                                    alt="profile"
                                  />
                                </div>
                                <span
                                  className={`statusdot statusdot-${
                                    userChatStatusOptions[
                                      getUserChatStatus(item?.message?.fromId)
                                    ]?.key
                                  }`}
                                />
                              </div>
                              <div className="userInfo">
                                <h4 className="font-sb">
                                  {`${item?.message?.user?.firstName} ${item?.message?.user?.lastName}`}{" "}
                                  <span>
                                    {dateToFromNowDaily(
                                      item?.message?.createdAt,
                                    )}
                                  </span>
                                </h4>
                                <p className="info">
                                  {item?.message?.loop?.name} &gt;{" "}
                                  {item?.message?.chatRoom?.roomName}
                                </p>
                                <p className="message mb-0">
                                  {item?.message?.message}
                                </p>
                              </div>
                            </Link>
                          </div>
                          
                        ))}
                        </InfiniteScroll>
                      </div>
                    ) : (
                      <span>No Records Found</span>
                    )}
                    {/* <Link to="#" className="link-primary">More Messages</Link> */}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="files" id="files">
                  <div className="resultSec">
                    <h3 className="resultSec_title font-bd">Files</h3>
                    {state?.fileDataCount > 0 ? (
                      <div className="resultSec_list">
                        <InfiniteScroll 
                          dataLength={perPageData*count}
                          hasMore={state?.fileData?.length < state?.fileDataCount && infiniteState}
                          next={()=>{
                            getMoreList();
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "inherit",
                          }}
                          scrollableTarget="files"
                          loader={<Spinner className="ms-5"/>}
                        >
                        {state?.fileData?.map((item, idx) => (
                          <div key={idx} className="resultSec_list_item">
                            {item?.message?.messageMedia?.map(
                              (media, index) => (
                                <div key={index}>
                                  <Link
                                    className="d-inline-flex mt-2"
                                    onClick={(e) => {
                                      handleNavigateToMsg(item);
                                      e.preventDefault();
                                      document.body.click();
                                    }}
                                  >
                                    <div className="userImg position-relative">
                                      <div className="userAvatar">
                                        <ImageElement
                                          className="img-fluid"
                                          previewSource={media?.mediaImageUrl}
                                          alt="files"
                                        />
                                      </div>
                                    </div>
                                    <div className="userInfo">
                                      <h4 className="font-sb">
                                        {media?.mediaName}
                                      </h4>
                                      <p className="info">
                                        {item?.message?.loop?.name} &gt;{" "}
                                        {item?.message?.chatRoom?.roomName}
                                      </p>
                                      <p className="info mb-0">
                                        Shared By{" "}
                                        <b>{`${item?.message?.user?.firstName} ${item?.message?.user?.lastName}`}</b>{" "}
                                        {dateToFromNowDaily(media?.createdAt)}
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              ),
                            )}
                          </div>
                        ))}
                        </InfiniteScroll>
                      </div>
                    ) : (
                      <span>No Recods Found</span>
                    )}
                    {/* <Link to="#" className="link-primary">More Files</Link> */}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            )}
          </div>
        </Tab.Container>
      </div>
    </>
  );
}

export default Search;
