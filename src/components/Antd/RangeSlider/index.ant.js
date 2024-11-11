import { Slider } from "antd";

function RangeSlider({ name, value, ...rest }) {
  return (
    <>
      <Slider name={name} value={value} {...rest} />
    </>
  );
}

export default RangeSlider;
