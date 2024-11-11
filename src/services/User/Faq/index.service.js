import { Faq } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const FaqService = {
  getFaq: async (queryParams) => {
    try {
      const payload = {
        ...Faq.get,
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
