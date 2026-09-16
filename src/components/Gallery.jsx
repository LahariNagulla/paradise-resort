import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const galleryImages = [
  {
    title: "Ocean Escape",
    category: "THE BEACH",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Paradise Pool",
    category: "POOL",
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Luxury Stay",
    category: "VILLAS",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Golden Hour",
    category: "SUNSET",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Tropical Living",
    category: "RESORT",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Ocean Dining",
    category: "DINING",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Private Retreat",
    category: "VILLA",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Palm Paradise",
    category: "NATURE",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] =
    useState(null);

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const openGallery = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    const next =
      (selectedIndex + 1) %
      galleryImages.length;

    setSelectedIndex(next);
    setSelectedImage(galleryImages[next]);
  };

  const previousImage = () => {
    const previous =
      (selectedIndex -
        1 +
        galleryImages.length) %
      galleryImages.length;

    setSelectedIndex(previous);
    setSelectedImage(galleryImages[previous]);
  };

  return (
    <>
      <section
        id="gallery"
        style={{
          position: "relative",
          zIndex: 50,
          background:
            "linear-gradient(135deg, #07191d, #0c282c, #06161a)",
          color: "#f5f0e7",
          padding: "130px 6%",
          overflow: "hidden",
        }}
      >
        {/* Decorative Glow */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(216,184,106,0.1), transparent 70%)",
            top: "-200px",
            left: "-180px",
            pointerEvents: "none",
          }}
        />

        {/* Heading */}
        <motion.div
          className="gallery-heading"
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
            A GLIMPSE OF PARADISE
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
            Gallery
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
            Explore the beauty of Paradise Resort,
            from tranquil beaches and tropical
            gardens to elegant villas and unforgettable
            sunsets.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, 1fr)",
            gridAutoRows: "240px",
            gap: "14px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {galleryImages.map(
            (item, index) => {
              const isLarge =
                index === 0 ||
                index === 5;

              return (
                <motion.div
                  className="gallery-card"
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 40,
                    scale: 0.97,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  onClick={() =>
                    openGallery(
                      item,
                      index
                    )
                  }
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    gridColumn: isLarge
                      ? "span 2"
                      : "span 1",
                    gridRow: isLarge
                      ? "span 2"
                      : "span 1",
                    background: "#10282c",
                  }}
                >
                  {/* Image */}
                  <motion.img
                    src={item.image}
                    alt={item.title}
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

                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(3,13,16,0.85), transparent 60%)",
                    }}
                  />

                  {/* Content */}
                  <div
                    style={{
                      position: "absolute",
                      left: "24px",
                      right: "24px",
                      bottom: "22px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 7px",
                        color: "#d8b86a",
                        fontSize: "8px",
                        letterSpacing: "3px",
                      }}
                    >
                      {item.category}
                    </p>

                    <h3
                      style={{
                        margin: 0,
                        color: "white",
                        fontSize:
                          isLarge
                            ? "27px"
                            : "20px",
                        fontWeight: "400",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* View Icon */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    whileHover={{
                      opacity: 1,
                      scale: 1,
                    }}
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      border:
                        "1px solid rgba(216,184,106,0.7)",
                      background:
                        "rgba(5,18,21,0.4)",
                      backdropFilter:
                        "blur(8px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#d8b86a",
                      fontSize: "17px",
                    }}
                  >
                    ↗
                  </motion.div>
                </motion.div>
              );
            }
          )}
        </div>
      </section>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {selectedImage && (
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
            onClick={closeGallery}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 4000,
              background:
                "rgba(2,10,13,0.96)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            {/* Close */}
            <button
              onClick={closeGallery}
              style={{
                position: "absolute",
                top: "25px",
                right: "30px",
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                border:
                  "1px solid rgba(216,184,106,0.5)",
                background:
                  "rgba(255,255,255,0.05)",
                color: "white",
                fontSize: "23px",
                cursor: "pointer",
                zIndex: 5,
              }}
            >
              ×
            </button>

            {/* Previous */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              style={{
                position: "absolute",
                left: "30px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                border:
                  "1px solid rgba(216,184,106,0.5)",
                background:
                  "rgba(255,255,255,0.05)",
                color: "#d8b86a",
                fontSize: "25px",
                cursor: "pointer",
                zIndex: 5,
              }}
            >
              ←
            </button>

            {/* Image */}
            <motion.div
              className="gallery-viewer-image"
              key={selectedIndex}
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.45,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              style={{
                width: "min(1100px, 82vw)",
                height: "min(720px, 78vh)",
                position: "relative",
              }}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              {/* Image Info */}
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "-48px",
                }}
              >
                <span
                  style={{
                    color: "#d8b86a",
                    fontSize: "9px",
                    letterSpacing: "3px",
                  }}
                >
                  {selectedImage.category}
                </span>

                <h3
                  style={{
                    margin:
                      "6px 0 0",
                    color: "white",
                    fontSize: "22px",
                    fontWeight: "400",
                  }}
                >
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                border:
                  "1px solid rgba(216,184,106,0.5)",
                background:
                  "rgba(255,255,255,0.05)",
                color: "#d8b86a",
                fontSize: "25px",
                cursor: "pointer",
                zIndex: 5,
              }}
            >
              →
            </button>

            {/* Counter */}
            <div
              style={{
                position: "absolute",
                bottom: "28px",
                left: "50%",
                transform:
                  "translateX(-50%)",
                color:
                  "rgba(255,255,255,0.55)",
                fontSize: "11px",
                letterSpacing: "2px",
              }}
            >
              {selectedIndex + 1} /{" "}
              {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @media (max-width: 900px) {
            #gallery {
              padding: 100px 4% 90px !important;
            }

            .gallery-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-auto-rows: 210px !important;
              gap: 12px !important;
            }

            .gallery-card[style*="span 2"] {
              grid-column: span 2 !important;
              grid-row: span 2 !important;
            }
          }

          @media (max-width: 600px) {
            #gallery {
              padding: 85px 16px 70px !important;
            }

            .gallery-heading {
              margin-bottom: 42px !important;
            }

            .gallery-heading h2 {
              font-size: 44px !important;
            }

            .gallery-heading > p:last-child {
              font-size: 13px !important;
            }

            .gallery-grid {
              grid-template-columns: 1fr !important;
              grid-auto-rows: 300px !important;
              gap: 12px !important;
            }

            .gallery-card,
            .gallery-card[style*="span 2"] {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
              height: 300px !important;
            }

            .gallery-card-content {
              left: 18px !important;
              right: 18px !important;
              bottom: 18px !important;
            }

            .gallery-card-content h3 {
              font-size: 21px !important;
            }

            /* Keep the fullscreen viewer comfortable on phones. */
            #gallery + div {
              padding: 18px !important;
            }

            .gallery-viewer-image {
              width: 100% !important;
              height: min(70vh, 520px) !important;
            }
          }

          @media (max-width: 430px) {
            .gallery-heading h2 {
              font-size: 38px !important;
            }

            .gallery-grid {
              grid-auto-rows: 270px !important;
            }

            .gallery-card,
            .gallery-card[style*="span 2"] {
              height: 270px !important;
            }

            .gallery-viewer-image {
              height: 62vh !important;
            }
          }
        `}
      </style>
    </>
  );
}