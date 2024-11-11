import { ManageQueries } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const AdminManageQueriesService = {
  getQueriesService: async (queryParams) => {
    try {
      const payload = {
        ...ManageQueries.getPendingQueries,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  sendReplyService: async (bodyData, id) => {
    try {
      const payload = {
        ...ManageQueries.sendReply(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
