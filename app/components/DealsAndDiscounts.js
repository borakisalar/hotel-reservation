"use client";

import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col, Button } from "reactstrap";

export default function DealsAndDiscounts({ deals }) {
  if (!deals || deals.length === 0) return null;

  return (
    <div className="mb-5">
      <h3 className="mb-3">Deals &amp; Discounts</h3>
      <Row className="g-3">
        {deals.map((deal) => (
          <Col sm={6} md={4} lg={3} key={deal.id}>
            <Card className="deal-card h-100">
              <CardImg top src={deal.img} alt={deal.title} />
              <CardBody>
                <CardTitle tag="h5">{deal.title}</CardTitle>
                <CardText>{deal.details}</CardText>
                <Button size="sm" outline color="primary" className="mt-2">
                  Learn More
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
