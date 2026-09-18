import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AdminSidebar from "./AdminSidebar";

const initialExperiences = [
  {
    id: "EX001",
    name: "Sunset Cruise",
    image: "/resort-cruise.jpg",
    category: "Water Experience",
    duration: "2 Hours",
    price: 3500,
    capacity: 8,
    status: "Active",
    description:
      "Enjoy a beautiful sunset cruise along the coastline with refreshing drinks and unforgettable ocean views.",
  },
  {
    id: "EX002",
    name: "Ocean Kayaking",
    image: "/resort-beach.jpg",
    category: "Water Sports",
    duration: "1 Hour",
    price: 1800,
    capacity: 4,
    status: "Active",
    description:
      "Explore the peaceful coastal waters with a guided kayaking experience suitable for beginners and adventure lovers.",
  },
  {
    id: "EX003",
    name: "Beach Yoga",
    image: "/resort-garden.jpg",
    category: "Wellness",
    duration: "1 Hour",
    price: 1200,
    capacity: 15,
    status: "Active",
    description:
      "Start your morning with a relaxing yoga session on the beach surrounded by the sound of waves.",
  },
  {
    id: "EX004",
    name: "Private Beach Dinner",
    image: "/resort-dinner.jpg",
    category: "Dining Experience",
    duration: "3 Hours",
    price: 8500,
    capacity: 2,
    status: "Active",
    description:
      "A romantic private dinner experience on the beach with personalised service and ocean views.",
  },
  {
    id: "EX005",
    name: "Island Adventure",
    image: "/resort-villa.jpg",
    category: "Adventure",
    duration: "5 Hours",
    price: 6500,
    capacity: 10,
    status: "Inactive",
    description:
      "Discover nearby coastal attractions and hidden beaches with our guided island adventure.",
  },
  {
    id: "EX006",
    name: "Couples Spa Retreat",
    image: "/resort-pool.jpg",
    category: "Wellness",
    duration: "2 Hours",
    price: 5500,
    capacity: 2,
    status: "Active",
    description:
      "Relax and rejuvenate with a private couples spa treatment designed for complete relaxation.",
  },
];

