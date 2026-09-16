import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

/* =========================
   ROOMS
========================= */

const rooms = [
  {
    name: "Ocean View Suite",
    price: 12000,
    guests: 2,
  },
  {
    name: "Beachfront Villa",
    price: 18000,
    guests: 4,
  },
  {
    name: "Presidential Villa",
    price: 28000,
    guests: 6,
  },
];

/* =========================
   PACKAGES
========================= */

const packages = [
  {
    name: "No Package",
    price: 0,
  },
  {
    name: "Honeymoon Escape",
    price: 5000,
  },
  {
    name: "Weekend Paradise",
    price: 3500,
  },
  {
    name: "Family Beach Retreat",
    price: 7000,
  },
  {
    name: "Sunset Romance",
    price: 2500,
  },
];

/* =========================
   RESERVATION
========================= */

export default function Reservation({
  selectedOffer,
}) {
  /* =========================
     SELECTED ROOM
  ========================= */

  const [selectedRoom, setSelectedRoom] =
    useState(rooms[0]);

  /* =========================
     SELECTED PACKAGE
  ========================= */

  const [selectedPackage, setSelectedPackage] =
    useState(packages[0]);

  /* =========================
     DATES
  ========================= */

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  /* =========================
     GUESTS
  ========================= */

  const [guests, setGuests] =
    useState(2);

  /* =========================
     SUBMISSION
  ========================= */

  const [submitted, setSubmitted] =
    useState(false);

  /* =========================
     FORM DATA
  ========================= */

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      requests: "",
    });

  /* =========================
     READ ROOM FROM ROOMS PAGE
  ========================= */

  useEffect(() => {
    const savedRoom =
      localStorage.getItem(
        "selectedRoom"
      );

    if (!savedRoom) return;

    try {
      const parsedRoom =
        JSON.parse(savedRoom);

      const matchingRoom =
        rooms.find(
          (room) =>
            room.name ===
            parsedRoom.name
        );

      if (matchingRoom) {
        setSelectedRoom(
          matchingRoom
        );

        setGuests(
          Math.min(
            2,
            matchingRoom.guests
          )
        );
      }
    } catch (error) {
      console.error(
        "Unable to read selected room:",
        error
      );
    }

    localStorage.removeItem(
      "selectedRoom"
    );
  }, []);

  /* =========================
     READ PACKAGE FROM OFFERS
  ========================= */

  useEffect(() => {
    if (!selectedOffer) return;

    const offerName =
      selectedOffer.title ||
      selectedOffer.name;

    const matchingPackage =
      packages.find(
        (item) =>
          item.name === offerName
      );

    if (matchingPackage) {
      setSelectedPackage(
        matchingPackage
      );
    }
  }, [selectedOffer]);

  /* =========================
     NIGHTS CALCULATION
  ========================= */

  const nights = useMemo(() => {
    if (
      !checkIn ||
      !checkOut
    ) {
      return 0;
    }

    const start =
      new Date(checkIn);

    const end =
      new Date(checkOut);

    const difference =
      end.getTime() -
      start.getTime();

    const calculatedNights =
      Math.ceil(
        difference /
          (1000 *
            60 *
            60 *
            24)
      );

    return calculatedNights > 0
      ? calculatedNights
      : 0;
  }, [checkIn, checkOut]);

  /* =========================
     PRICE CALCULATION
  ========================= */

  const roomTotal =
    selectedRoom.price *
    nights;

  const packageTotal =
    selectedPackage.price *
    nights;

  const totalPrice =
    roomTotal +
    packageTotal;

  /* =========================
     FORM UPDATE
  ========================= */

  const updateForm = (
    field,
    value
  ) => {
    setFormData(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (nights <= 0) {
      alert(
        "Please select a valid check-in and check-out date."
      );
      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top:
        document.getElementById(
          "reservation"
        )?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  /* =========================
     RESET
  ========================= */

  const resetBooking = () => {
    setSubmitted(false);

    setCheckIn("");
    setCheckOut("");

    setGuests(2);

    setSelectedRoom(
      rooms[0]
    );

    setSelectedPackage(
      packages[0]
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      requests: "",
    });
  };

  /* =========================
     TODAY
  ========================= */

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  /* =========================
     UI
  ========================= */

  return (
    <section
      id="reservation"
      style={{
        position: "relative",
        zIndex: 50,
        minHeight: "100vh",

        background:
          "linear-gradient(135deg, #06171b 0%, #0b272b 50%, #06161a 100%)",

        color: "#f5f0e7",

        padding:
          "130px 6%",

        overflow: "hidden",
      }}
    >
      {/* =========================
          DECORATIVE GLOW
      ========================= */}

      <div
        style={{
          position:
            "absolute",

          width: "600px",
          height: "600px",

          borderRadius:
            "50%",

          background:
            "radial-gradient(circle, rgba(216,184,106,0.12), transparent 70%)",

          top: "-300px",
          left: "-200px",

          pointerEvents:
            "none",
        }}
      />

      <div
        style={{
          position:
            "absolute",

          width: "500px",
          height: "500px",

          borderRadius:
            "50%",

          background:
            "radial-gradient(circle, rgba(36,117,123,0.1), transparent 70%)",

          bottom: "-250px",
          right: "-150px",

          pointerEvents:
            "none",
        }}
      />

      {/* =========================
          HEADING
      ========================= */}

      <motion.div
        className="reservation-heading"
        initial={{
          opacity: 0,
          y: 45,
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
          duration: 0.9,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        style={{
          textAlign:
            "center",

          marginBottom:
            "55px",

          position:
            "relative",

          zIndex: 2,
        }}
      >
        <p
          style={{
            margin:
              "0 0 14px",

            color:
              "#d8b86a",

            fontSize:
              "10px",

            letterSpacing:
              "4px",
          }}
        >
          YOUR ESCAPE AWAITS
        </p>

        <h2
          style={{
            margin: 0,

            fontSize:
              "clamp(40px, 6vw, 72px)",

            fontWeight:
              "400",

            lineHeight: 1,

            letterSpacing:
              "-2px",
          }}
        >
          Reserve Your Stay
        </h2>

        <p
          style={{
            maxWidth:
              "620px",

            margin:
              "22px auto 0",

            color:
              "rgba(245,240,231,0.65)",

            fontSize:
              "14px",

            lineHeight:
              1.8,
          }}
        >
          Choose your dates,
          select your perfect
          accommodation and
          create your own
          Paradise Resort
          experience.
        </p>
      </motion.div>

      {/* =========================
          FORM / SUCCESS
      ========================= */}

      <AnimatePresence
        mode="wait"
      >
        {!submitted ? (
          <motion.div
            className="reservation-content"
            key="booking-form"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.6,
            }}
            style={{
              maxWidth:
                "1100px",

              margin:
                "0 auto",

              display:
                "grid",

              gridTemplateColumns:
                "minmax(0, 1.5fr) minmax(280px, 0.8fr)",

              gap: "25px",

              position:
                "relative",

              zIndex: 2,
            }}
          >
            {/* =========================
                FORM
            ========================= */}

            <form
              className="reservation-form"
              onSubmit={
                handleSubmit
              }
              style={{
                background:
                  "rgba(255,255,255,0.035)",

                border:
                  "1px solid rgba(216,184,106,0.22)",

                padding:
                  "35px",
              }}
            >
              {/* DATES */}

              <div
                className="reservation-dates"
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "1fr 1fr",

                  gap: "18px",

                  marginBottom:
                    "25px",
                }}
              >
                <div>
                  <label
                    style={
                      labelStyle
                    }
                  >
                    CHECK-IN
                  </label>

                  <input
                    type="date"
                    value={
                      checkIn
                    }
                    min={
                      today
                    }
                    onChange={(
                      e
                    ) =>
                      setCheckIn(
                        e.target
                          .value
                      )
                    }
                    required
                    style={
                      inputStyle
                    }
                  />
                </div>

                <div>
                  <label
                    style={
                      labelStyle
                    }
                  >
                    CHECK-OUT
                  </label>

                  <input
                    type="date"
                    value={
                      checkOut
                    }
                    min={
                      checkIn ||
                      today
                    }
                    onChange={(
                      e
                    ) =>
                      setCheckOut(
                        e.target
                          .value
                      )
                    }
                    required
                    style={
                      inputStyle
                    }
                  />
                </div>
              </div>

              {/* ROOM */}

              <div
                style={{
                  marginBottom:
                    "25px",
                }}
              >
                <label
                  style={
                    labelStyle
                  }
                >
                  SELECT ROOM / VILLA
                </label>

                <select
                  value={
                    selectedRoom.name
                  }
                  onChange={(
                    e
                  ) => {
                    const room =
                      rooms.find(
                        (item) =>
                          item.name ===
                          e.target
                            .value
                      );

                    if (!room)
                      return;

                    setSelectedRoom(
                      room
                    );

                    if (
                      guests >
                      room.guests
                    ) {
                      setGuests(
                        room.guests
                      );
                    }
                  }}
                  style={
                    inputStyle
                  }
                >
                  {rooms.map(
                    (room) => (
                      <option
                        key={
                          room.name
                        }
                        value={
                          room.name
                        }
                        style={
                          optionStyle
                        }
                      >
                        {
                          room.name
                        }{" "}
                        — ₹
                        {room.price.toLocaleString(
                          "en-IN"
                        )}{" "}
                        / night
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* GUESTS */}

              <div
                style={{
                  marginBottom:
                    "25px",
                }}
              >
                <label
                  style={
                    labelStyle
                  }
                >
                  NUMBER OF GUESTS
                </label>

                <select
                  value={
                    guests
                  }
                  onChange={(
                    e
                  ) =>
                    setGuests(
                      Number(
                        e.target
                          .value
                      )
                    )
                  }
                  style={
                    inputStyle
                  }
                >
                  {Array.from(
                    {
                      length:
                        selectedRoom.guests,
                    },
                    (
                      _,
                      index
                    ) =>
                      index + 1
                  ).map(
                    (number) => (
                      <option
                        key={
                          number
                        }
                        value={
                          number
                        }
                        style={
                          optionStyle
                        }
                      >
                        {number}{" "}
                        {number ===
                        1
                          ? "Guest"
                          : "Guests"}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* PACKAGE */}

              <div
                style={{
                  marginBottom:
                    "30px",
                }}
              >
                <label
                  style={
                    labelStyle
                  }
                >
                  SELECT PACKAGE
                </label>

                <select
                  value={
                    selectedPackage.name
                  }
                  onChange={(
                    e
                  ) => {
                    const selected =
                      packages.find(
                        (item) =>
                          item.name ===
                          e.target
                            .value
                      );

                    if (
                      selected
                    ) {
                      setSelectedPackage(
                        selected
                      );
                    }
                  }}
                  style={
                    inputStyle
                  }
                >
                  {packages.map(
                    (item) => (
                      <option
                        key={
                          item.name
                        }
                        value={
                          item.name
                        }
                        style={
                          optionStyle
                        }
                      >
                        {
                          item.name
                        }

                        {item.price >
                        0
                          ? ` — +₹${item.price.toLocaleString(
                              "en-IN"
                            )} / night`
                          : ""}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* DIVIDER */}

              <div
                style={{
                  height: "1px",

                  background:
                    "rgba(216,184,106,0.16)",

                  marginBottom:
                    "30px",
                }}
              />

              {/* GUEST INFORMATION */}

              <h3
                style={{
                  margin:
                    "0 0 22px",

                  color:
                    "#d8b86a",

                  fontSize:
                    "11px",

                  letterSpacing:
                    "2px",

                  fontWeight:
                    "500",
                }}
              >
                GUEST INFORMATION
              </h3>

              <div
                className="reservation-guest-info"
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "1fr 1fr",

                  gap: "18px",

                  marginBottom:
                    "18px",
                }}
              >
                <div>
                  <label
                    style={
                      labelStyle
                    }
                  >
                    FULL NAME
                  </label>

                  <input
                    type="text"
                    placeholder="Your full name"
                    value={
                      formData.name
                    }
                    onChange={(
                      e
                    ) =>
                      updateForm(
                        "name",
                        e.target
                          .value
                      )
                    }
                    required
                    style={
                      inputStyle
                    }
                  />
                </div>

                <div>
                  <label
                    style={
                      labelStyle
                    }
                  >
                    PHONE NUMBER
                  </label>

                  <input
                    type="tel"
                    placeholder="Your phone number"
                    value={
                      formData.phone
                    }
                    onChange={(
                      e
                    ) =>
                      updateForm(
                        "phone",
                        e.target
                          .value
                      )
                    }
                    required
                    style={
                      inputStyle
                    }
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div
                style={{
                  marginBottom:
                    "18px",
                }}
              >
                <label
                  style={
                    labelStyle
                  }
                >
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  placeholder="Your email address"
                  value={
                    formData.email
                  }
                  onChange={(
                    e
                  ) =>
                    updateForm(
                      "email",
                      e.target
                        .value
                    )
                  }
                  required
                  style={
                    inputStyle
                  }
                />
              </div>

              {/* REQUESTS */}

              <div>
                <label
                  style={
                    labelStyle
                  }
                >
                  SPECIAL REQUESTS
                </label>

                <textarea
                  rows="4"
                  placeholder="Tell us if you have any special requests..."
                  value={
                    formData.requests
                  }
                  onChange={(
                    e
                  ) =>
                    updateForm(
                      "requests",
                      e.target
                        .value
                    )
                  }
                  style={{
                    ...inputStyle,
                    resize:
                      "vertical",
                  }}
                />
              </div>

              {/* SUBMIT */}

              <motion.button
                type="submit"
                whileHover={{
                  y: -3,
                  scale: 1.01,

                  boxShadow:
                    "0 15px 35px rgba(216,184,106,0.18)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                style={{
                  width:
                    "100%",

                  marginTop:
                    "25px",

                  padding:
                    "17px",

                  border:
                    "none",

                  background:
                    "#d8b86a",

                  color:
                    "#071b20",

                  fontSize:
                    "10px",

                  letterSpacing:
                    "2px",

                  fontWeight:
                    "600",

                  cursor:
                    "pointer",
                }}
              >
                SUBMIT RESERVATION REQUEST
              </motion.button>
            </form>

            {/* =========================
                SUMMARY
            ========================= */}

            <motion.div
              className="reservation-summary"
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              style={{
                height:
                  "fit-content",

                background:
                  "linear-gradient(160deg, #102d31, #081c20)",

                border:
                  "1px solid rgba(216,184,106,0.25)",

                padding:
                  "30px",

                position:
                  "sticky",

                top:
                  "100px",
              }}
            >
              <p
                style={{
                  margin:
                    "0 0 10px",

                  color:
                    "#d8b86a",

                  fontSize:
                    "9px",

                  letterSpacing:
                    "3px",
                }}
              >
                YOUR RESERVATION
              </p>

              <h3
                style={{
                  margin:
                    "0 0 25px",

                  fontSize:
                    "26px",

                  fontWeight:
                    "400",
                }}
              >
                {
                  selectedRoom.name
                }
              </h3>

              <SummaryRow
                label="CHECK-IN"
                value={
                  checkIn ||
                  "Select date"
                }
              />

              <SummaryRow
                label="CHECK-OUT"
                value={
                  checkOut ||
                  "Select date"
                }
              />

              <SummaryRow
                label="NIGHTS"
                value={
                  nights > 0
                    ? `${nights} ${
                        nights ===
                        1
                          ? "Night"
                          : "Nights"
                      }`
                    : "—"
                }
              />

              <SummaryRow
                label="GUESTS"
                value={`${guests} ${
                  guests === 1
                    ? "Guest"
                    : "Guests"
                }`}
              />

              <SummaryRow
                label="PACKAGE"
                value={
                  selectedPackage.name
                }
              />

              <div
                style={{
                  height:
                    "1px",

                  background:
                    "rgba(216,184,106,0.18)",

                  margin:
                    "25px 0 20px",
                }}
              />

              <PriceRow
                label="Room"
                value={
                  roomTotal
                }
              />

              {packageTotal >
                0 && (
                <PriceRow
                  label="Package"
                  value={
                    packageTotal
                  }
                />
              )}

              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginTop:
                    "18px",

                  paddingTop:
                    "18px",

                  borderTop:
                    "1px solid rgba(216,184,106,0.25)",
                }}
              >
                <span
                  style={{
                    color:
                      "rgba(245,240,231,0.65)",

                    fontSize:
                      "10px",

                    letterSpacing:
                      "2px",
                  }}
                >
                  ESTIMATED TOTAL
                </span>

                <strong
                  style={{
                    color:
                      "#d8b86a",

                    fontSize:
                      "25px",

                    fontWeight:
                      "500",
                  }}
                >
                  ₹
                  {totalPrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <p
                style={{
                  margin:
                    "18px 0 0",

                  color:
                    "rgba(245,240,231,0.4)",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.6,
                }}
              >
                Final pricing and
                availability will
                be confirmed by
                the resort after
                your reservation
                request.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* =========================
             SUCCESS
          ========================= */

          <motion.div
            className="reservation-success"
            key="success"
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.6,
            }}
            style={{
              maxWidth:
                "700px",

              margin:
                "0 auto",

              padding:
                "60px 35px",

              textAlign:
                "center",

              background:
                "rgba(255,255,255,0.035)",

              border:
                "1px solid rgba(216,184,106,0.3)",

              position:
                "relative",

              zIndex: 2,
            }}
          >
            {/* CHECK ICON */}

            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                delay: 0.25,

                type:
                  "spring",

                stiffness:
                  180,
              }}
              style={{
                width: "72px",
                height: "72px",

                borderRadius:
                  "50%",

                border:
                  "1px solid #d8b86a",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                margin:
                  "0 auto 25px",

                color:
                  "#d8b86a",

                fontSize:
                  "30px",
              }}
            >
              ✓
            </motion.div>

            <p
              style={{
                margin:
                  "0 0 12px",

                color:
                  "#d8b86a",

                fontSize:
                  "10px",

                letterSpacing:
                  "4px",
              }}
            >
              REQUEST RECEIVED
            </p>

            <h2
              style={{
                margin: 0,

                fontSize:
                  "40px",

                fontWeight:
                  "400",
              }}
            >
              Thank You
            </h2>

            <p
              style={{
                maxWidth:
                  "500px",

                margin:
                  "20px auto 30px",

                color:
                  "rgba(245,240,231,0.65)",

                fontSize:
                  "14px",

                lineHeight:
                  1.8,
              }}
            >
              Your reservation
              request for{" "}
              <strong
                style={{
                  color:
                    "#d8b86a",

                  fontWeight:
                    "400",
                }}
              >
                {
                  selectedRoom.name
                }
              </strong>{" "}
              has been
              received. Our
              team will contact
              you to confirm
              availability and
              finalize your
              stay.
            </p>

            <div
              style={{
                display:
                  "inline-flex",

                flexDirection:
                  "column",

                gap: "9px",

                padding:
                  "20px 35px",

                border:
                  "1px solid rgba(216,184,106,0.18)",

                background:
                  "rgba(255,255,255,0.025)",

                marginBottom:
                  "30px",
              }}
            >
              <span
                style={{
                  color:
                    "rgba(245,240,231,0.45)",

                  fontSize:
                    "10px",
                }}
              >
                ESTIMATED STAY
              </span>

              <strong
                style={{
                  color:
                    "#d8b86a",

                  fontSize:
                    "20px",

                  fontWeight:
                    "400",
                }}
              >
                {nights}{" "}
                {nights === 1
                  ? "Night"
                  : "Nights"}{" "}
                · ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <br />

            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={
                resetBooking
              }
              style={{
                padding:
                  "14px 28px",

                border:
                  "1px solid #d8b86a",

                background:
                  "transparent",

                color:
                  "#d8b86a",

                fontSize:
                  "10px",

                letterSpacing:
                  "2px",

                cursor:
                  "pointer",
              }}
            >
              MAKE ANOTHER RESERVATION
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    
        <style>
          {`
            @media (max-width: 900px) {
              #reservation {
                padding: 100px 4% 80px !important;
              }

              .reservation-content {
                grid-template-columns: 1fr !important;
              }

              .reservation-form {
                padding: 25px !important;
              }

              .reservation-dates,
              .reservation-guest-info {
                grid-template-columns: 1fr !important;
              }

              .reservation-summary {
                position: relative !important;
                top: auto !important;
              }
            }

            @media (max-width: 600px) {
              #reservation {
                padding: 90px 16px 65px !important;
              }

              .reservation-heading {
                margin-bottom: 35px !important;
              }

              .reservation-heading h2 {
                font-size: 42px !important;
              }

              .reservation-form {
                padding: 20px !important;
              }

              .reservation-summary {
                padding: 22px !important;
              }

              .reservation-success {
                padding: 45px 20px !important;
              }

              .reservation-success h2 {
                font-size: 34px !important;
              }
            }
          `}
        </style>

</section>
  );
}

