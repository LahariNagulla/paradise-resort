import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

const initialDining = [
  {
    id: "DN001",
    name: "Azure Restaurant",
    type: "All Day Dining",
    cuisine: "International",
    price: "₹₹",
    hours: "7:00 AM - 11:00 PM",
    capacity: 80,
    status: "Open",
    description:
      "A sophisticated all-day dining restaurant offering international cuisine with beautiful resort views.",
  },
  {
    id: "DN002",
    name: "Ocean Breeze",
    type: "Beach Restaurant",
    cuisine: "Seafood",
    price: "₹₹₹",
    hours: "12:00 PM - 10:30 PM",
    capacity: 50,
    status: "Open",
    description:
      "A relaxed beachfront restaurant serving fresh seafood and refreshing tropical dishes.",
  },
  {
    id: "DN003",
    name: "Sunset Lounge",
    type: "Lounge & Bar",
    cuisine: "Cocktails & Snacks",
    price: "₹₹₹",
    hours: "4:00 PM - 12:00 AM",
    capacity: 45,
    status: "Open",
    description:
      "An elegant sunset lounge perfect for signature drinks, light bites and evening relaxation.",
  },
  {
    id: "DN004",
    name: "Palm Garden Café",
    type: "Café",
    cuisine: "Indian & Continental",
    price: "₹₹",
    hours: "8:00 AM - 8:00 PM",
    capacity: 35,
    status: "Closed",
    description:
      "A peaceful garden café serving coffee, fresh juices, snacks and casual meals.",
  },
];

