import { Popover as AntPopover } from "antd";
import "./style.scss";

function Popovers({ title, children, content, visible, setVisible, width, ...rest }) {
  return (
    <AntPopover
      {...rest}
      overlayStyle={{ width }}
      content={content}
      // visible={visible}
      trigger="click"
      // onVisibleChange={(newVisible) => {
      //   setVisible(newVisible);
      // }}
      title={title}
    >
      {children}
    </AntPopover>
  );
}

export default Popovers;
