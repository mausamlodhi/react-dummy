import APIrequest from "../../axios";
import { logger } from "../../../utils";
import { Activity } from "../../../apiEndPoints";

export const ActivityService = {
  getActivityService: async (queryParams) => {
    try {
      const payload = {
        ...Activity.getList,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  readUnreadActivity: async (id, bodyData) => {
    try {
      const payload = {
        ...Activity.readUnread(id),
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
