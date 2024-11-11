import React, { useContext, useEffect, useState } from "react";
import {
  useSearchParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Spin } from "antd";
// import userRoutesMap from "../../../routeControl/userRouteMap";

import { useSelector } from "react-redux";
import { selectUserData } from "redux/AuthSlice/index.slice";
import { SearchService } from "services";
import useCloseClickOutside from "hooks/useCloseClickOutside";
import { SocketContext } from "context/socket.context";
import ImageElement from "../ImageElement";

const regexEscape = (str) => str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");

const boldify = (searchStr) => (targetStr) => {
  return targetStr
    .split(new RegExp(`(${regexEscape(searchStr)})`, "i"))
    .map((part, idx) =>
      idx % 2 ? (
        <span key={idx}>{part}</span>
      ) : (
        <React.Fragment key={idx}>{part}</React.Fragment>
      ),
    );
};

function ChatSearchBar(props) {
  const { searchOpen, setSearchOpen, handleSelect } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { socketStateHandler } = useContext(SocketContext);
  const [searchData, setSearchData] = useState(null);
  const [state, setState] = useState({
    showResults: false,
    searchValue: false,
    inputValue: "",
    isSearch: false,
    lists: [],
    isLoading: false,
  });
  const userData = useSelector(selectUserData);
  const { handleSetViewInChatGlobal } = socketStateHandler;

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key),
    }));
  };

  const searchRef = useCloseClickOutside(() =>
    handleStateChange("showResults", false),
  );

  const onClickHandel = () => handleStateChange("showResults", true);

  const onChangeHandel = (e) => {
    // setSearch(true);
    const inputValue = e.target.value;
    handleStateChange({
      inputValue,
      searchValue: !!inputValue,
    });
    setSearchParams({
      search: inputValue,
    });
  };

  const globalSearchValue = () => {
    setSearchParams();
    handleStateChange({
      inputValue: "",
    });
    searchParams.get("search");
  };

  const getlists = async () => {
    handleStateChange("isLoading", true);
    const queryParams = {
      search: state.inputValue,
    };
    const response = await SearchService.search(queryParams);
    setSearchData(response?.data);
    handleStateChange({
      isLoading: false,
      lists: response?.data ?? [],
    });
  };

  const handleNavigateToMsg = (details) => {
    const isLoop = details?.message?.loop;
    navigate(`/${isLoop ? "loops" : "chat"}`);
    handleSetViewInChatGlobal(details);
  };

  useEffect(() => {
    let getData;
    if (state.inputValue) {
      getData = setTimeout(() => {
        if (location.pathname === "/search") {
          document.getElementById("searchempty1")?.click();
          document.getElementById("search")?.click();
        } else getlists();
        handleStateChange("isSearch", !(!state.inputValue && state.isSearch));
      }, 1200);
    } else {
      handleStateChange({
        lists: [],
        isSearch: false,
      });
      if (location.pathname === "/search")
        document.getElementById("searchempty1")?.click();
    }
    return () => clearTimeout(getData);
  }, [state.inputValue]);

  return (
    <>
      <div
        className={`searchBox ${searchOpen ? "searchBox-open" : ""}`}
        ref={searchRef}
      >
        <div className="form-group mb-0">
          <div className="form-control-wrap">
            <div className="form-icon">
              <em className="icon-search" />
            </div>
            <input
              value={state.inputValue}
              onClick={onClickHandel}
              onChange={(e) => onChangeHandel(e)}
              className="form-control"
              placeholder="Search for people by name or email"
              type="text"
              icon={
                <div className="form-icon">
                  <em className="icon-search" />
                </div>
              }
            />
            <span
              className="form-group-search"
              onClick={() => setSearchOpen(false)}
            >
              <em className="icon-close" />
            </span>
          </div>
          {location.pathname === "/search" ? (
            <span
              id="searchempty1"
              className="viewAll"
              onClick={() =>
                navigate("/search", {
                  state: {
                    inputValue: state.inputValue,
                    data: searchData,
                  },
                })
              }
            />
          ) : state.searchValue  ? (
            <div
              className={`searchBox_list ${state.showResults ? "d-block" : ""}`}
              id="search-item-list"
            >
              {state.searchValue ? (
                <>
                  <span
                    id="search"
                    className="viewAll"
                    onClick={() =>
                      navigate("/search", {
                        state: {
                          inputValue: state.inputValue,
                          data: searchData,
                        },
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <em className="icon-search" />{" "}
                    <strong>{state.inputValue}</strong> press enter to view all
                    results
                  </span>
                  {state.isLoading ? (
                    <Spin className="d-flex justify-content-center pt-3 pb-3" />
                  ) : (!state.isLoading &&
                      state.lists?.peopleData?.rows?.length > 0) ||
                    state.lists?.filesData?.rows?.length > 0 ||
                    state.lists?.messageData?.rows?.length > 0 ? (
                    <div className="searchBoxBlk">
                      {state.lists?.peopleData?.rows?.length > 0 && (
                        <div className="searchList">
                          <h3
                            onClick={globalSearchValue}
                            className="title font-sb"
                          >
                            People
                          </h3>
                          <div className="searchList_inner">
                            {state.lists?.peopleData?.rows?.map(
                              (listItem, idx) => {
                                if (userData?.id !== listItem?.id)
                                  return (
                                    <Link
                                      to="#"
                                      key={idx}
                                      className="searchList_item d-flex align-items-center"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (handleSelect) {
                                          handleSelect(listItem);
                                        } else {
                                          handleNavigateToMsg({
                                            ...listItem,
                                            type: "single",
                                          });
                                        }
                                        handleStateChange("showResults", false);
                                      }}
                                    >
                                      <div className="userAvatar userAvatar-sm">
                                        <ImageElement
                                          source={listItem?.profileImageUrl}
                                          previewSource={
                                            listItem?.profileImageUrl
                                          }
                                          alt="user"
                                        />
                                      </div>
                                      <div className="itemInfo">
                                        {handleSelect ? (
                                          <p>
                                            {boldify(state.inputValue)(
                                              `${listItem?.email}`,
                                            )}
                                          </p>
                                        ) : (
                                          <p>
                                            {boldify(state.inputValue)(
                                              `${listItem?.firstName ?? ""} ${
                                                listItem?.lastName ?? ""
                                              }`,
                                            )}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  );
                              },
                            )}
                          </div>
                        </div>
                      )}
                      {state.lists?.filesData?.rows?.length > 0 && (
                        <div className="searchList searchList-files">
                          <h3 className="title font-sb">Files</h3>
                          {state.lists?.filesData?.rows?.map((fileItem, idx) => (
                            <div key={idx} className="searchList_inner">
                              <Link
                                className="searchList_item d-flex align-items-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavigateToMsg(fileItem);
                                  handleStateChange("showResults", false);
                                }}
                              >
                                <div className="userAvatar userAvatar-sm">
                                  <ImageElement
                                    previewSource={
                                      fileItem?.message?.messageMedia[0]
                                        ?.mediaImageUrl
                                    }
                                    alt="file"
                                  />
                                </div>
                                <div className="itemInfo">
                                  <p>
                                    {
                                      fileItem?.message?.messageMedia[0]
                                        ?.mediaName
                                    }
                                  </p>
                                  <p>
                                    Created by{" "}
                                    {`${fileItem?.message?.user?.firstName} ${fileItem?.message?.user?.lastName}`}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                      {state.lists?.messageData?.rows?.length > 0 && (
                        <div className="searchList searchList-files">
                          <h3 className="title font-sb">Messages</h3>
                          <div className="searchList_inner">
                            {state.lists?.messageData?.rows?.map(
                              (messageItem, idx) => (
                                <Link
                                  key={idx}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigateToMsg(messageItem);
                                    handleStateChange("showResults", false);
                                  }}
                                  className="searchList_item d-flex align-items-center"
                                >
                                  <div className="userAvatar userAvatar-sm">
                                    <ImageElement
                                      previewSource={
                                        messageItem?.message?.user
                                          ?.profileImageUrl
                                      }
                                      alt="file"
                                    />
                                  </div>
                                  <div className="itemInfo">
                                    <p>
                                      <spa>{`${messageItem?.message?.user?.firstName} ${messageItem?.message?.user?.lastName}`}</spa>
                                    </p>
                                    <p>
                                      <span>{`${messageItem?.message?.message}`}</span>
                                    </p>
                                  </div>
                                </Link>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : <></>}
                  <>
                  {(!state?.lists?.peopleData?.count && handleSelect ) && (
                    <p className="text-center font-weight-bold pt-2">
                      We couldn&apos;t find any results for &apos;
                      {state.inputValue}&apos;
                    </p>
                  )}
                  {((!state?.isLoading &&
                    state?.isSearch) &&
                    !handleSelect &&
                    (!state?.lists?.peopleData?.count && !state?.lists?.filesData?.count && !state?.lists?.messageData?.count) &&
                    <p className="text-center font-weight-bold pt-2">
                      We couldn&apos;t find any results for &apos;
                      {state.inputValue}&apos;
                    </p>)}
                  </>
                </>
              ) : (
                <span
                  id="searchempty"
                  className="viewAll"
                  onClick={() =>
                    navigate("/search", {
                      state: {
                        inputValue: state.inputValue,
                        data: searchData,
                      },
                    })
                  }
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ChatSearchBar;
