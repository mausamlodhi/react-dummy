import { Search } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const SearchService = {
  search: async (queryParams) => {
    try {
      const payload = {
        ...Search.getSearch,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  }
}