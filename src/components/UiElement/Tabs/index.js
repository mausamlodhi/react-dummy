import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./index.scss";

export default function Tabs({
  tabContent,
  tabsFor,
  setActiveKey,
  activeKey,
  onTabChange,
  tabWithToggle,
  asideToggle,
  asideView,
  extraClass = "card",
  navClass = "navClass",
  tabClass = "nav-tabs-mb-icon nav-tabs-card",
}) {
  const [key, setKey] = useState(tabContent[0]?.key);

  return (
    <>
      <Tab.Container
        id="controlled-tab-example"
        defaultActiveKey={key}
        activeKey={activeKey}
        onSelect={(k) => {
          setKey(k);
          if (setActiveKey) {
            setActiveKey(k);
          }
          if (onTabChange) {
            onTabChange(k);
          }
        }}
      >
        {tabsFor === "table" ? (
          <div className={`${extraClass}`}>
            <Nav variant="tabs" className="nav-tabs-card border-0">
              {tabContent.map((item) => {
                return (
                  <Nav.Item>
                    <Nav.Link eventKey={item.key}>
                      {item.icon && <em className={item.icon} />}
                      <span>{item.name}</span>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </div>
        ) : tabsFor === "user" ? (
          <Nav variant="tabs" className={`${navClass}`}>
            <>
              {tabContent.map((item) => {
                return (
                  <Nav.Item>
                    <Nav.Link eventKey={item.key}>
                      {item.icon && <em className={item.icon} />}
                      <span>{item.name}</span>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </>
          </Nav>
        ) : (
          <Nav variant="tabs" className={`${tabClass}`}>
            <>
              {tabContent.map((item) => {
                return (
                  <Nav.Item>
                    <Nav.Link eventKey={item.key}>
                      {item.icon && <em className={item.icon} />}
                      <span>{item.name}</span>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
              {tabWithToggle && (
                <Nav.Item className={tabWithToggle}>
                  <Link
                    to="#"
                    onClick={() => asideToggle()}
                    className={`toggle btn btn-icon btn-trigger ${
                      asideView ? "active" : ""
                    }`}
                  >
                    <em className="icon ni ni-user-list-fill" />
                  </Link>
                </Nav.Item>
              )}
            </>
          </Nav>
        )}

        <div className={tabsFor === "table" ? "mt-3" : ""}>
          <Tab.Content>
            {tabContent.map((item) => {
              return <Tab.Pane eventKey={item.key}>{item.content}</Tab.Pane>;
            })}
          </Tab.Content>
        </div>
      </Tab.Container>
    </>
  );
}
