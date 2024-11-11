import { Auth } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const AdminAuthServices = {
  userLogin: async (values) => {
    try {
      const payload = {
        ...Auth.accountLogin,
        bodyData: values,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  changePasswordService: async (bodyData) => {
    try {
      const payload = {
        ...Auth.changePassword,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  adminForgotPassword: async (bodyData) => {
    try {
      const payload = {
        ...Auth.accountForgot,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateAdminService: async (bodyData) => {
    try {
      const payload = {
        ...Auth.accountUpdate,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  resetPasswordService: async (bodyData) => {
    try {
      const payload = {
        ...Auth.resetPassword,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateProfileImageService: async (bodyData) => {
    try {
      const payload = {
        ...Auth.updateProfileImage,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  logoutService: async () => {
    try {
      const payload = {
        ...Auth.accountLogout,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (err) {
      logger(err);
    }
  },
};
