import { Card as AntCard } from "antd";

function Card({ children, ...rest }) {
  return <AntCard {...rest}>{children}</AntCard>;
}
export default Card;
