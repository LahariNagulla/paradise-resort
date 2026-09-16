import {
  useEffect,
  useState,
} from "react";

import { motion, AnimatePresence } from "motion/react";

const navItems = [
  ["Home", "#home"],
  ["Stay", "#stay"],
  ["Dining", "#dining"],
  ["Experiences", "#experiences"],
  ["Gallery", "#gallery"],
  ["Offers", "#offers"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 60
      );

      if (window.scrollY > 60) {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const scrollToSection = (
    id
  ) => {
    const section =
      document.querySelector(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMenuOpen(false);
  };

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

      <motion.nav
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,

          zIndex: 1000,

          padding: scrolled
            ? "14px 5%"
            : "22px 5%",

          display: "flex",

          alignItems: "center",

          justifyContent:
            "space-between",

          color: "white",

          background: scrolled
            ? "rgba(7, 27, 32, 0.90)"
            : "rgba(7, 27, 32, 0.08)",

          backdropFilter:
            scrolled
              ? "blur(16px)"
              : "blur(4px)",

          borderBottom:
            scrolled
              ? "1px solid rgba(214,180,106,0.2)"
              : "1px solid transparent",

          transition:
            "padding 0.4s ease, background 0.4s ease, border 0.4s ease",
        }}
      >
        {/* =========================
            LOGO
        ========================= */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          onClick={() =>
            scrollToSection("#home")
          }
          style={{
            border: "none",

            background:
              "transparent",

            color: "white",

            cursor: "pointer",

            padding: 0,

            fontSize:
              "clamp(18px, 2vw, 24px)",

            fontWeight: "500",

            letterSpacing: "4px",
          }}
        >
          PARADISE
        </motion.button>

        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}

        <div
          className="desktop-navigation"
          style={{
            display: "flex",

            alignItems:
              "center",

            gap: "28px",
          }}
        >
          {navItems.map(
            ([name, href]) => (
              <motion.a
                key={name}
                href={href}
                whileHover={{
                  y: -2,
                  color: "#d6b46a",
                }}
                transition={{
                  duration: 0.2,
                }}
                style={{
                  color: "white",

                  textDecoration:
                    "none",

                  fontSize: "11px",

                  letterSpacing:
                    "1.5px",

                  cursor:
                    "pointer",

                  whiteSpace:
                    "nowrap",
                }}
              >
                {name}
              </motion.a>
            )
          )}

          {/* BOOK NOW */}

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow:
                "0 10px 30px rgba(214,180,106,0.18)",
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() =>
              scrollToSection(
                "#reservation"
              )
            }
            style={{
              padding:
                "11px 22px",

              borderRadius:
                "30px",

              border:
                "1px solid rgba(214,180,106,0.75)",

              background:
                "rgba(214,180,106,0.12)",

              backdropFilter:
                "blur(10px)",

              color:
                "#f5f0e7",

              cursor:
                "pointer",

              fontSize:
                "10px",

              letterSpacing:
                "2px",

              fontWeight:
                "600",

              whiteSpace:
                "nowrap",
            }}
          >
            BOOK NOW
          </motion.button>
        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}

        <motion.button
          className="mobile-menu-button"
          whileTap={{
            scale: 0.9,
          }}
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          style={{
            display: "none",

            width: "44px",
            height: "44px",

            border:
              "1px solid rgba(214,180,106,0.45)",

            background:
              "rgba(7,27,32,0.35)",

            color:
              "#d6b46a",

            cursor:
              "pointer",

            alignItems:
              "center",

            justifyContent:
              "center",

            fontSize: "22px",
          }}
        >
          {menuOpen
            ? "×"
            : "☰"}
        </motion.button>
      </motion.nav>

      {/* =========================
          MOBILE MENU
      ========================= */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-navigation"
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.35,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            style={{
              position:
                "fixed",

              top: "72px",
              left: "4%",
              right: "4%",

              zIndex: 999,

              background:
                "rgba(7,27,32,0.97)",

              backdropFilter:
                "blur(20px)",

              border:
                "1px solid rgba(214,180,106,0.25)",

              padding:
                "18px",

              boxShadow:
                "0 25px 60px rgba(0,0,0,0.35)",
            }}
          >
            {navItems.map(
              ([name, href], index) => (
                <motion.button
                  key={name}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.04,
                  }}
                  whileHover={{
                    color:
                      "#d6b46a",
                    x: 5,
                  }}
                  onClick={() =>
                    scrollToSection(
                      href
                    )
                  }
                  style={{
                    display:
                      "block",

                    width: "100%",

                    textAlign:
                      "left",

                    padding:
                      "14px 8px",

                    border: "none",

                    borderBottom:
                      "1px solid rgba(255,255,255,0.06)",

                    background:
                      "transparent",

                    color:
                      "#f5f0e7",

                    fontSize:
                      "12px",

                    letterSpacing:
                      "2px",

                    cursor:
                      "pointer",
                  }}
                >
                  {name}
                </motion.button>
              )
            )}

            {/* MOBILE BOOK BUTTON */}

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() =>
                scrollToSection(
                  "#reservation"
                )
              }
              style={{
                width:
                  "100%",

                marginTop:
                  "18px",

                padding:
                  "15px",

                border:
                  "1px solid #d6b46a",

                background:
                  "#d6b46a",

                color:
                  "#071b20",

                fontSize:
                  "10px",

                fontWeight:
                  "600",

                letterSpacing:
                  "2px",

                cursor:
                  "pointer",
              }}
            >
              BOOK YOUR STAY
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          RESPONSIVE CSS
      ========================= */}

      <style>
        {`
          @media (max-width: 900px) {

            .desktop-navigation {
              display: none !important;
            }

            .mobile-menu-button {
              display: flex !important;
            }

          }

          @media (min-width: 901px) {

            .mobile-navigation {
              display: none !important;
            }

          }
        `}
      </style>
    </>
  );
}