import { Rate as AntRate, Form } from "antd";
// import { useField } from "formik";

function Rate({ children, disabled, name, label, ...rest }) {
  // const [field, meta] = useField(name);
  // const config = { ...field, ...rest };

  // if (meta && meta.touched && meta.error) {
  //   config.error = true;
  //   config.helperText = meta.error;
  // }
  return (
    <Form.Item
      // help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      // validateStatus={config.error ? "error" : "success"}
      label={label}
    >
      <AntRate {...rest} allowHal
      // {...field}
       >
        {children}
      </AntRate>
    </Form.Item>
  );
}

export default Rate;
