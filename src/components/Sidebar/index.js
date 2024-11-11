import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import { useLocation, Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import {
  getSidebarKey,
  updateSidebarKey,
} from "../../redux/AuthSlice/index.slice";
import { ImageElement, getSideBarData } from "../../utils";
import adminRouteMap from "../../routeControl/adminRouteMap";

function Sidebar({ routes, sidebarOpen, menuToggle }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const sidebarKey = useSelector(getSidebarKey);
  const [state, setState] = useState({
    collapsed: false,
    menu: [],
    current: location.pathname,
  });
  const [currentActive, setCurrentActive] = useState(location.pathname);
  useEffect(() => {
    if (routes && routes instanceof Array) {
      setState({ ...state, menu: getSideBarData(routes) });
    }
  }, [routes]);

  useEffect(() => {
    setCurrentActive(location.pathname);
  }, [location.pathname]);

  const [sideBarCompact, setSideBarCompact] = useState(false);

  const sideBarToggle = () => {
    setSideBarCompact(!sideBarCompact);
  };
  return (
    <div
      className={`nk-sidebar nk-sidebar-fixed is-theme ${
        sideBarCompact ? "is-compact" : ""
      } ${sidebarOpen ? "nk-sidebar-active" : ""}`}
      data-content="sidebarMenu"
    >
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-sidebar-brand">
          <Link
            to={adminRouteMap.DASHBOARD.path}
            className="logo-link nk-sidebar-logo"
          >
            <ImageElement
              className="logo-img"
              previewSource="/assets/images/admin/logo-light.svg"
              alt="logo"
            />
            <img
              className="logo-small logo-img logo-img-small"
              src="/assets/images/admin/logo-small-light.svg"
              srcSet="/assets/images/admin/logo-small-light.svg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="nk-menu-trigger me-n2">
          <Link
            onClick={() => menuToggle()}
            role="button"
            className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
            data-target="sidebarMenu"
          >
            <em className="icon ni ni-arrow-left" />
          </Link>
          <Link
            onClick={() => sideBarToggle()}
            role="button"
            className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex"
            data-target="sidebarMenu"
          >
            <em className="icon ni ni-menu" />
          </Link>
        </div>
      </div>
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-content">
          <SimpleBar className="nk-sidebar-menu" forceVisible="y" autoHide>
            <Accordion
              className="bg-transparent rounded-0"
              defaultActiveKey={sidebarKey}
            >
              <ul className="nk-menu">
                {state.menu.map((item, i) => {
                  let routeData;
                  if (item.children) {
                    routeData = (
                      <React.Fragment key={item.label}>
                        <Accordion.Item
                          as="li"
                          className={`bg-transparent nk-menu-item ${
                            sidebarKey === i ? "active" : ""
                          }`}
                          key={item.label}
                          eventKey={i}
                        >
                          <Accordion.Header>
                            <Link
                              to="#"
                              onClick={(e) => e.preventDefault()}
                              className="nk-menu-link nk-menu-toggle"
                            >
                              {item.icon}
                              <span className="nk-menu-text">{item.label}</span>
                            </Link>
                          </Accordion.Header>
                          <Accordion.Body className="p-0">
                            <ul className="nk-menu-sub">
                              {item.children.map((child, key) => {
                                if (child.path === currentActive) {
                                  dispatch(updateSidebarKey(i));
                                }
                                return (
                                  <>
                                    <li
                                      className={`nk-menu-item ${
                                        child.path === currentActive
                                          ? "active"
                                          : ""
                                      }`}
                                      key={key}
                                    >
                                      <Link
                                        to={child.path}
                                        className="nk-menu-link"
                                        onClick={() => menuToggle(false)}
                                      >
                                        {child.icon}
                                        <span className="nk-menu-text">
                                          {child.label}
                                        </span>
                                      </Link>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </React.Fragment>
                    );
                  } else {
                    if (item.path === currentActive) {
                      dispatch(updateSidebarKey(i));
                    }
                    routeData = (
                      <Accordion.Item
                        as="li"
                        eventKey={i}
                        className={`bg-transparent nk-menu-item ${
                          item.path === currentActive ? "active" : ""
                        }`}
                      >
                        <Accordion.Button className="nk-menu-link-normal">
                          <Link
                            to={item.path}
                            className="nk-menu-link"
                            onClick={() => menuToggle(false)}
                          >
                            {item.icon}
                            <span className="nk-menu-text">{item.label}</span>
                          </Link>
                        </Accordion.Button>
                      </Accordion.Item>
                    );
                  }
                  return routeData;
                })}
              </ul>
            </Accordion>
          </SimpleBar>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
