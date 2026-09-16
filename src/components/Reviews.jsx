import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Reviews.css";

const initialReviews = [
  {
    name: "Rahul Kumar",
    location: "Hyderabad, India",
    rating: 5,
    date: "September 2026",
    review:
      "An incredible beachside experience. The rooms were beautiful, the staff was extremely welcoming, and the sunset views were unforgettable.",
  },
  {
    name: "Ananya Sharma",
    location: "Bengaluru, India",
    rating: 5,
    date: "August 2026",
    review:
      "Paradise Resort truly feels like a private escape. The ambience, dining experience, and beach access were excellent.",
  },
  {
    name: "Vikram Mehta",
    location: "Chennai, India",
    rating: 4,
    date: "August 2026",
    review:
      "Beautiful property with a peaceful atmosphere. Loved the ocean view and the overall luxury feel of the resort.",
  },
];

function Stars({ rating }) {
  return (
    <div
      className="review-stars"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < rating ? "filled" : ""}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    review: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRating = (rating) => {
    setFormData((previous) => ({
      ...previous,
      rating,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.review.trim()
    ) {
      return;
    }

    const newReview = {
      name: formData.name.trim(),
      location: formData.location.trim(),
      rating: Number(formData.rating),
      date: "Just now",
      review: formData.review.trim(),
    };

    setReviews((previous) => [
      newReview,
      ...previous,
    ]);

    setFormData({
      name: "",
      location: "",
      rating: 5,
      review: "",
    });

    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <section
        className="reviews-section"
        id="reviews"
      >
        <div className="reviews-container">

          {/* ================= HEADING ================= */}

          <motion.div
            className="reviews-heading"
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
            <span className="reviews-eyebrow">
              GUEST EXPERIENCES
            </span>

            <h2>
              Loved by our
              <span> Guests</span>
            </h2>

            <p>
              Discover what our guests say about their
              stay at Paradise Resort.
            </p>
          </motion.div>

          {/* ================= RATING OVERVIEW ================= */}

          <motion.div
            className="rating-overview"
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
            <div className="overall-rating">
              <div className="rating-number">
                4.9
              </div>

              <Stars rating={5} />

              <p>
                Overall Guest Rating
              </p>

              <small>
                Based on 328 guest reviews
              </small>
            </div>

            <div className="rating-divider"></div>

            <div className="rating-categories">

              <div className="rating-category">
                <div>
                  <span>
                    Rooms & Villas
                  </span>

                  <strong>
                    4.9
                  </strong>
                </div>

                <div className="rating-bar">
                  <span
                    style={{
                      width: "98%",
                    }}
                  ></span>
                </div>
              </div>

              <div className="rating-category">
                <div>
                  <span>
                    Service
                  </span>

                  <strong>
                    4.9
                  </strong>
                </div>

                <div className="rating-bar">
                  <span
                    style={{
                      width: "98%",
                    }}
                  ></span>
                </div>
              </div>

              <div className="rating-category">
                <div>
                  <span>
                    Dining
                  </span>

                  <strong>
                    4.8
                  </strong>
                </div>

                <div className="rating-bar">
                  <span
                    style={{
                      width: "96%",
                    }}
                  ></span>
                </div>
              </div>

              <div className="rating-category">
                <div>
                  <span>
                    Cleanliness
                  </span>

                  <strong>
                    4.9
                  </strong>
                </div>

                <div className="rating-bar">
                  <span
                    style={{
                      width: "98%",
                    }}
                  ></span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ================= REVIEWS ================= */}

          <div className="reviews-grid">

            {reviews.map((review, index) => (
              <motion.article
                className="review-card"
                key={`${review.name}-${index}`}
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
                  duration: 0.6,
                  delay: index * 0.12,
                }}
              >
                <div className="review-card-top">

                  <div className="guest-avatar">
                    {review.name.charAt(0)}
                  </div>

                  <div className="guest-info">
                    <h3>
                      {review.name}
                    </h3>

                    <span>
                      {review.location}
                    </span>
                  </div>

                </div>

                <Stars
                  rating={review.rating}
                />

                <p className="review-text">
                  “{review.review}”
                </p>

                <div className="review-date">
                  {review.date}
                </div>
              </motion.article>
            ))}

          </div>

          {/* ================= BOTTOM ================= */}

          <motion.div
            className="reviews-bottom"
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span>
              YOUR EXPERIENCE MATTERS
            </span>

            <button
              type="button"
              onClick={() => setShowForm(true)}
            >
              Share Your Experience
            </button>
          </motion.div>

        </div>
      </section>

      {/* ================= REVIEW MODAL ================= */}

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="review-modal-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={handleClose}
          >
            <motion.div
              className="review-modal"
              initial={{
                opacity: 0,
                y: 40,
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
                duration: 0.35,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* Modal Header */}

              <div className="review-modal-header">

                <div>
                  <span className="review-modal-eyebrow">
                    YOUR EXPERIENCE
                  </span>

                  <h2>
                    Share Your Experience
                  </h2>

                  <p>
                    Tell us about your stay at
                    Paradise Resort.
                  </p>
                </div>

                <button
                  type="button"
                  className="review-modal-close"
                  onClick={handleClose}
                  aria-label="Close review form"
                >
                  ×
                </button>

              </div>

              {/* Form */}

              <form
                className="review-form"
                onSubmit={handleSubmit}
              >

                {/* Name */}

                <div className="review-form-row">

                  <div className="review-form-group">
                    <label htmlFor="review-name">
                      Your Name
                    </label>

                    <input
                      id="review-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  {/* Location */}

                  <div className="review-form-group">
                    <label htmlFor="review-location">
                      Location
                    </label>

                    <input
                      id="review-location"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                      required
                    />
                  </div>

                </div>

                {/* Rating */}

                <div className="review-form-group">

                  <label>
                    Your Rating
                  </label>

                  <div className="rating-selector">

                    {Array.from({
                      length: 5,
                    }).map((_, index) => {
                      const starNumber =
                        index + 1;

                      return (
                        <button
                          key={starNumber}
                          type="button"
                          className={
                            starNumber <=
                            Number(
                              formData.rating
                            )
                              ? "selected"
                              : ""
                          }
                          onClick={() =>
                            handleRating(
                              starNumber
                            )
                          }
                          aria-label={`${starNumber} star rating`}
                        >
                          ★
                        </button>
                      );
                    })}

                    <span>
                      {formData.rating}/5
                    </span>

                  </div>

                </div>

                {/* Review */}

                <div className="review-form-group">

                  <label htmlFor="review-message">
                    Your Experience
                  </label>

                  <textarea
                    id="review-message"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="Tell us about your experience..."
                    rows="5"
                    required
                  ></textarea>

                </div>

                {/* Actions */}

                <div className="review-form-actions">

                  <button
                    type="button"
                    className="review-cancel-button"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="review-submit-button"
                  >
                    Submit Review
                  </button>

                </div>

              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}