export default function DiningManagement() {
  const navigate = useNavigate();

  const [dining, setDining] = useState(initialDining);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDining, setSelectedDining] = useState(null);

  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    type: "Restaurant",
    cuisine: "",
    price: "₹₹",
    hours: "",
    capacity: "",
    status: "Open",
    description: "",
  });

  const filteredDining = dining.filter((item) => {
    const matchesFilter =
      filter === "All" || item.status === filter;

    const searchText =
      `${item.name} ${item.type} ${item.cuisine}`.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    return matchesFilter && matchesSearch;
  });

  const total = dining.length;
  const open = dining.filter((item) => item.status === "Open").length;
  const closed = dining.filter((item) => item.status === "Closed").length;
  const capacity = dining.reduce(
    (sum, item) => sum + Number(item.capacity || 0),
    0
  );

  const handleAddRestaurant = (e) => {
    e.preventDefault();

    const newItem = {
      id: `DN${String(dining.length + 1).padStart(3, "0")}`,
      ...newRestaurant,
      capacity: Number(newRestaurant.capacity),
    };

    setDining((prev) => [...prev, newItem]);

    setNewRestaurant({
      name: "",
      type: "Restaurant",
      cuisine: "",
      price: "₹₹",
      hours: "",
      capacity: "",
      status: "Open",
      description: "",
    });

    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dining outlet?"
    );

    if (!confirmed) return;

    setDining((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleStatus = (id) => {
    setDining((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Open" ? "Closed" : "Open",
            }
          : item
      )
    );
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <div style={styles.logoIcon}>P</div>

          <div>
            <h2 style={styles.logo}>PARADISE</h2>
            <span style={styles.logoSub}>RESORT ADMIN</span>
          </div>
        </div>

        <div style={styles.menuLabel}>MAIN MENU</div>

        <button
          style={styles.menuButton}
          onClick={() => navigate("/admin/dashboard")}
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          style={styles.menuButton}
          onClick={() => navigate("/admin/bookings")}
        >
          <span>▣</span>
          Bookings
        </button>

        <button
          style={styles.menuButton}
          onClick={() => navigate("/admin/rooms")}
        >
          <span>▤</span>
          Rooms
        </button>

        <button
          style={{
            ...styles.menuButton,
            ...styles.activeMenu,
          }}
          onClick={() => navigate("/admin/dining")}
        >
          <span>🍽</span>
          Dining
        </button>

        <button
          style={styles.menuButton}
          onClick={() => navigate("/admin/experiences")}
        >
          <span>✦</span>
          Experiences
        </button>

        <button style={styles.menuButton}>
          <span>◇</span>
          Offers
        </button>

        <button style={styles.menuButton}>
          <span>▧</span>
          Gallery
        </button>

        <button style={styles.menuButton}>
          <span>⚙</span>
          Settings
        </button>

        <div style={styles.sidebarBottom}>
          <button
            style={styles.logoutButton}
            onClick={() => navigate("/admin")}
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {/* HEADER */}
        <header style={styles.header}>
          <div>
            <div style={styles.breadcrumb}>
              ADMIN / DINING
            </div>

            <h1 style={styles.title}>
              Dining Management
            </h1>

            <p style={styles.subtitle}>
              Manage restaurants, cafés, lounges and dining outlets.
            </p>
          </div>

          <button
            style={styles.addButton}
            onClick={() => setShowAddModal(true)}
          >
            <span>＋</span>
            Add Dining Outlet
          </button>
        </header>

        {/* STATS */}
        <section style={styles.statsGrid}>
          <StatCard
            label="Total Outlets"
            value={total}
            icon="🍽"
          />

          <StatCard
            label="Open Now"
            value={open}
            icon="✓"
          />

          <StatCard
            label="Closed"
            value={closed}
            icon="◷"
          />

          <StatCard
            label="Total Capacity"
            value={capacity}
            icon="♙"
          />
        </section>

        {/* TOOLBAR */}
        <section style={styles.toolbar}>
          <div style={styles.filters}>
            {["All", "Open", "Closed"].map((item) => (
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
            ))}
          </div>

          <input
            type="text"
            placeholder="Search dining outlets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
        </section>

        {/* DINING CARDS */}
        <section style={styles.grid}>
          <AnimatePresence>
            {filteredDining.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -5 }}
                style={styles.card}
              >
                <div style={styles.cardImage}>
                  <div style={styles.imageOverlay}>
                    <span style={styles.outletIcon}>
                      🍽
                    </span>

                    <span
                      style={{
                        ...styles.status,
                        ...(item.status === "Open"
                          ? styles.openStatus
                          : styles.closedStatus),
                      }}
                    >
                      {item.status}
                    </span>
                  </div>

                  <span style={styles.imageText}>
                    PARADISE
                  </span>
                </div>

                <div style={styles.cardContent}>
                  <div style={styles.cardTop}>
                    <div>
                      <h2 style={styles.cardTitle}>
                        {item.name}
                      </h2>

                      <p style={styles.cardType}>
                        {item.type}
                      </p>
                    </div>

                    <span style={styles.price}>
                      {item.price}
                    </span>
                  </div>

                  <div style={styles.infoRow}>
                    <span>🍴 {item.cuisine}</span>
                  </div>

                  <div style={styles.infoRow}>
                    <span>◷ {item.hours}</span>
                  </div>

                  <div style={styles.infoRow}>
                    <span>♙ Capacity: {item.capacity}</span>
                  </div>

                  <p style={styles.description}>
                    {item.description}
                  </p>

                  <div style={styles.actions}>
                    <button
                      style={styles.viewButton}
                      onClick={() =>
                        setSelectedDining(item)
                      }
                    >
                      View Details
                    </button>

                    <button
                      style={styles.statusButton}
                      onClick={() =>
                        toggleStatus(item.id)
                      }
                    >
                      {item.status === "Open"
                        ? "Close"
                        : "Open"}
                    </button>

                    <button
                      style={styles.deleteButton}
                      onClick={() =>
                        handleDelete(item.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {filteredDining.length === 0 && (
          <div style={styles.empty}>
            No dining outlets found.
          </div>
        )}
      </main>

      {/* ADD MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            style={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              style={styles.modal}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.modalHeader}>
                <div>
                  <span style={styles.modalEyebrow}>
                    PARADISE RESORT
                  </span>

                  <h2 style={styles.modalTitle}>
                    Add Dining Outlet
                  </h2>
                </div>

                <button
                  style={styles.closeButton}
                  onClick={() => setShowAddModal(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddRestaurant}>
                <div style={styles.formGrid}>
                  <FormField
                    label="Outlet Name"
                    value={newRestaurant.name}
                    onChange={(value) =>
                      setNewRestaurant({
                        ...newRestaurant,
                        name: value,
                      })
                    }
                    placeholder="e.g. Coral Restaurant"
                  />

                  <div style={styles.field}>
                    <label style={styles.label}>
                      Outlet Type
                    </label>

                    <select
                      value={newRestaurant.type}
                      onChange={(e) =>
                        setNewRestaurant({
                          ...newRestaurant,
                          type: e.target.value,
                        })
                      }
                      style={styles.input}
                    >
                      <option>Restaurant</option>
                      <option>Beach Restaurant</option>
                      <option>Café</option>
                      <option>Lounge & Bar</option>
                      <option>Fine Dining</option>
                    </select>
                  </div>

                  <FormField
                    label="Cuisine"
                    value={newRestaurant.cuisine}
                    onChange={(value) =>
                      setNewRestaurant({
                        ...newRestaurant,
                        cuisine: value,
                      })
                    }
                    placeholder="e.g. Indian & Continental"
                  />

                  <div style={styles.field}>
                    <label style={styles.label}>
                      Price Range
                    </label>

                    <select
                      value={newRestaurant.price}
                      onChange={(e) =>
                        setNewRestaurant({
                          ...newRestaurant,
                          price: e.target.value,
                        })
                      }
                      style={styles.input}
                    >
                      <option>₹</option>
                      <option>₹₹</option>
                      <option>₹₹₹</option>
                      <option>₹₹₹₹</option>
                    </select>
                  </div>

                  <FormField
                    label="Opening Hours"
                    value={newRestaurant.hours}
                    onChange={(value) =>
                      setNewRestaurant({
                        ...newRestaurant,
                        hours: value,
                      })
                    }
                    placeholder="e.g. 7:00 AM - 11:00 PM"
                  />

                  <FormField
                    label="Guest Capacity"
                    type="number"
                    value={newRestaurant.capacity}
                    onChange={(value) =>
                      setNewRestaurant({
                        ...newRestaurant,
                        capacity: value,
                      })
                    }
                    placeholder="e.g. 80"
                  />

                  <div style={styles.field}>
                    <label style={styles.label}>
                      Status
                    </label>

                    <select
                      value={newRestaurant.status}
                      onChange={(e) =>
                        setNewRestaurant({
                          ...newRestaurant,
                          status: e.target.value,
                        })
                      }
                      style={styles.input}
                    >
                      <option>Open</option>
                      <option>Closed</option>
                    </select>
                  </div>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>
                    Description
                  </label>

                  <textarea
                    value={newRestaurant.description}
                    onChange={(e) =>
                      setNewRestaurant({
                        ...newRestaurant,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the dining outlet..."
                    style={{
                      ...styles.input,
                      minHeight: 100,
                      resize: "vertical",
                    }}
                  />
                </div>

                <div style={styles.modalActions}>
                  <button
                    type="button"
                    style={styles.cancelButton}
                    onClick={() =>
                      setShowAddModal(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={styles.saveButton}
                  >
                    Add Outlet
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILS MODAL */}
      <AnimatePresence>
        {selectedDining && (
          <motion.div
            style={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDining(null)}
          >
            <motion.div
              style={styles.detailsModal}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.cardImageLarge}>
                <span style={styles.imageText}>
                  PARADISE
                </span>

                <button
                  style={styles.modalCloseFloating}
                  onClick={() =>
                    setSelectedDining(null)
                  }
                >
                  ×
                </button>
              </div>

              <div style={styles.detailsContent}>
                <span style={styles.modalEyebrow}>
                  {selectedDining.id}
                </span>

                <h2 style={styles.detailsTitle}>
                  {selectedDining.name}
                </h2>

                <p style={styles.detailsType}>
                  {selectedDining.type}
                </p>

                <div style={styles.detailsGrid}>
                  <Detail
                    label="Cuisine"
                    value={selectedDining.cuisine}
                  />

                  <Detail
                    label="Price"
                    value={selectedDining.price}
                  />

                  <Detail
                    label="Hours"
                    value={selectedDining.hours}
                  />

                  <Detail
                    label="Capacity"
                    value={selectedDining.capacity}
                  />

                  <Detail
                    label="Status"
                    value={selectedDining.status}
                  />
                </div>

                <p style={styles.detailsDescription}>
                  {selectedDining.description}
                </p>

                <button
                  style={styles.saveButton}
                  onClick={() =>
                    setSelectedDining(null)
                  }
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

        @media (max-width: 900px) {
          .dining-sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      style={styles.statCard}
    >
      <div style={styles.statIcon}>{icon}</div>

      <div>
        <p style={styles.statLabel}>{label}</p>
        <h3 style={styles.statValue}>{value}</h3>
      </div>
    </motion.div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        style={styles.input}
      />
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div style={styles.detailItem}>
      <span style={styles.detailLabel}>{label}</span>
      <strong style={styles.detailValue}>{value}</strong>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top right, rgba(26, 77, 82, 0.18), transparent 30%), #07151a",
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
    background: "rgba(5, 18, 23, 0.97)",
    borderRight: "1px solid rgba(255,255,255,0.07)",
    zIndex: 10,
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "4px 10px 35px",
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
    margin: "0 10px 12px",
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
    background: "rgba(201,168,106,0.12)",
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
    border: "1px solid rgba(255,255,255,0.08)",
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
    width: "calc(100% - 250px)",
    padding: "42px 45px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
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
      "repeat(4, minmax(0, 1fr))",
    gap: 15,
    marginBottom: 28,
  },

  statCard: {
    padding: 20,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.025)",
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
    background: "rgba(201,168,106,0.1)",
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
    justifyContent: "space-between",
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
    border: "1px solid rgba(255,255,255,0.08)",
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
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    color: "#fff",
    outline: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: 20,
  },

  card: {
    borderRadius: 13,
    overflow: "hidden",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
  },

  cardImage: {
    height: 145,
    background:
      "linear-gradient(135deg, #123a40, #0b2027 55%, #142e31)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardImageLarge: {
    height: 190,
    background:
      "linear-gradient(135deg, #123a40, #0b2027 55%, #142e31)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  imageText: {
    fontFamily: "Georgia, serif",
    fontSize: 24,
    letterSpacing: 6,
    color: "rgba(255,255,255,0.14)",
  },

  imageOverlay: {
    position: "absolute",
    inset: 0,
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  outletIcon: {
    fontSize: 22,
    background: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 9,
  },

  status: {
    fontSize: 10,
    padding: "6px 9px",
    borderRadius: 20,
    fontWeight: 700,
  },

  openStatus: {
    background: "rgba(73, 180, 124, 0.15)",
    color: "#79d5a4",
  },

  closedStatus: {
    background: "rgba(180, 180, 180, 0.12)",
    color: "#aeb7b8",
  },

  cardContent: {
    padding: 20,
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 15,
  },

  cardTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: 20,
    fontWeight: 400,
  },

  cardType: {
    margin: "5px 0 0",
    color: "#c9a86a",
    fontSize: 11,
  },

  price: {
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

  viewButton: {
    flex: 1,
    minWidth: 100,
    border: "1px solid rgba(201,168,106,0.4)",
    background: "transparent",
    color: "#d8bc84",
    padding: "9px 10px",
    borderRadius: 7,
    fontSize: 11,
  },

  statusButton: {
    border: "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    color: "#a9b3b5",
    padding: "9px 11px",
    borderRadius: 7,
    fontSize: 11,
  },

  deleteButton: {
    border: "1px solid rgba(220,80,80,0.2)",
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
    background: "rgba(0,0,0,0.72)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    width: "min(700px, 100%)",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#0b1d22",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 15,
    padding: 28,
  },

  detailsModal: {
    width: "min(600px, 100%)",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#0b1d22",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 15,
    overflow: "hidden",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
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
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#aeb8ba",
    fontSize: 20,
  },

  modalCloseFloating: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    fontSize: 20,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
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
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.09)",
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
    border: "1px solid rgba(255,255,255,0.1)",
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

  detailsContent: {
    padding: 28,
  },

  detailsTitle: {
    margin: "8px 0 4px",
    fontFamily: "Georgia, serif",
    fontWeight: 400,
    fontSize: 28,
  },

  detailsType: {
    color: "#c9a86a",
    fontSize: 12,
    margin: 0,
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: 12,
    margin: "25px 0",
  },

  detailItem: {
    padding: 13,
    borderRadius: 8,
    background: "rgba(255,255,255,0.025)",
  },

  detailLabel: {
    display: "block",
    fontSize: 9,
    color: "#718084",
    marginBottom: 5,
  },

  detailValue: {
    fontSize: 12,
    color: "#e4e0d8",
  },

  detailsDescription: {
    color: "#8c999b",
    fontSize: 12,
    lineHeight: 1.7,
    marginBottom: 22,
  },
};