import { Input as AntInput, Form } from "antd";
import { useField } from "formik";

function Password({
  name,
  toggleIcon,
  icon,
  setFieldValue,
  wrapperFn,
  type = "password",
  ...rest
}) {
  const [field, meta] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  if (wrapperFn) {
    return wrapperFn(
      <AntInput {...field} {...rest} placeholder="Basic usage" />
    );
  }
  return (
    <Form.Item
      className="mb-0"
      label={rest?.label}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      {toggleIcon}
      {icon}
      <input type={type} {...field} {...rest} size="large" />
    </Form.Item>
  );
}

export default Password;
