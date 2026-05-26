"use client";

import { Row, Col } from "reactstrap";
import DealAndDiscountCard from "./DealAndDiscountCard";

export default function DealsAndDiscounts({ deals }) {
  if (!deals || deals.length === 0) return null;

  return (
    <div className="mb-5">
      <h3 className="mb-3">Deals &amp; Discounts</h3>
      <Row className="g-3">
        {deals.map((deal) => (
          <Col sm={6} md={4} lg={3} key={deal.id}>
            <DealAndDiscountCard deal={deal} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
