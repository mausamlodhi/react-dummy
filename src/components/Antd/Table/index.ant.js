import { Table as AntTable } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../App.css";
import "./style.scss";

export default function Table({
  columns,
  list,
  page,
  totalSize,
  sizePerPage,
  param,
  tableLoader = false,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTableChange = (pagination, filters, sorter) => {
    const data = {};
    if (sorter && sorter.order) {
      data.sortBy = sorter.columnKey;
      data.sortType = sorter.order === "ascend" ? "ASC" : "DESC";
    }
    if (pagination) {
      data.page = pagination.current;
    }
    if (param?.name) {
      data.name = param?.name;
    }
    const searchParams = new URLSearchParams(data).toString();
    navigate(`${location.pathname}?${searchParams}`);
  };

  return (
    <AntTable
      className="table"
      rowKey="id"
      scroll={{ y: 500 }}
      columns={columns}
      dataSource={list}
      pagination={{
        current: Number(page),
        pageSize: sizePerPage,
        total: totalSize,
      }}
      onChange={handleTableChange}
      loading={tableLoader}
    />
  );
}
