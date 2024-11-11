const Chat = {
  getChatList: {
    url: "/single-chat",
    method: "GET",
  },
  singleChat: {
    url: "/single-chat",
    method: "POST",
  },
  singleChatGetId: (id) => ({
    url: `/single-chat/${id}`,
    method: "GET",
  }),
  getChatStatus: {
    url: "/chat-status",
    method: "GET",
  },
  getUserChatUnreadMessage: (roomId) => ({
    url: `/room/${roomId}/unread-message`,
    method: "GET",
  }),
  getMeChatData: {
    url: "/me-chat",
    method: "GET",
  },
  getMessageIndex: (messageId) => ({
    url: `/message/${messageId}/message-index`,
    method: "GET",
  }),
};
export default Chat;
