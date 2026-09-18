import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

const initialOffers = [
  {
    id: "OF001",
    title: "Honeymoon Escape",
    type: "Romantic Package",
    discount: "20%",
    price: 24999,
    validity: "Valid until 31 Dec 2026",
    status: "Active",
    description:
      "A romantic luxury escape with a private beach dinner, couple spa session and premium accommodation.",
    image: "/resort-royal-villa.jpg",
  },
  {
    id: "OF002",
    title: "Weekend Paradise",
    type: "Weekend Package",
    discount: "15%",
    price: 18999,
    validity: "Valid until 30 Nov 2026",
    status: "Active",
    description:
      "A relaxing weekend stay with breakfast, pool access and a complimentary sunset experience.",
    image: "/resort-suites.jpg",
  },
  {
    id: "OF003",
    title: "Family Getaway",
    type: "Family Package",
    discount: "18%",
    price: 22999,
    validity: "Valid until 31 Dec 2026",
    status: "Active",
    description:
      "A family-friendly resort package including spacious accommodation, meals and selected activities.",
    image: "/resort-gardens.jpg",
  },
  {
    id: "OF004",
    title: "Early Bird Luxury",
    type: "Booking Offer",
    discount: "25%",
    price: 15999,
    validity: "Valid until 15 Oct 2026",
    status: "Inactive",
    description:
      "Save more by planning your luxury beach holiday in advance with an exclusive early booking offer.",
    image: "/resort-presidential.jpg",
  },
  {
    id: "OF005",
    title: "Long Stay Retreat",
    type: "Long Stay",
    discount: "30%",
    price: 39999,
    validity: "Valid until 31 Jan 2027",
    status: "Active",
    description:
      "Enjoy an extended tropical retreat with special accommodation rates and selected resort benefits.",
    image: "/resort-villas.jpg",
  },
];

