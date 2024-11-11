import { RaiseQuery } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const RaiseQueryServices = {
  addQuery: async (bodyData) => {
    try {
      const payload = {
        ...RaiseQuery.addQuery,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getCategoryService: async () => {
    try {
      const payload = {
        ...RaiseQuery.getCategory,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
