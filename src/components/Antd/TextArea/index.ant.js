import { Form } from "antd";
import { useField } from "formik";
import { useState } from "react";

function AntTextArea({
  Children,
  label,
  name,
  labelClass = "",
  extraClassName = "form-control",
  length,
  ...rest
}) {
  const [field, meta] = useField(name);
  const config = { ...field, ...rest };
  const [textLimit, setTextLimit] = useState(length);

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }
  return (
    <Form.Item
      className="mb-0"
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      {label && <label className={`${labelClass}`}>{label}</label>}
      {length ? (
        <textarea
          {...field}
          {...rest}
          ref={rest.textAreaRef}
          className={extraClassName || ""}
          onKeyUp={(e) => setTextLimit(length - e.target.value.length)}
          maxLength={length}
        >
          {Children}
        </textarea>
      ) : (
        <textarea
          {...field}
          {...rest}
          ref={rest.textAreaRef}
          className={extraClassName || ""}
        >
          {Children}
        </textarea>
      )}
      {length && <div className="text-end">{textLimit}</div>}
    </Form.Item>
  );
}

export default AntTextArea;
