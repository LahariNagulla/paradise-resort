import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const experiences = [
  {
    title: "Private Beach",
    subtitle: "COASTAL ESCAPE",
    description:
      "Step onto our private shoreline and experience peaceful mornings, golden sunsets and uninterrupted ocean views.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    details: [
      "Private beach access",
      "Sun loungers & umbrellas",
      "Beachside refreshments",
      "Sunset walks",
    ],
  },
  {
    title: "Infinity Pool",
    subtitle: "POOL & LEISURE",
    description:
      "Relax beside our infinity pool while the horizon blends seamlessly with the endless blue of the sea.",
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1400&q=85",
    details: [
      "Ocean-facing infinity pool",
      "Private cabanas",
      "Poolside service",
      "Evening ambience",
    ],
  },
  {
    title: "Spa & Wellness",
    subtitle: "RENEW YOURSELF",
    description:
      "Slow down and reconnect with yourself through calming treatments, wellness rituals and peaceful surroundings.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85",
    details: [
      "Signature spa treatments",
      "Couples wellness rituals",
      "Aromatherapy",
      "Relaxation lounge",
    ],
  },
  {
    title: "Water Adventures",
    subtitle: "OCEAN ADVENTURES",
    description:
      "Discover the coastline with exciting water experiences designed for adventure, fun and unforgettable memories.",
    image:
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1400&q=85",
    details: [
      "Kayaking",
      "Paddle boarding",
      "Snorkelling",
      "Guided ocean activities",
    ],
  },
  {
    title: "Sunset Experience",
    subtitle: "GOLDEN HOUR",
    description:
      "Watch the sun disappear beyond the horizon with a private evening experience created around the beauty of golden hour.",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=85",
    details: [
      "Private sunset seating",
      "Signature refreshments",
      "Ocean views",
      "Photography moments",
    ],
  },
  {
    title: "Nature & Leisure",
    subtitle: "SLOW LIVING",
    description:
      "Explore tropical surroundings, peaceful gardens and quiet spaces designed for a slower, more meaningful escape.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
    details: [
      "Tropical gardens",
      "Nature walks",
      "Private relaxation areas",
      "Outdoor experiences",
    ],
  },
];

