import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BookingForm from "./BookingForm";

const rooms = [
  {
    id: 1,
    name: "Ocean View Suite",
    price: "₹12,000",
    guests: "2 Guests",
    bed: "King Bed",
    view: "Ocean View",

    description:
      "Wake up to breathtaking ocean views in an elegant suite designed for a peaceful and luxurious coastal escape.",

    features: [
      "King-size bed",
      "Private balcony",
      "Ocean view",
      "Air conditioning",
      "Free Wi-Fi",
      "Breakfast included",
      "Room service",
      "Luxury bathroom",
    ],

    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=90",
    ],
  },

  {
    id: 2,
    name: "Beachfront Villa",
    price: "₹18,000",
    guests: "4 Guests",
    bed: "2 King Beds",
    view: "Beach Access",

    description:
      "Enjoy a private beachfront villa just steps away from the sea, combining spacious interiors with a relaxing tropical atmosphere.",

    features: [
      "2 King-size beds",
      "Private terrace",
      "Direct beach access",
      "Air conditioning",
      "Free Wi-Fi",
      "Breakfast included",
      "Living area",
      "Luxury bathroom",
    ],

    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=90",
    ],
  },

  {
    id: 3,
    name: "Presidential Villa",
    price: "₹28,000",
    guests: "6 Guests",
    bed: "3 King Beds",
    view: "Private Pool",

    description:
      "Experience our most spacious and exclusive villa with luxurious interiors, private outdoor space and your own pool.",

    features: [
      "3 King-size beds",
      "Private swimming pool",
      "Large terrace",
      "Ocean surroundings",
      "Air conditioning",
      "Free Wi-Fi",
      "Private living room",
      "Luxury bathroom",
    ],

    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=90",
    ],
  },
];

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [bookingRoom, setBookingRoom] = useState(null);

  const openRoom = (room) => {
    setSelectedRoom(room);
    setActiveImage(0);
    document.body.style.overflow = "hidden";
  };

  const closeRoom = () => {
    setSelectedRoom(null);
    document.body.style.overflow = "auto";
  };

  const bookRoom = (room) => {
  localStorage.setItem(
    "selectedRoom",
    JSON.stringify(room)
  );

  setBookingRoom(null);

  document
    .getElementById("reservation")
    ?.scrollIntoView({
      behavior: "smooth",
    });
};

  return (
    <>
      {/* =====================================================
          ROOMS & VILLAS
      ===================================================== */}

      <section
        id="stay"
        style={{
          position: "relative",
          zIndex: 50,
          minHeight: "100vh",
          background:
            "radial-gradient(circle at 12% 12%, rgba(214,176,107,0.20), transparent 24%), radial-gradient(circle at 88% 78%, rgba(20,115,125,0.22), transparent 30%), linear-gradient(135deg, #04171d 0%, #082b34 48%, #031217 100%)",
          padding: "120px 6% 130px",
          color: "#f7efe1",
        }}
      >
        {/* =================================================
            HEADING
        ================================================= */}

        <motion.div
          className="rooms-heading"
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "relative",
            zIndex: 60,
            maxWidth: "760px",
            margin: "0 auto 70px",
            textAlign: "center",
          }}
        >
          {/* Small Heading */}

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            style={{
              margin: "0 0 18px",
              fontSize: "11px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#d6b06b",
              fontWeight: "600",
            }}
          >
            STAY WITH US
          </motion.p>

          {/* Main Heading */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
            style={{
              margin: 0,
              fontSize: "clamp(42px, 5vw, 64px)",
              fontWeight: "400",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#f7efe1",
              textShadow: "0 4px 24px rgba(0,0,0,0.45)",
            }}
          >
            Rooms & Villas
          </motion.h2>

          {/* Decorative Line */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: "55px",
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.35,
            }}
            style={{
              height: "1px",
              background: "#d6b06b",
              margin: "24px auto",
            }}
          />

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.45,
            }}
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#b8c7c5",
            }}
          >
            Discover beautifully designed spaces where coastal
            elegance meets modern comfort.
          </motion.p>
        </motion.div>

        {/* =================================================
            ROOM CARDS
        ================================================= */}

        <div
          className="rooms-grid"
          style={{
            position: "relative",
            zIndex: 60,
            maxWidth: "1250px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {rooms.map((room, index) => (
            <motion.article
              className="room-card"
              key={room.id}
              initial={{
                opacity: 0,
                y: 70,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.9,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
              }}
              style={{
                background:
                  "linear-gradient(145deg, #103b44 0%, #08242c 55%, #061b21 100%)",
                overflow: "hidden",
                borderRadius: "24px",
                border: "1px solid rgba(214,176,107,0.28)",
                boxShadow:
                  "0 24px 70px rgba(0,0,0,0.42)",
              }}
            >
              {/* ROOM IMAGE */}

              <div
                style={{
                  height: "350px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.img
                  src={room.images[0]}
                  alt={room.name}
                  whileHover={{
                    scale: 1.07,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(2,15,19,0.72), transparent 58%), linear-gradient(135deg, rgba(214,176,107,0.10), transparent 45%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Photo Counter */}

                <div
                  style={{
                    position: "absolute",
                    left: "18px",
                    bottom: "18px",
                    padding: "8px 12px",
                    background:
                      "linear-gradient(135deg, rgba(23,54,59,0.92), rgba(161,132,85,0.78))",
                    backdropFilter: "blur(10px)",
                    borderRadius: "30px",
                    color: "white",
                    fontSize: "10px",
                    letterSpacing: "1.5px",
                  }}
                >
                  3 PHOTOS
                </div>
              </div>

              {/* ROOM CONTENT */}

              <div
                className="room-content"
                style={{
                  padding: "30px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "27px",
                    fontWeight: "500",
                    color: "#f7efe1",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {room.name}
                </h3>

                <p
                  style={{
                    margin: "14px 0",
                    color: "#b8c7c5",
                    lineHeight: 1.7,
                    fontSize: "14px",
                  }}
                >
                  {room.description}
                </p>

                <p
                  style={{
                    margin: "18px 0",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    color: "#d6b06b",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {room.guests} • {room.bed} • {room.view}
                </p>

                {/* PRICE + BUTTONS */}

                <div
                  className="room-price-actions"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginTop: "25px",
                    paddingTop: "20px",
                    borderTop:
                      "1px solid rgba(214,176,107,0.24)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#f7efe1",
                      }}
                    >
                      {room.price}
                    </span>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "#9fb0ae",
                      }}
                    >
                      {" "}
                      / night
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    {/* EXPLORE */}

                    <motion.button
                      onClick={() =>
                        openRoom(room)
                      }
                      whileHover={{
                        scale: 1.04,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      style={{
                        border:
                          "1px solid rgba(214,176,107,0.55)",
                        background:
                          "rgba(214,176,107,0.08)",
                        color: "#f7efe1",
                        borderRadius: "30px",
                        padding: "11px 17px",
                        cursor: "pointer",
                        fontSize: "10px",
                        fontWeight: "600",
                        letterSpacing: "1.5px",
                      }}
                    >
                      EXPLORE
                    </motion.button>

                    {/* BOOK */}

                    <motion.button
                      onClick={() =>
                        bookRoom(room)
                      }
                      whileHover={{
                        scale: 1.04,
                        background: "#d6b06b",
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      style={{
                        border: "1px solid #d6b06b",
                        background:
                          "linear-gradient(135deg, #b88a3d, #e0bd73)",
                        color: "white",
                        borderRadius: "30px",
                        padding: "11px 18px",
                        cursor: "pointer",
                        fontSize: "10px",
                        fontWeight: "600",
                        letterSpacing: "1.5px",
                        boxShadow: "0 8px 24px rgba(214,176,107,0.22)",
                      }}
                    >
                      BOOK
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* =====================================================
          EXPLORE ROOM MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeRoom}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background:
                "rgba(7,25,29,0.82)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "25px",
            }}
          >
            <motion.div
              className="room-modal"
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              style={{
                width: "100%",
                maxWidth: "1100px",
                maxHeight: "90vh",
                overflowY: "auto",
                background:
                  "linear-gradient(145deg, #0d3540 0%, #071e25 55%, #04151a 100%)",
                borderRadius: "28px",
                border: "1px solid rgba(214,176,107,0.30)",
                boxShadow:
                  "0 35px 100px rgba(0,0,0,0.30)",
                position: "relative",
              }}
            >
              {/* CLOSE */}

              <motion.button
                onClick={closeRoom}
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  zIndex: 10,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #17363b, #a18455)",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ×
              </motion.button>

              {/* MAIN IMAGE */}

              <div
                style={{
                  width: "100%",
                  height: "480px",
                  overflow: "hidden",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={
                      selectedRoom.images[
                        activeImage
                      ]
                    }
                    alt={selectedRoom.name}
                    initial={{
                      opacity: 0,
                      scale: 1.04,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* THUMBNAILS */}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "15px 25px",
                  overflowX: "auto",
                }}
              >
                {selectedRoom.images.map(
                  (image, index) => (
                    <motion.button
                      key={image}
                      onClick={() =>
                        setActiveImage(index)
                      }
                      whileHover={{
                        scale: 1.04,
                      }}
                      style={{
                        width: "100px",
                        height: "70px",
                        padding: 0,
                        border:
                          activeImage === index
                            ? "2px solid #a18455"
                            : "2px solid transparent",
                        cursor: "pointer",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={image}
                        alt={`${selectedRoom.name} ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </motion.button>
                  )
                )}
              </div>

              {/* DETAILS */}

              <div
                className="room-modal-details"
                style={{
                  padding: "20px 35px 40px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: "11px",
                    letterSpacing: "4px",
                    color: "#d6b06b",
                  }}
                >
                  PARADISE RESORT
                </p>

                <h2
                  style={{
                    margin: "0 0 15px",
                    fontSize:
                      "clamp(32px, 5vw, 52px)",
                    fontWeight: "400",
                    color: "#f7efe1",
                    letterSpacing: "-1px",
                  }}
                >
                  {selectedRoom.name}
                </h2>

                <p
                  style={{
                    maxWidth: "750px",
                    color: "#b8c7c5",
                    lineHeight: 1.8,
                    fontSize: "15px",
                  }}
                >
                  {selectedRoom.description}
                </p>

                {/* ROOM INFORMATION */}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "35px",
                    marginTop: "25px",
                    padding: "20px 0",
                    borderTop:
                      "1px solid rgba(214,176,107,0.25)",
                    borderBottom:
                      "1px solid rgba(214,176,107,0.25)",
                  }}
                >
                  <div>
                    <small
                      style={{
                        display: "block",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "#d6b06b",
                        marginBottom: "6px",
                      }}
                    >
                      GUESTS
                    </small>

                    <strong style={{ color: "#f7efe1" }}>
                      {selectedRoom.guests}
                    </strong>
                  </div>

                  <div>
                    <small
                      style={{
                        display: "block",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "#d6b06b",
                        marginBottom: "6px",
                      }}
                    >
                      BED
                    </small>

                    <strong style={{ color: "#f7efe1" }}>
                      {selectedRoom.bed}
                    </strong>
                  </div>

                  <div>
                    <small
                      style={{
                        display: "block",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "#d6b06b",
                        marginBottom: "6px",
                      }}
                    >
                      VIEW
                    </small>

                    <strong style={{ color: "#f7efe1" }}>
                      {selectedRoom.view}
                    </strong>
                  </div>
                </div>

                {/* AMENITIES */}

                <h3
                  style={{
                    marginTop: "30px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Amenities
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "12px",
                    marginTop: "15px",
                  }}
                >
                  {selectedRoom.features.map(
                    (feature) => (
                      <div
                        key={feature}
                        style={{
                          padding:
                            "12px 15px",
                          background:
                            "linear-gradient(135deg, rgba(214,176,107,0.13), rgba(255,255,255,0.035))",
                          border: "1px solid rgba(214,176,107,0.20)",
                          borderRadius: "12px",
                          fontSize: "13px",
                          color: "#d9e2df",
                          boxShadow: "0 8px 22px rgba(0,0,0,0.20)",
                        }}
                      >
                        ✓ {feature}
                      </div>
                    )
                  )}
                </div>

                {/* PRICE + BOOK */}

                <div
                  style={{
                    marginTop: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: "500",
                        color: "#f7efe1",
                      }}
                    >
                      {selectedRoom.price}
                    </span>

                    <span
                      style={{
                        color: "#9fb0ae",
                        fontSize: "13px",
                      }}
                    >
                      {" "}
                      / night
                    </span>
                  </div>

                  <motion.button
                    onClick={() =>
                      bookRoom(selectedRoom)
                    }
                    whileHover={{
                      scale: 1.04,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    style={{
                      border: "none",
                      background:
                        "linear-gradient(135deg, #b88a3d, #e0bd73)",
                      borderRadius: "30px",
                      color: "white",
                      padding: "16px 35px",
                      boxShadow: "0 12px 30px rgba(214,176,107,0.24)",
                      cursor: "pointer",
                      fontSize: "12px",
                      letterSpacing: "2px",
                    }}
                  >
                    BOOK THIS ROOM
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingForm
        room={bookingRoom}
        onClose={() => {
          setBookingRoom(null);
          document.body.style.overflow = "auto";
        }}
      />

      <style>
        {`
          @media (max-width: 900px) {
            #stay {
              padding: 100px 4% 90px !important;
            }

            .rooms-grid {
              grid-template-columns: 1fr !important;
              max-width: 620px !important;
            }

            .room-card {
              width: 100%;
            }

            .room-modal {
              max-height: 92vh !important;
            }
          }

          @media (max-width: 600px) {
            #stay {
              padding: 85px 16px 70px !important;
            }

            .rooms-heading {
              margin-bottom: 45px !important;
            }

            .rooms-heading h2 {
              font-size: 42px !important;
            }

            .rooms-heading p {
              font-size: 13px !important;
            }

            .room-content {
              padding: 22px !important;
            }

            .room-content h3 {
              font-size: 24px !important;
            }

            .room-price-actions {
              align-items: stretch !important;
              flex-direction: column !important;
            }

            .room-price-actions > div:last-child {
              width: 100%;
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
            }

            .room-price-actions button {
              width: 100% !important;
              padding-left: 10px !important;
              padding-right: 10px !important;
            }

            .room-modal {
              max-width: 100% !important;
              border-radius: 18px !important;
            }

            .room-modal > div:first-of-type {
              height: 300px !important;
            }

            .room-modal .room-modal-details {
              padding: 18px 20px 30px !important;
            }
          }

          @media (max-width: 430px) {
            .room-modal > div:first-of-type {
              height: 250px !important;
            }

            .rooms-heading h2 {
              font-size: 36px !important;
            }
          }
        `}
      </style>
    </>
  );
}