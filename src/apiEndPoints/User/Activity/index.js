const Activity = {
  getList: {
    url: "/activity",
    method: "GET",
  },
  readUnread: (id) => ({
    url: `/activity/${id}`,
    method: "PATCH",
  }),
};
export default Activity;
