const UserManagement = {
  getUsers: {
    url: "/user",
    method: "GET",
  },
  getSingleUser: (id) => ({
    url: `/user/${id}`,
    method: "GET",
  }),
  updateUserStatus: (id) => ({
    url: `/user/${id}`,
    method: "PATCH",
  }),
};
export default UserManagement;
