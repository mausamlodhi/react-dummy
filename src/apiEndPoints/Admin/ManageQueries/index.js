const ManageQueries = {
  getPendingQueries: {
    url: "/query",
    method: "GET",
  },
  sendReply: (id) => ({
    url: `/query/${id}/reply`,
    method: "PATCH",
  }),
};
export default ManageQueries;
