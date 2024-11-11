import { CallHistory } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const CallHistoryServices = {

    getCallHistory: async (channelId, queryParams) => {
        try {
            const payload = {
                ...CallHistory.getCallHistory(channelId),
                queryParams
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            logger(error);
            throw error;
        }
    },
    updateCallHistory: async (channelId, bodyData) => {
        try {
            const payload = {
                ...CallHistory.updateCallHistory(channelId),
                bodyData
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            logger(error);
            throw error;
        }
    },
    deleteCallHistory: async (id) => {
        try {
            const payload = {
                ...CallHistory.deleteCallHistory(id)
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            logger(error);
            throw error;
        }
    },

}