import React, { useContext , useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { ActivityService } from "services";
import { logger } from "utils";
import { SocketContext } from "context/socket.context";

import ImageElement from "../ImageElement";
import userRoutesMap from "../../../routeControl/userRouteMap";

function LoginSidebar({ setMenuToggle, menuToggle }) {
  const location = useLocation();
  const { pathname } = location;
  const { socketState ,socketStateHandler } = useContext(SocketContext);
  const { handleActivityCount } = socketStateHandler;
  const { activityCount } = socketState;
  // const [loopsData, setLoopsData] = useState([]);
  // const [count , setCount] = useState(activityCount)

  const getActivityList = async () => {
    try {
      let queryParams = {
        status:  "unread"
      };
      const res = await ActivityService.getActivityService(queryParams);
      if (res?.success) {
        handleActivityCount({flag:0}, res?.data?.count)
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getActivityList();
  }, []);

  // const activityCount = useMemo(() => {
  //   if (loopsData?.length > 0) {
  //     let arr = [];
  //     loopsData?.forEach(
  //       (item) => item?.readStatus === "unread" && arr.push(item)
  //     );
  //     return arr?.length;
  //   }
  // }, [loopsData]);

  return (
    <>
      <div
        className={`menuSidebar vh-100 position-fixed ${
          menuToggle ? "menuSidebar-open" : ""
        }`}
      >
        <div className="menuSidebar_logo">
          <Link to="#">
            <ImageElement source="logo-icon.svg" alt="loopity" />
          </Link>
        </div>
        <div className="menuSidebar_menu">
          <ul className="list-unstyled">
            <li>
              <Link
                to={userRoutesMap.ACTIVITY.path}
                onClick={() => {
                  setMenuToggle(false);
                }}
                className={`${
                  pathname === userRoutesMap.ACTIVITY.path ||
                  pathname === userRoutesMap.ACTIVITY_BLANK.path
                    ? "active"
                    : ""
                }`}
              >
                <div className="iconBox">
                  <ImageElement
                    className="default"
                    source="sidebar-icons/icon_activity.svg"
                    alt="activity"
                  />
                  <ImageElement
                    className="active"
                    source="sidebar-icons/icon_activity_active.svg"
                    alt="activity"
                  />
                  {activityCount > 0 &&  <Badge bg="light">{activityCount}</Badge> }
                </div>
                Activity
              </Link>
            </li>
            <li>
              <Link
                to={userRoutesMap.LOOPS.path}
                onClick={() => setMenuToggle(false)}
                className={`${
                  pathname === userRoutesMap.LOOPS.path ||
                  pathname === userRoutesMap.LOOPS_BLANK.path ||
                  pathname === userRoutesMap.MANAGE_PARTICIPANTS.path
                    ? "active"
                    : ""
                }`}
              >
                <div className="iconBox">
                  <ImageElement
                    className="default"
                    source="sidebar-icons/icon_loops.svg"
                    alt="loops"
                  />
                  <ImageElement
                    className="active"
                    source="sidebar-icons/icon_loops_active.svg"
                    alt="loops"
                  />
                </div>
                Loops
              </Link>
            </li>
            <li>
              <Link
                to={userRoutesMap.CHAT.path}
                onClick={() => setMenuToggle(false)}
                className={`${
                  pathname === userRoutesMap.CHAT.path ||
                  pathname === userRoutesMap.CHAT_BLANK.path
                    ? "active"
                    : ""
                }`}
              >
                <div className="iconBox">
                  <ImageElement
                    className="default"
                    source="sidebar-icons/icon_chat.svg"
                    alt="chat"
                  />
                  <ImageElement
                    className="active"
                    source="sidebar-icons/icon_chat_active.svg"
                    alt="chat"
                  />
                  {/* <Badge bg="light">99+</Badge> */}
                </div>
                Chat
              </Link>
            </li>
            <li>
              <Link
                to={userRoutesMap.CONTACT_LIST.path}
                onClick={() => setMenuToggle(false)}
                className={`${
                  pathname === userRoutesMap.CONTACT_LIST.path ? "active" : ""
                }`}
              >
                <div className="iconBox">
                  <ImageElement
                    className="default"
                    source="sidebar-icons/icon_contact.svg"
                    alt="contact"
                  />
                  <ImageElement
                    className="active"
                    source="sidebar-icons/icon_contact_active.svg"
                    alt="contact"
                  />
                </div>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="menuSidebar_powered position-absolute">
          <h6>Powered by</h6>
          <ImageElement source="logo-sidebar.svg" alt="loopity" />
        </div>
      </div>
      {menuToggle && (
        <div onClick={() => setMenuToggle(false)} className="bgOverlay" />
      )}
    </>
  );
}

export default LoginSidebar;
