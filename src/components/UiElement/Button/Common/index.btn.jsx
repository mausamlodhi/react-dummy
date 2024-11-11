import { Button, Spinner } from "react-bootstrap";

function CommonButton({
  children,
  extraClassName = "",
  loading,
  variant = "none",
  ...rest
}) {
  return (
    <Button
      disabled={loading}
      className={`${extraClassName}`}
      variant={variant}
      {...rest}
    >
      {loading ? (
        <>
          {children}{" "}
          <Spinner size="sm" as="div" animation="border" className="ms-2" />
        </>
      ) : (
        children
      )}
    </Button>
  );
}
export default CommonButton;
