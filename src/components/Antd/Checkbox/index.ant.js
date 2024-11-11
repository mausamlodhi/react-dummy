import React from "react";
import { Checkbox as AntCheckbox, Form } from "antd";
import { useField } from "formik";

function Checkbox({
  setFieldValue,
  label,
  name,
  defaultChecked = false,
  ...rest
}) {
  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const onChange = (value) => {
    helpers.setValue(value?.target?.checked ? 1 : 0);
  };

  return (
    <Form.Item
      className="mb-0"
      label={label}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      <AntCheckbox
        onChange={onChange}
        defaultChecked={defaultChecked}
        {...rest}
        placeholder="Basic usage"
      />
    </Form.Item>
  );
}

export default Checkbox;
