import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const offers = [
  {
    title: "Honeymoon Escape",
    subtitle: "FOR TWO",
    price: "₹24,999",
    duration: "2 Nights / 3 Days",
    description:
      "A romantic coastal escape designed for couples seeking privacy, beautiful sunsets and unforgettable moments.",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1400&q=90",
    includes: [
      "Luxury accommodation",
      "Daily breakfast for two",
      "Private candlelight dinner",
      "Couples spa session",
      "Sunset beach experience",
    ],
  },
  {
    title: "Weekend Paradise",
    subtitle: "SHORT ESCAPE",
    price: "₹16,999",
    duration: "2 Nights / 3 Days",
    description:
      "Leave the city behind and spend a relaxing weekend surrounded by tropical landscapes and the ocean.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=90",
    includes: [
      "Premium room stay",
      "Breakfast & dinner",
      "Pool access",
      "Beach access",
      "Welcome refreshments",
    ],
  },
  {
    title: "Family Beach Retreat",
    subtitle: "FOR THE FAMILY",
    price: "₹32,999",
    duration: "3 Nights / 4 Days",
    description:
      "A spacious family getaway filled with beach adventures, comfortable accommodation and experiences for everyone.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=90",
    includes: [
      "Family villa accommodation",
      "Daily breakfast",
      "Kids activities",
      "Beach activities",
      "Family dinner experience",
    ],
  },
  {
    title: "Sunset Romance",
    subtitle: "EVENING ESCAPE",
    price: "₹9,999",
    duration: "1 Night / 2 Days",
    description:
      "An intimate escape built around golden sunsets, ocean views and a private evening experience.",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=90",
    includes: [
      "Luxury room",
      "Sunset beach setup",
      "Private dinner",
      "Welcome drinks",
      "Breakfast for two",
    ],
  },
];

