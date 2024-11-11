import React from "react";
import { Input } from "antd";
import "./style.scss";

function SearchButton({ onSearch }) {
  const { Search } = Input;

  function initSearch(e) {
    onSearch(e);
  }

  return (
    <Search
      placeholder="Input search text"
      onSearch={initSearch}
      style={{ width: 200 }}
      enterButton
      allowClear
    />
  );
}
export default SearchButton;
