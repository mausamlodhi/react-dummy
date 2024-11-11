/** ****Function is driver function for authenticate*******
 * ****user and route for which it will**************
 * ****return true and false************************** */

import { getLocalStorageToken } from "./common.util";

function authDriver(route, userData, pathname) {
  try {
    let checkData = getLocalStorageToken();
    let user = "";
    if (pathname.search("admin") >= 0) {
      user = "admin";
    } else {
      user = "user";
    }
    const Role = userData?.userRole?.role?.role === "admin" ? "admin" : "user";

    let userCheck = Role ?? user;

    if (userCheck === "user" && route?.common === true) {
      return true;
    } else if (route.private && Role === user) {
      // ********For secure route**************
      if (!!checkData) {
        return true;
      } else {
        return false;
      }
    } else {
      // **Non secure route****
      if (!!checkData) {
        return false;
      }
      if (route.private === false) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
}

export default authDriver;
