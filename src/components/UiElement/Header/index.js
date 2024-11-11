// import { t } from "i18next";
import React, { useEffect } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RippleEffect } from "..";
// import { selectUserData } from "../../../redux/AuthSlice/index.slice";
// import HeaderDropdownMenu from "../HeaderDropdown";
// import moduleRoutesMap from "../../../routeControl";

function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const { pathname } = location;
  // const [noAuth, setNoAuth] = useState(false);

  // const userData = useSelector(selectUserData);
  //   const userToken = false;

  useEffect(() => {}, [pathname]);
  //   const dropDownList = [
  //     {
  //       label: "My Profile",
  //       path: moduleRoutesMap?.user?.PROFILE?.path,
  //     },
  //     {
  //       label: "My Message",
  //       path: moduleRoutesMap?.user?.MY_MESSAGE?.path,
  //       // path: moduleRoutesMap?.[userData?.user_type]?.PROVIDER_MESSAGE?.path,
  //     },
  //     {
  //       label: "Logout",
  //       path: "#",
  //       onClick: (e) => {
  //         e.preventDefault();
  //       },
  //     },
  //   ];

  useEffect(() => {
    if (["home"].includes()) {
      document.querySelector(".mainHeader").style.paddingTop = `0px`;
    } else {
      setTimeout(() => {
        let navbar = document.querySelector(".navbar").clientHeight;
        document.querySelector(".mainHeader").style.paddingTop = `${navbar}px`;
      }, 100);
    }
  });
  return (
    <>
      <header className="mainHeader">
        <Navbar fixed="top" className="" expand="lg">
          <Container fluid>
            <Link className="navbar-brand">
              <img
                className="img-fluid"
                src="../assets/images/frontend/logo-header.svg"
                alt="logo-header"
              />
            </Link>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav as="ul" className="m-auto">
                <li>
                  <Link className="nav-link">Home</Link>
                </li>
                <li>
                  <Link className="nav-link">About us</Link>
                </li>
                <li>
                  <Link className="nav-link">Solutions We Offer</Link>
                </li>
                <li>
                  <Link className="nav-link">How It Works</Link>
                </li>
                <li>
                  <Link className="nav-link">Pricing</Link>
                </li>
                <li>
                  <Link className="nav-link">Contact Us</Link>
                </li>
              </Nav>
            </Navbar.Collapse>
            <Dropdown className="loginBtn ms-auto">
              <Dropdown.Toggle as="a" className=" d-flex" id="dropdown-basic">
                <span className="icon-user-circle" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Link className="dropdown-item">Sign In</Link>
                <Dropdown.Divider className="m-0" />
                <Link className="dropdown-item">Sign Up</Link>
              </Dropdown.Menu>
            </Dropdown>

            {/* <Dropdown className="notify ms-auto me-3">
                <Dropdown.Toggle as="a" className="d-flex justify-content-center align-items-center p-0 position-relative" id="dropdown-notify">
                  <em className="icon-notification" />
                  <span className="badge position-absolute">2</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                  <ul className="notify_list list-unstyled mb-0 overflow-auto">
                    <li className="notify_list_item">
                      <Link className="noRead d-flex align-items-stretch justify-content-start">
                        <div className="userImg me-2">
                          <img className="img-fluid" src="../assets/images/frontend/profile.jpg" alt="profile"/>
                        </div>
                        <div className="notifyMsg">
                          <p className="font-bd mb-0">Lorem ipsum dolor sit amet consec</p>
                          <span>Just Now</span>
                        </div>
                      </Link>
                    </li>
                    <li className="notify_list_item">
                      <Link className="d-flex align-items-stretch justify-content-start">
                        <div className="userImg me-2">
                          <img className="img-fluid" src="../assets/images/frontend/profile.jpg" alt="profile"/>
                        </div>
                        <div className="notifyMsg">
                          <p className="mb-0">Lorem ipsum dolor sit amet consec</p>
                          <span>10 min ago</span>
                        </div>
                      </Link>
                    </li>
                    <li className="notify_list_item">
                      <Link className="d-flex align-items-stretch justify-content-start">
                        <div className="userImg me-2">
                          <img className="img-fluid" src="../assets/images/frontend/profile.jpg" alt="profile"/>
                        </div>
                        <div className="notifyMsg">
                          <p className="mb-0">Lorem ipsum dolor sit amet consec</p>
                          <span>30 min ago</span>
                        </div>
                      </Link>
                    </li>
                    <li className="notify_list_item">
                      <Link className="d-flex align-items-stretch justify-content-start">
                        <div className="userImg me-2">
                          <img className="img-fluid" src="../assets/images/frontend/profile.jpg" alt="profile"/>
                        </div>
                        <div className="notifyMsg">
                          <p className="mb-0">Lorem ipsum dolor sit amet consec</p>
                          <span>1 hour ago</span>
                        </div>
                      </Link>
                    </li>
                    <li className="notify_list_item">
                      <Link className="noRead d-flex align-items-stretch justify-content-start">
                        <div className="userImg me-2">
                          <img className="img-fluid" src="../assets/images/frontend/profile.jpg" alt="profile"/>
                        </div>
                        <div className="notifyMsg">
                          <p className="font-bd mb-0">Lorem ipsum dolor sit amet consec</p>
                          <span>1 day ago</span>
                        </div>
                      </Link>
                    </li> 
                    <li className="notify_list_item">
                      <Link className="d-flex align-items-stretch justify-content-start">
                        <div className="userImg me-2">
                          <img className="img-fluid" src="../assets/images/frontend/profile.jpg" alt="profile"/>
                        </div>
                        <div className="notifyMsg">
                          <p className="mb-0">Lorem ipsum dolor sit amet consec</p>
                          <span>1 month ago</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                  <Link className="link-primary viewAll d-block text-center">View All</Link>
                </Dropdown.Menu>
              </Dropdown> */}
            {/* <Dropdown className="profile">
                <Dropdown.Toggle as="a" className="d-flex align-items-center" id="dropdown-basic">
                  <div className="profileImg"><img className="img-fluid" src="../assets/images/frontend/audio-call-member.jpg" alt="profile"/></div>
                  <span>Jonas Merchant</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                  <Link className="dropdown-item" to="/profile" onClick={document.body.click()} >My Profile</Link>
                  <Link className="dropdown-item" to="/profile" onClick={document.body.click()} >Billing & Subscription </Link>
                  <Dropdown.Divider />
                  <Link className="dropdown-item" onClick={document.body.click()} >Sign Out</Link>
                </Dropdown.Menu>
              </Dropdown> */}

            <RippleEffect>
              {/* {!userData?.token || && ( */}
              <Link to="/login" className=" btn btn-warning">
                {" "}
                {t("text.userAuth.title")}
              </Link>
              {/* )} */}
            </RippleEffect>

            {/* <Navbar.Toggle aria-controls="basic-navbar-nav">
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
            </Navbar.Toggle> */}
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