export default function ExperiencesManagement() {
  const [experiences, setExperiences] = useState(
    initialExperiences
  );

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExperience, setNewExperience] = useState({
    name: "",
    image: "/resort-cruise.jpg",
    category: "Water Experience",
    duration: "",
    price: "",
    capacity: "",
    status: "Active",
    description: "",
  });

  const filteredExperiences = experiences.filter((item) => {
    const matchesFilter =
      filter === "All" || item.status === filter;

    const searchText =
      `${item.name} ${item.category}`.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    return matchesFilter && matchesSearch;
  });

  const total = experiences.length;

  const active = experiences.filter(
    (item) => item.status === "Active"
  ).length;

  const inactive = experiences.filter(
    (item) => item.status === "Inactive"
  ).length;

  const capacity = experiences.reduce(
    (sum, item) => sum + Number(item.capacity || 0),
    0
  );

  const handleAddExperience = (e) => {
    e.preventDefault();

    const newItem = {
      id: `EX${String(experiences.length + 1).padStart(
        3,
        "0"
      )}`,
      ...newExperience,
      price: Number(newExperience.price),
      capacity: Number(newExperience.capacity),
    };

    setExperiences((prev) => [...prev, newItem]);

    setNewExperience({
      name: "",
      category: "Water Experience",
      duration: "",
      price: "",
      capacity: "",
      status: "Active",
      description: "",
    });

    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) return;

    setExperiences((prev) =>
      prev.filter((item) => item.id !== id)
    );

  };

  const toggleStatus = (id) => {
    setExperiences((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : item
      )
    );
  };

  return (
    <div style={styles.page}>
      <AdminSidebar />

      {/* ================= MAIN ================= */}

      <main style={styles.main} className="experience-main">
        {/* HEADER */}

        <header style={styles.header} className="experience-header">
          <div>
            <div style={styles.breadcrumb}>
              ADMIN / EXPERIENCES
            </div>

            <h1 style={styles.title}>
              Experiences Management
            </h1>

            <p style={styles.subtitle}>
              Manage activities, adventures and wellness
              experiences.
            </p>
          </div>

          <button
            style={styles.addButton}
            onClick={() => setShowAddModal(true)}
          >
            <span>＋</span>
            Add Experience
          </button>
        </header>

        {/* ================= STATS ================= */}

        <section style={styles.statsGrid} className="experience-stats">
          <StatCard
            label="Total Experiences"
            value={total}
            icon="✦"
          />

          <StatCard
            label="Active"
            value={active}
            icon="✓"
          />

          <StatCard
            label="Inactive"
            value={inactive}
            icon="◷"
          />

          <StatCard
            label="Guest Capacity"
            value={capacity}
            icon="♙"
          />
        </section>

        {/* ================= TOOLBAR ================= */}

        <section style={styles.toolbar} className="experience-toolbar">
          <div style={styles.filters}>
            {["All", "Active", "Inactive"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  style={{
                    ...styles.filterButton,
                    ...(filter === item
                      ? styles.activeFilter
                      : {}),
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <input
            type="text"
            placeholder="Search experiences..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.search}
            className="experience-search"
          />
        </section>

        {/* ================= EXPERIENCE CARDS ================= */}

        <section style={styles.grid} className="experience-grid">
          <AnimatePresence>
            {filteredExperiences.map(
              (item, index) => (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  style={styles.card}
                >
                  {/* IMAGE AREA */}

                  <div style={styles.cardImage}>
                    <img
                      src={item.image || "/resort-cruise.jpg"}
                      alt={item.name}
                      style={styles.cardImagePhoto}
                    />

                    <div
                      style={
                        styles.imageOverlay
                      }
                    >
                      <span
                        style={styles.experienceIcon}
                      >
                        ✦
                      </span>

                      <span
                        style={{
                          ...styles.status,
                          ...(item.status ===
                          "Active"
                            ? styles.activeStatus
                            : styles.inactiveStatus),
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* CARD CONTENT */}

                  <div style={styles.cardContent}>
                    <div style={styles.cardTop}>
                      <div>
                        <h2
                          style={
                            styles.cardTitle
                          }
                        >
                          {item.name}
                        </h2>

                        <p
                          style={
                            styles.cardCategory
                          }
                        >
                          {item.category}
                        </p>
                      </div>

                      <div
                        style={
                          styles.priceBox
                        }
                      >
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <span>
                        ◷ {item.duration}
                      </span>
                    </div>

                    <div style={styles.infoRow}>
                      <span>
                        ♙ Capacity:{" "}
                        {item.capacity} guests
                      </span>
                    </div>

                    <p
                      style={
                        styles.description
                      }
                    >
                      {item.description}
                    </p>

                    <div
                      style={styles.actions}
                      className="experience-actions"
                    >
                      <button
                        style={
                          styles.statusButton
                        }
                        onClick={() =>
                          toggleStatus(
                            item.id
                          )
                        }
                      >
                        {item.status ===
                        "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                      <button
                        style={
                          styles.deleteButton
                        }
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </section>

        {filteredExperiences.length === 0 && (
          <div style={styles.empty}>
            No experiences found.
          </div>
        )}
      </main>

      {/* ================= ADD EXPERIENCE MODAL ================= */}

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            style={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setShowAddModal(false)
            }
          >
            <motion.div
              style={styles.modal}
              className="experience-modal"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <div
                style={styles.modalHeader}
              >
                <div>
                  <span
                    style={
                      styles.modalEyebrow
                    }
                  >
                    PARADISE RESORT
                  </span>

                  <h2
                    style={
                      styles.modalTitle
                    }
                  >
                    Add Experience
                  </h2>
                </div>

                <button
                  style={
                    styles.closeButton
                  }
                  onClick={() =>
                    setShowAddModal(
                      false
                    )
                  }
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={
                  handleAddExperience
                }
              >
                <div
                  style={
                    styles.formGrid
                  }
                >
                  <FormField
                    label="Experience Name"
                    value={
                      newExperience.name
                    }
                    onChange={(value) =>
                      setNewExperience({
                        ...newExperience,
                        name: value,
                      })
                    }
                    placeholder="e.g. Dolphin Watching"
                  />

                  <div
                    style={styles.field}
                  >
                    <label
                      style={
                        styles.label
                      }
                    >
                      Category
                    </label>

                    <select
                      value={
                        newExperience.category
                      }
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          category:
                            e.target.value,
                        })
                      }
                      style={
                        styles.input
                      }
                    >
                      <option>
                        Water Experience
                      </option>
                      <option>
                        Water Sports
                      </option>
                      <option>
                        Wellness
                      </option>
                      <option>
                        Adventure
                      </option>
                      <option>
                        Dining Experience
                      </option>
                      <option>
                        Cultural Experience
                      </option>
                    </select>
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Experience Image</label>
                    <select
                      value={newExperience.image || "/resort-cruise.jpg"}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, image: e.target.value })
                      }
                      style={styles.input}
                    >
                      <option value="/resort-cruise.jpg">Sunset Cruise</option>
                      <option value="/resort-beach.jpg">Ocean / Beach</option>
                      <option value="/resort-garden.jpg">Garden / Yoga</option>
                      <option value="/resort-dinner.jpg">Private Dinner</option>
                      <option value="/resort-villa.jpg">Villa / Adventure</option>
                      <option value="/resort-pool.jpg">Pool / Spa</option>
                    </select>
                  </div>

                  <FormField
                    label="Duration"
                    value={
                      newExperience.duration
                    }
                    onChange={(value) =>
                      setNewExperience({
                        ...newExperience,
                        duration: value,
                      })
                    }
                    placeholder="e.g. 2 Hours"
                  />

                  <FormField
                    label="Price"
                    type="number"
                    value={
                      newExperience.price
                    }
                    onChange={(value) =>
                      setNewExperience({
                        ...newExperience,
                        price: value,
                      })
                    }
                    placeholder="e.g. 2500"
                  />

                  <FormField
                    label="Guest Capacity"
                    type="number"
                    value={
                      newExperience.capacity
                    }
                    onChange={(value) =>
                      setNewExperience({
                        ...newExperience,
                        capacity: value,
                      })
                    }
                    placeholder="e.g. 10"
                  />

                  <div
                    style={styles.field}
                  >
                    <label
                      style={
                        styles.label
                      }
                    >
                      Status
                    </label>

                    <select
                      value={
                        newExperience.status
                      }
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          status:
                            e.target.value,
                        })
                      }
                      style={
                        styles.input
                      }
                    >
                      <option>
                        Active
                      </option>
                      <option>
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  style={styles.field}
                >
                  <label
                    style={styles.label}
                  >
                    Description
                  </label>

                  <textarea
                    value={
                      newExperience.description
                    }
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        description:
                          e.target.value,
                      })
                    }
                    placeholder="Describe the experience..."
                    required
                    style={{
                      ...styles.input,
                      minHeight: 100,
                      resize: "vertical",
                    }}
                  />
                </div>

                <div
                  style={
                    styles.modalActions
                  }
                >
                  <button
                    type="button"
                    style={
                      styles.cancelButton
                    }
                    onClick={() =>
                      setShowAddModal(
                        false
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={
                      styles.saveButton
                    }
                  >
                    Add Experience
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= RESPONSIVE ================= */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
          background: #07151a;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        @media (max-width: 1000px) {
          .experience-main {
            padding: 25px;
          }
        }

        @media (max-width: 700px) {
          .experience-sidebar {
            display: none !important;
          }

          .experience-main {
            margin-left: 0 !important;
            width: 100% !important;
            padding: 25px 20px !important;
          }
        }

        @media (max-width: 700px) {
          .experience-grid { grid-template-columns: 1fr; }
          .experience-header, .experience-toolbar { flex-direction: column !important; align-items: stretch !important; }
          .experience-search { width: 100% !important; }
          .experience-stats { grid-template-columns: 1fr !important; }
          .experience-form-grid { grid-template-columns: 1fr !important; }
          .experience-modal { padding: 20px !important; max-height: 92vh !important; }
          .experience-actions { flex-direction: column !important; }
          .experience-actions button { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ label, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      style={styles.statCard}
    >
      <div style={styles.statIcon}>
        {icon}
      </div>

      <div>
        <p style={styles.statLabel}>
          {label}
        </p>

        <h3 style={styles.statValue}>
          {value}
        </h3>
      </div>
    </motion.div>
  );
}

/* ================= FORM FIELD ================= */

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        required
        style={styles.input}
      />
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top right, rgba(26,77,82,0.18), transparent 30%), #07151a",
    color: "#f5f0e8",
    display: "flex",
  },

  sidebar: {
    width: 250,
    minHeight: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    padding: "28px 18px",
    background:
      "rgba(5,18,23,0.97)",
    borderRight:
      "1px solid rgba(255,255,255,0.07)",
    zIndex: 10,
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding:
      "4px 10px 35px",
  },

  logoIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    display: "grid",
    placeItems: "center",
    background: "#c9a86a",
    color: "#07151a",
    fontWeight: 800,
    fontSize: 19,
  },

  logo: {
    margin: 0,
    fontSize: 16,
    letterSpacing: 3,
  },

  logoSub: {
    fontSize: 8,
    letterSpacing: 2,
    color: "#8b9a9e",
  },

  menuLabel: {
    color: "#657579",
    fontSize: 9,
    letterSpacing: 2,
    margin:
      "0 10px 12px",
  },

  menuButton: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "#8f9da0",
    padding: "13px 12px",
    borderRadius: 9,
    textAlign: "left",
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 4,
    fontSize: 13,
  },

  activeMenu: {
    background:
      "rgba(201,168,106,0.12)",
    color: "#d8bc84",
  },

  sidebarBottom: {
    position: "absolute",
    bottom: 25,
    left: 18,
    right: 18,
  },

  logoutButton: {
    width: "100%",
    padding: "13px 12px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: 9,
    background: "transparent",
    color: "#8f9da0",
    textAlign: "left",
    display: "flex",
    gap: 12,
    alignItems: "center",
  },

  main: {
    marginLeft: 250,
    width:
      "calc(100% - 250px)",
    padding: "42px 45px",
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-end",
    gap: 20,
    marginBottom: 35,
  },

  breadcrumb: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#7b898d",
    marginBottom: 9,
  },

  title: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontWeight: 400,
    fontSize: 34,
  },

  subtitle: {
    color: "#849295",
    fontSize: 13,
    marginTop: 8,
  },

  addButton: {
    border: "none",
    background: "#c9a86a",
    color: "#07151a",
    padding: "13px 20px",
    borderRadius: 8,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 7,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4,minmax(0,1fr))",
    gap: 15,
    marginBottom: 28,
  },

  statCard: {
    padding: 20,
    borderRadius: 12,
    border:
      "1px solid rgba(255,255,255,0.07)",
    background:
      "rgba(255,255,255,0.025)",
    display: "flex",
    alignItems: "center",
    gap: 15,
  },

  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    display: "grid",
    placeItems: "center",
    background:
      "rgba(201,168,106,0.1)",
    color: "#c9a86a",
  },

  statLabel: {
    margin: 0,
    color: "#77868a",
    fontSize: 11,
  },

  statValue: {
    margin: "4px 0 0",
    fontSize: 23,
    fontWeight: 500,
  },

  toolbar: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 25,
  },

  filters: {
    display: "flex",
    gap: 7,
    flexWrap: "wrap",
  },

  filterButton: {
    border:
      "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    color: "#89979a",
    padding: "9px 16px",
    borderRadius: 7,
    fontSize: 12,
  },

  activeFilter: {
    background: "#c9a86a",
    color: "#07151a",
    borderColor: "#c9a86a",
    fontWeight: 700,
  },

  search: {
    width: 260,
    padding: "11px 14px",
    background:
      "rgba(255,255,255,0.035)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    color: "#fff",
    outline: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 20,
  },

  card: {
    borderRadius: 13,
    overflow: "hidden",
    background:
      "rgba(255,255,255,0.025)",
    border:
      "1px solid rgba(255,255,255,0.07)",
  },

  cardImage: {
    height: 145,
    background:
      "linear-gradient(135deg,#123a40,#0b2027 55%,#142e31)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },


  cardImagePhoto: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  imageText: {
    fontFamily: "Georgia, serif",
    fontSize: 24,
    letterSpacing: 6,
    color:
      "rgba(255,255,255,0.14)",
  },

  imageOverlay: {
    position: "absolute",
    inset: 0,
    padding: 15,
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
  },

  experienceIcon: {
    fontSize: 22,
    background:
      "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 9,
  },

  status: {
    fontSize: 10,
    padding: "6px 9px",
    borderRadius: 20,
    fontWeight: 700,
  },

  activeStatus: {
    background:
      "rgba(73,180,124,0.15)",
    color: "#79d5a4",
  },

  inactiveStatus: {
    background:
      "rgba(180,180,180,0.12)",
    color: "#aeb7b8",
  },

  cardContent: {
    padding: 20,
  },

  cardTop: {
    display: "flex",
    justifyContent:
      "space-between",
    gap: 15,
  },

  cardTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: 20,
    fontWeight: 400,
  },

  cardCategory: {
    margin:
      "5px 0 0",
    color: "#c9a86a",
    fontSize: 11,
  },

  priceBox: {
    color: "#c9a86a",
    fontSize: 13,
    whiteSpace: "nowrap",
  },

  infoRow: {
    color: "#879598",
    fontSize: 11,
    marginTop: 10,
  },

  description: {
    color: "#7d8b8e",
    lineHeight: 1.6,
    fontSize: 11,
    margin: "15px 0",
  },

  actions: {
    display: "flex",
    gap: 7,
    flexWrap: "wrap",
  },


  statusButton: {
    border:
      "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    color: "#a9b3b5",
    padding: "9px 11px",
    borderRadius: 7,
    fontSize: 11,
  },

  deleteButton: {
    border:
      "1px solid rgba(220,80,80,0.2)",
    background: "transparent",
    color: "#d98282",
    padding: "9px 11px",
    borderRadius: 7,
    fontSize: 11,
  },

  empty: {
    padding: 50,
    textAlign: "center",
    color: "#718084",
  },

  modalBackdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    background:
      "rgba(0,0,0,0.72)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    width:
      "min(700px,100%)",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#0b1d22",
    border:
      "1px solid rgba(255,255,255,0.09)",
    borderRadius: 15,
    padding: 28,
  },


  modalHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    marginBottom: 25,
  },

  modalEyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#c9a86a",
  },

  modalTitle: {
    margin: "6px 0 0",
    fontFamily: "Georgia, serif",
    fontWeight: 400,
    fontSize: 26,
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border:
      "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#aeb8ba",
    fontSize: 20,
  },


  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 16,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    display: "block",
    fontSize: 10,
    color: "#8c9a9d",
    marginBottom: 7,
    letterSpacing: 0.5,
  },

  input: {
    width: "100%",
    padding: "12px 13px",
    background:
      "rgba(255,255,255,0.035)",
    border:
      "1px solid rgba(255,255,255,0.09)",
    borderRadius: 7,
    color: "#f5f0e8",
    outline: "none",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },

  cancelButton: {
    padding: "11px 18px",
    border:
      "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#a8b2b4",
    borderRadius: 7,
  },

  saveButton: {
    padding: "11px 20px",
    border: "none",
    background: "#c9a86a",
    color: "#07151a",
    borderRadius: 7,
    fontWeight: 700,
  },


};