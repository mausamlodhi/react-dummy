import { UserManageCms } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const UserManageCmsService = {
  getService: async (id) => {
    try {
      const payload = {
        ...UserManageCms.get(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
