import { AnimatePresence, motion } from "motion/react";

export default function BookingForm({
  room,
  onClose,
}) {
  if (!room) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Booking request submitted for ${room.name}`
    );

    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2000,
          background: "rgba(8, 20, 23, 0.75)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <motion.div
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
          onClick={(e) =>
            e.stopPropagation()
          }
          style={{
            width: "100%",
            maxWidth: "620px",
            maxHeight: "90vh",
            overflowY: "auto",
            background: "#fff",
            position: "relative",
          }}
        >
          {/* CLOSE BUTTON */}

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              zIndex: 5,
            }}
          >
            ×
          </button>

          {/* HEADER IMAGE */}

          <div
            style={{
              height: "220px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={room.images[0]}
              alt={room.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,.65), transparent)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "25px",
                left: "30px",
                color: "white",
              }}
            >
              <p
                style={{
                  margin: "0 0 7px",
                  fontSize: "10px",
                  letterSpacing: "3px",
                }}
              >
                PARADISE RESORT
              </p>

              <h2
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight: "400",
                }}
              >
                {room.name}
              </h2>
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            style={{
              padding: "30px",
            }}
          >
            <p
              style={{
                margin: "0 0 25px",
                color: "#687477",
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              Complete the details below to
              request your stay.
            </p>

            {/* NAME */}

            <label
              style={{
                display: "block",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "11px",
                  letterSpacing: "1.5px",
                  color: "#526064",
                }}
              >
                FULL NAME
              </span>

              <input
                type="text"
                placeholder="Enter your full name"
                required
                style={inputStyle}
              />
            </label>

            {/* EMAIL */}

            <label
              style={{
                display: "block",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "11px",
                  letterSpacing: "1.5px",
                  color: "#526064",
                }}
              >
                EMAIL ADDRESS
              </span>

              <input
                type="email"
                placeholder="Enter your email"
                required
                style={inputStyle}
              />
            </label>

            {/* PHONE */}

            <label
              style={{
                display: "block",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "11px",
                  letterSpacing: "1.5px",
                  color: "#526064",
                }}
              >
                PHONE NUMBER
              </span>

              <input
                type="tel"
                placeholder="Enter your phone number"
                required
                style={inputStyle}
              />
            </label>

            {/* DATES */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "15px",
              }}
            >
              <label>
                <span
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    color: "#526064",
                  }}
                >
                  CHECK-IN
                </span>

                <input
                  type="date"
                  required
                  style={inputStyle}
                />
              </label>

              <label>
                <span
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    color: "#526064",
                  }}
                >
                  CHECK-OUT
                </span>

                <input
                  type="date"
                  required
                  style={inputStyle}
                />
              </label>
            </div>

            {/* GUESTS */}

            <label
              style={{
                display: "block",
                marginTop: "18px",
              }}
            >
              <span
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "11px",
                  letterSpacing: "1.5px",
                  color: "#526064",
                }}
              >
                NUMBER OF GUESTS
              </span>

              <select
                defaultValue="2"
                style={inputStyle}
              >
                <option value="1">
                  1 Guest
                </option>

                <option value="2">
                  2 Guests
                </option>

                <option value="3">
                  3 Guests
                </option>

                <option value="4">
                  4 Guests
                </option>

                <option value="5">
                  5 Guests
                </option>

                <option value="6">
                  6 Guests
                </option>
              </select>
            </label>

            {/* SPECIAL REQUEST */}

            <label
              style={{
                display: "block",
                marginTop: "18px",
              }}
            >
              <span
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "11px",
                  letterSpacing: "1.5px",
                  color: "#526064",
                }}
              >
                SPECIAL REQUEST
              </span>

              <textarea
                placeholder="Any special requests?"
                rows="3"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />
            </label>

            {/* PRICE */}

            <div
              style={{
                marginTop: "25px",
                padding: "18px",
                background: "#f7f4ee",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  letterSpacing: "1px",
                  color: "#687477",
                }}
              >
                ROOM RATE
              </span>

              <strong
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#172326",
                }}
              >
                {room.price}
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "400",
                    color: "#687477",
                  }}
                >
                  {" "}
                  / night
                </span>
              </strong>
            </div>

            {/* SUBMIT */}

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "17px",
                border: "none",
                background: "#17363b",
                color: "white",
                cursor: "pointer",
                fontSize: "11px",
                letterSpacing: "2px",
              }}
            >
              CONFIRM BOOKING REQUEST
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 14px",
  border: "1px solid #ddd8ce",
  background: "#fff",
  color: "#172326",
  fontSize: "13px",
  outline: "none",
};