import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Bookings() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [bookings, setBookings] = useState([
    {
      id: "PR1001",
      guest: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
      room: "Ocean View Suite",
      checkIn: "16 Sep 2026",
      checkOut: "19 Sep 2026",
      guests: 2,
      amount: "₹18,500",
      status: "Confirmed",
    },
    {
      id: "PR1002",
      guest: "Ananya Sharma",
      email: "ananya@example.com",
      phone: "+91 91234 56789",
      room: "Beach Villa",
      checkIn: "17 Sep 2026",
      checkOut: "20 Sep 2026",
      guests: 3,
      amount: "₹27,000",
      status: "Pending",
    },
    {
      id: "PR1003",
      guest: "Vikram Mehta",
      email: "vikram@example.com",
      phone: "+91 99887 66554",
      room: "Presidential Villa",
      checkIn: "18 Sep 2026",
      checkOut: "22 Sep 2026",
      guests: 4,
      amount: "₹52,000",
      status: "Confirmed",
    },
    {
      id: "PR1004",
      guest: "Sneha Reddy",
      email: "sneha@example.com",
      phone: "+91 90123 45678",
      room: "Garden Deluxe",
      checkIn: "19 Sep 2026",
      checkOut: "21 Sep 2026",
      guests: 2,
      amount: "₹12,500",
      status: "Cancelled",
    },
    {
      id: "PR1005",
      guest: "Arjun Rao",
      email: "arjun@example.com",
      phone: "+91 93456 78901",
      room: "Ocean View Suite",
      checkIn: "20 Sep 2026",
      checkOut: "23 Sep 2026",
      guests: 2,
      amount: "₹21,500",
      status: "Pending",
    },
  ]);

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter =
      filter === "All" || booking.status === filter;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      booking.guest.toLowerCase().includes(searchText) ||
      booking.id.toLowerCase().includes(searchText) ||
      booking.room.toLowerCase().includes(searchText) ||
      booking.email.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );

    setSelectedBooking((previousBooking) =>
      previousBooking
        ? { ...previousBooking, status: newStatus }
        : null
    );
  };

  const createBooking = (e) => {
    e.preventDefault();

    const form = e.target;

    const newId =
      "PR" +
      String(
        Math.max(
          ...bookings.map((booking) =>
            Number(booking.id.replace("PR", ""))
          )
        ) + 1
      ).padStart(4, "0");

    const newBooking = {
      id: newId,
      guest: form.guestName.value,
      email: form.email.value,
      phone: form.phone.value,
      room: form.room.value,
      checkIn: form.checkIn.value,
      checkOut: form.checkOut.value,
      guests: Number(form.guests.value),
      amount: "₹0",
      status: form.status.value,
    };

    setBookings((previousBookings) => [
      ...previousBookings,
      newBooking,
    ]);

    setShowNewBooking(false);
    form.reset();
  };

  return (
    <div className="bookings-page">

      {/* ================= HEADER ================= */}

      <motion.div
        className="bookings-header"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <div>
          <p>RESERVATION MANAGEMENT</p>

          <h1>Bookings</h1>

          <span>
            Manage and monitor all Paradise Resort
            reservations.
          </span>
        </div>

        <button
          className="add-booking"
          onClick={() => setShowNewBooking(true)}
        >
          + New Booking
        </button>
      </motion.div>


      {/* ================= SUMMARY ================= */}

      <div className="booking-summary">

        <div className="summary-card">
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </div>

        <div className="summary-card">
          <span>Confirmed</span>
          <strong>
            {
              bookings.filter(
                (b) => b.status === "Confirmed"
              ).length
            }
          </strong>
        </div>

        <div className="summary-card">
          <span>Pending</span>
          <strong>
            {
              bookings.filter(
                (b) => b.status === "Pending"
              ).length
            }
          </strong>
        </div>

        <div className="summary-card">
          <span>Cancelled</span>
          <strong>
            {
              bookings.filter(
                (b) => b.status === "Cancelled"
              ).length
            }
          </strong>
        </div>

      </div>


      {/* ================= FILTERS ================= */}

      <div className="booking-toolbar">

        <div className="filter-buttons">

          {[
            "All",
            "Confirmed",
            "Pending",
            "Cancelled",
          ].map((item) => (

            <button
              key={item}
              className={
                filter === item
                  ? "filter-active"
                  : ""
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>

          ))}

        </div>

        <input
          type="text"
          className="booking-search"
          placeholder="Search guest or booking ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* ================= BOOKINGS TABLE ================= */}

      <motion.div
        className="bookings-table-card"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.15,
        }}
      >

        <div className="table-scroll">

          <table>

            <thead>
              <tr>
                <th>BOOKING</th>
                <th>GUEST</th>
                <th>ROOM</th>
                <th>STAY</th>
                <th>GUESTS</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filteredBookings.map(
                (booking, index) => (

                  <motion.tr
                    key={booking.id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                  >

                    <td>
                      <strong className="booking-id">
                        {booking.id}
                      </strong>
                    </td>

                    <td>
                      <div className="guest-cell">

                        <div className="guest-avatar">
                          {booking.guest
                            .split(" ")
                            .map((word) =>
                              word[0]
                            )
                            .join("")}
                        </div>

                        <div>
                          <strong>
                            {booking.guest}
                          </strong>

                          <span>
                            {booking.email}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="room-name">
                        {booking.room}
                      </span>
                    </td>

                    <td>
                      <div className="stay-cell">
                        <strong>
                          {booking.checkIn}
                        </strong>

                        <span>
                          → {booking.checkOut}
                        </span>
                      </div>
                    </td>

                    <td>
                      {booking.guests}
                    </td>

                    <td>
                      <strong>
                        {booking.amount}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`booking-status ${booking.status.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-button"
                        onClick={() =>
                          setSelectedBooking(
                            booking
                          )
                        }
                      >
                        View
                      </button>
                    </td>

                  </motion.tr>

                )
              )}

              {filteredBookings.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#718183",
                    }}
                  >
                    No bookings found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </motion.div>


      {/* ================= BOOKING DETAILS ================= */}

      <AnimatePresence>

        {selectedBooking && (

          <motion.div
            className="booking-modal-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelectedBooking(null)
            }
          >

            <motion.div
              className="booking-modal"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedBooking(null)
                }
              >
                ×
              </button>

              <p>BOOKING DETAILS</p>

              <h2>
                {selectedBooking.id}
              </h2>

              <div className="modal-status">
                <span
                  className={`booking-status ${selectedBooking.status.toLowerCase()}`}
                >
                  {selectedBooking.status}
                </span>
              </div>

              <div className="details-list">

                <div>
                  <span>Guest</span>
                  <strong>
                    {selectedBooking.guest}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedBooking.email}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedBooking.phone}
                  </strong>
                </div>

                <div>
                  <span>Room</span>
                  <strong>
                    {selectedBooking.room}
                  </strong>
                </div>

                <div>
                  <span>Check-in</span>
                  <strong>
                    {selectedBooking.checkIn}
                  </strong>
                </div>

                <div>
                  <span>Check-out</span>
                  <strong>
                    {selectedBooking.checkOut}
                  </strong>
                </div>

                <div>
                  <span>Guests</span>
                  <strong>
                    {selectedBooking.guests}
                  </strong>
                </div>

                <div>
                  <span>Total Amount</span>
                  <strong>
                    {selectedBooking.amount}
                  </strong>
                </div>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="confirm-button"
                  disabled={
                    selectedBooking.status === "Confirmed"
                  }
                  onClick={() =>
                    updateBookingStatus(
                      selectedBooking.id,
                      "Confirmed"
                    )
                  }
                >
                  {selectedBooking.status === "Confirmed"
                    ? "CONFIRMED"
                    : "CONFIRM BOOKING"}
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  disabled={
                    selectedBooking.status === "Cancelled"
                  }
                  onClick={() =>
                    updateBookingStatus(
                      selectedBooking.id,
                      "Cancelled"
                    )
                  }
                >
                  {selectedBooking.status === "Cancelled"
                    ? "CANCELLED"
                    : "CANCEL BOOKING"}
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ================= NEW BOOKING ================= */}

      <AnimatePresence>
        {showNewBooking && (
          <motion.div
            className="new-booking-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNewBooking(false)}
          >
            <motion.div
              className="new-booking-modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setShowNewBooking(false)}
              >
                ×
              </button>

              <p>RESERVATION MANAGEMENT</p>
              <h2>New Booking</h2>

              <form
                className="new-booking-form"
                onSubmit={createBooking}
              >
                <div className="form-field">
                  <label>Guest Name</label>
                  <input
                      name="guestName"
                      type="text"
                      placeholder="Enter guest name"
                      required
                    />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="guest@example.com"
                        required
                      />
                  </div>

                  <div className="form-field">
                    <label>Phone</label>
                    <input
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                      />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Room</label>
                    <select
                      name="room"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Select room</option>
                      <option>Ocean View Suite</option>
                      <option>Beach Villa</option>
                      <option>Presidential Villa</option>
                      <option>Garden Deluxe</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Guests</label>
                    <input
                      name="guests"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="2"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Check-in</label>
                    <input
                      name="checkIn"
                      type="date"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Check-out</label>
                    <input
                      name="checkOut"
                      type="date"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Booking Status</label>
                  <select
                    name="status"
                    defaultValue="Pending"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div className="new-booking-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowNewBooking(false)}
                  >
                    CLOSE
                  </button>

                  <button type="submit" className="confirm-button">
                    CREATE BOOKING
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ================= STYLES ================= */}

      <style>
        {`

        .bookings-page {
          min-height: 100vh;
          width: 100%;
          padding: 40px;
          background: #071c25;
          color: #f4efe5;
        }

        .bookings-page *,
        .bookings-page *::before,
        .bookings-page *::after {
          box-sizing: border-box;
        }

        .bookings-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 30px;
        }

        .bookings-header p {
          margin: 0 0 8px;
          color: #d6b46a;
          font-size: 9px;
          letter-spacing: 3px;
        }

        .bookings-header h1 {
          margin: 0;
          font-size: 34px;
          font-weight: 400;
        }

        .bookings-header span {
          display: block;
          margin-top: 9px;
          color: #78888a;
          font-size: 12px;
        }

        .add-booking {
          border: 1px solid #d6b46a;
          background: #d6b46a;
          color: #071719;
          padding: 13px 20px;
          font-size: 10px;
          letter-spacing: 1px;
          cursor: pointer;
        }


        /* SUMMARY */

        .booking-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .summary-card {
          padding: 20px;
          background: #0a202a;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .summary-card span {
          display: block;
          color: #718082;
          font-size: 9px;
          letter-spacing: 1.5px;
        }

        .summary-card strong {
          display: block;
          margin-top: 12px;
          font-size: 27px;
          font-weight: 400;
        }


        /* TOOLBAR */

        .booking-toolbar {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 15px;
        }

        .filter-buttons {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .filter-buttons button {
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: #758587;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 10px;
        }

        .filter-buttons button:hover,
        .filter-buttons .filter-active {
          border-color: rgba(214,180,106,0.35);
          color: #d6b46a;
          background: rgba(214,180,106,0.06);
        }

        .booking-search {
          width: 280px;
          border: 1px solid rgba(255,255,255,0.1);
          background: #0a202a;
          color: #f4efe5;
          outline: none;
          padding: 10px 14px;
          font-size: 11px;
        }

        .booking-search::placeholder {
          color: #647577;
        }

        .booking-search:focus {
          border-color: rgba(214,180,106,0.45);
        }


        /* TABLE */

        .bookings-table-card {
          background: #0a202a;
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
        }

        .table-scroll {
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 1000px;
          border-collapse: collapse;
          background: #0a202a;
        }

        th {
          padding: 15px;
          text-align: left;
          color: #8a9899;
          font-size: 8px;
          letter-spacing: 1.5px;
          font-weight: 500;
          background: #0d2935;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        td {
          padding: 16px 15px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: #0a202a;
          color: #a0abad;
          font-size: 11px;
          white-space: nowrap;
        }

        tbody tr:hover {
          background: rgba(214,180,106,0.025);
        }

        .booking-id {
          color: #d6b46a;
          font-size: 10px;
        }

        .guest-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .guest-avatar {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(214,180,106,0.1);
          color: #d6b46a;
          font-size: 9px;
        }

        .guest-cell strong,
        .guest-cell span {
          display: block;
        }

        .guest-cell strong {
          color: #f4efe5;
          font-size: 11px;
        }

        .guest-cell span {
          color: #697a7c;
          margin-top: 3px;
          font-size: 9px;
        }

        .room-name {
          color: #c1c7c5;
        }

        .stay-cell strong,
        .stay-cell span {
          display: block;
        }

        .stay-cell strong {
          color: #c1c7c5;
          font-size: 10px;
        }

        .stay-cell span {
          margin-top: 3px;
          color: #697a7c;
          font-size: 9px;
        }


        /* STATUS */

        .booking-status {
          display: inline-block;
          padding: 6px 9px;
          font-size: 8px;
        }

        .booking-status.confirmed {
          color: #79b783;
          background: rgba(76,150,95,0.1);
        }

        .booking-status.pending {
          color: #d6b46a;
          background: rgba(214,180,106,0.1);
        }

        .booking-status.cancelled {
          color: #c67c7c;
          background: rgba(198,124,124,0.1);
        }

        .view-button {
          border: none;
          background: transparent;
          color: #d6b46a;
          cursor: pointer;
          font-size: 10px;
        }


        /* MODAL */

        .booking-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(8px);
        }

        .booking-modal {
          position: relative;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 35px;
          background: #0a202a;
          border: 1px solid rgba(214,180,106,0.25);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }

        .modal-close {
          position: absolute;
          right: 18px;
          top: 15px;
          border: none;
          background: transparent;
          color: #829294;
          font-size: 25px;
          cursor: pointer;
        }

        .booking-modal > p {
          margin: 0 0 7px;
          color: #d6b46a;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .booking-modal h2 {
          margin: 0;
          font-size: 27px;
          font-weight: 400;
        }

        .modal-status {
          margin: 15px 0 25px;
        }

        .details-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .details-list div {
          padding: 12px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .details-list span,
        .details-list strong {
          display: block;
        }

        .details-list span {
          color: #697a7c;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .details-list strong {
          margin-top: 6px;
          color: #e6e1d7;
          font-size: 11px;
          font-weight: 400;
          word-break: break-word;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 25px;
        }

        .modal-actions button {
          flex: 1;
          padding: 13px;
          cursor: pointer;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .confirm-button {
          border: 1px solid #d6b46a;
          background: #d6b46a;
          color: #071719;
        }

        .cancel-button {
          border: 1px solid rgba(198,124,124,0.4);
          background: transparent;
          color: #c67c7c;
        }


        /* NEW BOOKING MODAL */

        .new-booking-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(8px);
        }

        .new-booking-modal {
          position: relative;
          width: 100%;
          max-width: 620px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 35px;
          background: #0a202a;
          border: 1px solid rgba(214,180,106,0.25);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }

        .new-booking-modal > p {
          margin: 0 0 7px;
          color: #d6b46a;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .new-booking-modal h2 {
          margin: 0 0 25px;
          font-size: 27px;
          font-weight: 400;
        }

        .new-booking-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-field label {
          color: #697a7c;
          font-size: 8px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .form-field input,
        .form-field select {
          width: 100%;
          min-height: 42px;
          padding: 10px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          outline: none;
          background: rgba(255,255,255,0.025);
          color: #f4efe5;
          font-size: 11px;
          box-sizing: border-box;
        }

        .form-field input::placeholder {
          color: #536365;
        }

        .form-field input:focus,
        .form-field select:focus {
          border-color: rgba(214,180,106,0.45);
        }

        .form-field select option {
          background: #0a202a;
          color: #f4efe5;
        }

        .new-booking-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .new-booking-actions button {
          flex: 1;
          padding: 13px;
          cursor: pointer;
          font-size: 9px;
          letter-spacing: 1px;
        }


        /* MOBILE */

        @media (max-width: 800px) {

          .bookings-page {
            padding: 25px 20px;
          }

          .bookings-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .booking-summary {
            grid-template-columns: repeat(2, 1fr);
          }

          .booking-toolbar {
            flex-direction: column;
          }

          .booking-search {
            width: 100%;
          }

        }

        @media (max-width: 500px) {

          .bookings-page {
            padding: 20px 15px;
          }

          .bookings-header h1 {
            font-size: 28px;
          }

          .booking-summary {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .summary-card {
            padding: 15px;
          }

          .summary-card strong {
            font-size: 23px;
          }

          .filter-buttons button {
            padding: 8px 10px;
          }

          .booking-modal {
            padding: 25px 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .new-booking-actions {
            flex-direction: column;
          }

          .details-list {
            grid-template-columns: 1fr;
          }

          .modal-actions {
            flex-direction: column;
          }

        }

        `}
      </style>

    </div>
  );
}import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Bookings() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [bookings, setBookings] = useState([
    {
      id: "PR1001",
      guest: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
      room: "Ocean View Suite",
      checkIn: "16 Sep 2026",
      checkOut: "19 Sep 2026",
      guests: 2,
      amount: "₹18,500",
      status: "Confirmed",
    },
    {
      id: "PR1002",
      guest: "Ananya Sharma",
      email: "ananya@example.com",
      phone: "+91 91234 56789",
      room: "Beach Villa",
      checkIn: "17 Sep 2026",
      checkOut: "20 Sep 2026",
      guests: 3,
      amount: "₹27,000",
      status: "Pending",
    },
    {
      id: "PR1003",
      guest: "Vikram Mehta",
      email: "vikram@example.com",
      phone: "+91 99887 66554",
      room: "Presidential Villa",
      checkIn: "18 Sep 2026",
      checkOut: "22 Sep 2026",
      guests: 4,
      amount: "₹52,000",
      status: "Confirmed",
    },
    {
      id: "PR1004",
      guest: "Sneha Reddy",
      email: "sneha@example.com",
      phone: "+91 90123 45678",
      room: "Garden Deluxe",
      checkIn: "19 Sep 2026",
      checkOut: "21 Sep 2026",
      guests: 2,
      amount: "₹12,500",
      status: "Cancelled",
    },
    {
      id: "PR1005",
      guest: "Arjun Rao",
      email: "arjun@example.com",
      phone: "+91 93456 78901",
      room: "Ocean View Suite",
      checkIn: "20 Sep 2026",
      checkOut: "23 Sep 2026",
      guests: 2,
      amount: "₹21,500",
      status: "Pending",
    },
  ]);

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter =
      filter === "All" || booking.status === filter;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      booking.guest.toLowerCase().includes(searchText) ||
      booking.id.toLowerCase().includes(searchText) ||
      booking.room.toLowerCase().includes(searchText) ||
      booking.email.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );

    setSelectedBooking((previousBooking) =>
      previousBooking
        ? { ...previousBooking, status: newStatus }
        : null
    );
  };

  const createBooking = (e) => {
    e.preventDefault();

    const form = e.target;

    const newId =
      "PR" +
      String(
        Math.max(
          ...bookings.map((booking) =>
            Number(booking.id.replace("PR", ""))
          )
        ) + 1
      ).padStart(4, "0");

    const newBooking = {
      id: newId,
      guest: form.guestName.value,
      email: form.email.value,
      phone: form.phone.value,
      room: form.room.value,
      checkIn: form.checkIn.value,
      checkOut: form.checkOut.value,
      guests: Number(form.guests.value),
      amount: "₹0",
      status: form.status.value,
    };

    setBookings((previousBookings) => [
      ...previousBookings,
      newBooking,
    ]);

    setShowNewBooking(false);
    form.reset();
  };

  return (
    <div className="bookings-page">

      {/* ================= HEADER ================= */}

      <motion.div
        className="bookings-header"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <div>
          <p>RESERVATION MANAGEMENT</p>

          <h1>Bookings</h1>

          <span>
            Manage and monitor all Paradise Resort
            reservations.
          </span>
        </div>

        <button
          className="add-booking"
          onClick={() => setShowNewBooking(true)}
        >
          + New Booking
        </button>
      </motion.div>


      {/* ================= SUMMARY ================= */}

      <div className="booking-summary">

        <div className="summary-card">
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </div>

        <div className="summary-card">
          <span>Confirmed</span>
          <strong>
            {
              bookings.filter(
                (b) => b.status === "Confirmed"
              ).length
            }
          </strong>
        </div>

        <div className="summary-card">
          <span>Pending</span>
          <strong>
            {
              bookings.filter(
                (b) => b.status === "Pending"
              ).length
            }
          </strong>
        </div>

        <div className="summary-card">
          <span>Cancelled</span>
          <strong>
            {
              bookings.filter(
                (b) => b.status === "Cancelled"
              ).length
            }
          </strong>
        </div>

      </div>


      {/* ================= FILTERS ================= */}

      <div className="booking-toolbar">

        <div className="filter-buttons">

          {[
            "All",
            "Confirmed",
            "Pending",
            "Cancelled",
          ].map((item) => (

            <button
              key={item}
              className={
                filter === item
                  ? "filter-active"
                  : ""
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>

          ))}

        </div>

        <input
          type="text"
          className="booking-search"
          placeholder="Search guest or booking ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* ================= BOOKINGS TABLE ================= */}

      <motion.div
        className="bookings-table-card"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.15,
        }}
      >

        <div className="table-scroll">

          <table>

            <thead>
              <tr>
                <th>BOOKING</th>
                <th>GUEST</th>
                <th>ROOM</th>
                <th>STAY</th>
                <th>GUESTS</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filteredBookings.map(
                (booking, index) => (

                  <motion.tr
                    key={booking.id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                  >

                    <td>
                      <strong className="booking-id">
                        {booking.id}
                      </strong>
                    </td>

                    <td>
                      <div className="guest-cell">

                        <div className="guest-avatar">
                          {booking.guest
                            .split(" ")
                            .map((word) =>
                              word[0]
                            )
                            .join("")}
                        </div>

                        <div>
                          <strong>
                            {booking.guest}
                          </strong>

                          <span>
                            {booking.email}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="room-name">
                        {booking.room}
                      </span>
                    </td>

                    <td>
                      <div className="stay-cell">
                        <strong>
                          {booking.checkIn}
                        </strong>

                        <span>
                          → {booking.checkOut}
                        </span>
                      </div>
                    </td>

                    <td>
                      {booking.guests}
                    </td>

                    <td>
                      <strong>
                        {booking.amount}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`booking-status ${booking.status.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-button"
                        onClick={() =>
                          setSelectedBooking(
                            booking
                          )
                        }
                      >
                        View
                      </button>
                    </td>

                  </motion.tr>

                )
              )}

              {filteredBookings.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#718183",
                    }}
                  >
                    No bookings found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </motion.div>


      {/* ================= BOOKING DETAILS ================= */}

      <AnimatePresence>

        {selectedBooking && (

          <motion.div
            className="booking-modal-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelectedBooking(null)
            }
          >

            <motion.div
              className="booking-modal"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedBooking(null)
                }
              >
                ×
              </button>

              <p>BOOKING DETAILS</p>

              <h2>
                {selectedBooking.id}
              </h2>

              <div className="modal-status">
                <span
                  className={`booking-status ${selectedBooking.status.toLowerCase()}`}
                >
                  {selectedBooking.status}
                </span>
              </div>

              <div className="details-list">

                <div>
                  <span>Guest</span>
                  <strong>
                    {selectedBooking.guest}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedBooking.email}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedBooking.phone}
                  </strong>
                </div>

                <div>
                  <span>Room</span>
                  <strong>
                    {selectedBooking.room}
                  </strong>
                </div>

                <div>
                  <span>Check-in</span>
                  <strong>
                    {selectedBooking.checkIn}
                  </strong>
                </div>

                <div>
                  <span>Check-out</span>
                  <strong>
                    {selectedBooking.checkOut}
                  </strong>
                </div>

                <div>
                  <span>Guests</span>
                  <strong>
                    {selectedBooking.guests}
                  </strong>
                </div>

                <div>
                  <span>Total Amount</span>
                  <strong>
                    {selectedBooking.amount}
                  </strong>
                </div>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="confirm-button"
                  disabled={
                    selectedBooking.status === "Confirmed"
                  }
                  onClick={() =>
                    updateBookingStatus(
                      selectedBooking.id,
                      "Confirmed"
                    )
                  }
                >
                  {selectedBooking.status === "Confirmed"
                    ? "CONFIRMED"
                    : "CONFIRM BOOKING"}
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  disabled={
                    selectedBooking.status === "Cancelled"
                  }
                  onClick={() =>
                    updateBookingStatus(
                      selectedBooking.id,
                      "Cancelled"
                    )
                  }
                >
                  {selectedBooking.status === "Cancelled"
                    ? "CANCELLED"
                    : "CANCEL BOOKING"}
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ================= NEW BOOKING ================= */}

      <AnimatePresence>
        {showNewBooking && (
          <motion.div
            className="new-booking-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNewBooking(false)}
          >
            <motion.div
              className="new-booking-modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setShowNewBooking(false)}
              >
                ×
              </button>

              <p>RESERVATION MANAGEMENT</p>
              <h2>New Booking</h2>

              <form
                className="new-booking-form"
                onSubmit={createBooking}
              >
                <div className="form-field">
                  <label>Guest Name</label>
                  <input
                      name="guestName"
                      type="text"
                      placeholder="Enter guest name"
                      required
                    />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="guest@example.com"
                        required
                      />
                  </div>

                  <div className="form-field">
                    <label>Phone</label>
                    <input
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                      />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Room</label>
                    <select
                      name="room"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Select room</option>
                      <option>Ocean View Suite</option>
                      <option>Beach Villa</option>
                      <option>Presidential Villa</option>
                      <option>Garden Deluxe</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Guests</label>
                    <input
                      name="guests"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="2"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Check-in</label>
                    <input
                      name="checkIn"
                      type="date"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Check-out</label>
                    <input
                      name="checkOut"
                      type="date"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Booking Status</label>
                  <select
                    name="status"
                    defaultValue="Pending"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div className="new-booking-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowNewBooking(false)}
                  >
                    CLOSE
                  </button>

                  <button type="submit" className="confirm-button">
                    CREATE BOOKING
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ================= STYLES ================= */}

      <style>
        {`

        .bookings-page {
          min-height: 100vh;
          width: 100%;
          padding: 40px;
          background: #071c25;
          color: #f4efe5;
        }

        .bookings-page *,
        .bookings-page *::before,
        .bookings-page *::after {
          box-sizing: border-box;
        }

        .bookings-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 30px;
        }

        .bookings-header p {
          margin: 0 0 8px;
          color: #d6b46a;
          font-size: 9px;
          letter-spacing: 3px;
        }

        .bookings-header h1 {
          margin: 0;
          font-size: 34px;
          font-weight: 400;
        }

        .bookings-header span {
          display: block;
          margin-top: 9px;
          color: #78888a;
          font-size: 12px;
        }

        .add-booking {
          border: 1px solid #d6b46a;
          background: #d6b46a;
          color: #071719;
          padding: 13px 20px;
          font-size: 10px;
          letter-spacing: 1px;
          cursor: pointer;
        }


        /* SUMMARY */

        .booking-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .summary-card {
          padding: 20px;
          background: #0a202a;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .summary-card span {
          display: block;
          color: #718082;
          font-size: 9px;
          letter-spacing: 1.5px;
        }

        .summary-card strong {
          display: block;
          margin-top: 12px;
          font-size: 27px;
          font-weight: 400;
        }


        /* TOOLBAR */

        .booking-toolbar {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 15px;
        }

        .filter-buttons {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .filter-buttons button {
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: #758587;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 10px;
        }

        .filter-buttons button:hover,
        .filter-buttons .filter-active {
          border-color: rgba(214,180,106,0.35);
          color: #d6b46a;
          background: rgba(214,180,106,0.06);
        }

        .booking-search {
          width: 280px;
          border: 1px solid rgba(255,255,255,0.1);
          background: #0a202a;
          color: #f4efe5;
          outline: none;
          padding: 10px 14px;
          font-size: 11px;
        }

        .booking-search::placeholder {
          color: #647577;
        }

        .booking-search:focus {
          border-color: rgba(214,180,106,0.45);
        }


        /* TABLE */

        .bookings-table-card {
          background: #0a202a;
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
        }

        .table-scroll {
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 1000px;
          border-collapse: collapse;
          background: #0a202a;
        }

        th {
          padding: 15px;
          text-align: left;
          color: #8a9899;
          font-size: 8px;
          letter-spacing: 1.5px;
          font-weight: 500;
          background: #0d2935;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        td {
          padding: 16px 15px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: #0a202a;
          color: #a0abad;
          font-size: 11px;
          white-space: nowrap;
        }

        tbody tr:hover {
          background: rgba(214,180,106,0.025);
        }

        .booking-id {
          color: #d6b46a;
          font-size: 10px;
        }

        .guest-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .guest-avatar {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(214,180,106,0.1);
          color: #d6b46a;
          font-size: 9px;
        }

        .guest-cell strong,
        .guest-cell span {
          display: block;
        }

        .guest-cell strong {
          color: #f4efe5;
          font-size: 11px;
        }

        .guest-cell span {
          color: #697a7c;
          margin-top: 3px;
          font-size: 9px;
        }

        .room-name {
          color: #c1c7c5;
        }

        .stay-cell strong,
        .stay-cell span {
          display: block;
        }

        .stay-cell strong {
          color: #c1c7c5;
          font-size: 10px;
        }

        .stay-cell span {
          margin-top: 3px;
          color: #697a7c;
          font-size: 9px;
        }


        /* STATUS */

        .booking-status {
          display: inline-block;
          padding: 6px 9px;
          font-size: 8px;
        }

        .booking-status.confirmed {
          color: #79b783;
          background: rgba(76,150,95,0.1);
        }

        .booking-status.pending {
          color: #d6b46a;
          background: rgba(214,180,106,0.1);
        }

        .booking-status.cancelled {
          color: #c67c7c;
          background: rgba(198,124,124,0.1);
        }

        .view-button {
          border: none;
          background: transparent;
          color: #d6b46a;
          cursor: pointer;
          font-size: 10px;
        }


        /* MODAL */

        .booking-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(8px);
        }

        .booking-modal {
          position: relative;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 35px;
          background: #0a202a;
          border: 1px solid rgba(214,180,106,0.25);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }

        .modal-close {
          position: absolute;
          right: 18px;
          top: 15px;
          border: none;
          background: transparent;
          color: #829294;
          font-size: 25px;
          cursor: pointer;
        }

        .booking-modal > p {
          margin: 0 0 7px;
          color: #d6b46a;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .booking-modal h2 {
          margin: 0;
          font-size: 27px;
          font-weight: 400;
        }

        .modal-status {
          margin: 15px 0 25px;
        }

        .details-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .details-list div {
          padding: 12px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .details-list span,
        .details-list strong {
          display: block;
        }

        .details-list span {
          color: #697a7c;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .details-list strong {
          margin-top: 6px;
          color: #e6e1d7;
          font-size: 11px;
          font-weight: 400;
          word-break: break-word;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 25px;
        }

        .modal-actions button {
          flex: 1;
          padding: 13px;
          cursor: pointer;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .confirm-button {
          border: 1px solid #d6b46a;
          background: #d6b46a;
          color: #071719;
        }

        .cancel-button {
          border: 1px solid rgba(198,124,124,0.4);
          background: transparent;
          color: #c67c7c;
        }


        /* NEW BOOKING MODAL */

        .new-booking-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(8px);
        }

        .new-booking-modal {
          position: relative;
          width: 100%;
          max-width: 620px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 35px;
          background: #0a202a;
          border: 1px solid rgba(214,180,106,0.25);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }

        .new-booking-modal > p {
          margin: 0 0 7px;
          color: #d6b46a;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .new-booking-modal h2 {
          margin: 0 0 25px;
          font-size: 27px;
          font-weight: 400;
        }

        .new-booking-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-field label {
          color: #697a7c;
          font-size: 8px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .form-field input,
        .form-field select {
          width: 100%;
          min-height: 42px;
          padding: 10px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          outline: none;
          background: rgba(255,255,255,0.025);
          color: #f4efe5;
          font-size: 11px;
          box-sizing: border-box;
        }

        .form-field input::placeholder {
          color: #536365;
        }

        .form-field input:focus,
        .form-field select:focus {
          border-color: rgba(214,180,106,0.45);
        }

        .form-field select option {
          background: #0a202a;
          color: #f4efe5;
        }

        .new-booking-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .new-booking-actions button {
          flex: 1;
          padding: 13px;
          cursor: pointer;
          font-size: 9px;
          letter-spacing: 1px;
        }


        /* MOBILE */

        @media (max-width: 800px) {

          .bookings-page {
            padding: 25px 20px;
          }

          .bookings-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .booking-summary {
            grid-template-columns: repeat(2, 1fr);
          }

          .booking-toolbar {
            flex-direction: column;
          }

          .booking-search {
            width: 100%;
          }

        }

        @media (max-width: 500px) {

          .bookings-page {
            padding: 20px 15px;
          }

          .bookings-header h1 {
            font-size: 28px;
          }

          .booking-summary {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .summary-card {
            padding: 15px;
          }

          .summary-card strong {
            font-size: 23px;
          }

          .filter-buttons button {
            padding: 8px 10px;
          }

          .booking-modal {
            padding: 25px 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .new-booking-actions {
            flex-direction: column;
          }

          .details-list {
            grid-template-columns: 1fr;
          }

          .modal-actions {
            flex-direction: column;
          }

        }

        `}
      </style>

    </div>
  );
}