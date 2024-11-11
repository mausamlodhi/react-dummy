import React from "react";
import { Select as AntSelect, Form } from "antd";
import "./style.scss";
import { useField } from "formik";

const { Option } = AntSelect;

function Select({
  children,
  icon,
  arrayOfData,
  label = "",
  name,
  setFieldValue,
  onSelect,
  validateField = false,
  callField,
  focusNext = false,
  focusId = "",
  callback,
  loading,
  ...rest
}) {
  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const handleChangeSelect = (value) => {
    helpers.setValue(value);
    if (validateField) {
      setTimeout(() => {
        callField.validateForm();
      }, 200);
    }
    if (focusNext) {
      setTimeout(() => {
        document.getElementById(focusId)?.focus();
      }, 100);
    }
    if (callback) {
      callback(value);
    }
  };

  return (
    <Form.Item
      className="mb-0"
      label={label}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      {icon}
      <AntSelect
        size="large"
        loading={loading}
        {...field}
        {...rest}
        onChange={onSelect || handleChangeSelect}
      >
        {!loading &&
          arrayOfData?.length > 0 &&
          arrayOfData?.map((item) => (
            <Option
              key={item?.id || item.name}
              disabled={item?.disabled || false}
              value={item.id || undefined}
            >
              {item?.name || item?.label}
            </Option>
          ))}
      </AntSelect>
    </Form.Item>
  );
}

export default Select;
