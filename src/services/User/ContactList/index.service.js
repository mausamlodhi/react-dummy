import { ContactList } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const ContactListServices = {
  removeContact: async (contactId) => {
    try {
      const payload = {
        ...ContactList.removeContact(contactId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getContactList: async (queryParams) => {
    try {
      const payload = {
        ...ContactList.getContactList,
        queryParams
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addContactService: async (bodyData) => {
    try {
      const payload = {
        ...ContactList.addContact,
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
