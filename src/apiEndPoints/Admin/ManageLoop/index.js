const ManageLoop = {
  getLoop: {
    url: "/loop",
    method: "GET",
  },
  getSingleLoop: (id) => ({
    url: `/loop/${id}`,
    method: "GET",
  }),
  updateLoopStatus: (id) => ({
    url: `/loop/${id}`,
    method: "PATCH",
  }),
  getChannelMembersList: (id) => ({
    url: `/channel/${id}/member`,
    method: "GET",
  }),
};
export default ManageLoop;
