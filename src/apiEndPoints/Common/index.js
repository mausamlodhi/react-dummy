const Common = {
  country: {
    url: "/country",
    method: "GET",
  },
  state: {
    url: "/state",
    method: "GET",
  },
  getAgoraToken: (channelId) => ({
    url: `/channel/${channelId}/token`,
    method: "GET",
  }),
  createAgoraToken: (channelId) => ({
    url: `/channel/${channelId}/token`,
    method: "POST",
  }),
};
export default Common;
