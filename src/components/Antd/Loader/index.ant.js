import { Space as AntLoader, Spin } from "antd";

function Loader() {
  return (
    <AntLoader size="middle">
      <Spin size="large" />
    </AntLoader>
  );
}

export default Loader;
