import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Select } from "antd";
import {
  Breadcrumb,
  Charts,
  DatePicker,
  PageHeader,
} from "../../../components";

export const options = {
  responsive: true,
  elements: {
    point: {
      pointStyle: "circle",
      radius: 6,
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
      },
    },
    title: {
      display: false,
    },
  },
};

const labels = ["2015", "2016", "2017", "2018", "2019", "2021", "2022"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Free",
      data: [150, 310, 545, 250, 100, 149, 0],
      borderColor: "rgba(255, 188, 31, 1)",
      backgroundColor: "rgba(255, 188, 31, 0.2)",
      tension: 0.3,
    },
    {
      fill: true,
      label: "Monthly",
      data: [150, 310, 2000, 250, 100, 149, 0],
      borderColor: "rgba(32, 68, 120, 1)",
      backgroundColor: "rgba(32, 68, 120, 0.2)",
      tension: 0.3,
    },
    {
      fill: true,
      label: "Yearly",
      data: [150, 310, 261, 250, 100, 149, 0],
      borderColor: "rgba(56, 171, 200, 1)",
      backgroundColor: "rgba(32, 68, 120, 0.2)",
      tension: 0.3,
    },
  ],
};
export const planData = {
  labels: ["Free", "Monthly", "Yearly"],
  datasets: [
    {
      label: "# of Plan",
      data: [200, 450, 300],
      backgroundColor: [
        "rgba(255, 188, 31, 1)",
        "rgba(32, 68, 120, 1)",
        "rgba(56, 171, 200, 1)",
      ],
      borderWidth: 0,
    },
  ],
};

function Dashboard() {
  const breadcrumb = [
    {
      path: "#",
      name: "DASHBOARD",
    },
  ];
  const [dateFilter, setDateFilter] = useState("");
  const dateFilterData = [
    {
      id: "yearly",
      name: "Yearly",
    },
    {
      id: "monthly",
      name: "Monthly",
    },
    {
      id: "weekly",
      name: "Weekly",
    },
    {
      id: "custom",
      name: "Custom",
    },
  ];
  const planFilterData = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "free",
      name: "Free",
    },
    {
      id: "monthly",
      name: "Monthly",
    },
    {
      id: "annual",
      name: "Annual",
    },
  ];
  const handleChange = (value) => {
    setDateFilter(value);
  };
  return (
    <>
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading="Dashboard">
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <div className="nk-block">
        <div className="dashboardTiles nk-store-statistics">
          <Row className="g-2 g-xxl-4">
            <Col sm="6" md="4" lg="3">
              <Card className="overflow-hidden">
                <Card.Body className="border-success">
                  <div className="d-flex align-items-center">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                      {" "}
                      Total Loops
                    </p>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-3">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-3">
                        1520
                      </h4>
                    </div>
                    <div className="flex-shrink-0">
                      <em className="icon icon-lg bg-success-dim ni ni-layers" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="6" md="4" lg="3">
              <Card className="overflow-hidden">
                <Card.Body className="border-warning">
                  <div className="d-flex align-items-center">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                      {" "}
                      Total Channels
                    </p>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-3">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-3">
                        220
                      </h4>
                    </div>
                    <div className="flex-shrink-0">
                      <em className="icon icon-lg bg-warning-dim ni ni-brick" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="6" md="4" lg="3">
              <Card className="overflow-hidden">
                <Card.Body className="border-danger">
                  <div className="d-flex align-items-center">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                      {" "}
                      Total Users
                    </p>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-3">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-3">
                        1520
                      </h4>
                    </div>
                    <div className="flex-shrink-0">
                      <em className="icon icon-lg bg-danger-dim ni ni-users" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="6" md="4" lg="3">
              <Card className="overflow-hidden">
                <Card.Body className="border-info">
                  <div className="d-flex align-items-center">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                      {" "}
                      Total Active Users
                    </p>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-3">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-3">
                        4542
                      </h4>
                    </div>
                    <div className="flex-shrink-0">
                      <em className="icon icon-lg bg-info-dim ni ni-user-check" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        <Row className="mt-0 g-4">
          <Col xl="12" xxl="8">
            <div className="card card-full">
              <div className="card-inner">
                <div className="card-title-group flex-wrap flex-lg-nowrap mb-3">
                  <div className="card-title">
                    <h6 className="title">Subscribers</h6>
                  </div>
                  <div className="card-tools d-flex flex-wrap flex-lg-nowrap justify-content-end graphFilter">
                    {dateFilter === "custom" ? (
                      <div className="me-0 me-lg-2 customDate">
                        <label className="form-label mb-0">Select date</label>
                        <div className="d-flex flex-column justify-content-end flex-sm-row">
                          <div className="form-control-wrap">
                            <DatePicker
                              name="fromDate"
                              className="form-control date-picker shadow-none"
                              placeholder="DD/MM/YY"
                            />
                          </div>
                          <div className="align-self-center mx-0 mx-sm-1 my-sm-0 my-1">
                            To
                          </div>
                          <div className="form-control-wrap">
                            <DatePicker
                              name="fromDate"
                              className="form-control date-picker shadow-none"
                              placeholder="DD/MM/YY"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="form-group mb-0">
                      <label className="form-label mb-0">Date Range</label>
                      <Select
                        className="w-100"
                        id="dateFilter"
                        name="dateFilter"
                        disabled={false}
                        variant="standard"
                        placeholder="Select"
                        arrayOfData={dateFilterData}
                        onSelectChange={(e) => handleChange(e)}
                        defaultValue="Yearly"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <label className="form-label mb-0">Plan</label>
                      <br />
                      <Select
                        className="w-100"
                        size="medium"
                        id="dateFilter"
                        name="dateFilter"
                        disabled={false}
                        variant="standard"
                        placeholder="Select"
                        arrayOfData={planFilterData}
                        defaultValue="All"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Charts type="line" options={options} data={data} />
                </div>
              </div>
            </div>
          </Col>
          <Col xl="12" xxl="4">
            <div className="card card-full">
              <div className="card-inner">
                <div className="card-title-group mb-3">
                  <div className="card-title">
                    <h6 className="title">Plans</h6>
                  </div>
                </div>
                <div style={{ maxWidth: "350px", margin: "0 auto" }}>
                  <Charts type="doughnut" data={planData} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
