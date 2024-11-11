import { createSlice } from "@reduxjs/toolkit";
import moduleRoutesMap from "../../routeControl";
import { removeLocalStorageToken } from "../../utils";
import logger from "../../utils/logger";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    adminAuth: {},
    sideBarKey: "0",
    forgetPassword: {},
    verifyData: {},
    signupData: {},
    callData: {},
    callingDetails: {},
    localStream: null,
  },
  reducers: {
    loginAction: (state, action) => {
      return (state = {
        ...state,
        userData: { ...action.payload },
        verifyData: {},

        signupData: {},
      });
    },
    signupDataAction: (state, action) => {
      return (state = {
        ...state,
        signupData: { ...action.payload },
      });
    },
    logoutAction: (state) => {
      return (state = {
        ...state,
        userData: {},
        sideBarKey: "0",
      });
    },

    verifyLoginAction: (state, action) => {
      return (state = {
        ...state,
        verifyData: { ...action.payload },
      });
    },
    forgetpasswordAction: (state, action) => {
      return (state = {
        ...state,
        forgetPassword: { ...action.payload },
      });
    },
    otpVerificationAction: (state, action) => {
      return (state = {
        ...state,
        forgetPassword: {
          ...state.forgetPassword,
          ...action.payload,
        },
      });
    },
    resetPasswordAction: (state) => {
      return (state = {
        ...state,
        forgetPassword: {},
      });
    },
    updateUserDataAction: (state, action) => {
      return (state = {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      });
    },
    updateAdminAuthAction: (state, action) => {
      return (state = {
        ...state,
        adminAuth: action.payload,
      });
    },
    sideBarAction: (state, action) => {
      return (state = {
        ...state,
        sideBarKey: action.payload,
      });
    },
    updateChatStatus: (state, action) => {
      return (state = {
        ...state,
        userData: {
          ...state.userData,
          chatStatus: {
            status: action.payload.status,
            isOnline: action.payload.isOnline,
          },
        },
      });
    },
    callDataAction: (state, action) => {
      return (state = {
        ...state,
        callData: action.payload,
      });
    },
    callingDataAction: (state, action) => {
      return (state = {
        ...state,
        callingDetails: action.payload,
      });
    },
    localStreamDataAction: (state, action) => {
      return (state = {
        ...state,
        localStream: action.payload,
      });
    },
  },
});

export const {
  loginAction,
  updateUserDataAction,
  logoutAction,
  forgetpasswordAction,
  sideBarAction,
  otpVerificationAction,
  verifyLoginAction,
  signupDataAction,
  resetPasswordAction,
  updateAdminAuthAction,
  updateChatStatus,
  callDataAction,
  callingDataAction,
  localStreamDataAction,
} = authSlice.actions;

export const login = (data) => async (dispatch) => {
  try {
    dispatch(loginAction(data));
  } catch (error) {
    logger(error);
  }
};
export const signupData = (data) => async (dispatch) => {
  try {
    dispatch(signupDataAction(data));
  } catch (error) {
    logger(error);
  }
};
export const verifyLogin = (data) => async (dispatch) => {
  try {
    dispatch(verifyLoginAction(data));
  } catch (error) {
    logger(error);
  }
};
export const forgetPassword = (data) => async (dispatch) => {
  try {
    dispatch(forgetpasswordAction(data));
  } catch (error) {
    logger(error);
  }
};
export const otpVerification = (data) => async (dispatch) => {
  try {
    dispatch(otpVerificationAction(data));
  } catch (error) {
    logger(error);
  }
};
export const resetPassword = () => async (dispatch) => {
  try {
    dispatch(resetPasswordAction());
  } catch (error) {
    logger(error);
  }
};

export const logout = (navigate, userRole) => async (dispatch) => {
  try {
    // if (!remember) {
    //   removeSessionStorageToken();
    // }
    removeLocalStorageToken();
    localStorage.clear();
    dispatch(logoutAction());
    navigate(moduleRoutesMap[userRole].LOGIN.path);
  } catch (error) {
    logger(error);
  }
};

export const updateUserData = (data) => async (dispatch) => {
  try {
    dispatch(updateUserDataAction(data));
  } catch (error) {
    logger(error);
  }
};

export const updateAdminAuthData = (data) => async (dispatch) => {
  try {
    dispatch(updateAdminAuthAction(data));
  } catch (error) {
    logger(error);
  }
};

export const updateSidebarKey = (data) => async (dispatch) => {
  try {
    dispatch(sideBarAction(data));
  } catch (error) {
    logger(error);
  }
};
export const updateCallData = (data) => async (dispatch) => {
  try {
    dispatch(callDataAction(data));
  } catch (error) {
    logger(error);
  }
};
export const callingData = (data) => async (dispatch) => {
  try {
    dispatch(callingDataAction(data));
  } catch (error) {
    logger(error);
  }
};
export const UpdateLocalStreamData = (data) => async (dispatch) => {
  try {
    dispatch(localStreamDataAction(data));
  } catch (error) {
    logger(error);
  }
};

export const selectUserData = (state) => state.auth.userData;
export const selectUserVerify = (state) => state.auth.verifyData;
export const forgetPasswordData = (state) => state.auth.forgetPassword;
export const getSidebarKey = (state) => state.auth.sideBarKey;
export const selectSignupData = (state) => state.auth.signupData;
export const getAdminAuthData = (state) => state.auth.adminAuth;
export const getCallData = (state) => state.auth.callData;
export const getCallingDetails = (state) => state.auth.callingDetails;
export const getLocalStreamData = (state) => state.auth.localStream;

export default authSlice.reducer;
