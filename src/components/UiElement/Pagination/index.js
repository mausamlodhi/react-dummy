import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Pagination({ count, page, sizePerPage, noOfPage, goToPage }) {
  return (
    <Row className="align-items-center">
      <Col xs="7" sm="12" md="9">
        <div className="dataTables_paginate paging_simple_numbers">
          <ul className="pagination mb-0 justify-content-start justify-content-sm-center justify-content-md-start">
            <li
              className={`paginate_button page-item previous ${
                page === 1 ? "disabled disable-link" : ""
              }`}
            >
              <Link
                className="page-link"
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page - 1);
                }}
              >
                Prev
              </Link>
            </li>
            {Array.from(Array(noOfPage).keys()).map((row) => {
              if (noOfPage <= 5) {
                return (
                  <li
                    key={row}
                    className={`paginate_button page-item ${
                      page === row + 1 ? "active" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page !== row + 1) {
                          goToPage(row + 1);
                        }
                      }}
                      to=" #"
                    >
                      {row + 1}
                    </Link>
                  </li>
                );
              }
              if (noOfPage >= 5) {
                if (page < 3) {
                  if (noOfPage === row + 1) {
                    return (
                      <li
                        key={row}
                        className={`paginate_button page-item ${
                          page === row + 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page !== row + 1) {
                              goToPage(row + 1);
                            }
                          }}
                          to="#"
                        >
                          {row + 1}
                        </Link>
                      </li>
                    );
                  }
                  return row < 3 ? (
                    <>
                      <li
                        key={row}
                        className={`paginate_button page-item ${
                          page === row + 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page !== row + 1) {
                              goToPage(row + 1);
                            }
                          }}
                          to=" #"
                        >
                          {row + 1}
                        </Link>
                      </li>
                      {row === 2 && page < 3 ? (
                        <li className="paginate_button page-item disabled">
                          <Link
                            className="page-link"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            to=" #"
                          >
                            . . .
                          </Link>
                        </li>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  );
                }
                if (page >= 3) {
                  if (row === 0) {
                    return (
                      <>
                        <li
                          key={row}
                          className={`page-item ${
                            page === row + 1 ? "active" : ""
                          }`}
                        >
                          <Link
                            className="page-link"
                            onClick={(e) => {
                              e.preventDefault();
                              if (page !== row + 1) {
                                goToPage(row + 1);
                              }
                            }}
                            to="#"
                          >
                            {row + 1}
                          </Link>
                        </li>
                        {page >= 4 ? (
                          <li className="paginate_button page-item disabled">
                            <Link
                              className="page-link"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              to=" #"
                            >
                              . . .
                            </Link>
                          </li>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  }
                  if (row + 1 === noOfPage) {
                    return (
                      <>
                        {page <= noOfPage - 4 ? (
                          <li className="paginate_button page-item disabled">
                            <Link
                              className="page-link"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              to=" #"
                            >
                              . . .
                            </Link>
                          </li>
                        ) : (
                          <></>
                        )}
                        <li
                          key={row}
                          className={`page-item ${
                            page === row + 1 ? "active" : ""
                          }`}
                        >
                          <Link
                            className="page-link"
                            onClick={(e) => {
                              e.preventDefault();
                              if (page !== row + 1) {
                                goToPage(row + 1);
                              }
                            }}
                            to="#"
                          >
                            {row + 1}
                          </Link>
                        </li>
                      </>
                    );
                  }
                  if (page >= row - 1 && page <= row + 2) {
                    return (
                      <li
                        key={row}
                        className={`page-item ${
                          page === row + 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page !== row + 1) {
                              goToPage(row + 1);
                            }
                          }}
                          to="#"
                        >
                          {row + 1}
                        </Link>
                      </li>
                    );
                  }
                  return <></>;
                }
              }
            })}
            <li
              className={`page-item next ${
                noOfPage <= page ? "disabled disable-link" : ""
              }`}
            >
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page + 1);
                }}
                className="page-link"
                to="#"
              >
                Next
              </Link>
            </li>
          </ul>
        </div>
      </Col>
      <Col xs="5" sm="12" md="3" className="text-start text-md-end">
        <div className="dataTables_info">
          {count > 0 ? (parseInt(page) - 1) * parseInt(sizePerPage) + 1 : count}
          -
          {count > 0
            ? page * sizePerPage <= count
              ? page * sizePerPage
              : count
            : count}{" "}
          of {count}
        </div>
      </Col>
    </Row>
  );
}

export default Pagination;
