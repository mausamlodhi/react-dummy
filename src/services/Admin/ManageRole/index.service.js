import { ManageRole } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const AdminManageRoleService = {
  getChannelService: async ({ queryParams }) => {
    try {
      const payload = {
        ...ManageRole.getChannelRole,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  addChannelService: async (bodyData) => {
    try {
      const payload = {
        ...ManageRole.addChannelRole,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getSingleChannelService: async (id) => {
    try {
      const payload = {
        ...ManageRole.getSingleChannelRole(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  UpdateChannelService: async (id, bodyData) => {
    try {
      const payload = {
        ...ManageRole.updateChannelRole(id),
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
