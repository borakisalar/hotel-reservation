"use client";

import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";

const API_URL = "http://localhost:3001";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await fetch(`${API_URL}/reservations`);
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/reservations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchReservations();
      }
    } catch (err) {
      console.error("Error deleting reservation:", err);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="mb-4">My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <Table striped bordered responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room Type</th>
              <th>Dates</th>
              <th>Guests</th>
              <th>Rooms</th>
              <th>Total</th>
              <th>Guest Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r, index) => (
              <tr key={r.id}>
                <td>{index + 1}</td>
                <td>{r.hotel?.name}</td>
                <td>{r.reservationData?.roomType}</td>
                <td>
                  {r.reservationData?.checkInDate} to{" "}
                  {r.reservationData?.checkOutDate}
                </td>
                <td>{r.reservationData?.guestCount}</td>
                <td>{r.reservationData?.roomCount}</td>
                <td>${r.paymentInformation?.totalAmount}</td>
                <td>
                  {r.guestData?.firstName} {r.guestData?.lastName}
                </td>
                <td>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(r.id)}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
