import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function RoomsManagement() {
  const [rooms, setRooms] = useState([
    {
      id: "RM001",
      name: "Ocean View Suite",
      type: "Suite",
      price: 8500,
      guests: 2,
      status: "Available",
    },
    {
      id: "RM002",
      name: "Beach Villa",
      type: "Villa",
      price: 12000,
      guests: 3,
      status: "Occupied",
    },
    {
      id: "RM003",
      name: "Presidential Villa",
      type: "Villa",
      price: 22000,
      guests: 4,
      status: "Available",
    },
    {
      id: "RM004",
      name: "Garden Deluxe",
      type: "Deluxe",
      price: 6000,
      guests: 2,
      status: "Cleaning",
    },
    {
      id: "RM005",
      name: "Sunset Premium Room",
      type: "Premium",
      price: 7500,
      guests: 2,
      status: "Available",
    },
    {
      id: "RM006",
      name: "Royal Beach Villa",
      type: "Villa",
      price: 18000,
      guests: 4,
      status: "Maintenance",
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "Deluxe",
    price: "",
    guests: "2",
    status: "Available",
  });

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      room.id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || room.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handleAddRoom = (e) => {
    e.preventDefault();

    if (
      !newRoom.name ||
      !newRoom.price ||
      !newRoom.guests
    ) {
      return;
    }

    const room = {
      id: `RM${String(rooms.length + 1).padStart(3, "0")}`,
      name: newRoom.name,
      type: newRoom.type,
      price: Number(newRoom.price),
      guests: Number(newRoom.guests),
      status: newRoom.status,
    };

    setRooms([...rooms, room]);

    setNewRoom({
      name: "",
      type: "Deluxe",
      price: "",
      guests: "2",
      status: "Available",
    });

    setShowAddRoom(false);
  };

  const handleDeleteRoom = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmed) return;

    setRooms(
      rooms.filter((room) => room.id !== id)
    );

    setSelectedRoom(null);
  };

  const statusClass = (status) => {
    return status
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  return (
    <div className="rooms-management">

      {/* ================= SIDEBAR ================= */}

      <aside className="rooms-sidebar">

        <div className="rooms-logo">
          <span>PARADISE</span>
          <strong>RESORT</strong>
        </div>

        <nav className="rooms-nav">

          <button
            onClick={() => {
              window.location.href =
                "/admin/dashboard";
            }}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            onClick={() => {
              window.location.href =
                "/admin/bookings";
            }}
          >
            <span>▣</span>
            Bookings
          </button>

          <button className="active">
            <span>▤</span>
            Rooms
          </button>

          <button>
            <span>♨</span>
            Dining
          </button>

          <button>
            <span>✦</span>
            Experiences
          </button>

          <button>
            <span>◫</span>
            Offers
          </button>

          <button>
            <span>◉</span>
            Gallery
          </button>

          <button>
            <span>⚙</span>
            Settings
          </button>

        </nav>

        <button
          className="logout-button"
          onClick={() => {
            window.location.href = "/admin";
          }}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="rooms-main">

        {/* HEADER */}

        <header className="rooms-header">

          <div>
            <p className="rooms-eyebrow">
              PARADISE RESORT
            </p>

            <h1>
              Rooms Management
            </h1>

            <span>
              Manage rooms, villas and
              availability
            </span>
          </div>

          <button
            className="add-room-button"
            onClick={() =>
              setShowAddRoom(true)
            }
          >
            <span>+</span>
            ADD ROOM
          </button>

        </header>


        {/* ================= SUMMARY ================= */}

        <section className="rooms-stats">

          <div className="room-stat">
            <span>Total Rooms</span>
            <strong>{rooms.length}</strong>
          </div>

          <div className="room-stat">
            <span>Available</span>
            <strong>
              {
                rooms.filter(
                  (room) =>
                    room.status ===
                    "Available"
                ).length
              }
            </strong>
          </div>

          <div className="room-stat">
            <span>Occupied</span>
            <strong>
              {
                rooms.filter(
                  (room) =>
                    room.status ===
                    "Occupied"
                ).length
              }
            </strong>
          </div>

          <div className="room-stat">
            <span>Maintenance</span>
            <strong>
              {
                rooms.filter(
                  (room) =>
                    room.status ===
                    "Maintenance"
                ).length
              }
            </strong>
          </div>

        </section>


        {/* ================= TOOLBAR ================= */}

        <section className="rooms-toolbar">

          <div className="room-filters">

            {[
              "All",
              "Available",
              "Occupied",
              "Cleaning",
              "Maintenance",
            ].map((item) => (
              <button
                key={item}
                className={
                  filter === item
                    ? "filter-active"
                    : ""
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

          <input
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </section>


        {/* ================= ROOM GRID ================= */}

        <section className="rooms-grid">

          {filteredRooms.map(
            (room, index) => (

              <motion.div
                key={room.id}
                className="room-card"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.45,
                }}
                whileHover={{
                  y: -5,
                }}
              >

                <div className="room-image">

                  <div className="room-image-overlay">

                    <span
                      className={`room-status ${statusClass(
                        room.status
                      )}`}
                    >
                      {room.status}
                    </span>

                  </div>

                  <div className="room-image-placeholder">
                    <span>PARADISE</span>
                    <small>
                      {room.type.toUpperCase()}
                    </small>
                  </div>

                </div>


                <div className="room-card-content">

                  <div className="room-card-top">

                    <div>
                      <small>
                        {room.id}
                      </small>

                      <h2>
                        {room.name}
                      </h2>
                    </div>

                    <div className="room-price">
                      <strong>
                        ₹
                        {room.price.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <span>
                        / night
                      </span>
                    </div>

                  </div>


                  <div className="room-meta">

                    <span>
                      ◇ {room.type}
                    </span>

                    <span>
                      ♙ {room.guests} Guests
                    </span>

                  </div>


                  <div className="room-actions">

                    <button
                      onClick={() =>
                        setSelectedRoom(room)
                      }
                    >
                      VIEW DETAILS
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDeleteRoom(
                          room.id
                        )
                      }
                    >
                      DELETE
                    </button>

                  </div>

                </div>

              </motion.div>

            )
          )}

        </section>


        {filteredRooms.length === 0 && (
          <div className="no-rooms">
            <strong>
              No rooms found
            </strong>

            <span>
              Try changing your search
              or filter.
            </span>
          </div>
        )}

      </main>


      {/* ================= ROOM DETAILS MODAL ================= */}

      <AnimatePresence>

        {selectedRoom && (

          <motion.div
            className="modal-backdrop"
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
              setSelectedRoom(null)
            }
          >

            <motion.div
              className="room-modal"
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.35,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedRoom(null)
                }
              >
                ×
              </button>

              <div className="modal-room-image">
                <span>
                  PARADISE RESORT
                </span>
              </div>

              <div className="modal-content">

                <p>
                  {selectedRoom.id}
                </p>

                <h2>
                  {selectedRoom.name}
                </h2>

                <div className="modal-details">

                  <div>
                    <span>ROOM TYPE</span>
                    <strong>
                      {selectedRoom.type}
                    </strong>
                  </div>

                  <div>
                    <span>PRICE</span>
                    <strong>
                      ₹
                      {selectedRoom.price.toLocaleString(
                        "en-IN"
                      )}
                      / night
                    </strong>
                  </div>

                  <div>
                    <span>GUESTS</span>
                    <strong>
                      Up to{" "}
                      {selectedRoom.guests}{" "}
                      guests
                    </strong>
                  </div>

                  <div>
                    <span>STATUS</span>
                    <strong>
                      {selectedRoom.status}
                    </strong>
                  </div>

                </div>

                <button
                  className="modal-action"
                  onClick={() =>
                    setSelectedRoom(null)
                  }
                >
                  CLOSE
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ================= ADD ROOM MODAL ================= */}

      <AnimatePresence>

        {showAddRoom && (

          <motion.div
            className="modal-backdrop"
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
              setShowAddRoom(false)
            }
          >

            <motion.div
              className="add-room-modal"
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="modal-close"
                onClick={() =>
                  setShowAddRoom(false)
                }
              >
                ×
              </button>

              <p className="modal-eyebrow">
                ROOM MANAGEMENT
              </p>

              <h2>
                Add New Room
              </h2>

              <form
                onSubmit={handleAddRoom}
              >

                <label>
                  ROOM NAME
                </label>

                <input
                  type="text"
                  placeholder="e.g. Ocean View Suite"
                  value={newRoom.name}
                  onChange={(e) =>
                    setNewRoom({
                      ...newRoom,
                      name: e.target.value,
                    })
                  }
                />

                <label>
                  ROOM TYPE
                </label>

                <select
                  value={newRoom.type}
                  onChange={(e) =>
                    setNewRoom({
                      ...newRoom,
                      type: e.target.value,
                    })
                  }
                >
                  <option>Deluxe</option>
                  <option>Premium</option>
                  <option>Suite</option>
                  <option>Villa</option>
                </select>

                <div className="form-row">

                  <div>
                    <label>
                      PRICE / NIGHT
                    </label>

                    <input
                      type="number"
                      placeholder="8500"
                      value={newRoom.price}
                      onChange={(e) =>
                        setNewRoom({
                          ...newRoom,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label>
                      MAX GUESTS
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={newRoom.guests}
                      onChange={(e) =>
                        setNewRoom({
                          ...newRoom,
                          guests:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                </div>

                <label>
                  STATUS
                </label>

                <select
                  value={newRoom.status}
                  onChange={(e) =>
                    setNewRoom({
                      ...newRoom,
                      status: e.target.value,
                    })
                  }
                >
                  <option>
                    Available
                  </option>
                  <option>
                    Occupied
                  </option>
                  <option>
                    Cleaning
                  </option>
                  <option>
                    Maintenance
                  </option>
                </select>

                <button
                  type="submit"
                  className="create-room-button"
                >
                  CREATE ROOM
                </button>

              </form>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ================= STYLES ================= */}

      <style>
        {`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #071719;
        }

        .rooms-management {
          min-height: 100vh;
          display: flex;
          background:
            radial-gradient(
              circle at 80% 10%,
              rgba(214,180,106,0.07),
              transparent 30%
            ),
            #071719;
          color: #f4efe5;
          font-family:
            Inter,
            Arial,
            sans-serif;
        }


        /* SIDEBAR */

        .rooms-sidebar {
          width: 250px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 35px 20px;
          border-right:
            1px solid rgba(255,255,255,0.08);
          background:
            rgba(4,15,17,0.94);
          z-index: 20;
        }

        .rooms-logo {
          text-align: center;
          margin-bottom: 50px;
          letter-spacing: 3px;
        }

        .rooms-logo span {
          display: block;
          color: #d6b46a;
          font-size: 13px;
        }

        .rooms-logo strong {
          display: block;
          font-size: 9px;
          letter-spacing: 5px;
          margin-top: 5px;
        }

        .rooms-nav {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .rooms-nav button,
        .logout-button {
          border: none;
          background: transparent;
          color: #829294;
          padding: 13px 15px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          text-align: left;
          font-size: 13px;
          transition: 0.25s ease;
        }

        .rooms-nav button span,
        .logout-button span {
          width: 20px;
          text-align: center;
        }

        .rooms-nav button:hover,
        .rooms-nav button.active {
          background:
            rgba(214,180,106,0.1);
          color: #d6b46a;
        }

        .logout-button {
          margin-top: auto;
          border-top:
            1px solid rgba(255,255,255,0.08);
          padding-top: 22px;
        }


        /* MAIN */

        .rooms-main {
          width: calc(100% - 250px);
          margin-left: 250px;
          padding: 40px;
        }

        .rooms-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 35px;
          gap: 25px;
        }

        .rooms-eyebrow {
          margin: 0 0 8px;
          color: #d6b46a;
          font-size: 10px;
          letter-spacing: 3px;
        }

        .rooms-header h1 {
          margin: 0;
          font-size: 34px;
          font-weight: 400;
        }

        .rooms-header span {
          display: block;
          margin-top: 8px;
          color: #718183;
          font-size: 12px;
        }

        .add-room-button {
          border: 1px solid #d6b46a;
          background: #d6b46a;
          color: #071719;
          padding: 14px 22px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          transition: 0.25s ease;
        }

        .add-room-button span {
          display: inline;
          margin-right: 8px;
          color: #071719;
          font-size: 16px;
        }

        .add-room-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 30px
            rgba(214,180,106,0.15);
        }


        /* STATS */

        .rooms-stats {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 25px;
        }

        .room-stat {
          padding: 20px;
          border:
            1px solid rgba(255,255,255,0.08);
          background:
            rgba(255,255,255,0.025);
        }

        .room-stat span {
          display: block;
          color: #778789;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .room-stat strong {
          display: block;
          margin-top: 12px;
          color: #f4efe5;
          font-size: 27px;
          font-weight: 400;
        }


        /* TOOLBAR */

        .rooms-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 22px;
          padding: 15px;
          border:
            1px solid rgba(255,255,255,0.07);
          background:
            rgba(255,255,255,0.02);
        }

        .room-filters {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .room-filters button {
          border: 1px solid transparent;
          background: transparent;
          color: #7c8c8e;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 9px;
          transition: 0.2s ease;
        }

        .room-filters button:hover,
        .room-filters button.filter-active {
          border-color:
            rgba(214,180,106,0.3);
          background:
            rgba(214,180,106,0.08);
          color: #d6b46a;
        }

        .rooms-toolbar input {
          width: 220px;
          height: 38px;
          padding: 0 13px;
          border:
            1px solid rgba(255,255,255,0.1);
          outline: none;
          background:
            rgba(255,255,255,0.03);
          color: #f4efe5;
          font-size: 11px;
        }

        .rooms-toolbar input::placeholder {
          color: #607073;
        }


        /* ROOM GRID */

        .rooms-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .room-card {
          overflow: hidden;
          border:
            1px solid rgba(255,255,255,0.08);
          background:
            rgba(255,255,255,0.025);
          transition: 0.3s ease;
        }

        .room-card:hover {
          border-color:
            rgba(214,180,106,0.25);
        }

        .room-image {
          position: relative;
          height: 190px;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              #153d43,
              #071719
            );
        }

        .room-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color:
            rgba(214,180,106,0.5);
          letter-spacing: 4px;
          font-size: 13px;
        }

        .room-image-placeholder small {
          margin-top: 8px;
          color:
            rgba(255,255,255,0.3);
          font-size: 8px;
          letter-spacing: 3px;
        }

        .room-image-overlay {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
        }

        .room-status {
          display: inline-block;
          padding: 6px 9px;
          font-size: 8px;
          letter-spacing: 0.5px;
        }

        .room-status.available {
          background:
            rgba(76,150,95,0.16);
          color: #82c18b;
        }

        .room-status.occupied {
          background:
            rgba(214,180,106,0.16);
          color: #d6b46a;
        }

        .room-status.cleaning {
          background:
            rgba(110,153,188,0.16);
          color: #91b5d1;
        }

        .room-status.maintenance {
          background:
            rgba(198,124,124,0.16);
          color: #d59696;
        }


        /* CARD CONTENT */

        .room-card-content {
          padding: 20px;
        }

        .room-card-top {
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }

        .room-card-top small {
          color: #697a7c;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .room-card-top h2 {
          margin: 7px 0 0;
          font-size: 16px;
          font-weight: 400;
        }

        .room-price {
          text-align: right;
          white-space: nowrap;
        }

        .room-price strong {
          display: block;
          color: #d6b46a;
          font-size: 14px;
          font-weight: 500;
        }

        .room-price span {
          color: #68787a;
          font-size: 8px;
        }

        .room-meta {
          display: flex;
          gap: 15px;
          margin-top: 18px;
          padding-top: 14px;
          border-top:
            1px solid rgba(255,255,255,0.06);
          color: #78888a;
          font-size: 9px;
        }

        .room-actions {
          display: flex;
          gap: 8px;
          margin-top: 18px;
        }

        .room-actions button {
          flex: 1;
          border:
            1px solid rgba(214,180,106,0.25);
          background: transparent;
          color: #d6b46a;
          padding: 10px 6px;
          cursor: pointer;
          font-size: 8px;
          letter-spacing: 1px;
          transition: 0.2s ease;
        }

        .room-actions button:hover {
          background:
            rgba(214,180,106,0.08);
        }

        .room-actions .delete-button {
          border-color:
            rgba(198,124,124,0.2);
          color: #c98989;
        }

        .room-actions .delete-button:hover {
          background:
            rgba(198,124,124,0.08);
        }

        .no-rooms {
          padding: 70px 20px;
          text-align: center;
          border:
            1px solid rgba(255,255,255,0.07);
          background:
            rgba(255,255,255,0.02);
        }

        .no-rooms strong,
        .no-rooms span {
          display: block;
        }

        .no-rooms strong {
          font-size: 16px;
          font-weight: 400;
        }

        .no-rooms span {
          margin-top: 8px;
          color: #718183;
          font-size: 11px;
        }


        /* MODAL */

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background:
            rgba(0,0,0,0.72);
          backdrop-filter: blur(8px);
        }

        .room-modal,
        .add-room-modal {
          position: relative;
          width: 100%;
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          border:
            1px solid rgba(214,180,106,0.22);
          background: #0b2023;
          box-shadow:
            0 30px 90px
            rgba(0,0,0,0.55);
        }

        .modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 5;
          width: 34px;
          height: 34px;
          border:
            1px solid rgba(255,255,255,0.12);
          background:
            rgba(0,0,0,0.35);
          color: #f4efe5;
          cursor: pointer;
          font-size: 20px;
        }

        .modal-room-image {
          height: 230px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              135deg,
              #17464c,
              #071719
            );
          color:
            rgba(214,180,106,0.55);
          font-size: 13px;
          letter-spacing: 4px;
        }

        .modal-content {
          padding: 28px;
        }

        .modal-content > p,
        .modal-eyebrow {
          margin: 0 0 8px;
          color: #d6b46a;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .modal-content h2,
        .add-room-modal h2 {
          margin: 0 0 25px;
          font-size: 25px;
          font-weight: 400;
        }

        .modal-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .modal-details div {
          padding: 15px;
          border:
            1px solid rgba(255,255,255,0.07);
          background:
            rgba(255,255,255,0.02);
        }

        .modal-details span,
        .modal-details strong {
          display: block;
        }

        .modal-details span {
          color: #6d7d7f;
          font-size: 8px;
          letter-spacing: 1.5px;
        }

        .modal-details strong {
          margin-top: 8px;
          color: #f4efe5;
          font-size: 11px;
          font-weight: 400;
        }

        .modal-action {
          width: 100%;
          margin-top: 20px;
          padding: 13px;
          border: 1px solid #d6b46a;
          background: #d6b46a;
          color: #071719;
          cursor: pointer;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }


        /* ADD ROOM FORM */

        .add-room-modal {
          padding: 30px;
          max-width: 500px;
        }

        .add-room-modal form {
          display: flex;
          flex-direction: column;
        }

        .add-room-modal label {
          margin-bottom: 8px;
          color: #d6b46a;
          font-size: 8px;
          letter-spacing: 1.5px;
        }

        .add-room-modal input,
        .add-room-modal select {
          width: 100%;
          height: 44px;
          margin-bottom: 18px;
          padding: 0 12px;
          border:
            1px solid rgba(255,255,255,0.1);
          outline: none;
          background:
            rgba(255,255,255,0.035);
          color: #f4efe5;
          font-size: 11px;
        }

        .add-room-modal select option {
          background: #0b2023;
          color: #f4efe5;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-row > div {
          display: flex;
          flex-direction: column;
        }

        .create-room-button {
          margin-top: 5px;
          padding: 14px;
          border: 1px solid #d6b46a;
          background: #d6b46a;
          color: #071719;
          cursor: pointer;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }


        /* TABLET */

        @media (max-width: 1100px) {

          .rooms-sidebar {
            width: 210px;
          }

          .rooms-main {
            width: calc(100% - 210px);
            margin-left: 210px;
            padding: 25px;
          }

          .rooms-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .rooms-stats {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }


        /* MOBILE */

        @media (max-width: 700px) {

          .rooms-management {
            display: block;
          }

          .rooms-sidebar {
            position: relative;
            width: 100%;
            min-height: auto;
            padding: 20px;
          }

          .rooms-logo {
            margin-bottom: 20px;
          }

          .rooms-nav {
            display: grid;
            grid-template-columns:
              repeat(2, 1fr);
          }

          .logout-button {
            margin-top: 15px;
          }

          .rooms-main {
            width: 100%;
            margin-left: 0;
            padding: 20px;
          }

          .rooms-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .rooms-header h1 {
            font-size: 28px;
          }

          .add-room-button {
            width: 100%;
          }

          .rooms-stats {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .rooms-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .rooms-toolbar input {
            width: 100%;
          }

          .rooms-grid {
            grid-template-columns: 1fr;
          }
        }


        /* SMALL PHONE */

        @media (max-width: 430px) {

          .rooms-main {
            padding: 15px;
          }

          .rooms-nav {
            grid-template-columns: 1fr;
          }

          .rooms-stats {
            grid-template-columns: 1fr;
          }

          .room-card-content {
            padding: 16px;
          }

          .room-card-top {
            flex-direction: column;
          }

          .room-price {
            text-align: left;
          }

          .modal-details {
            grid-template-columns: 1fr;
          }

          .add-room-modal {
            padding: 24px 18px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        `}
      </style>

    </div>
  );
}