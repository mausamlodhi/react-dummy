import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  MANAGE_CMS: {
    path: `${baseRoutes.adminBaseRoutes}`,
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-file-docs" />
      </span>
    ),
  },
  TERMS_AND_CONDITION: {
    path: `${baseRoutes.adminBaseRoutes}/terms-and-conditions`,
  },
  PRIVACY_POLICY: {
    path: `${baseRoutes.adminBaseRoutes}/privacy-policy`,
  },
  CONTACT_US: {
    path: `${baseRoutes.adminBaseRoutes}/contact-us`,
  },
  FAQS: {
    path: `${baseRoutes.adminBaseRoutes}/faqs`,
  }
};

export default accessRoute;
