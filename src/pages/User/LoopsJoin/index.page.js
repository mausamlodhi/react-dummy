/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import { CommonButton, ImageElement } from "../../../components";
import userRoutesMap from "../../../routeControl/userRouteMap";

function LoopsJoin() {
  return (
    <>
      <section className="authPage">
        <div className="authPage_form">
          <div className="authPage_form_form">
            <div className="authPage_form_logo">
              <ImageElement
                className="mx-auto d-block"
                source="logo-dark.svg"
                alt="daakia"
              />
            </div>
            <div className="d-flex flex-column authPage_form_field">
              <div className="loopRequest">
                <div className="authPage_form_head">
                  <h1 className="font-bd">Loops you can join</h1>
                  <span>
                    Start your journey by joining Loop Channel or creating your
                    own Loop.{" "}
                  </span>
                </div>

                <div className="loopRequestJoin">
                  <div className="userBox userBox-recent d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-sm-center w-100">
                      <div className="userAvatar userAvatar-lg warning">
                        <span>MR</span>
                      </div>
                      <div className="userBox_content d-flex align-items-center flex-wrap flex-sm-nowrap w-100">
                        <div className="mb-2 mb-sm-0 me-sm-4">
                          <h5 className="mb-0">Search and Rescue</h5>
                          <p className="mb-0">
                            Loop - <strong>Michigan Rescue</strong> | 26
                            Participants Created by melissasanders@gmail.com{" "}
                          </p>
                        </div>
                        <Link
                          to={userRoutesMap.LOOPS.path}
                          className="btn btn-md btn-primary font-sb"
                        >
                          Join
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="userBox userBox-recent d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-sm-center w-100">
                      <div className="userAvatar userAvatar-lg info">
                        <span>WO</span>
                      </div>
                      <div className="userBox_content d-flex align-items-center flex-wrap flex-sm-nowrap w-100">
                        <div className="mb-2 mb-sm-0 me-sm-4">
                          <h5 className="mb-0">Search and Rescue</h5>
                          <p className="mb-0">
                            Loop - <strong>Michigan Rescue</strong> | 26
                            Participants Created by melissasanders@gmail.com{" "}
                          </p>
                        </div>
                        <Link
                          to={userRoutesMap.LOOPS.path}
                          className="btn btn-md btn-primary font-sb"
                        >
                          Join
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="loopRequest_create d-sm-flex d-block flex-wrap align-items-center justify-content-between text-sm-start text-center">
                  <p className="mb-2 mb-sm-0">
                    Couldn't find the loop you
                    <br className="d-none d-sm-block" /> are looking for?
                  </p>
                  <CommonButton variant="info">Create a new Loop</CommonButton>
                </div>
                <div className="text-center loopRequest_skip">
                  <Link
                    to={userRoutesMap.LOOPS.path}
                    className="link-secondary font-sb"
                  >
                    Skip
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoopsJoin;
