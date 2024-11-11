import React, { useRef, useState, useEffect, useCallback } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";

import routesMap from "routeControl/userRouteMap";
import {
  CommonButton,
  DataTable,
  Popovers,
  SweetAlert,
  userNameImageFormatter,
} from "components";
import { ChatServices, ContactListServices } from "services";
import { logger, modalNotification } from "utils";
import useDebounce from "hooks/useDebounce";

function ContactList() {
  const navigate = useNavigate();
  const [contactList, setContactList] = useState([]);
  const [tableLoader, setTableLoader] = useState(false);
  const [noOfPage, setNoOfPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [contactId, setContatId] = useState(null);
  const inputValue = useRef(null);
  const debounce = useDebounce();
  const tableReset = () => {
    setContactList([]);
    setTotalCount(0);
    setNoOfPage(0);
  };
  const getContactList = async (data) => {
    setTableLoader(true);
    let queryParams = {
      search: data?.search,
    };
    const response = await ContactListServices.getContactList(queryParams);
    if (response?.success) {
      setContactList(response?.data?.rows);
    }
    setTableLoader(false);
  };
  const removeContact = async () => {
    const response = await ContactListServices.removeContact(contactId);
    if (response?.success) {
      getContactList();
      modalNotification({ type: "success", message: response?.message });
      tableReset();
    }
  };
  const handleSearch = useCallback(
    debounce((inputVal) => {
      tableReset();
      getContactList({ search: inputVal, isSearch: true });
    }, 1400),
    [],
  );

  const singleChat = async (id) => {
    try {
      let bodyData = {
        userId: id,
      };
      const response = await ChatServices.singleChatService(bodyData);
      if (response?.success) {
        localStorage.setItem("chatData", response?.data?.id);
        navigate(routesMap.CHAT.path);
      }
    } catch (error) {
      logger(error);
    }
  };

  const userActionFormatter = (type, row) => {
    return (
      <ul className="actionMenu list-unstyled m-0 d-flex align-items-center justify-content-end">
        {type === "icons" ? (
          <>
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
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  singleChat(row?.contactUserId);
                }}
              >
                <span className="icon-chat">
                  <em className="path1" />
                  <em className="path2" />
                </span>
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {type === "buttons" ? (
          <>
            <li>
              <CommonButton variant="light" extraClassName="btn-sm">
                {t("text.contactList.reject")}
              </CommonButton>
            </li>
            <li>
              <CommonButton
                variant="primary"
                extraClassName="btn-sm btn-accept"
              >
                {t("text.contactList.accept")}
              </CommonButton>
            </li>
          </>
        ) : (
          <></>
        )}
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
              <Link
                className="dropdown-item"
                onClick={() => {
                  setIsAlertVisible(true);
                  setContatId(row?.id);
                }}
                to="#"
              >
                <span className="icon-trash">
                  <em className="path1" />
                  <em className="path2" />
                </span>
                {t("text.contactList.remove")}
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    );
  };

  const userDropdownFormatter = (channel, channelName) => {
    const item = channelName?.map((items) => {
      return (
        <li>
          <Link
            className="dropdown-item"
            onClick={document.body.click()}
            to={items.path}
          >
            {items.name}
          </Link>
        </li>
      );
    });
    return (
      <Popovers
        placement="bottom"
        overlayClassName="channelInfo"
        title=""
        content={<ul className="list-unstyled m-0">{item}</ul>}
        trigger="hover"
      >
        <span className="cursor-pointer m-0">{channel}</span>
      </Popovers>
    );
  };

  const ownerscolumns = [
    {
      dataField: "name",
      text: `${t("text.common.name")}`,
      headerClasses: "sorting",
      formatter: (cell, row) =>
        userNameImageFormatter(
          row?.contactUser?.firstName,
          row?.contactUser?.profileImageUrl,
          row?.contactUser?.chatStatus?.status,
        ),
    },
    {
      dataField: "email",
      text: `${t("text.common.email")}`,
      headerClasses: "sorting",
      formatter: (cell, row) => row?.contactUser?.email,
    },
    {
      dataField: "phone",
      text: `${t("text.contactList.phone")}`,
      headerClasses: "sorting",
      formatter: (cell, row) => row?.contactUser?.phoneNumber,
    },
    {
      dataField: "channel",
      text: `${t("text.contactList.channel")}`,
      headerClasses: "sorting",
      formatter: (cell, row) =>
        userDropdownFormatter(row?.channel, row?.channelName),
    },
    {
      dataField: "action",
      text: `${t("text.common.action")}`,
      headerClasses: "text-end",
      formatter: (cell, row) => userActionFormatter("icons", row),
    },
  ];
  useEffect(() => {
    getContactList();
  }, []);

  return (
    <>
      <div className="pageWrap contactListPage">
        <Container fluid>
          <div className="pageHeader p-0">
            <div className="pageHeader_head d-flex flex-wrap align-items-center">
              <h3 className="pageHeader_head_title font-bd">
                {t("text.contactList.contactList")}
              </h3>
              <div className="w-100 d-flex align-items-center ms-auto">
                <div className="searchBox">
                  <div className="form-group mb-0">
                    <div className="form-control-wrap">
                      <input
                        ref={inputValue}
                        className="form-control bg-white"
                        placeholder="Search contacts by Name"
                        onChange={() => handleSearch(inputValue.current?.value)}
                        type="text"
                        icon={
                          <div className="form-icon">
                            <em className="icon-search" />
                          </div>
                        }
                      />
                      <div className="form-icon">
                        <em className="icon-search" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <CommonSubscription PlansButton variant="secondary" extraClassName="btn-md flex-shrink-0 ms-auto"><em className="icon-fill-add-user icon-left"><em className="path1" /> <em className="path2" /></em> <span>Add Contact</span></CommonButton> */}
              </div>
            </div>
          </div>
          <div className="userDataTable">
            <DataTable
              isCard={false}
              header={false}
              pagination={false}
              userTable
              hasLimit
              noOfPage={noOfPage}
              sizePerPage="10"
              page="1"
              count={totalCount}
              tableData={contactList}
              tableColumns={ownerscolumns}
              // param={param}
              // defaultSort={defaultSort}
              setSizePerPage=""
              tableLoader={tableLoader}
              // tableReset={tableReset}
              // getSearchValue={getSearchValue}
              // searchPlaceholder={t("text.search.ManageSubscription")}
            />
          </div>
        </Container>
      </div>
      <SweetAlert
        title={t("text.common.areYouSure")}
        text={t("text.contactList.youWantToDeleteThisContact")}
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        confirmButtonText={t("text.common.yes")}
        cancelButtonText={t("text.common.no")}
        setIsAlertVisible={setIsAlertVisible}
        onConfirmAlert={removeContact}
      />
    </>
  );
}

export default ContactList;
