import { Form as AntForm } from "antd";

function Form({ children, ...rest }) {
  return <AntForm {...rest}>{children}</AntForm>;
}
export default Form;
