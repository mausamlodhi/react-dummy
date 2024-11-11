import React, { useState, useEffect, useCallback, useRef } from "react";
import { t } from "i18next";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  actionFormatter,
  dateToFromNowDaily,
  logger,
  modalNotification,
  readMoreTextShow,
  totalTimeDifference,
} from "utils";
import useDebounce from "hooks/useDebounce";
import { ChannelNotesServices } from "../../../../../services";
import {
  CommonButton,
  GlobalLoader,
  ImageElement,
  ModalComponent,
  NoDataFound,
  NotesForm,
  RippleEffect,
  SweetAlert,
} from "../../../../../components";

const perPageData = 10;
export default function ChannelNotes({
  setSidebarOpenKey,
  selectLoopRoom,
  disableChat,
  userData,
  singleChat
}) {
  const [notesModal, setNotesModal] = useState(false);
  const [channelNotes, setChannelNotes] = useState([]);
  const [noteId, setNoteId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notesModalType, setNotesModalType] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [noteData, setNoteData] = useState({});
  const [editNoteData, setEdtiNoteData] = useState({});
  const [currentChannelPage, setCurrentChannelPage] = useState(1);
  const [channelNotesLength, setChannelNotesLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const debounce = useDebounce();
  const inputElem = useRef(null);
  const [readMessage, setReadMessage] = useState("");
  const [showReadMoreMessage, setShowReadMoreMessage] = useState(false);

  const showMoreMessage = (data) => {
    setShowReadMoreMessage(true);
    setReadMessage(data?.data);
  };

  const onCloseModalMessage = () => {
    setShowReadMoreMessage(false);
    setReadMessage("");
  };

  const hideNotesModal = () => {
    setNotesModal(false);
    setEdtiNoteData("");
  };
  const resetNotes = () => {
    setEdtiNoteData({});
  };
  const getChannelNotes = async (search, status) => {
    resetNotes();
    try {
      let queryParams = {
        search,
        sortType: "DESC",
      };
      setLoading(true);
      setChannelNotes([]);
      if (channelNotes?.length <= count) {
        const response = await ChannelNotesServices.getChannelNotes(
          selectLoopRoom?.id,
          queryParams
        );
        if (response?.success) {
          setChannelNotes(response?.data?.rows);
          if (!status) setCount(response?.data?.count);
          setChannelNotesLength(response?.data?.rows.length);
          setCurrentChannelPage(0);
        }
      }
      setLoading(false);
    } catch (error) {
      logger(error);
    }
  };
  const getMoreChannelNotes = async (search, newPage) => {
    try {
      let queryParams = {
        search,
        offset: newPage * perPageData,
        limit: perPageData,
      };
      setLoading(true);
      if (channelNotes?.length < count) {
        const response = await ChannelNotesServices.getChannelNotes(
          selectLoopRoom?.id,
          queryParams
        );
        if (response?.success) {
          setChannelNotes([...channelNotes, ...response?.data?.rows]);
          setCount(response?.data?.count);
          setChannelNotesLength(response?.data?.rows.length);
        }
        if (newPage) setCurrentChannelPage(newPage);
      }
      setLoading(false);
    } catch (error) {
      logger(error);
    }
  };
  const addChannelNote = async (formData) => {
    setLoading(false);
    setIsLoading(true);
    try {
      const bodyData = {
        heading: formData?.heading,
        description: formData?.description,
      };
      const response =
        notesModalType === "add"
          ? await ChannelNotesServices.addChannelNotes(
              selectLoopRoom?.id,
              bodyData
            )
          : await ChannelNotesServices.updateChannelNotes(
              selectLoopRoom?.id,
              editNoteData.id,
              bodyData
            );
      if (response?.success) {
        modalNotification({ type: "success", message: response?.message });
        setEdtiNoteData("");
        hideNotesModal(false);
        getChannelNotes();
      }
      setIsLoading(false);
    } catch (error) {
      logger(error);
    }
  };
  const deleteChannelNote = async () => {
    try {
      const response = await ChannelNotesServices.deleteChannelNotes(
        selectLoopRoom?.id,
        noteId
      );
      if (response?.success) {
        modalNotification({ type: "success", message: response?.message });
        getChannelNotes();
      }
    } catch (error) {
      logger(error);
    }
  };
  const handleSearch = useCallback(
    debounce((inputVal) => {
      getChannelNotes(inputVal, true);
    }, 1400),
    []
  );
  const showNotesModal = (type) => {
    setNotesModal(true);
    setNotesModalType(type);
  };
  const Options = (row) => {
    let optionArray = [
      {
        name: t("text.common.edit"),
        path: "#",
        action: "confirm",
        icon: "icon-fill-edit",
        onClickHandle: () => {
          setEdtiNoteData(row);
          showNotesModal("edit");
        },
      },
      {
        name: t("text.loops.viewDetails"),
        path: "#",
        action: "confirm",
        icon: "icon-details",
        onClickHandle: () => {
          setNoteData(row);
          showNotesModal("view");
        },
      },
      {
        name: t("text.common.delete"),
        path: "#",
        action: "confirm",
        icon: "icon-trash",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setNoteId(row?.id);
        },
      },
    ];
    return optionArray;
  };


  useEffect(() => {
    if (selectLoopRoom?.id) {
      getChannelNotes();
    }
  }, [selectLoopRoom]);
  return (
    <>
      <div className="rightBarDetail vh-100">
        <div className="rightBarDetail_header align-items-center d-flex position-relative">
          <h4 className="w-100 font-bd">{t("text.notes.notes")}</h4>
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
                  ref={inputElem}
                  onChange={() => handleSearch(inputElem.current?.value)}
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
        </div>
        <div className="rightBarDetail_notes" id="sidebarScrollableDiv">
          <InfiniteScroll
            dataLength={currentChannelPage * perPageData}
            hasMore={channelNotes?.length <= count}
            next={() =>
              channelNotesLength < count &&
              getMoreChannelNotes(undefined, currentChannelPage + 1)
            }
            scrollableTarget="sidebarScrollableDiv"
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "inherit",
            }}
          >
            {channelNotes?.map((item, idx) => (
              <div key={idx} className="box mb-2">
                <div className="box_detail d-flex align-items-center">
                  <div className="box_userList d-flex align-items-center overflow-hidden">
                    <div className="userAvatar userAvatar-sm flex-shrink-0">
                      <ImageElement
                        previewSource={item?.user?.profileImageUrl}
                        alt="user"
                        crossorigin="anonymous"
                      />
                    </div>
                    <div className="box_info overflow-hidden">
                      <h4 className="font-sb text-truncate mb-0">
                        {`${item?.user?.firstName} ${item?.user?.lastName}`}
                      </h4>
                    </div>
                  </div>
                  <div className="box_userAction ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <span className="time">
                          {totalTimeDifference(item?.updatedAt)}
                        </span>
                      </li>
                      <li>
                        {actionFormatter(
                          Options(item),
                          "ellipseDrop d-inline-block",
                          "icon-ellipse",
                          "d-inline-flex align-items-center",
                          "dropdown-menu-end",
                          "dropdown-item",
                          true
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box_desc">
                  <h4 className="font-bd text-truncate">{item?.heading}</h4>
                  <p className="font-sb mb-0">
                    {readMoreTextShow(
                      item?.description,
                      showMoreMessage,
                      "link-primary"
                    )}
                  </p>
                </div>
              </div>
            ))}
          </InfiniteScroll>
          {loading && <GlobalLoader />}
          {!loading && !channelNotes.length > 0 && <NoDataFound />}
        </div>
        {singleChat ?
          <div className="text-center pt-2">
            <RippleEffect>
              <CommonButton
                variant="info"
                onClick={() => showNotesModal("add")}
              >
                {t("text.notes.addNotes")}
              </CommonButton>
            </RippleEffect>
          </div>
        :(disableChat && !disableChat.includes(userData?.id)) && (
          <div className="text-center pt-2">
            <RippleEffect>
              <CommonButton
                variant="info"
                onClick={() => showNotesModal("add")}
              >
                {t("text.notes.addNotes")}
              </CommonButton>
            </RippleEffect>
          </div>
        )}
      </div>
      <ModalComponent
        backdrop
        show={notesModal}
        onHandleCancel={hideNotesModal}
        size="lg"
        title={
          notesModalType === "add" || notesModalType === "edit"
            ? "Note"
            : "View Note"
        }
        extraClassName="notesModal"
        titleClassName="m-0"
      >
        {notesModalType === "add" || notesModalType === "edit" ? (
          <>
            <NotesForm
              notesModalType={notesModalType}
              addChannelNote={addChannelNote}
              hideNotesModal={hideNotesModal}
              loading={isLoading}
              noteData={editNoteData}
            />
          </>
        ) : (
          <div className="notesModal_details">
            <div className="user d-flex align-items-center">
              <div className="userAvatar">
                <ImageElement
                  previewSource={noteData?.user?.profileImageUrl}
                  alt="user"
                />
              </div>
              <div className="user_info d-flex align-items-center flex-wrap">
                <h3 className="m-0 font-sb">{`${noteData?.user?.firstName}  ${noteData?.user?.lastName}`}</h3>{" "}
                <p className="m-0">
                  {dateToFromNowDaily(noteData?.user?.updatedAt)}
                </p>
              </div>
            </div>
            <h2 className="font-bd">{noteData?.heading}</h2>
            <p className="mb-0 font-sb">{noteData?.description}</p>
          </div>
        )}
      </ModalComponent>
      <SweetAlert
        title={t("text.common.areYouSure")}
        text={t("text.notes.youWantToDeleteThisNote")}
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        confirmButtonText={t("text.common.yes")}
        cancelButtonText={t("text.common.no")}
        setIsAlertVisible={setIsAlertVisible}
        onConfirmAlert={deleteChannelNote}
      />
      <ModalComponent
        show={showReadMoreMessage}
        onHandleCancel={onCloseModalMessage}
        title="Notes Description"
        // extraClassName="link-primary"
      >
        <div className="box">
          <p className="text-break font-sb mb-0">{readMessage}</p>
        </div>
      </ModalComponent>
    </>
  );
}
