import { ManageCms } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const AdminManageCms = {
  contactCmsService: async () => {
    try {
      const payload = {
        ...ManageCms.contactUs,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateContactCmsService: async (bodyData) => {
    try {
      const payload = {
        ...ManageCms.updateContactUs,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getTermAndPrivacyService: async (id) => {
    try {
      const payload = {
        ...ManageCms.getCmsTermAndPrivacy(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addFaq: async (bodyData) => {
    try {
      const payload = {
        ...ManageCms.addFaq,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateTermAndPrivacyService: async (id, bodyData) => {
    try {
      const payload = {
        ...ManageCms.updateCmsTermAndPrivacy(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getFaq: async (queryParams) => {
    try {
      const payload = {
        ...ManageCms.getFaq,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  deletefaq: async (id) => {
    try {
      const payload = {
        ...ManageCms.deleteFaq(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getSingleFAQsService: async (id) => {
    try {
      const payload = {
        ...ManageCms.getSingleFAQs(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateFAQsService: async (bodyData, id) => {
    try {
      const payload = {
        ...ManageCms.updateFAQ(id),
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
