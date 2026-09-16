import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const diningOptions = [
  {
    title: "The Shore",
    subtitle: "SIGNATURE RESTAURANT",
    description:
      "Refined coastal dining with fresh local ingredients, elegant interiors and panoramic sea views.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90",
    tag: "BREAKFAST • LUNCH • DINNER",
    menu: {
      Breakfast: [
        ["Tropical Fruit Platter", "₹280"],
        ["Classic Resort Breakfast", "₹420"],
        ["Masala Dosa", "₹260"],
        ["Avocado Toast", "₹390"],
      ],
      Starters: [
        ["Crispy Calamari", "₹520"],
        ["Paneer Tikka", "₹420"],
        ["Coastal Fish Fry", "₹580"],
        ["Truffle Mushroom", "₹460"],
      ],
      "Main Course": [
        ["Grilled Sea Bass", "₹780"],
        ["Butter Garlic Prawns", "₹720"],
        ["Coastal Fish Curry", "₹620"],
        ["Vegetable Biryani", "₹480"],
      ],
      Desserts: [
        ["Coconut Panna Cotta", "₹320"],
        ["Chocolate Fondant", "₹360"],
        ["Mango Cheesecake", "₹340"],
        ["Gulab Jamun", "₹240"],
      ],
      Beverages: [
        ["Fresh Coconut", "₹180"],
        ["Tropical Cooler", "₹240"],
        ["Fresh Lime Soda", "₹160"],
        ["Premium Coffee", "₹180"],
      ],
    },
  },
  {
    title: "Sunset Lounge",
    subtitle: "BEACHFRONT LOUNGE",
    description:
      "Slow evenings, handcrafted refreshments and unforgettable sunset moments just steps from the shore.",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=90",
    tag: "SUNSET • LOUNGE • BITES",
    menu: {
      "Small Plates": [
        ["Crispy Prawns", "₹520"],
        ["Cheese & Herb Fries", "₹360"],
        ["Nachos Supreme", "₹390"],
        ["Chicken Skewers", "₹480"],
      ],
      "Beach Bites": [
        ["Fish Tacos", "₹520"],
        ["Grilled Prawns", "₹620"],
        ["Chicken Sliders", "₹460"],
        ["Veggie Wrap", "₹390"],
      ],
      "Signature Drinks": [
        ["Paradise Sunset", "₹420"],
        ["Tropical Breeze", "₹390"],
        ["Pineapple Cooler", "₹320"],
        ["Virgin Mojito", "₹300"],
      ],
      Desserts: [
        ["Brownie & Ice Cream", "₹340"],
        ["Tropical Fruit Bowl", "₹280"],
        ["Mango Sorbet", "₹260"],
      ],
    },
  },
  {
    title: "Palm Café",
    subtitle: "ALL-DAY CAFÉ",
    description:
      "Fresh coffee, tropical refreshments and relaxed bites served in a lush garden setting.",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=90",
    tag: "COFFEE • DESSERTS • LIGHT BITES",
    menu: {
      Coffee: [
        ["Espresso", "₹140"],
        ["Cappuccino", "₹180"],
        ["Café Latte", "₹190"],
        ["Cold Coffee", "₹220"],
      ],
      "Light Bites": [
        ["Veg Sandwich", "₹280"],
        ["Chicken Club Sandwich", "₹360"],
        ["Cheese Croissant", "₹240"],
        ["French Fries", "₹220"],
      ],
      Desserts: [
        ["Chocolate Cake", "₹280"],
        ["Blueberry Cheesecake", "₹320"],
        ["Tiramisu", "₹340"],
        ["Ice Cream", "₹180"],
      ],
      Beverages: [
        ["Fresh Orange Juice", "₹220"],
        ["Watermelon Cooler", "₹220"],
        ["Iced Tea", "₹180"],
        ["Hot Chocolate", "₹220"],
      ],
    },
  },
];

