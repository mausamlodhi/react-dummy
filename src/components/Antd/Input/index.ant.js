import { Form } from "antd";
import { useField } from "formik";

function Input({
  formItemClass = "",
  name,
  icon,
  setFieldValue,
  addonAfter,
  ...rest
}) {
  const [field, meta] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return (
    <Form.Item
      className={`mb-0 ${formItemClass}`}
      label={rest?.label}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      {icon}
      <input type="text" {...field} {...rest} />
      {addonAfter}
    </Form.Item>
  );
}

export default Input;
