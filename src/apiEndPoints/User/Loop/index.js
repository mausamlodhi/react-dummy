const Loop = {
  add: {
    url: "/loop",
    method: "POST",
  },
  getLoopInfo: (id) => ({
    url: `/loop/${id}`,
    method: "GET",
  }),
  addClient: (id) => ({
    url: `/loop/${id}/client`,
    method: "POST",
  }),
  updateLoop: (id) => ({
    url: `/loop/${id}`,
    method: "PUT",
  }),
  addInsurance: (id) => ({
    url: `/loop/${id}/insurance`,
    method: "POST",
  }),
  getLoop: {
    url: "/user-loop",
    method: "GET",
  },
  getRoles: {
    url: "/channel-role",
    method: "GET",
  },
  addRole: (id) => ({
    url: `/loop/${id}/role-permission`,
    method: "POST",
  }),
  getRoleList: (id) => ({
    url: `/loop/${id}/role-permission`,
    method: "GET",
  }),
  deleteRole: (loopId, permissionId) => ({
    url: `/loop/${loopId}/role-permission/${permissionId}`,
    method: "DELETE",
  }),
  updateRole: (loopId, permissionId) => ({
    url: `/loop/${loopId}/role-permission/${permissionId}`,
    method: "PUT",
  }),
  updateClient: (id) => ({
    url: `/loop/${id}/client`,
    method: "PUT",
  }),
  updateInsurance: (id) => ({
    url: `/loop/${id}/insurance`,
    method: "PUT",
  }),
  createChannel: (id) => ({
    url: `/loop/${id}/channel`,
    method: "POST",
  }),
  addChannelMember: (channelId) => ({
    url: `/channel/${channelId}/loop-request`,
    method: "POST",
  }),
  getLoopParticipantLists: (id) => ({
    url: `/loop/${id}/participants`,
    method: "GET",
  }),
  getLoopRoleLists: (id) => ({
    url: `/loop/${id}/role-permission`,
    method: "GET",
  }),
  putParticipantRoleUpdateService: (id) => ({
    url: `/loop/${id}/role-permission`,
    method: "GET",
  }),
  updateChannel: (id, channelId) => ({
    url: `/loop/${id}/channel/${channelId}`,
    method: "PUT",
  }),
  deleteChannel: (id, channelId) => ({
    url: `/loop/${id}/channel/${channelId}`,
    method: "DELETE",
  }),
  pinChannelAdd: {
    url: `/channel-pin`,
    method: "POST",
  },
  pinChannelGet: {
    url: `/channel-pin`,
    method: "GET",
  },
  getChannelById: (id, channelId) => ({
    url: `/loop/${id}/channel/${channelId}`,
    method: "GET",
  }),
  unPinChannel: (id) => ({
    url: `/channel-pin/${id}`,
    method: "DELETE",
  }),
  postAddChannelMember: (channelId) => ({
    url: `/channel/${channelId}/loop-request`,
    method: "POST",
  }),
  getChatRoomMessageLists: (roomId) => ({
    url: `/room/${roomId}/message`,
    method: "GET",
  }),
  postMessagePin: (roomId) => ({
    url: `/room/${roomId}/message-pin`,
    method: "POST",
  }),
  getMessagePinLists: (roomId) => ({
    url: `/room/${roomId}/message-pin`,
    method: "GET",
  }),
  deleteMessageUnPin: (roomId, messageId) => ({
    url: `/room/${roomId}/message-pin/${messageId}`,
    method: "DELETE",
  }),
  roomFiles: (roomId) => ({
    url: `/room/${roomId}/files`,
    method: "GET",
  }),
  getChannelMemberLists: (channelId) => ({
    url: `/channel/${channelId}/member`,
    method: "GET",
  }),
  updateChatRoomMessage: (id, messageId) => ({
    url: `/room/${id}/message/${messageId}`,
    method: "PUT",
  }),
  updateChannelParticipants: (channelId, id) => ({
    url: `/channel/${channelId}/member/${id}`,
    method: "PATCh",
  }),
};
export default Loop;
