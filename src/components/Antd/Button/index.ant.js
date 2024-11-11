import { Button as AntButton } from "antd";

function Button({ children, ...rest }) {
  return <AntButton {...rest}>{children}</AntButton>;
}

export default Button;
