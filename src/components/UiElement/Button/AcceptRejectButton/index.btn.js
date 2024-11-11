import { Button } from "react-bootstrap";

function AcceptRejectButton({
  children,
  extraClassName,
  imageClassName,
  loading,
  text,
  ...rest
}) {
  return (
    <Button disabled={loading} className={extraClassName} {...rest}>
      <em className={imageClassName} />
      {text}
    </Button>
  );
}
export default AcceptRejectButton;
