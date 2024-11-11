import { Chat } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const ChatServices = {
  getChatListService: async (queryParams) => {
    try {
      const payload = {
        ...Chat.getChatList,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  singleChatService: async (bodyData) => {
    try {
      const payload = {
        ...Chat.singleChat,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  singleChatGetByIdService: async (id) => {
    try {
      const payload = {
        ...Chat.singleChatGetId(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getChatStatusService: async () => {
    try {
      const payload = {
        ...Chat.getChatStatus,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getUserChatUnreadMessageService: async (roomId) => {
    try {
      const payload = {
        ...Chat.getUserChatUnreadMessage(roomId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getMeChatService: async () => {
    try {
      const payload = {
        ...Chat.getMeChatData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
  getMessageIndexService: async (messageId) => {
    try {
      const payload = {
        ...Chat.getMessageIndex(messageId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
};
