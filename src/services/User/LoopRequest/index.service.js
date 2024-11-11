import { LoopsRequest } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const LoopRequestService = {
  getLoopRequest: async (queryParams) => {
    try {
      const payload = {
        ...LoopsRequest.getRequest,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  joinLoopRequest: async (id) => {
    try {
      const payload = {
        ...LoopsRequest.joinRequest(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
