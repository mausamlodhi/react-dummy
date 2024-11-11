const ManageCms = {
  contactUs: {
    url: "/cms/site-setting",
    method: "GET",
  },
  updateContactUs: {
    url: "/cms/site-setting",
    method: "POST",
  },
  getCmsTermAndPrivacy: (id) => ({
    url: `cms/static-content/${id}`,
    method: "GET",
  }),
  updateCmsTermAndPrivacy: (id) => ({
    url: `cms/static-content/${id}`,
    method: "PUT",
  }),
  addFaq: {
    url: "/faq",
    method: "POST",
  },
  getFaq: {
    url: "/faq",
    method: "GET",
  },
  deleteFaq: (id) => ({
    url: `/faq/${id}`,
    method: "DELETE",
  }),
  getSingleFAQs: (id) => ({
    url: `/faq/${id}`,
    method: "GET",
  }),
  updateFAQ: (id) => ({
    url: `/faq/${id}`,
    method: "PUT",
  }),
};
export default ManageCms;
