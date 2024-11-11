const LoopRequest = {
  getRequest: {
    url: "/loop-request",
    method: "GET",
  },
  joinRequest: (id) => ({
    url: `/loop-request/${id}/join`,
    method: "POST",
  }),
};
export default LoopRequest;
