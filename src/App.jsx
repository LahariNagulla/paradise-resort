import { useState } from "react";
import { motion } from "motion/react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import BeachScene from "./components/BeachScene";
import Navbar from "./components/Navbar";
import Rooms from "./components/Rooms";
import Dining from "./components/Dining";
import Experiences from "./components/Experiences";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Offers from "./components/Offers";
import Reservation from "./components/Reservation";
import Contact from "./components/Contact";
import Location from "./components/Location";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import Bookings from "./admin/Bookings";
import RoomsManagement from "./admin/RoomsManagement";
import DiningManagement from "./admin/DiningManagement";
import ExperiencesManagement from "./admin/ExperiencesManagement";
import OffersManagement from "./admin/OffersManagement";
import GalleryManagement from "./admin/GalleryManagement";
import SettingsManagement from "./admin/SettingsManagement";


/* =====================================================
   PARADISE RESORT WEBSITE
===================================================== */

function ResortWebsite() {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const scrollToReservation = () => {
    document
      .getElementById("reservation")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div
      className="app-shell"
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "visible",
      }}
    >
      <BeachScene />

      <Navbar />

      {/* ================= HERO ================= */}

      <section
        id="home"
        className="hero-section"
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          pointerEvents: "auto",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <motion.p
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="hero-eyebrow"
          style={{
            fontSize: "14px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            margin: "0 0 15px",
          }}
        >
          Welcome to Paradise
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.94,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.4,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hero-title"
          style={{
            margin: 0,
            fontSize: "clamp(48px, 8vw, 100px)",
            lineHeight: 0.95,
            fontWeight: "500",
            letterSpacing: "-3px",
          }}
        >
          Paradise Resort
        </motion.h1>

        <motion.h2
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            delay: 0.75,
            ease: "easeOut",
          }}
          className="hero-subtitle"
          style={{
            margin: "20px 0 12px",
            fontSize: "clamp(20px, 3vw, 32px)",
            fontWeight: "400",
            letterSpacing: "2px",
          }}
        >
          Beach Resort & Spa
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.95,
            ease: "easeOut",
          }}
          className="hero-description"
          style={{
            maxWidth: "600px",
            fontSize: "16px",
            lineHeight: 1.7,
            marginTop: "15px",
            opacity: 0.9,
          }}
        >
          Escape to a beautiful coastal retreat
          where luxury, comfort and
          unforgettable experiences meet.
        </motion.p>

        <motion.button
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          whileHover={{
            scale: 1.06,
            y: -4,
            boxShadow:
              "0 18px 45px rgba(0,0,0,0.3)",
            background:
              "rgba(255,255,255,0.28)",
          }}
          whileTap={{
            scale: 0.96,
          }}
          transition={{
            duration: 0.9,
            delay: 1.2,
          }}
          onClick={scrollToReservation}
          className="hero-book-button"
          style={{
            border:
              "1px solid rgba(255,255,255,0.7)",
            borderRadius: "50px",
            padding: "16px 38px",
            marginTop: "20px",
            background:
              "rgba(255,255,255,0.16)",
            backdropFilter: "blur(10px)",
            color: "white",
            fontSize: "15px",
            letterSpacing: "2px",
            cursor: "pointer",
          }}
        >
          BOOK YOUR STAY
        </motion.button>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 2,
            duration: 1,
          }}
          className="hero-scroll-indicator"
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            textAlign: "center",
            fontSize: "15px",
            letterSpacing: "3px",
            pointerEvents: "none",
          }}
        >
          <div>SCROLL TO EXPLORE</div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              marginTop: "10px",
              fontSize: "22px",
            }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>


      {/* ================= RESORT SECTIONS ================= */}

      <Rooms />

      <Dining />

      <Experiences />

      <Gallery />


      {/* ================= REVIEWS & RATINGS ================= */}

      <Reviews />


      {/* ================= OFFERS ================= */}

      <Offers
        onSelectOffer={(offer) => {
          setSelectedOffer(offer);

          setTimeout(() => {
            scrollToReservation();
          }, 100);
        }}
      />


      {/* ================= RESERVATION ================= */}

      <Reservation
        selectedOffer={selectedOffer}
      />


      {/* ================= LOCATION / MAP ================= */}

      <Location />


      {/* ================= CONTACT / GET IN TOUCH ================= */}

      <Contact />


      {/* ================= RESPONSIVE ================= */}

      <style>
        {`
          html {
            scroll-behavior: smooth;
          }

          body {
            margin: 0;
            overflow-x: hidden;
          }

          * {
            box-sizing: border-box;
          }

          button,
          a {
            -webkit-tap-highlight-color: transparent;
          }


          @media (max-width: 900px) {

            .hero-section {
              min-height: 100svh !important;
              padding: 100px 5% 70px !important;
            }

            .hero-eyebrow {
              font-size: 11px !important;
              letter-spacing: 3px !important;
            }

            .hero-title {
              font-size: clamp(
                46px,
                10vw,
                72px
              ) !important;

              letter-spacing: -2px !important;
            }

            .hero-subtitle {
              font-size: clamp(
                19px,
                5vw,
                28px
              ) !important;

              margin-top: 17px !important;
            }

            .hero-description {
              max-width: 560px !important;
              font-size: 14px !important;
              line-height: 1.7 !important;
              margin-top: 12px !important;
            }

            .hero-book-button {
              padding: 15px 32px !important;
              font-size: 13px !important;
            }

            .hero-scroll-indicator {
              bottom: 22px !important;
              font-size: 11px !important;
              letter-spacing: 2px !important;
            }
          }


          @media (max-width: 600px) {

            .hero-section {
              min-height: 100svh !important;
              padding: 90px 20px 75px !important;
            }

            .hero-eyebrow {
              font-size: 9px !important;
              letter-spacing: 2.5px !important;
              margin-bottom: 12px !important;
            }

            .hero-title {
              max-width: 100% !important;

              font-size: clamp(
                43px,
                13vw,
                62px
              ) !important;

              line-height: 0.98 !important;
              letter-spacing: -2.5px !important;
            }

            .hero-subtitle {
              font-size: 20px !important;
              line-height: 1.25 !important;
              letter-spacing: 1px !important;
              margin: 17px 0 8px !important;
            }

            .hero-description {
              max-width: 350px !important;
              font-size: 13px !important;
              line-height: 1.65 !important;
              margin-top: 12px !important;
            }

            .hero-book-button {
              width: min(100%, 290px) !important;
              padding: 14px 24px !important;
              margin-top: 19px !important;
              font-size: 11px !important;
              letter-spacing: 1.7px !important;
            }

            .hero-scroll-indicator {
              bottom: 17px !important;
              font-size: 9px !important;
              letter-spacing: 1.8px !important;
            }

            .hero-scroll-indicator div:last-child {
              margin-top: 6px !important;
              font-size: 18px !important;
            }
          }


          @media (max-width: 430px) {

            .hero-section {
              padding-left: 16px !important;
              padding-right: 16px !important;
            }

            .hero-title {
              font-size: clamp(
                39px,
                13vw,
                54px
              ) !important;
            }

            .hero-subtitle {
              font-size: 18px !important;
            }

            .hero-description {
              max-width: 320px !important;
              font-size: 12.5px !important;
            }

            .hero-scroll-indicator {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}


/* =====================================================
   MAIN APP ROUTING
===================================================== */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* CUSTOMER WEBSITE */}

        <Route
          path="/"
          element={<ResortWebsite />}
        />


        {/* ADMIN LOGIN */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />


        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />


        {/* ADMIN BOOKINGS */}

        <Route
          path="/admin/bookings"
          element={<Bookings />}
        />


        {/* ADMIN ROOMS */}

        <Route
          path="/admin/rooms"
          element={<RoomsManagement />}
        />


        {/* ADMIN DINING */}

        <Route
          path="/admin/dining"
          element={<DiningManagement />}
        />


        {/* ADMIN EXPERIENCES */}

        <Route
          path="/admin/experiences"
          element={<ExperiencesManagement />}
        />


        {/* ADMIN OFFERS */}

        <Route
          path="/admin/offers"
          element={<OffersManagement />}
        />


        {/* ADMIN GALLERY */}

        <Route
          path="/admin/gallery"
          element={<GalleryManagement />}
        />


        {/* ADMIN SETTINGS */}

        <Route
          path="/admin/settings"
          element={<SettingsManagement />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;