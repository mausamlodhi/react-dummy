
import { Outlet } from "react-router-dom";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import { ContactUs, FAQS, PrivacyPolicy, TermsAndConditions } from "../../../pages";

export default function route() {
  return [
    {
      path: adminRouteMap.MANAGE_CMS.path,
      private: true,
      name: "Manage CMS",
      key: adminRouteMap.MANAGE_CMS.path,
      belongsToSidebar: true,
      icon: adminRouteMap.MANAGE_CMS.icon,
      element: <Outlet />,
      children: [
        {
          path: adminRouteMap.FAQS.path,
          private: true,
          name: "Faqs",
          key: adminRouteMap.FAQS.path,
          belongsToSidebar: true,
          element: <FAQS />,
        },
        {
          path: adminRouteMap.CONTACT_US.path,
          private: true,
          name: "Contact Us",
          key: adminRouteMap.CONTACT_US.path,
          belongsToSidebar: true,
          element: <ContactUs />,
        },
        {
          path: adminRouteMap.TERMS_AND_CONDITION.path,
          private: true,
          name: "Terms & Conditions",
          key: adminRouteMap.TERMS_AND_CONDITION.path,
          belongsToSidebar: true,
          element: <TermsAndConditions />,
        },
        {
          path: adminRouteMap.PRIVACY_POLICY.path,
          private: true,
          name: "Privacy Policy",
          key: adminRouteMap.PRIVACY_POLICY.path,
          belongsToSidebar: true,
          element: <PrivacyPolicy />,
        }
      ],
    }
  ];
}