export default function Offers() {
  const [selectedOffer, setSelectedOffer] =
    useState(null);

  const openOffer = (offer) => {
    setSelectedOffer(offer);
    document.body.style.overflow = "hidden";
  };

  const closeOffer = () => {
    setSelectedOffer(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <section
        id="offers"
        style={{
          position: "relative",
          zIndex: 50,
          background:
            "linear-gradient(135deg, #06171b 0%, #0b2529 50%, #06161a 100%)",
          color: "#f5f0e7",
          padding: "130px 6%",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(216,184,106,0.12), transparent 70%)",
            top: "-300px",
            right: "-180px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(40,120,125,0.10), transparent 70%)",
            bottom: "-200px",
            left: "-150px",
            pointerEvents: "none",
          }}
        />

        {/* Heading */}
        <motion.div
          className="offers-heading"
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
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            textAlign: "center",
            marginBottom: "65px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <p
            style={{
              margin: "0 0 14px",
              color: "#d8b86a",
              fontSize: "10px",
              letterSpacing: "4px",
            }}
          >
            CURATED GETAWAYS
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(42px, 6vw, 76px)",
              fontWeight: "400",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            Special Offers
          </h2>

          <p
            style={{
              maxWidth: "600px",
              margin: "24px auto 0",
              color:
                "rgba(245,240,231,0.65)",
              fontSize: "14px",
              lineHeight: 1.8,
            }}
          >
            Make your stay even more memorable with
            carefully crafted packages created for
            romance, relaxation, family time and
            unforgettable coastal escapes.
          </p>
        </motion.div>

        {/* Offers */}
        <div
          className="offers-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "22px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {offers.map((offer, index) => (
            <motion.div
              className="offer-card"
              key={offer.title}
              initial={{
                opacity: 0,
                y: 60,
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
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
              }}
              style={{
                background:
                  "rgba(255,255,255,0.035)",
                border:
                  "1px solid rgba(216,184,106,0.22)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: "260px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.img
                  src={offer.image}
                  alt={offer.title}
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.8,
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
                      "linear-gradient(to top, rgba(3,13,16,0.75), transparent 65%)",
                  }}
                />

                {/* Offer label */}
                <div
                  style={{
                    position: "absolute",
                    top: "18px",
                    left: "18px",
                    padding: "8px 12px",
                    border:
                      "1px solid rgba(216,184,106,0.65)",
                    background:
                      "rgba(5,18,21,0.65)",
                    backdropFilter: "blur(8px)",
                    color: "#d8b86a",
                    fontSize: "8px",
                    letterSpacing: "2px",
                  }}
                >
                  SPECIAL OFFER
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "28px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 9px",
                    color: "#d8b86a",
                    fontSize: "9px",
                    letterSpacing: "3px",
                  }}
                >
                  {offer.subtitle}
                </p>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "26px",
                    fontWeight: "400",
                  }}
                >
                  {offer.title}
                </h3>

                <p
                  style={{
                    margin: "14px 0 20px",
                    color:
                      "rgba(245,240,231,0.62)",
                    fontSize: "12px",
                    lineHeight: 1.7,
                  }}
                >
                  {offer.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    borderTop:
                      "1px solid rgba(216,184,106,0.15)",
                    paddingTop: "18px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0 0 5px",
                        color:
                          "rgba(245,240,231,0.45)",
                        fontSize: "9px",
                        letterSpacing: "1px",
                      }}
                    >
                      FROM
                    </p>

                    <strong
                      style={{
                        color: "#d8b86a",
                        fontSize: "21px",
                        fontWeight: "500",
                      }}
                    >
                      {offer.price}
                    </strong>
                  </div>

                  <span
                    style={{
                      color:
                        "rgba(245,240,231,0.5)",
                      fontSize: "9px",
                    }}
                  >
                    {offer.duration}
                  </span>
                </div>

                <motion.button
                  whileHover={{
                    y: -2,
                    background: "#d8b86a",
                    color: "#071b20",
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    openOffer(offer)
                  }
                  style={{
                    width: "100%",
                    marginTop: "22px",
                    padding: "14px",
                    border:
                      "1px solid #d8b86a",
                    background:
                      "transparent",
                    color: "#d8b86a",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    cursor: "pointer",
                    transition:
                      "background 0.25s ease, color 0.25s ease",
                  }}
                >
                  VIEW OFFER
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Offer Modal */}
      <AnimatePresence>
        {selectedOffer && (
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
            onClick={closeOffer}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 5000,
              background:
                "rgba(2,10,13,0.86)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              className="offer-modal"
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
                maxWidth: "850px",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#0b2024",
                border:
                  "1px solid rgba(216,184,106,0.35)",
                boxShadow:
                  "0 35px 100px rgba(0,0,0,0.55)",
              }}
            >
              {/* Modal image */}
              <div
                className="offer-modal-image"
                style={{
                  height: "300px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={selectedOffer.image}
                  alt={selectedOffer.title}
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
                      "linear-gradient(to top, rgba(5,18,21,0.95), transparent 65%)",
                  }}
                />

                <button
                  onClick={closeOffer}
                  style={{
                    position: "absolute",
                    top: "18px",
                    right: "18px",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border:
                      "1px solid rgba(255,255,255,0.4)",
                    background:
                      "rgba(0,0,0,0.4)",
                    color: "white",
                    fontSize: "21px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>

                <div
                  style={{
                    position: "absolute",
                    bottom: "28px",
                    left: "32px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 7px",
                      color: "#d8b86a",
                      fontSize: "9px",
                      letterSpacing: "3px",
                    }}
                  >
                    {selectedOffer.subtitle}
                  </p>

                  <h2
                    style={{
                      margin: 0,
                      color: "white",
                      fontSize: "36px",
                      fontWeight: "400",
                    }}
                  >
                    {selectedOffer.title}
                  </h2>
                </div>
              </div>

              {/* Modal body */}
              <div
                style={{
                  padding: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "25px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0 0 5px",
                        color:
                          "rgba(245,240,231,0.45)",
                        fontSize: "9px",
                        letterSpacing: "2px",
                      }}
                    >
                      PACKAGE PRICE
                    </p>

                    <strong
                      style={{
                        color: "#d8b86a",
                        fontSize: "28px",
                        fontWeight: "500",
                      }}
                    >
                      {selectedOffer.price}
                    </strong>
                  </div>

                  <div
                    style={{
                      padding:
                        "10px 16px",
                      border:
                        "1px solid rgba(216,184,106,0.25)",
                      color:
                        "rgba(245,240,231,0.7)",
                      fontSize: "11px",
                    }}
                  >
                    {selectedOffer.duration}
                  </div>
                </div>

                <p
                  style={{
                    margin: "0 0 25px",
                    color:
                      "rgba(245,240,231,0.68)",
                    fontSize: "14px",
                    lineHeight: 1.8,
                  }}
                >
                  {selectedOffer.description}
                </p>

                <h4
                  style={{
                    margin: "0 0 15px",
                    color: "#d8b86a",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    fontWeight: "500",
                  }}
                >
                  PACKAGE INCLUDES
                </h4>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {selectedOffer.includes.map(
                    (item) => (
                      <div
                        key={item}
                        style={{
                          padding: "15px",
                          border:
                            "1px solid rgba(216,184,106,0.18)",
                          background:
                            "rgba(255,255,255,0.025)",
                          color:
                            "rgba(245,240,231,0.8)",
                          fontSize: "12px",
                        }}
                      >
                        <span
                          style={{
                            color: "#d8b86a",
                            marginRight: "8px",
                          }}
                        >
                          ✦
                        </span>

                        {item}
                      </div>
                    )
                  )}
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() => {
                    alert(
                      `Booking selected: ${selectedOffer.title}`
                    );
                  }}
                  style={{
                    width: "100%",
                    marginTop: "28px",
                    padding: "17px",
                    border: "none",
                    background: "#d8b86a",
                    color: "#071b20",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  BOOK THIS PACKAGE
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @media (max-width: 900px) {
            #offers {
              padding: 100px 4% 90px !important;
            }

            .offers-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              gap: 16px !important;
            }

            .offer-card {
              min-width: 0 !important;
            }

            .offer-modal {
              max-height: 92vh !important;
            }
          }

          @media (max-width: 600px) {
            #offers {
              padding: 85px 16px 70px !important;
            }

            .offers-heading {
              margin-bottom: 45px !important;
            }

            .offers-heading h2 {
              font-size: 43px !important;
            }

            .offers-heading > p:last-child {
              font-size: 13px !important;
            }

            .offers-grid {
              grid-template-columns: 1fr !important;
              max-width: 620px !important;
              margin: 0 auto !important;
              gap: 18px !important;
            }

            .offer-card {
              width: 100% !important;
            }

            .offer-card > div:first-child {
              height: 235px !important;
            }

            .offer-card-content {
              padding: 22px !important;
            }

            .offer-card-content h3 {
              font-size: 24px !important;
            }

            .offer-card-content p {
              font-size: 12px !important;
            }

            .offer-card-content strong {
              font-size: 20px !important;
            }

            .offer-modal {
              max-width: 100% !important;
              max-height: 94vh !important;
              border-radius: 14px !important;
              overflow-y: auto !important;
            }

            .offer-modal-image {
              height: 220px !important;
            }

            .offer-modal-content {
              padding: 22px 18px 26px !important;
            }

            .offer-modal-content > div:first-child {
              align-items: flex-start !important;
              flex-direction: column !important;
              gap: 12px !important;
            }

            .offer-modal-content > div:first-child > div:last-child {
              width: 100% !important;
              box-sizing: border-box !important;
            }

            .offer-modal-content > div:nth-of-type(2) {
              grid-template-columns: 1fr !important;
            }

            .offer-modal-content button {
              width: 100% !important;
            }
          }

          @media (max-width: 430px) {
            .offers-heading h2 {
              font-size: 37px !important;
            }

            .offer-card > div:first-child {
              height: 215px !important;
            }

            .offer-card-content {
              padding: 20px !important;
            }

            .offer-card-content h3 {
              font-size: 22px !important;
            }

            .offer-modal-image {
              height: 195px !important;
            }
          }
        `}
      </style>
    </>
  );
}