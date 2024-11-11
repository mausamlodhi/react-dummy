const ContactList = {
  removeContact: (id) => ({
    url: `/contact/${id}`,
    method: "DELETE",
  }),
  getContactList: {
    url: "/contact",
    method: "GET",
  },
  addContact: {
    url: "/contact",
    method: "POST",
  },
};
export default ContactList;
