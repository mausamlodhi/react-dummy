import { Button } from "react-bootstrap";

function GradientButton({ children, extraClassName, loading, ...rest }) {
  return (
    <Button
      disabled={loading}
      className={`btn btn-primary btn-gradiant ${extraClassName}`}
      {...rest}
    >
      {children}
    </Button>
  );
}
export default GradientButton;
