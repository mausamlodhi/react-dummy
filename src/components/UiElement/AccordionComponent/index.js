import React from "react";
import { Accordion } from "react-bootstrap";

function AccordionComponent({
  itemClassName,
  defaultActiveKey = 1,
  eventKey,
  children,
}) {
  return (
    <Accordion defaultActiveKey={defaultActiveKey}>
      <Accordion.Item eventKey={eventKey} className={itemClassName}>
        {children}
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionComponent;
