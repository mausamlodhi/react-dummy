import { Common } from "../../apiEndPoints";
import { logger } from "../../utils";
import APIrequest from "../axios";

export const CommonService = {
  countryService: async () => {
    try {
      const payload = {
        ...Common.country,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  stateService: async (queryParams) => {
    try {
      const payload = {
        ...Common.state,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getToken: async (channelId) => {
    try {
      const payload = {
        ...Common.getAgoraToken(channelId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  createToken: async (channelId) => {
    try {
      const payload = {
        ...Common.createAgoraToken(channelId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
