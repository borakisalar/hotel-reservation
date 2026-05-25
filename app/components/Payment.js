"use client";

import { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const API_URL = "http://localhost:3001";

export default function Payment({ bookingData, onBack }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});

  const { hotel, reservationData, amountInfo } = bookingData;

  const validateForm = () => {
    const nextErrors = {};
    const cleanCardNumber = cardNumber.replace(/\D/g, "");
    const cleanPhone = phone.replace(/\D/g, "");

    if (!firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (cleanPhone.length < 10) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (cleanCardNumber.length !== 16) {
      nextErrors.cardNumber = "Card number must contain 16 digits.";
    }
    if (!cardHolder.trim()) {
      nextErrors.cardHolder = "Card holder is required.";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      nextErrors.expiry = "Use MM/YY format.";
    } else {
      const [month, year] = expiry.split("/").map(Number);
      const expiryDate = new Date(2000 + year, month);
      const now = new Date();
      if (expiryDate <= new Date(now.getFullYear(), now.getMonth())) {
        nextErrors.expiry = "Card expiry date must be in the future.";
      }
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      nextErrors.cvv = "CVV must be 3 or 4 digits.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const reservation = {
      hotel: { name: hotel.name, address: hotel.address, image: hotel.image },
      reservationData: reservationData,
      guestData: {
        firstName,
        lastName,
        email,
        phone,
      },
      paymentInformation: {
        paymentMethod: "Credit Card",
        cardInfo: {
          cardNumber: cardNumber.replace(/\D/g, ""),
          cardHolder,
          expiryDate: expiry,
          cvv,
        },
        totalAmount: amountInfo.totalAmount,
      },
    };

    try {
      const res = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });

      if (res.ok) {

        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setCardNumber("");
        setCardHolder("");
        setExpiry("");
        setCvv("");
        setErrors({});
        setCompleted(true);
        alert("Booking has been successfully completed! Thank you.");
      }
    } catch (err) {
      alert("Error saving reservation. Please try again.");
    }
  };

  return (
    <div className="mb-5">
      <Button color="secondary" size="sm" className="mb-3" onClick={onBack}>
        &larr; Back
      </Button>
      <h2 className="mb-4">Complete Your Booking</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <CardBody>
              <h4 className="card-title">Guest Information</h4>
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <FormGroup>
                      <Label>First Name</Label>
                      <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        required
                      />
                      {errors.firstName && (
                        <div style={{ color: "red", fontSize: "0.9em" }}>
                          {errors.firstName}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        required
                      />
                      {errors.lastName && (
                        <div style={{ color: "red", fontSize: "0.9em" }}>
                          {errors.lastName}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                      {errors.email && (
                        <div style={{ color: "red", fontSize: "0.9em" }}>
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Phone</Label>
                      <div className="input-group">
                        <select
                          className="form-select"
                          style={{ maxWidth: "120px" }}
                        >
                          <option value="+90">🇹🇷 +90</option>
                        </select>
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="555 555 55 55"
                          required
                        />
                      </div>
                      {errors.phone && (
                        <div style={{ color: "red", fontSize: "0.9em" }}>
                          {errors.phone}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <h4 className="mt-4">Payment Information</h4>
                <Row className="g-3 mt-2">
                  <Col xs={12}>
                    <FormGroup>
                      <Label>Card Number</Label>
                      <Input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234-5678-9012-3456"
                        required
                      />
                      {errors.cardNumber && (
                        <div style={{ color: "red", fontSize: "0.9em" }}>
                          {errors.cardNumber}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Card Holder</Label>
                      <Input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                      {errors.cardHolder && (
                        <div style={{ color: "red", fontSize: "0.9em" }}>
                          {errors.cardHolder}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Expiry (MM/YY)</Label>
                      <Input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="05/28"
                        required
                      />
                      {errors.expiry && (
                        <div style={{ color: "red", fontSize: "0.9em" }}>
                          {errors.expiry}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>CVV</Label>
                      <Input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        required
                      />
                      {errors.cvv && (
                        <div style={{ color: "red", fontSize: "0.9em" }}>
                          {errors.cvv}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xs={12} className="mt-4 text-end">
                    <Button color="success" size="lg" type="submit">
                      Complete the Booking
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h4">Booking Summary</CardTitle>
              <hr />
              {!completed ? (
                <>
                  <p><strong>Hotel:</strong> {hotel.name}</p>
                  <p><strong>Address:</strong> {hotel.address}</p>
                  <p><strong>Room Type:</strong> {reservationData.roomType}</p>
                  <p><strong>Dates:</strong> {reservationData.checkInDate} to {reservationData.checkOutDate}</p>
                  <p><strong>Guests:</strong> {reservationData.guestCount}</p>
                  <p><strong>Rooms:</strong> {reservationData.roomCount}</p>
                  <hr />
                  <h5 className="text-success text-end">
                    Total: ${amountInfo.totalAmount}
                  </h5>
                </>
              ) : (
                <p className="text-muted">Booking completed.</p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
