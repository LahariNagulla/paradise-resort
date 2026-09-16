import { motion } from "motion/react";
import "./Location.css";

const nearbyPlaces = [
  {
    icon: "🌊",
    title: "Beach",
    description: "Explore nearby beaches",
    url: "https://www.google.com/maps/search/?api=1&query=beaches+near+Ongole+Andhra+Pradesh+India",
  },
  {
    icon: "✈",
    title: "Airport",
    description: "Find the nearest airport",
    url: "https://www.google.com/maps/search/?api=1&query=airport+near+Ongole+Andhra+Pradesh+India",
  },
  {
    icon: "🚆",
    title: "Railway Station",
    description: "Find the nearest station",
    url: "https://www.google.com/maps/search/?api=1&query=railway+station+near+Ongole+Andhra+Pradesh+India",
  },
  {
    icon: "🏙",
    title: "City Center",
    description: "Explore Ongole city",
    url: "https://www.google.com/maps/search/?api=1&query=Ongole+city+center+Andhra+Pradesh+India",
  },
];

export default function Location() {
  return (
    <section
      className="location-section"
      id="location"
    >
      <div className="location-container">

        {/* ================= HEADING ================= */}

        <motion.div
          className="location-heading"
          initial={{
            opacity: 0,
            y: 35,
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
        >
          <span className="location-eyebrow">
            FIND YOUR WAY TO PARADISE
          </span>

          <h2>
            Find Us in
            <span> Paradise</span>
          </h2>

          <p>
            Located along the beautiful coastline,
            Paradise Resort offers a peaceful escape
            surrounded by nature and the sea.
          </p>
        </motion.div>


        {/* ================= LOCATION CONTENT ================= */}

        <div className="location-content">

          {/* ================= MAP ================= */}

          <motion.div
            className="location-map"
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <iframe
              title="Paradise Resort Location"
              src="https://www.google.com/maps?q=Ongole,Andhra+Pradesh,India&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>


          {/* ================= DETAILS ================= */}

          <motion.div
            className="location-details"
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <span className="details-eyebrow">
              OUR LOCATION
            </span>

            <h3>
              Paradise Resort
            </h3>

            <p className="location-description">
              Escape to a beautiful coastal retreat
              where the ocean, comfort and luxury
              come together.
            </p>


            {/* ================= ADDRESS ================= */}

            <div className="location-info-item">

              <div className="location-icon">
                📍
              </div>

              <div>
                <strong>
                  Address
                </strong>

                <p>
                  Beach Road,
                  <br />
                  Coastal Paradise,
                  <br />
                  Andhra Pradesh, India
                </p>
              </div>

            </div>


            {/* ================= PHONE ================= */}

            <div className="location-info-item">

              <div className="location-icon">
                ☎
              </div>

              <div>
                <strong>
                  Contact
                </strong>

                <p>
                  +91 98765 43210
                </p>
              </div>

            </div>


            {/* ================= EMAIL ================= */}

            <div className="location-info-item">

              <div className="location-icon">
                ✉
              </div>

              <div>
                <strong>
                  Email
                </strong>

                <p>
                  reservations@paradiseresort.com
                </p>
              </div>

            </div>


            {/* ================= DIRECTIONS ================= */}

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Ongole,Andhra+Pradesh,India"
              target="_blank"
              rel="noopener noreferrer"
              className="directions-button"
            >
              GET DIRECTIONS
              <span>↗</span>
            </a>

          </motion.div>

        </div>


        {/* ================= NEARBY LOCATIONS ================= */}

        <motion.div
          className="nearby-section"
          initial={{
            opacity: 0,
            y: 30,
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
        >

          <span className="nearby-eyebrow">
            NEARBY
          </span>


          <div className="nearby-grid">

            {nearbyPlaces.map(
              (place, index) => (
                <motion.a
                  key={place.title}
                  href={place.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nearby-card"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >

                  <span className="nearby-icon">
                    {place.icon}
                  </span>

                  <div>
                    <h4>
                      {place.title}
                    </h4>

                    <p>
                      {place.description}
                    </p>
                  </div>

                  <span className="nearby-arrow">
                    ↗
                  </span>

                </motion.a>
              )
            )}

          </div>

        </motion.div>

      </div>
    </section>
  );
}