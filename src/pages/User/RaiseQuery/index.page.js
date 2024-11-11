import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RaiseQueryForm } from "../../../components";
import { logger, modalNotification } from "../../../utils";
import { RaiseQueryServices } from "../../../services";
import userRoutesMap from "../../../routeControl/userRouteMap";

function RaiseQuery() {
  const { t } = useTranslation();
  const [categoryData, setCategoryData] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCategory = async () => {
    setCategoryLoading(true);
    try {
      const response = await RaiseQueryServices.getCategoryService();
      if (response?.success) {
        let data = response?.data?.rows?.map((item) => {
          return {
            label: item?.name,
            id: item?.id,
          };
        });
        setCategoryData(data);
      }
    } catch (error) {
      logger(error);
    }
    setCategoryLoading(false);
  };

  const onSubmit = async (value, resetForm) => {
    setLoading(true);
    try {
      let bodyData = {
        ...value,
      };
      const response = await RaiseQueryServices.addQuery(bodyData);
      if (response?.success) {
        modalNotification({
          type: "success",
          message: response?.message,
        });
      }
      resetForm();
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <main className="pageContent raiseQuery mainContent py-50">
        <Container>
          <div className="pageContent_head position-relative text-center">
            <Link
              class="backIcon me-2 me-xl-3 position-absolute start-0"
              to={userRoutesMap.LOOPS.path}
            >
              <em className="icon-back" />
            </Link>
            <h1 className="mb-0">{t("text.raiseQuery.raiseQuery")}</h1>
          </div>
          <RaiseQueryForm
            onSubmit={onSubmit}
            t={t}
            categoryData={categoryData}
            categoryLoading={categoryLoading}
            loading={loading}
          />
        </Container>
      </main>
    </>
  );
}

export default RaiseQuery;
