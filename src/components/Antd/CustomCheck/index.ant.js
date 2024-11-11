import { Form, Checkbox as AntCheckbox } from "antd";
import { useField } from "formik";

function CustomCheckbox({ name, children, setFieldValue, wrapperFn, ...rest }) {
  const [field, meta] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  // if (wrapperFn) {
  //   return wrapperFn(
  //     <input type="checkbox" {...field} {...rest} placeholder="Basic usage" />
  //   );
  // }
  return (
    <Form.Item
      label={rest?.label}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      <AntCheckbox {...rest}>{children}</AntCheckbox>
    </Form.Item>
  );
}

export default CustomCheckbox;
