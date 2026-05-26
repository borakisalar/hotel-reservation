"use client";

import { Card, CardImg, CardBody } from "reactstrap";

export default function PopularSearchCard({ item, onClick }) {
  return (
    <Card
      className="popular-card cursor-pointer"
      onClick={() => onClick(item.title)}
      style={{ cursor: "pointer" }}
    >
      <CardImg top src={item.img} alt={item.title} />
      <CardBody className="bg-dark text-white text-center">
        <h5>{item.title}</h5>
        <p>{item.details}</p>
      </CardBody>
    </Card>
  );
}