export default function Dining() {
  const [selectedDining, setSelectedDining] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");

  const openMenu = (item) => {
    const firstCategory = Object.keys(item.menu)[0];
    setSelectedDining(item);
    setActiveCategory(firstCategory);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setSelectedDining(null);
    setActiveCategory("");
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <section
        id="dining"
        style={{
          position: "relative",
          zIndex: 50,
          padding: "120px 6% 130px",
          background:
            "linear-gradient(135deg, #061a20 0%, #0a3038 50%, #06171c 100%)",
          color: "#f7efe1",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(214,176,107,0.15), transparent 68%)",
            top: "-180px",
            right: "-100px",
            pointerEvents: "none",
          }}
        />

        <motion.div
          className="dining-heading"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "760px",
            margin: "0 auto 70px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 18px",
              fontSize: "11px",
              letterSpacing: "5px",
              color: "#d6b06b",
              fontWeight: "600",
            }}
          >
            TASTE PARADISE
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(42px, 5vw, 64px)",
              lineHeight: 1.05,
              fontWeight: "400",
              letterSpacing: "-1.5px",
            }}
          >
            Dining & Culinary
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "55px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              height: "1px",
              background: "#d6b06b",
              margin: "24px auto",
            }}
          />

          <p
            style={{
              maxWidth: "620px",
              margin: "0 auto",
              color: "#b8c7c5",
              fontSize: "15px",
              lineHeight: 1.8,
            }}
          >
            From elegant dinners overlooking the ocean to relaxed
            sunset moments, every meal at Paradise Resort is designed
            to be remembered.
          </p>
        </motion.div>

        <div
          className="dining-grid"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1250px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "28px",
          }}
        >
          {diningOptions.map((item, index) => (
            <motion.article
              className="dining-card"
              key={item.title}
              initial={{ opacity: 0, y: 65 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.85,
                delay: index * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -10 }}
              style={{
                position: "relative",
                minHeight: "510px",
                overflow: "hidden",
                borderRadius: "18px",
                border:
                  "1px solid rgba(214,176,107,0.25)",
                boxShadow:
                  "0 24px 60px rgba(0,0,0,0.32)",
                background: "#0a252c",
              }}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.8 }}
                style={{
                  position: "absolute",
                  inset: 0,
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
                    "linear-gradient(to top, rgba(2,12,16,0.97) 5%, rgba(2,12,16,0.60) 48%, rgba(2,12,16,0.10) 100%)",
                }}
              />

              <div
                className="dining-card-content"
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: "10px",
                    letterSpacing: "3px",
                    color: "#d6b06b",
                  }}
                >
                  {item.subtitle}
                </p>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "32px",
                    fontWeight: "400",
                    color: "#fff8ed",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: "14px 0 20px",
                    color: "#d0d9d7",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    maxWidth: "420px",
                  }}
                >
                  {item.description}
                </p>

                <div
                  style={{
                    paddingTop: "16px",
                    borderTop:
                      "1px solid rgba(255,255,255,0.18)",
                    color: "#d6b06b",
                    fontSize: "9px",
                    letterSpacing: "2px",
                  }}
                >
                  {item.tag}
                </div>

                <motion.button
                  onClick={() => openMenu(item)}
                  whileHover={{
                    scale: 1.04,
                    background: "#d6b06b",
                    color: "#071d23",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    marginTop: "20px",
                    width: "fit-content",
                    padding: "12px 22px",
                    border:
                      "1px solid rgba(214,176,107,0.75)",
                    background:
                      "rgba(214,176,107,0.10)",
                    color: "#fff8ed",
                    cursor: "pointer",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    transition: "0.25s ease",
                  }}
                >
                  VIEW MENU
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* =========================
          RESTAURANT MENU MODAL
      ========================= */}

      <AnimatePresence>
        {selectedDining && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 3000,
              background: "rgba(1,10,13,0.88)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              className="dining-modal"
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
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "1050px",
                maxHeight: "90vh",
                overflowY: "auto",
                borderRadius: "18px",
                background:
                  "linear-gradient(145deg, #0c3038 0%, #061a20 100%)",
                border:
                  "1px solid rgba(214,176,107,0.35)",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,0.55)",
                color: "#f7efe1",
                position: "relative",
              }}
            >
              {/* CLOSE */}

              <motion.button
                onClick={closeMenu}
                whileHover={{
                  rotate: 90,
                  scale: 1.08,
                }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  zIndex: 5,
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border:
                    "1px solid rgba(214,176,107,0.5)",
                  background:
                    "rgba(0,0,0,0.45)",
                  color: "#fff8ed",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
              >
                ×
              </motion.button>

              {/* HEADER IMAGE */}

              <div
                className="dining-modal-image"
                style={{
                  height: "250px",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "18px 18px 0 0",
                }}
              >
                <img
                  src={selectedDining.image}
                  alt={selectedDining.title}
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
                      "linear-gradient(to top, rgba(3,16,20,0.94), rgba(3,16,20,0.10))",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "35px",
                    bottom: "28px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 8px",
                      color: "#d6b06b",
                      fontSize: "10px",
                      letterSpacing: "4px",
                    }}
                  >
                    {selectedDining.subtitle}
                  </p>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "clamp(34px, 5vw, 52px)",
                      fontWeight: "400",
                    }}
                  >
                    {selectedDining.title}
                  </h2>
                </div>
              </div>

              {/* CATEGORY TABS */}

              <div
                className="dining-modal-tabs"
                style={{
                  padding: "28px 35px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    paddingBottom: "20px",
                    borderBottom:
                      "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {Object.keys(selectedDining.menu).map(
                    (category) => (
                      <motion.button
                        key={category}
                        onClick={() =>
                          setActiveCategory(category)
                        }
                        whileTap={{ scale: 0.96 }}
                        style={{
                          padding: "11px 17px",
                          border:
                            activeCategory === category
                              ? "1px solid #d6b06b"
                              : "1px solid rgba(255,255,255,0.18)",
                          background:
                            activeCategory === category
                              ? "#d6b06b"
                              : "rgba(255,255,255,0.04)",
                          color:
                            activeCategory === category
                              ? "#071d23"
                              : "#d7dfdc",
                          cursor: "pointer",
                          fontSize: "10px",
                          letterSpacing: "1px",
                        }}
                      >
                        {category.toUpperCase()}
                      </motion.button>
                    )
                  )}
                </div>
              </div>

              {/* MENU ITEMS */}

              <motion.div
                className="dining-menu-items"
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  padding: "28px 35px 45px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 22px",
                    fontSize: "27px",
                    fontWeight: "400",
                    color: "#d6b06b",
                  }}
                >
                  {activeCategory}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "12px 35px",
                  }}
                >
                  {selectedDining.menu[activeCategory].map(
                    ([name, price]) => (
                      <motion.div
                        key={name}
                        whileHover={{ x: 5 }}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "20px",
                          padding: "16px 0",
                          borderBottom:
                            "1px solid rgba(255,255,255,0.10)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#e5ebe8",
                          }}
                        >
                          {name}
                        </span>

                        <span
                          style={{
                            fontSize: "14px",
                            color: "#d6b06b",
                            whiteSpace: "nowrap",
                            fontWeight: "600",
                          }}
                        >
                          {price}
                        </span>
                      </motion.div>
                    )
                  )}
                </div>

                <p
                  style={{
                    margin: "35px 0 0",
                    textAlign: "center",
                    fontSize: "10px",
                    letterSpacing: "1px",
                    color: "#8fa19e",
                  }}
                >
                  PRICES ARE SUBJECT TO APPLICABLE TAXES
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @media (max-width: 900px) {
            #dining {
              padding: 100px 4% 90px !important;
            }

            .dining-grid {
              grid-template-columns: 1fr !important;
              max-width: 620px !important;
            }

            .dining-card {
              min-height: 500px !important;
            }

            .dining-modal {
              max-height: 92vh !important;
            }
          }

          @media (max-width: 600px) {
            #dining {
              padding: 85px 16px 70px !important;
            }

            .dining-heading {
              margin-bottom: 45px !important;
            }

            .dining-heading h2 {
              font-size: 40px !important;
            }

            .dining-heading p {
              font-size: 13px !important;
            }

            .dining-card {
              min-height: 480px !important;
              border-radius: 16px !important;
            }

            .dining-card-content {
              padding: 22px !important;
            }

            .dining-card-content h3 {
              font-size: 28px !important;
            }

            .dining-card-content p {
              font-size: 13px !important;
            }

            .dining-modal {
              max-width: 100% !important;
              max-height: 94vh !important;
              border-radius: 14px !important;
            }

            .dining-modal-image {
              height: 210px !important;
              border-radius: 14px 14px 0 0 !important;
            }

            .dining-modal-tabs {
              padding: 20px 18px 0 !important;
            }

            .dining-modal-tabs > div {
              overflow-x: auto !important;
              flex-wrap: nowrap !important;
              padding-bottom: 15px !important;
            }

            .dining-modal-tabs button {
              flex-shrink: 0 !important;
              white-space: nowrap !important;
            }

            .dining-menu-items {
              padding: 22px 18px 30px !important;
            }

            .dining-menu-items > div {
              grid-template-columns: 1fr !important;
              gap: 0 !important;
            }

            .dining-menu-items h3 {
              font-size: 24px !important;
            }
          }

          @media (max-width: 430px) {
            .dining-heading h2 {
              font-size: 35px !important;
            }

            .dining-card {
              min-height: 450px !important;
            }

            .dining-card-content h3 {
              font-size: 26px !important;
            }
          }
        `}
      </style>
    </>
  );
}
