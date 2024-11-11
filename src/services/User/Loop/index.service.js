import { Loop } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const LoopService = {
  addLoopService: async (bodyData) => {
    try {
      const payload = {
        ...Loop.add,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getLoopInformationService: async (id) => {
    try {
      const payload = {
        ...Loop.getLoopInfo(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addClientService: async (bodyData, id) => {
    try {
      const payload = {
        ...Loop.addClient(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateLoopService: async (bodyData, id) => {
    try {
      const payload = {
        ...Loop.updateLoop(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addInsuranceService: async (bodyData, id) => {
    try {
      const payload = {
        ...Loop.addInsurance(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getRolesService: async () => {
    try {
      const payload = {
        ...Loop.getRoles,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addRolesService: async (id, bodyData) => {
    try {
      const payload = {
        ...Loop.addRole(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getLoopService: async (queryParams) => {
    try {
      const payload = {
        ...Loop.getLoop,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateClientService: async (bodyData, id) => {
    try {
      const payload = {
        ...Loop.updateClient(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateInsuranceService: async (bodyData, id) => {
    try {
      const payload = {
        ...Loop.updateInsurance(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  deleteRoleService: async (loopId, permissionId) => {
    try {
      const payload = {
        ...Loop.deleteRole(loopId, permissionId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateRolesService: async (id, permissionId, bodyData) => {
    try {
      const payload = {
        ...Loop.updateRole(id, permissionId),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getRolesListService: async (id) => {
    try {
      const payload = {
        ...Loop.getRoleList(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  postCreateChannelService: async (id, bodyData) => {
    try {
      const payload = {
        ...Loop.createChannel(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addChannelMember: async (id, bodyData) => {
    try {
      const payload = {
        ...Loop.createChannel(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getLoopParticipantListsService: async (id) => {
    try {
      const payload = {
        ...Loop.getLoopParticipantLists(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getLoopRoleListsService: async (id) => {
    try {
      const payload = {
        ...Loop.getLoopRoleLists(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  putParticipantRoleUpdateService: async ({ id, bodyData }) => {
    try {
      const payload = {
        ...Loop.putParticipantRoleUpdateService(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateChannelService: async (id, channelId, bodyData) => {
    try {
      const payload = {
        ...Loop.updateChannel(id, channelId),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  deleteChannelService: async (id, channelId) => {
    try {
      const payload = {
        ...Loop.deleteChannel(id, channelId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  addPinChannelService: async (bodyData) => {
    try {
      const payload = {
        ...Loop.pinChannelAdd,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getPinChannelService: async (queryParams) => {
    try {
      const payload = {
        ...Loop.pinChannelGet,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getPinChannelByIdService: async (id, channelId) => {
    try {
      const payload = {
        ...Loop.getChannelById(id, channelId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  UnpinPinChannelService: async (id) => {
    try {
      const payload = {
        ...Loop.unPinChannel(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  postAddChannelMemberService: async (channelId, bodyData) => {
    try {
      const payload = {
        ...Loop.postAddChannelMember(channelId),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getChatRoomMessageListsService: async (id, queryParams) => {
    try {
      const payload = {
        ...Loop.getChatRoomMessageLists(id),
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getMessagePinListsService: async (id) => {
    try {
      const payload = {
        ...Loop.getMessagePinLists(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  postMessagePinService: async (id, bodyData) => {
    try {
      const payload = {
        ...Loop.postMessagePin(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  deleteMessageUnPinService: async (roomId, messageId) => {
    try {
      const payload = {
        ...Loop.deleteMessageUnPin(roomId, messageId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  roomFilesService: async (roomId, queryParams) => {
    try {
      const payload = {
        ...Loop.roomFiles(roomId),
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getChannelMemberListsService: async (channelId, queryParams) => {
    try {
      const payload = {
        ...Loop.getChannelMemberLists(channelId),
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateChatRoomMessage: async (id, messageId, bodyData) => {
    try {
      const payload = {
        ...Loop.updateChatRoomMessage(id, messageId),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateChannelParticipants: async (channelId, id, bodyData) => {
    try {
      const payload = {
        ...Loop.updateChannelParticipants(channelId, id),
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
