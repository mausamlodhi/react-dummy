const ManageRole = {
  getChannelRole: {
    url: "/channel-role",
    method: "GET",
  },
  addChannelRole: {
    url: "/channel-role",
    method: "POST",
  },
  getSingleChannelRole: (id) => ({
    url: `/channel-role/${id}`,
    method: "GET",
  }),
  updateChannelRole: (id) => ({
    url: `/channel-role/${id}`,
    method: "PUT",
  }),
};
export default ManageRole;
