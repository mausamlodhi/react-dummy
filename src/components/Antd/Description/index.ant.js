import { Descriptions as AntDescriptions } from "antd";

function Description({ children, ...rest }) {
  return <AntDescriptions {...rest}>{children}</AntDescriptions>;
}
export default Description;
