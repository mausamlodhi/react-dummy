import React, { useEffect } from "react";
import { Form, Input } from "antd";

function SearchButton({ onSearch, defaultValue }) {
  const [form] = Form.useForm();
  const { Search } = Input;

  useEffect(() => {
    form.setFieldsValue({
      search: defaultValue,
    });
  }, [defaultValue]);

  function initSearch(e) {
    onSearch(e);
  }

  return (
    <Form form={form}>
      <Form.Item name="search">
        <Search
          placeholder="Search"
          onSearch={initSearch}
          style={{ width: 240 }}
          enterButton
          allowClear
          size="large"
        />
      </Form.Item>
    </Form>
  );
}
export default SearchButton;
