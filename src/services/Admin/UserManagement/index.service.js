import { UserManagement } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const UserManagementServices = {
  getUserService: async ({ queryParams }) => {
    try {
      const payload = {
        ...UserManagement.getUsers,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  UpdateUserStatusService: async (id, bodyData) => {
    try {
      const payload = {
        ...UserManagement.updateUserStatus(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getSingleUserService: async (id) => {
    try {
      const payload = {
        ...UserManagement.getSingleUser(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
