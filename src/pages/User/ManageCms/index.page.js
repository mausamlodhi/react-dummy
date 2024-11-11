import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logger } from "../../../utils";

import { UserManageCmsService } from "../../../services";
import { GlobalLoader, NoDataFound, checkValidData } from "../../../components";

function ManageCms() {
  const location = useLocation();
  const path = location?.pathname;
  const [cmsData, setCmsData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cms = {
    "/privacy-policy": {
      id: 1,
    },
    "/terms-and-condition": {
      id: 2,
    },
  };

  const getCmsData = async (id) => {
    setLoading(true);
    try {
      const res = await UserManageCmsService.getService(id);
      const { success, data } = res;
      if (success) {
        setCmsData(data);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (cms) {
      getCmsData(cms?.[path]?.id);
    }
  }, [path]);

  return (
    <>
      <main className="pageContent mainContent py-50">
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
            <div className="pageContent_head">
              <h1 className="mb-0">{checkValidData(cmsData?.pageName)}</h1>
            </div>
          </div>

          {loading ? (
            <GlobalLoader />
          ) : (
            <>
              {cmsData?.content !== "" ? (
                <p dangerouslySetInnerHTML={{ __html: cmsData?.content }} />
              ) : (
                <NoDataFound />
              )}
            </>
          )}
        </Container>
      </main>
    </>
  );
}

export default ManageCms;