export default function Experiences() {
  const [selectedExperience, setSelectedExperience] =
    useState(null);

  const openExperience = (experience) => {
    setSelectedExperience(experience);
    document.body.style.overflow = "hidden";
  };

  const closeExperience = () => {
    setSelectedExperience(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <section
        id="experiences"
        style={{
          position: "relative",
          zIndex: 50,
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #071b20 0%, #0d292d 50%, #07191d 100%)",
          color: "#f5f0e7",
          padding: "120px 6% 130px",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(213,180,104,0.12), transparent 70%)",
            top: "-180px",
            right: "-120px",
            pointerEvents: "none",
          }}
        />

        {/* Heading */}
        <motion.div
          className="experiences-heading"
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
            maxWidth: "760px",
            marginBottom: "65px",
          }}
        >
          <p
            style={{
              margin: "0 0 15px",
              color: "#d8b86a",
              fontSize: "11px",
              letterSpacing: "4px",
              fontWeight: "500",
            }}
          >
            BEYOND THE STAY
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
            Experiences
          </h2>

          <p
            style={{
              marginTop: "24px",
              maxWidth: "620px",
              color: "rgba(245,240,231,0.68)",
              fontSize: "15px",
              lineHeight: 1.8,
            }}
          >
            Discover unforgettable moments at Paradise Resort,
            from peaceful mornings by the ocean to extraordinary
            evenings beneath the sunset.
          </p>
        </motion.div>

        {/* Experience Grid */}
        <div
          className="experiences-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {experiences.map((experience, index) => (
            <motion.div
              className="experience-card"
              key={experience.title}
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
              onClick={() =>
                openExperience(experience)
              }
              style={{
                position: "relative",
                height: "430px",
                overflow: "hidden",
                cursor: "pointer",
                background: "#10282c",
                border:
                  "1px solid rgba(216,184,106,0.18)",
              }}
            >
              {/* Image */}
              <motion.img
                src={experience.image}
                alt={experience.title}
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

              {/* Dark gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(3,13,16,0.95) 0%, rgba(3,13,16,0.25) 55%, rgba(3,13,16,0.05) 100%)",
                }}
              />

              {/* Gold line */}
              <motion.div
                initial={{
                  width: "35px",
                }}
                whileHover={{
                  width: "70px",
                }}
                style={{
                  position: "absolute",
                  left: "28px",
                  bottom: "142px",
                  height: "1px",
                  background: "#d8b86a",
                }}
              />

              {/* Content */}
              <div
                className="experience-card-content"
                style={{
                  position: "absolute",
                  left: "28px",
                  right: "28px",
                  bottom: "28px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px",
                    color: "#d8b86a",
                    fontSize: "9px",
                    letterSpacing: "3px",
                  }}
                >
                  {experience.subtitle}
                </p>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "27px",
                    fontWeight: "400",
                  }}
                >
                  {experience.title}
                </h3>

                <p
                  style={{
                    margin: "12px 0 0",
                    color:
                      "rgba(255,255,255,0.68)",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  {experience.description}
                </p>

                <div
                  style={{
                    marginTop: "18px",
                    color: "#d8b86a",
                    fontSize: "10px",
                    letterSpacing: "2px",
                  }}
                >
                  DISCOVER EXPERIENCE →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExperience && (
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
            onClick={closeExperience}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 3000,
              background:
                "rgba(3,12,15,0.82)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              className="experience-modal"
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
                maxWidth: "900px",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#0b2024",
                border:
                  "1px solid rgba(216,184,106,0.3)",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,0.5)",
              }}
            >
              {/* Modal image */}
              <div
                className="experience-modal-image"
                style={{
                  height: "350px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
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
                      "linear-gradient(to top, rgba(5,18,21,0.9), transparent 65%)",
                  }}
                />

                <button
                  onClick={closeExperience}
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
                      "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(8px)",
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
                    bottom: "30px",
                    left: "35px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 8px",
                      color: "#d8b86a",
                      fontSize: "10px",
                      letterSpacing: "3px",
                    }}
                  >
                    {selectedExperience.subtitle}
                  </p>

                  <h2
                    style={{
                      margin: 0,
                      color: "white",
                      fontSize: "38px",
                      fontWeight: "400",
                    }}
                  >
                    {selectedExperience.title}
                  </h2>
                </div>
              </div>

              {/* Modal content */}
              <div
                style={{
                  padding: "35px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 28px",
                    color:
                      "rgba(245,240,231,0.72)",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    maxWidth: "700px",
                  }}
                >
                  {selectedExperience.description}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {selectedExperience.details.map(
                    (detail) => (
                      <div
                        key={detail}
                        style={{
                          padding: "17px",
                          border:
                            "1px solid rgba(216,184,106,0.2)",
                          background:
                            "rgba(255,255,255,0.025)",
                          color:
                            "rgba(245,240,231,0.85)",
                          fontSize: "12px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        <span
                          style={{
                            color: "#d8b86a",
                            marginRight: "9px",
                          }}
                        >
                          ✦
                        </span>
                        {detail}
                      </div>
                    )
                  )}
                </div>

                <motion.button
                  whileHover={{
                    y: -2,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  style={{
                    marginTop: "30px",
                    padding: "15px 30px",
                    border: "1px solid #d8b86a",
                    background: "#d8b86a",
                    color: "#071b20",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  PLAN THIS EXPERIENCE
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @media (max-width: 900px) {
            #experiences {
              padding: 100px 4% 90px !important;
            }

            .experiences-grid {
              grid-template-columns: 1fr !important;
              max-width: 620px !important;
              margin: 0 auto !important;
            }

            .experience-card {
              height: 450px !important;
            }

            .experience-modal {
              max-height: 92vh !important;
            }
          }

          @media (max-width: 600px) {
            #experiences {
              padding: 85px 16px 70px !important;
            }

            .experiences-heading {
              margin-bottom: 45px !important;
            }

            .experiences-heading h2 {
              font-size: 46px !important;
            }

            .experiences-heading > p:last-child {
              font-size: 13px !important;
            }

            .experience-card {
              height: 430px !important;
            }

            .experience-card-content {
              left: 20px !important;
              right: 20px !important;
              bottom: 20px !important;
            }

            .experience-card-content h3 {
              font-size: 25px !important;
            }

            .experience-card-content p {
              font-size: 12px !important;
            }

            .experience-modal {
              max-width: 100% !important;
              max-height: 94vh !important;
            }

            .experience-modal-image {
              height: 240px !important;
            }

            .experience-modal-content {
              padding: 22px !important;
            }

            .experience-modal-content > div {
              grid-template-columns: 1fr !important;
            }

            .experience-modal-content button {
              width: 100% !important;
            }
          }

          @media (max-width: 430px) {
            .experiences-heading h2 {
              font-size: 39px !important;
            }

            .experience-card {
              height: 410px !important;
            }

            .experience-modal-image {
              height: 210px !important;
            }
          }
        `}
      </style>
    </>
  );
}