export default function OffersManagement() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState(initialOffers);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);

  const emptyOffer = {
    title: "",
    type: "Romantic Package",
    discount: "",
    price: "",
    validity: "",
    status: "Active",
    description: "",
    image: "/resort-beach-restaurant.jpg",
  };

  const [newOffer, setNewOffer] = useState(emptyOffer);

  const filteredOffers = offers.filter((offer) => {
    const matchesFilter =
      filter === "All" || offer.status === filter;

    const searchText =
      `${offer.title} ${offer.type} ${offer.description}`.toLowerCase();

    return matchesFilter && searchText.includes(search.toLowerCase());
  });

  const total = offers.length;
  const active = offers.filter((offer) => offer.status === "Active").length;
  const inactive = offers.filter((offer) => offer.status === "Inactive").length;

  const handleAddOffer = (e) => {
    e.preventDefault();

    const newItem = {
      id: `OF${String(offers.length + 1).padStart(3, "0")}`,
      ...newOffer,
      discount: `${String(newOffer.discount).replace("%", "")}%`,
      price: Number(newOffer.price),
    };

    setOffers((prev) => [...prev, newItem]);
    setNewOffer(emptyOffer);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;

    setOffers((prev) => prev.filter((offer) => offer.id !== id));

    if (selectedOffer?.id === id) {
      setSelectedOffer(null);
    }
  };

  const toggleStatus = (id) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === id
          ? {
              ...offer,
              status: offer.status === "Active" ? "Inactive" : "Active",
            }
          : offer
      )
    );
  };

  const startEdit = (offer) => {
    setEditingOffer({
      ...offer,
      discount: String(offer.discount).replace("%", ""),
    });
  };

  const saveEdit = (e) => {
    e.preventDefault();

    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === editingOffer.id
          ? {
              ...editingOffer,
              discount: `${String(editingOffer.discount).replace("%", "")}%`,
              price: Number(editingOffer.price),
            }
          : offer
      )
    );

    setEditingOffer(null);
  };

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar} className="offers-sidebar">
        <div style={styles.logoArea}>
          <div style={styles.logoIcon}>P</div>
          <div>
            <h2 style={styles.logo}>PARADISE</h2>
            <span style={styles.logoSub}>RESORT ADMIN</span>
          </div>
        </div>

        <div style={styles.menuLabel}>MAIN MENU</div>

        <NavButton icon="▦" label="Dashboard" onClick={() => navigate("/admin/dashboard")} />
        <NavButton icon="▣" label="Bookings" onClick={() => navigate("/admin/bookings")} />
        <NavButton icon="▤" label="Rooms" onClick={() => navigate("/admin/rooms")} />
        <NavButton icon="🍽" label="Dining" onClick={() => navigate("/admin/dining")} />
        <NavButton icon="✦" label="Experiences" onClick={() => navigate("/admin/experiences")} />
        <NavButton icon="◇" label="Offers" active onClick={() => navigate("/admin/offers")} />
        <NavButton icon="▧" label="Gallery" onClick={() => navigate("/admin/gallery")} />
        <NavButton icon="⚙" label="Settings" onClick={() => navigate("/admin/settings")} />

        <div style={styles.sidebarBottom}>
          <button style={styles.logoutButton} onClick={() => navigate("/admin")}>
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      <main style={styles.main} className="offers-main">
        <div className="offers-mobile-nav">
          <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/admin/bookings")}>Bookings</button>
          <button onClick={() => navigate("/admin/rooms")}>Rooms</button>
          <button onClick={() => navigate("/admin/dining")}>Dining</button>
          <button onClick={() => navigate("/admin/experiences")}>Experiences</button>
          <button className="active" onClick={() => navigate("/admin/offers")}>Offers</button>
          <button onClick={() => navigate("/admin/gallery")}>Gallery</button>
          <button onClick={() => navigate("/admin/settings")}>Settings</button>
        </div>
        <header style={styles.header} className="offers-header">
          <div>
            <div style={styles.breadcrumb}>ADMIN / OFFERS</div>
            <h1 style={styles.title} className="offers-title">Offers Management</h1>
            <p style={styles.subtitle}>
              Manage resort packages, discounts and special offers.
            </p>
          </div>

          <button
            style={styles.addButton}
            className="offers-add-button"
            onClick={() => setShowAddModal(true)}
          >
            <span>＋</span>
            Add Offer
          </button>
        </header>

        <section style={styles.statsGrid} className="offers-stats">
          <StatCard label="Total Offers" value={total} icon="◇" />
          <StatCard label="Active Offers" value={active} icon="✓" />
          <StatCard label="Inactive Offers" value={inactive} icon="◷" />
          <StatCard
            label="Average Discount"
            value={
              total
                ? `${Math.round(
                    offers.reduce(
                      (sum, offer) =>
                        sum + Number(String(offer.discount).replace("%", "")),
                      0
                    ) / total
                  )}%`
                : "0%"
            }
            icon="%"
          />
        </section>

        <section style={styles.toolbar} className="offers-toolbar">
          <div style={styles.filters} className="offers-filters">
            {["All", "Active", "Inactive"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className="offers-filter-button"
                style={{
                  ...styles.filterButton,
                  ...(filter === item ? styles.activeFilter : {}),
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search offers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
            className="offers-search"
          />
        </section>

        <section style={styles.grid} className="offers-grid">
          <AnimatePresence>
            {filteredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                style={styles.card}
              >
                <div style={styles.cardImage} className="offers-card-image">
                  <img
                    src={offer.image || "/resort-presidential.jpg"}
                    alt={offer.title}
                    style={styles.cardImagePhoto}
                  />
                  <div style={styles.imageShade}></div>
                  <div style={styles.offerBadge}>{offer.discount} OFF</div>

                  <span
                    style={{
                      ...styles.status,
                      ...(offer.status === "Active"
                        ? styles.activeStatus
                        : styles.inactiveStatus),
                    }}
                  >
                    {offer.status}
                  </span>
                </div>

                <div style={styles.cardContent} className="offers-card-content">
                  <div style={styles.cardTop} className="offers-card-top">
                    <div>
                      <h2 style={styles.cardTitle} className="offers-card-title">{offer.title}</h2>
                      <p style={styles.cardType}>{offer.type}</p>
                    </div>

                    <strong style={styles.price} className="offers-price">
                      ₹{Number(offer.price).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <p style={styles.validity}>{offer.validity}</p>

                  <p style={styles.description}>{offer.description}</p>

                  <div style={styles.actions} className="offers-actions">
                    <button
                      style={styles.viewButton}
                      onClick={() => setSelectedOffer(offer)}
                    >
                      View
                    </button>

                    <button
                      style={styles.editButton}
                      onClick={() => startEdit(offer)}
                    >
                      Edit
                    </button>

                    <button
                      style={styles.statusButton}
                      onClick={() => toggleStatus(offer.id)}
                    >
                      {offer.status === "Active" ? "Disable" : "Activate"}
                    </button>

                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(offer.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {filteredOffers.length === 0 && (
          <div style={styles.empty}>No offers found.</div>
        )}
      </main>

      <AnimatePresence>
        {showAddModal && (
          <OfferModal
            title="Add Offer"
            offer={newOffer}
            setOffer={setNewOffer}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddOffer}
            submitText="Add Offer"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingOffer && (
          <OfferModal
            title="Edit Offer"
            offer={editingOffer}
            setOffer={setEditingOffer}
            onClose={() => setEditingOffer(null)}
            onSubmit={saveEdit}
            submitText="Save Changes"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            style={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOffer(null)}
          >
            <motion.div
              style={styles.detailsModal} className="offers-details-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.detailsImage} className="offers-details-image">
                <img
                  src={selectedOffer.image || "/resort-presidential.jpg"}
                  alt={selectedOffer.title}
                  style={styles.detailsImagePhoto}
                />
                <div style={styles.imageShade}></div>

                <button
                  style={styles.modalCloseFloating}
                  onClick={() => setSelectedOffer(null)}
                >
                  ×
                </button>

                <div style={styles.largeDiscount}>
                  {selectedOffer.discount} OFF
                </div>
              </div>

              <div style={styles.detailsContent} className="offers-details-content">
                <span style={styles.modalEyebrow}>{selectedOffer.id}</span>

                <h2 style={styles.detailsTitle} className="offers-details-title">{selectedOffer.title}</h2>

                <p style={styles.detailsType}>{selectedOffer.type}</p>

                <div style={styles.detailsGrid}>
                  <Detail label="Offer Price" value={`₹${Number(selectedOffer.price).toLocaleString("en-IN")}`} />
                  <Detail label="Discount" value={selectedOffer.discount} />
                  <Detail label="Validity" value={selectedOffer.validity} />
                  <Detail label="Status" value={selectedOffer.status} />
                </div>

                <p style={styles.detailsDescription}>
                  {selectedOffer.description}
                </p>

                <button
                  style={styles.saveButton}
                  onClick={() => setSelectedOffer(null)}
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

        .offers-mobile-nav {
          display: none;
        }

        @media (max-width: 1100px) {
          .offers-grid {
            grid-template-columns: 1fr !important;
          }

          .offers-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 900px) {
          .offers-mobile-nav {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding: 10px 0 16px;
            margin-bottom: 8px;
            scrollbar-width: thin;
          }

          .offers-mobile-nav button {
            flex: 0 0 auto;
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(255,255,255,0.025);
            color: #8f9da0;
            padding: 9px 12px;
            border-radius: 8px;
            font-size: 11px;
          }

          .offers-mobile-nav button.active {
            background: #c9a86a;
            color: #07151a;
            border-color: #c9a86a;
            font-weight: 700;
          }

          html,
          body,
          #root {
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .offers-sidebar {
            display: none !important;
            width: 0 !important;
            min-width: 0 !important;
          }

          .offers-main {
            margin-left: 0 !important;
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            padding: 28px 20px !important;
            overflow-x: hidden !important;
          }

          .offers-header {
            width: 100% !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .offers-toolbar {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .offers-search {
            width: 100% !important;
            max-width: 100% !important;
          }

          .offers-grid {
            width: 100% !important;
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 600px) {
          .offers-main {
            width: 100% !important;
            max-width: 100% !important;
            padding: 18px 12px !important;
          }

          .offers-header {
            gap: 16px !important;
            margin-bottom: 24px !important;
          }

          .offers-title {
            font-size: 28px !important;
          }

          .offers-add-button {
            width: 100% !important;
            justify-content: center !important;
            min-height: 46px !important;
          }

          .offers-stats {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          .offers-toolbar {
            gap: 12px !important;
          }

          .offers-filters {
            width: 100% !important;
          }

          .offers-filter-button {
            flex: 1 !important;
            min-width: 0 !important;
          }

          .offers-search {
            width: 100% !important;
            min-height: 44px !important;
          }

          .offers-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          .offers-card-image {
            height: 180px !important;
          }

          .offers-card-content {
            padding: 16px !important;
          }

          .offers-card-top {
            flex-direction: column !important;
            gap: 8px !important;
          }

          .offers-card-title {
            font-size: 19px !important;
          }

          .offers-price {
            font-size: 14px !important;
          }

          .offers-actions {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
          }

          .offers-actions button {
            min-height: 42px !important;
          }

          .offers-form-grid {
            grid-template-columns: 1fr !important;
          }

          .offers-modal {
            border-radius: 12px !important;
            max-height: 94vh !important;
          }

          .offers-modal-header {
            margin-bottom: 18px !important;
          }

          .offers-modal-title {
            font-size: 23px !important;
          }

          .offers-details-modal {
            max-height: 94vh !important;
          }

          .offers-details-image {
            height: 190px !important;
          }

          .offers-details-content {
            padding: 20px !important;
          }

          .offers-details-title {
            font-size: 25px !important;
          }

          .offers-details-grid {
            grid-template-columns: 1fr !important;
            margin: 18px 0 !important;
          }

          .offers-modal-actions {
            flex-direction: column-reverse !important;
          }

          .offers-modal-actions button {
            width: 100% !important;
            min-height: 44px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
}

function NavButton({ icon, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.menuButton,
        ...(active ? styles.activeMenu : {}),
      }}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      style={styles.statCard}
      className="offers-stat-card"
    >
      <div style={styles.statIcon}>{icon}</div>
      <div>
        <p style={styles.statLabel}>{label}</p>
        <h3 style={styles.statValue}>{value}</h3>
      </div>
    </motion.div>
  );
}

function OfferModal({
  title,
  offer,
  setOffer,
  onClose,
  onSubmit,
  submitText,
}) {
  return (
    <motion.div
      style={styles.modalBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={styles.modal}
        className="offers-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader} className="offers-modal-header">
          <div>
            <span style={styles.modalEyebrow}>PARADISE RESORT</span>
            <h2 style={styles.modalTitle} className="offers-modal-title">{title}</h2>
          </div>

          <button style={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div style={styles.formGrid} className="offers-form-grid">
            <FormField
              label="Offer Title"
              value={offer.title}
              onChange={(value) => setOffer({ ...offer, title: value })}
              placeholder="e.g. Summer Paradise"
            />

            <div style={styles.field}>
              <label style={styles.label}>Offer Type</label>
              <select
                value={offer.type}
                onChange={(e) =>
                  setOffer({ ...offer, type: e.target.value })
                }
                style={styles.input}
              >
                <option>Romantic Package</option>
                <option>Weekend Package</option>
                <option>Family Package</option>
                <option>Booking Offer</option>
                <option>Long Stay</option>
                <option>Seasonal Offer</option>
                <option>Special Package</option>
              </select>
            </div>

            <FormField
              label="Discount (%)"
              type="number"
              value={offer.discount}
              onChange={(value) => setOffer({ ...offer, discount: value })}
              placeholder="e.g. 20"
            />

            <FormField
              label="Package Price"
              type="number"
              value={offer.price}
              onChange={(value) => setOffer({ ...offer, price: value })}
              placeholder="e.g. 24999"
            />

            <FormField
              label="Validity"
              value={offer.validity}
              onChange={(value) => setOffer({ ...offer, validity: value })}
              placeholder="e.g. Valid until 31 Dec 2026"
            />

            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select
                value={offer.status}
                onChange={(e) =>
                  setOffer({ ...offer, status: e.target.value })
                }
                style={styles.input}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Image Path</label>
            <input
              type="text"
              value={offer.image || ""}
              onChange={(e) => setOffer({ ...offer, image: e.target.value })}
              placeholder="e.g. /resort-royal-villa.jpg"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              value={offer.description}
              onChange={(e) =>
                setOffer({ ...offer, description: e.target.value })
              }
              placeholder="Describe the offer..."
              required
              style={{
                ...styles.input,
                minHeight: 110,
                resize: "vertical",
              }}
            />
          </div>

          <div style={styles.modalActions} className="offers-modal-actions">
            <button type="button" style={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>

            <button type="submit" style={styles.saveButton}>
              {submitText}
            </button>
          </div>
        </form>
      </motion.div>
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
    width: "100%",
    minWidth: 0,
    overflowX: "hidden",
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
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
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
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 20,
  },

  card: {
    borderRadius: 13,
    overflow: "hidden",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
  },

  cardImage: {
    height: 190,
    background: "#0b2027",
    position: "relative",
    overflow: "hidden",
  },

  cardImagePhoto: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
  },

  detailsImage: {
    height: 250,
    background: "#0b2027",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  detailsImagePhoto: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
  },

  imageShade: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.48))",
    pointerEvents: "none",
  },

  offerBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    padding: "7px 10px",
    borderRadius: 20,
    background: "#c9a86a",
    color: "#07151a",
    fontSize: 10,
    fontWeight: 800,
  },

  status: {
    position: "absolute",
    top: 15,
    right: 15,
    fontSize: 10,
    padding: "6px 9px",
    borderRadius: 20,
    fontWeight: 700,
  },

  activeStatus: {
    background: "rgba(73, 180, 124, 0.15)",
    color: "#79d5a4",
  },

  inactiveStatus: {
    background: "rgba(180, 180, 180, 0.12)",
    color: "#aeb7b8",
  },

  largeDiscount: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 28,
    fontWeight: 700,
    color: "#c9a86a",
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

  validity: {
    color: "#9aa6a8",
    fontSize: 10,
    margin: "14px 0 0",
  },

  description: {
    color: "#7d8b8e",
    lineHeight: 1.6,
    fontSize: 11,
    margin: "14px 0 16px",
  },

  actions: {
    display: "flex",
    gap: 7,
    flexWrap: "wrap",
  },

  viewButton: {
    flex: 1,
    minWidth: 70,
    border: "1px solid rgba(201,168,106,0.4)",
    background: "transparent",
    color: "#d8bc84",
    padding: "9px 10px",
    borderRadius: 7,
    fontSize: 11,
  },

  editButton: {
    border: "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    color: "#a9b3b5",
    padding: "9px 11px",
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
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
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
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
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
