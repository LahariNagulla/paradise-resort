import { motion } from "motion/react";

const quickLinks = [
  ["Home", "#home"],
  ["Stay", "#stay"],
  ["Dining", "#dining"],
  ["Experiences", "#experiences"],
  ["Gallery", "#gallery"],
  ["Offers", "#offers"],
  ["Reservation", "#reservation"],
];

export default function Contact() {
  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        zIndex: 50,
        background: "#071b20",
        color: "#f5f0e7",
        borderTop: "1px solid rgba(214, 180, 106, 0.25)",
      }}
    >
      <section
        className="contact-section"
        style={{
          padding: "110px 6% 80px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <motion.div
          className="contact-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          style={{
            marginBottom: "65px",
          }}
        >
          <p
            style={{
              margin: "0 0 14px",
              color: "#d6b46a",
              fontSize: "11px",
              letterSpacing: "4px",
            }}
          >
            GET IN TOUCH
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(38px, 5vw, 68px)",
              fontWeight: "300",
              lineHeight: 1.05,
            }}
          >
            Your Paradise
            <br />
            <span style={{ color: "#d6b46a" }}>
              Awaits
            </span>
          </h2>
        </motion.div>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr",
            gap: "60px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              style={{
                fontSize: "24px",
                letterSpacing: "4px",
                marginBottom: "22px",
              }}
            >
              PARADISE
            </div>

            <p
              style={{
                maxWidth: "430px",
                color: "#aab6b8",
                fontSize: "14px",
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              A private coastal escape where
              golden sunsets, ocean breezes and
              refined hospitality come together.
            </p>

            <motion.a
              href="#reservation"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-block",
                marginTop: "30px",
                padding: "14px 28px",
                background: "#d6b46a",
                color: "#071b20",
                textDecoration: "none",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "2px",
              }}
            >
              BOOK YOUR STAY
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3
              style={{
                margin: "0 0 25px",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "#d6b46a",
              }}
            >
              CONTACT
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    color: "#69797c",
                    fontSize: "10px",
                    letterSpacing: "1px",
                    marginBottom: "5px",
                  }}
                >
                  LOCATION
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#dce2e1",
                    lineHeight: 1.6,
                  }}
                >
                  Paradise Coast,
                  <br />
                  Andhra Pradesh, India
                </span>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    color: "#69797c",
                    fontSize: "10px",
                    letterSpacing: "1px",
                    marginBottom: "5px",
                  }}
                >
                  PHONE
                </span>
                <a
                  href="tel:+919876543210"
                  style={{
                    color: "#dce2e1",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  +91 98765 43210
                </a>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    color: "#69797c",
                    fontSize: "10px",
                    letterSpacing: "1px",
                    marginBottom: "5px",
                  }}
                >
                  EMAIL
                </span>
                <a
                  href="mailto:reservations@paradiseresort.com"
                  style={{
                    color: "#dce2e1",
                    textDecoration: "none",
                    fontSize: "14px",
                    overflowWrap: "anywhere",
                  }}
                >
                  reservations@paradiseresort.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3
              style={{
                margin: "0 0 25px",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "#d6b46a",
              }}
            >
              EXPLORE
            </h3>

            <div
              className="quick-links"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              {quickLinks.map(([name, href]) => (
                <motion.a
                  key={name}
                  href={href}
                  whileHover={{ x: 5, color: "#d6b46a" }}
                  style={{
                    color: "#aab6b8",
                    textDecoration: "none",
                    fontSize: "13px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div
        className="contact-bottom-bar"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "25px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: "#69797c",
            fontSize: "11px",
          }}
        >
          © 2026 Paradise Resort. All rights
          reserved.
        </span>

        <div
          className="contact-legal-links"
          style={{
            display: "flex",
            gap: "22px",
          }}
        >
          <a
            href="#home"
            style={{
              color: "#69797c",
              textDecoration: "none",
              fontSize: "11px",
            }}
          >
            Privacy
          </a>

          <a
            href="#home"
            style={{
              color: "#69797c",
              textDecoration: "none",
              fontSize: "11px",
            }}
          >
            Terms
          </a>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 900px) {
            .contact-section {
              padding: 90px 5% 65px !important;
            }

            .contact-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 45px 35px !important;
            }

            .contact-grid > div:first-child {
              grid-column: span 2;
            }

            .contact-bottom-bar {
              padding: 22px 5% !important;
            }
          }

          @media (max-width: 600px) {
            .contact-section {
              padding: 75px 20px 55px !important;
            }

            .contact-heading {
              margin-bottom: 45px !important;
            }

            .contact-heading h2 {
              font-size: 43px !important;
            }

            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 42px !important;
            }

            .contact-grid > div:first-child {
              grid-column: auto;
            }

            .contact-grid > div:first-child > div:first-child {
              font-size: 22px !important;
            }

            .contact-grid p {
              font-size: 13px !important;
            }

            .contact-grid a[href="#reservation"] {
              width: 100% !important;
              box-sizing: border-box !important;
              text-align: center !important;
              padding: 15px 20px !important;
            }

            .quick-links {
              grid-template-columns: 1fr 1fr !important;
              gap: 17px 15px !important;
            }

            .contact-bottom-bar {
              padding: 22px 20px !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 14px !important;
            }

            .contact-legal-links {
              gap: 18px !important;
            }
          }

          @media (max-width: 430px) {
            .contact-heading h2 {
              font-size: 38px !important;
            }

            .quick-links {
              grid-template-columns: 1fr !important;
              gap: 14px !important;
            }
          }
        `}
      </style>
    </footer>
  );
}
