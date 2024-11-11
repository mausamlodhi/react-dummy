/* eslint-disable import/no-unresolved */
import { Link } from "react-router-dom";
import { t } from "i18next";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { Form, Formik } from "formik";
import { LoopService } from "services";
import useDebounce from "hooks/useDebounce";
import {
  AntRangePicker as RangePicker,
  GlobalLoader,
  ImageElement,
  nameFormatter,
  NoDataFound,
} from "../../../../../components";
import {
  DownloadImage,
  dateFormatter,
  dayJsDateFormatter,
  getFileExtension,
  icons,
  logger,
  showDate,
} from "../../../../../utils";

export default function ChannelFiles({
  setDeleteFile,
  myRef,
  setSidebarOpenKey,
  selectLoopRoom,
}) {
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const lightGallery = useRef(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [range, setRange] = useState([]);
  const debounce = useDebounce(); 
  // const onHandleSearch = (e) => {
  //   const handler = setTimeout(() => {
  //     if ((e.length >= 3 || e.length === 0) && firstTimeFetch) {
  //       setSearch(e);
  //     }
  //   }, 700);
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // };



  const onInit = useCallback((detail) => {
    const button = document.createElement("button");
    button.textContent = "San";
    const isExist = document.getElementById("lg-delete");
    if (detail && !isExist) {
      const { instance } = detail;
      lightGallery.current = instance;
      const $btn =
        '<a href="#!" class="lg-icon" id="lg-delete"><span class="icon-forward"></span></a>';
      instance.outer.find(".lg-toolbar").append($btn);
      document.getElementById("lg-delete").addEventListener("click", () => {});
    }
  }, []);

  const getFiles = async (id, ranges,search) => {
    setLoading(true);
    try {
      let queryParams = { search, ...ranges };
      const res = await LoopService.roomFilesService(id, queryParams);
      if (res?.success) {
        setFileData(res?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  const onHandleSearch = useCallback(
    debounce((inputVal) => {
      getFiles(selectLoopRoom?.id, range,inputVal);
    }, 1400),
    []
  );

  useEffect(() => {
    if (selectLoopRoom?.id) {
      getFiles(selectLoopRoom?.id, range);
    }
  }, [selectLoopRoom, range]);

  return (
    <div className="rightBarDetail vh-100" ref={myRef}>
      <div className="rightBarDetail_header align-items-center d-flex position-relative">
        <h4 className="w-100 font-bd">{t("text.loops.files")}</h4>
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
                className="form-control"
                placeholder="Search"
                name="files"
                type="text"
                onChange={(e) => {
                  onHandleSearch(e.target.value);
                }}
                icon={
                  <div className="form-icon">
                    <em className="icon-search" />
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <div className="filterIcon position-relative flex-shrink-0">
          <Link to="#" onClick={() => setDatePickerOpen(true)}>
            <span className="icon-calendar">
              <em className="path1" />
              <em className="path2" />
            </span>{" "}
          </Link>

          {datePickerOpen && (
            <Formik initialValues={{ fromDate: undefined, toDate: undefined }}>
              {(props) => {
                setRange(props.values);
                return (
                  <Form>
                    <RangePicker
                      id="date"
                      onOpenChange={setDatePickerOpen}
                      onChange={(e) => {
                        props.setFieldValue(
                          "fromDate",
                          dayJsDateFormatter(e?.[0], "YYYY-MM-DD")
                        );
                        props.setFieldValue(
                          "toDate",
                          dayJsDateFormatter(e?.[1], "YYYY-MM-DD")
                        );
                      }}
                      hasEvent
                      allowClear
                      bordered={false}
                    />
                  </Form>
                );
              }}
            </Formik>
          )}
        </div>
      </div>
      <div className="rightBarDetail_participants">
        <div className="participantsList">
          {loading ? (
            <GlobalLoader />
          ) : fileData?.length > 0 ? (
            fileData.map((item) => {
              if (item?.messageMedia?.length > 0) {
                return item.messageMedia.map(
                  (msgMediaItem, msgMediaItemIdx) => (
                    <div
                      key={msgMediaItemIdx}
                      className="participantsList_item d-flex align-items-center"
                    >
                      <div className="user d-flex align-items-center overflow-hidden">
                        <div className="userAvatar flex-shrink-0">
                          {icons?.[
                            getFileExtension(msgMediaItem?.mediaName)
                          ] ? (
                            <ImageElement
                              source={`files-icons/${
                                icons?.[
                                  getFileExtension(msgMediaItem?.mediaName)
                                ]?.file
                              }`}
                              alt="upload-document"
                            />
                          ) : (
                            <ImageElement
                              previewSource={msgMediaItem?.mediaImageUrl}
                              alt="upload-document"
                            />
                          )}
                        </div>
                        <div className="user_info overflow-hidden">
                          <h4 className="font-sb text-truncate">
                            {msgMediaItem?.mediaName !== null &&
                              msgMediaItem?.mediaName.split("\\").pop()}
                          </h4>
                          <p className="sender">
                            {nameFormatter(
                              item?.user?.firstName,
                              item?.user?.lastName
                            )}
                            <span className="dots" />
                            {showDate(item?.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="user_action ms-auto">
                        <ul className="list-unstyled mb-0 d-flex align-items-center">
                          <li>
                            <Dropdown className="ellipseDrop d-inline-block">
                              <Dropdown.Toggle
                                as="a"
                                className="d-inline-flex align-items-center"
                                id="dropdown-basic"
                              >
                                <span className="icon-ellipse" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu-end">
                                {icons?.[
                                  getFileExtension(msgMediaItem?.mediaName)
                                ] ? (
                                  <a
                                    className="dropdown-item"
                                    onClick={document.body.click()}
                                    href={msgMediaItem?.mediaImageUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <span className="icon-details">
                                      <em className="path1" />
                                      <em className="path2" />
                                    </span>
                                    &nbsp;View Details
                                  </a>
                                ) : (
                                  <Link
                                    className="dropdown-item"
                                    onClick={document.body.click()}
                                    to="#"
                                  >
                                    <LightGallery
                                      onInit={onInit}
                                      speed={500}
                                      counter={false}
                                      addClass="chatImgView"
                                      mobileSettings="showCloseIcon: true, download: true"
                                      plugins={[lgZoom]}
                                    >
                                      <a
                                        href={item?.mediaImageUrl}
                                        data-sub-html={`<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src=${
                                          item?.mediaImageUrl
                                        } alt="profile"/></div>
                    <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">${
                      item?.user?.firstName.toUpperCase()
                        ? item?.user?.firstName.toUpperCase()
                        : "-"
                    } ${
                                          item?.user?.firstName &&
                                          item?.user?.lastName.toUpperCase()
                                        } <span>${dateFormatter(
                                          item?.createdAt,
                                          "DD-MM-YYYY HH:mm A"
                                        )}</span></h5><p class="text-truncate">${
                                          selectLoopRoom?.roomName
                                        }`}
                                      >
                                        <span className="icon-details">
                                          <em className="path1" />
                                          <em className="path2" />
                                        </span>
                                        &nbsp;View Details
                                      </a>
                                    </LightGallery>
                                  </Link>
                                )}

                                <DownloadImage
                                  extraClassName="dropdown-item"
                                  url={msgMediaItem?.mediaImageUrl}
                                  name={
                                    msgMediaItem?.mediaName !== null &&
                                    msgMediaItem?.mediaName.split("\\").pop()
                                  }
                                >
                                  <span className="icon-download">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>
                                  Download
                                </DownloadImage>
                                <Link
                                  className="dropdown-item"
                                  onClick={() => setDeleteFile(true)}
                                  to="#"
                                >
                                  <span className="icon-trash">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>
                                  Delete
                                </Link>
                              </Dropdown.Menu>
                            </Dropdown>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )
                );
              }
            })
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </div>
  );
}
