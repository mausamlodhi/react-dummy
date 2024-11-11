import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  PageHeader,
  PrivacyPolicyForm,
} from "../../../../components";
import adminRouteMap from "../../../../routeControl/adminRouteMap";
import { logger, modalNotification } from "../../../../utils";
import { AdminManageCms } from "../../../../services/Admin/ManageCms/index.service";

function PrivacyPolicy() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.adminCms.privacyPolicy"),
    },
  ];

  const cmsUpdate = async (values) => {
    setLoading(true);
    try {
      const bodyData = {
        content: values?.message,
      };
      let res = await AdminManageCms.updateTermAndPrivacyService(1, bodyData);
      if (res?.success) {
        modalNotification({
          type: "success",
          message: res?.message,
        });
      } else {
        modalNotification({
          type: "error",
          message: res?.message,
        });
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  const getUSerList = async () => {
    setLoading(true);
    try {
      let res = await AdminManageCms.getTermAndPrivacyService(1);
      if (res?.success) {
        setMessage(res?.data?.content);
      } else {
        modalNotification({
          type: "error",
          message: res?.message,
        });
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUSerList();
  }, []);
  return (
    <>
      <div className="components-preview">
        <div className="nk-block-head nk-block-head-sm">
          <div className="nk-block-between">
            <PageHeader heading={t("text.adminCms.privacyPolicy")}>
              <Breadcrumb breadcrumb={breadcrumb} />
            </PageHeader>
          </div>
        </div>
        <div className="nk-block">
          <div className="card">
            <div className="card-inner">
              <Row>
                <Col lg={12}>
                  <PrivacyPolicyForm
                    onSubmit={cmsUpdate}
                    loading={loading}
                    message={message}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