/* =========================
   SUMMARY ROW
========================= */

function SummaryRow({
  label,
  value,
}) {
  return (
    <div
      style={{
        display:
          "flex",

        justifyContent:
          "space-between",

        gap: "15px",

        padding:
          "10px 0",

        borderBottom:
          "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          color:
            "rgba(245,240,231,0.4)",

          fontSize:
            "9px",

          letterSpacing:
            "1px",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color:
            "rgba(245,240,231,0.8)",

          fontSize:
            "11px",

          textAlign:
            "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* =========================
   PRICE ROW
========================= */

function PriceRow({
  label,
  value,
}) {
  return (
    <div
      style={{
        display:
          "flex",

        justifyContent:
          "space-between",

        marginBottom:
          "10px",
      }}
    >
      <span
        style={{
          color:
            "rgba(245,240,231,0.55)",

          fontSize:
            "11px",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color:
            "rgba(245,240,231,0.8)",

          fontSize:
            "12px",
        }}
      >
        ₹
        {value.toLocaleString(
          "en-IN"
        )}
      </span>
    </div>
  );
}

/* =========================
   LABEL STYLE
========================= */

const labelStyle = {
  display: "block",

  marginBottom:
    "8px",

  color: "#b9afa0",

  fontSize: "9px",

  letterSpacing:
    "1.8px",
};

/* =========================
   INPUT STYLE
========================= */

const inputStyle = {
  width: "100%",

  boxSizing:
    "border-box",

  padding:
    "14px 15px",

  border:
    "1px solid rgba(216,184,106,0.2)",

  outline: "none",

  background:
    "rgba(255,255,255,0.045)",

  color:
    "#f5f0e7",

  fontSize:
    "13px",

  borderRadius:
    "0",
};

/* =========================
   OPTION STYLE
========================= */

const optionStyle = {
  background:
    "#102d31",

  color:
    "#f5f0e7",
};