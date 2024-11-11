import React, { useState, useEffect, useMemo } from "react";

import { Accordion, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logger } from "../../../utils";
import { FaqService } from "../../../services";
import {
  AccordionComponent,
  CommonButton,
  GlobalLoader,
  NoDataFound,
} from "../../../components";

function Faq() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const onShowMore = () => {
    setPage(page + 10);
  };
  const limit = useMemo(() => {
    return 10;
  }, []);

  const getFaqs = async (list) => {
    setLoading(true);
    try {
      let queryParams = { offset: page, limit };
      const res = await FaqService.getFaq(queryParams);
      const { data, success } = res;
      if (success) {
        if (list) {
          setFaqData([...list, ...data?.rows]);
        } else {
          setFaqData(data?.rows);
        }
        setCount(data?.count);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFaqs();
  }, []);

  useEffect(() => {
    getFaqs(faqData);
  }, [page]);

  return (
    <>
      <section className="faqPage mainContent py-50">
        <Container>
          <div className="pageContent_head position-relative text-center">
            <Link
              className="backIcon me-2 me-xl-3 position-absolute start-0"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              <em className="icon-back" />
            </Link>
            <h1 className="mb-0">{t("text.adminCms.faq")}</h1>
          </div>

          <>
            {loading ? (
              <GlobalLoader />
            ) : faqData?.length > 0 ? (
              faqData.map((item, key) => {
                return (
                  <AccordionComponent defaultActiveKey={0} eventKey={key}>
                    <Accordion.Header>
                      <span>{key + 1}. </span>
                      {item?.question}
                    </Accordion.Header>
                    <Accordion.Body>{item?.answer}</Accordion.Body>
                  </AccordionComponent>
                );
              })
            ) : (
              <NoDataFound />
            )}
            {count > faqData?.length && (
              <div className="text-center">
                <CommonButton
                  onClick={() => {
                    onShowMore();
                  }}
                  className="w-20 btn btn-warning"
                >
                  {t("text.common.loadMore")}
                </CommonButton>
              </div>
            )}
          </>
        </Container>
      </section>
    </>
  );
}

export default Faq;
