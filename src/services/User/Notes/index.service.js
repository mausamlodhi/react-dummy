import { Notes } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const ChannelNotesServices = {
  getChannelNotes: async (id, queryParams) => {
    try {
      const payload = {
        ...Notes.getChannelNotes(id),
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  deleteChannelNotes: async (loopId, id) => {
    try {
      const payload = {
        ...Notes.deleteChannelNotes(loopId, id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addChannelNotes: async (loopId, bodyData) => {
    try {
      const payload = {
        ...Notes.addChannelNotes(loopId),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateChannelNotes: async (loopId, noteId, bodyData) => {
    try {
      const payload = {
        ...Notes.updateChannelNotes(loopId, noteId),
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
