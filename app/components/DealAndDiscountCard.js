"use client";

import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";

export default function DealAndDiscountCard({ deal }) {
  return (
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
  );
}
