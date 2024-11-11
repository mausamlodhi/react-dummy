import { ManageLoop } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const AdminManageLoopService = {
  getLoopService: async ({ queryParams }) => {
    try {
      const payload = {
        ...ManageLoop.getLoop,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getSingleLoopService: async (id) => {
    try {
      const payload = {
        ...ManageLoop.getSingleLoop(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  UpdateStatusLoopService: async (id, bodyData) => {
    try {
      const payload = {
        ...ManageLoop.updateLoopStatus(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getChannelMembersListService: async ({ id, queryParams }) => {
    try {
      const payload = {
        ...ManageLoop.getChannelMembersList(id),
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
