import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input as TextInput } from "../../Antd";
import userRoutesMap from "../../../routeControl/userRouteMap";
import ImageElement from "../ImageElement";

function SearchMember({ searchOpen, setSearchOpen }) {
  const [showResults, setShowResults] = useState(false);
  const [searchValue, setSearchValue] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const myRef = useRef();
  const onClickHandel = () => setShowResults(true);

  const handleClickOutside = (e) => {
    if (
      !myRef.current.contains(e.target) ||
      e.target.closest(".searchList_item")
    ) {
      setShowResults(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  const onChangeHandel = (e) => {
    const inputValue = e.target.value;
    setInputVal(inputValue);
    if (inputValue) {
      setSearchValue(true);
    } else {
      setSearchValue(false);
    }
  };
  return (
    <>
      <div
        className={`searchBox ${searchOpen ? "searchBox-open" : ""}`}
        ref={myRef}
      >
        <div className="form-group form-group-dark">
          <div className="form-control-wrap">
            <TextInput
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
          <div
            className={`searchBox_list ${showResults ? "d-block" : ""}`}
            id="search-item-list"
          >
            {searchValue ? (
              <>
                <Link className="viewAll" to={userRoutesMap.SEARCH.path}>
                  <em className="icon-search" /> <strong>{inputVal}</strong>{" "}
                  press enter to view all results
                </Link>
                <div className="searchBoxBlk">
                  <div className="searchList">
                    {/* <h3 className="title font-sb">People</h3> */}
                    <div className="searchList_inner">
                      <Link
                        to="#"
                        className="searchList_item d-flex align-items-center"
                      >
                        <div className="userAvatar userAvatar-sm">
                          <ImageElement
                            source="profile/profile01.jpg"
                            alt="user"
                          />
                        </div>
                        <div className="itemInfo">
                          <p>
                            <span>An</span>nei Thompson
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="#"
                        className="searchList_item d-flex align-items-center"
                      >
                        <div className="userAvatar userAvatar-sm">
                          <ImageElement
                            source="profile/profile02.jpg"
                            alt="user"
                          />
                        </div>
                        <div className="itemInfo">
                          <p>
                            Bri<span>an</span>Beaulieu
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="#"
                        className="searchList_item d-flex align-items-center"
                      >
                        <div className="userAvatar userAvatar-sm">
                          <ImageElement
                            source="profile/profile03.jpg"
                            alt="user"
                          />
                        </div>
                        <div className="itemInfo">
                          <p>
                            <span>An</span>nei Posted
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchMember;
