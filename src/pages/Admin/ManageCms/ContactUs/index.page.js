import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import adminRouteMap from "../../../../routeControl/adminRouteMap";
import {
  Breadcrumb,
  ContactUsForm,
  GlobalLoader,
  PageHeader,
} from "../../../../components";
import { logger, modalNotification } from "../../../../utils";
import { AdminManageCms } from "../../../../services/Admin/ManageCms/index.service";

function ContactUs() {
  const { t } = useTranslation();
  const [contactUs, setContactUsData] = useState();
  const [loading, setLoading] = useState();
  const [getLoader, setGetLoader] = useState();
  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.adminCms.contactUs"),
    },
  ];
  const getContactUsData = async () => {
    setGetLoader(true);
    try {
      const res = await AdminManageCms.contactCmsService();
      const { success, data } = res;
      if (success) {
        setContactUsData(data);
      }
    } catch (error) {
      logger(error);
    }
    setGetLoader(false);
  };

  useEffect(() => {
    getContactUsData();
  }, []);
  const updateContactUs = async (val) => {
    setLoading(true);
    try {
      let bodyData = val;
      const res = await AdminManageCms.updateContactCmsService(bodyData);
      const { success, message } = res;
      if (success) {
        getContactUsData();
        modalNotification({
          type: "success",
          message,
        });
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="components-preview">
        <div className="nk-block-head nk-block-head-sm">
          <div className="nk-block-between">
            <PageHeader heading={t("text.adminCms.contactUs")}>
              <Breadcrumb breadcrumb={breadcrumb} />
            </PageHeader>
          </div>
        </div>
        <div className="nk-block">
          <div className="card">
            <div className="card-inner">
              {getLoader ? (
                <GlobalLoader />
              ) : (
                <ContactUsForm
                  onSubmit={updateContactUs}
                  details={contactUs}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
