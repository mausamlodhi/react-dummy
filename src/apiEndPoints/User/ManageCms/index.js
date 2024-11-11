const UserManageCms = {
  get: (id) => ({
    url: `/cms/static-content/${id}`,
    method: "GET",
  }),
};
export default UserManageCms;
