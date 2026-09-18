import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AdminSidebar from "./AdminSidebar";
const initialGallery = [
  {
    id: "GL001",
    title: "Paradise Beach",
    category: "Beach",
    image: "/resort-beach.jpg",
    status: "Active",
    description: "A stunning view of the pristine beach at Paradise Resort.",
  },
  
  {
    id: "GL002",
    title: "Ocean View Suite",
    category: "Rooms",
    image: "/resort-suite.jpg",
    status: "Active",
    description: "Elegant accommodation with panoramic ocean views.",
  },
  {
    id: "GL003",
    title: "Beach Villa",
    category: "Villas",
    image: "/resort-villa.jpg",
    status: "Active",
    description: "A private luxury villa designed for an unforgettable beach escape.",
  },
  {
    id: "GL004",
    title: "Sunset Dining",
    category: "Dining",
    image: "/resort-dining.jpg",
    status: "Active",
    description: "An atmospheric dining experience overlooking the ocean at sunset.",
  },
  {
    id: "GL005",
    title: "Luxury Pool",
    category: "Pool",
    image: "/resort-pool.jpg",
    status: "Active",
    description: "Relax beside the resort infinity pool with beautiful tropical views.",
  },
  {
    id: "GL006",
    title: "Sunset Cruise",
    category: "Experiences",
    image: "/resort-cruise.jpg",
    status: "Inactive",
    description: "A memorable cruise experience surrounded by the colors of sunset.",
  },
  {
    id: "GL007",
    title: "Tropical Garden",
    category: "Resort",
    image: "/resort-garden.jpg",
    status: "Active",
    description: "Beautiful tropical landscaping throughout the Paradise Resort property.",
  },
  {
    id: "GL008",
    title: "Private Beach Dinner",
    category: "Dining",
    image: "/resort-dinner.jpg",
    status: "Active",
    description: "A romantic private dinner setup directly beside the sea.",
  },
];

const emptyImage = {
  title: "",
  category: "Beach",
  image: "/resort-bg.png",
  status: "Active",
  description: "",
};

export default function GalleryManagement() {
  const [gallery, setGallery] = useState(initialGallery);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [newImage, setNewImage] = useState(emptyImage);

  const filteredGallery = gallery.filter((item) => {
    const matchesFilter =
      filter === "All" || item.category === filter;

    const searchText =
      `${item.title} ${item.category} ${item.description}`.toLowerCase();

    return matchesFilter && searchText.includes(search.toLowerCase());
  });

  const total = gallery.length;
  const active = gallery.filter((item) => item.status === "Active").length;
  const inactive = gallery.filter((item) => item.status === "Inactive").length;
  const categories = new Set(gallery.map((item) => item.category)).size;

  const handleAddImage = (e) => {
    e.preventDefault();

    const newItem = {
      id: `GL${String(gallery.length + 1).padStart(3, "0")}`,
      ...newImage,
    };

    setGallery((prev) => [...prev, newItem]);
    setNewImage(emptyImage);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery image?")) {
      return;
    }

    setGallery((prev) => prev.filter((item) => item.id !== id));

    if (selectedImage?.id === id) {
      setSelectedImage(null);
    }
  };

  const toggleStatus = (id) => {
    setGallery((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  const startEdit = (item) => {
    setEditingImage({ ...item });
  };

  const saveEdit = (e) => {
    e.preventDefault();

    setGallery((prev) =>
      prev.map((item) =>
        item.id === editingImage.id ? editingImage : item
      )
    );

    setEditingImage(null);
  };

  const categoryFilters = [
    "All",
    "Beach",
    "Pool",
    "Rooms",
    "Villas",
    "Dining",
    "Experiences",
    "Resort",
  ];

  return (
    <div style={styles.page}>
      <AdminSidebar />

      <main style={styles.main} className="gallery-main">
        <header style={styles.header} className="gallery-header">
          <div>
            <div style={styles.breadcrumb}>ADMIN / GALLERY</div>
            <h1 style={styles.title}>Gallery Management</h1>
            <p style={styles.subtitle}>
              Manage resort photography and visual content.
            </p>
          </div>

          <button
            style={styles.addButton}
            onClick={() => setShowAddModal(true)}
          >
            <span>＋</span>
            Add Image
          </button>
        </header>

        <section style={styles.statsGrid} className="gallery-stats">
          <StatCard label="Total Images" value={total} icon="▧" />
          <StatCard label="Active Images" value={active} icon="✓" />
          <StatCard label="Inactive Images" value={inactive} icon="◷" />
          <StatCard label="Categories" value={categories} icon="◇" />
        </section>

        <section style={styles.toolbar} className="gallery-toolbar">
          <div style={styles.filters}>
            {categoryFilters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
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
            placeholder="Search gallery..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
            className="gallery-search"
          />
        </section>

        <section style={styles.grid} className="gallery-grid">
          <AnimatePresence>
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                }}
                whileHover={{ y: -5 }}
                style={styles.card}
              >
                <div style={styles.imageWrapper}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={styles.image}
                  />

                  <div style={styles.imageShade} />

                  <span style={styles.categoryBadge}>
                    {item.category}
                  </span>

                  <span
                    style={{
                      ...styles.status,
                      ...(item.status === "Active"
                        ? styles.activeStatus
                        : styles.inactiveStatus),
                    }}
                  >
                    {item.status}
                  </span>

                  <span style={styles.galleryNumber}>{item.id}</span>
                </div>

                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{item.title}</h2>

                  <p style={styles.description}>{item.description}</p>

                  <div style={styles.actions}>
                    <button
                      style={styles.viewButton}
                      onClick={() => setSelectedImage(item)}
                    >
                      View
                    </button>

                    <button
                      style={styles.editButton}
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      style={styles.statusButton}
                      onClick={() => toggleStatus(item.id)}
                    >
                      {item.status === "Active"
                        ? "Disable"
                        : "Activate"}
                    </button>

                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {filteredGallery.length === 0 && (
          <div style={styles.empty}>No gallery images found.</div>
        )}
      </main>

      <AnimatePresence>
        {showAddModal && (
          <ImageModal
            title="Add Gallery Image"
            image={newImage}
            setImage={setNewImage}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddImage}
            submitText="Add Image"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingImage && (
          <ImageModal
            title="Edit Gallery Image"
            image={editingImage}
            setImage={setEditingImage}
            onClose={() => setEditingImage(null)}
            onSubmit={saveEdit}
            submitText="Save Changes"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            style={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              style={styles.detailsModal}
              className="gallery-details-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.detailsImageArea} className="gallery-details-image">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  style={styles.detailsImage}
                />

                <div style={styles.detailsImageShade} />

                <button
                  style={styles.modalCloseFloating}
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
              </div>

              <div style={styles.detailsContent} className="gallery-details-content">
                <span style={styles.modalEyebrow}>
                  {selectedImage.id} / {selectedImage.category}
                </span>

                <h2 style={styles.detailsTitle}>
                  {selectedImage.title}
                </h2>

                <div style={styles.detailsGrid} className="gallery-details-grid">
                  <Detail
                    label="Category"
                    value={selectedImage.category}
                  />
                  <Detail
                    label="Status"
                    value={selectedImage.status}
                  />
                </div>

                <p style={styles.detailsDescription}>
                  {selectedImage.description}
                </p>

                <button
                  style={styles.saveButton}
                  onClick={() => setSelectedImage(null)}
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

        @media (max-width: 1100px) {
          .gallery-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .gallery-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 700px) {
          html,
          body,
          #root {
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .gallery-main {
            margin-left: 0 !important;
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            padding: 28px 20px !important;
            overflow-x: hidden !important;
          }

          .gallery-header {
            width: 100% !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .gallery-toolbar {
            width: 100% !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .gallery-search {
            width: 100% !important;
            max-width: 100% !important;
          }

          .gallery-grid {
            width: 100% !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .gallery-stats {
            width: 100% !important;
          }
        }

        @media (max-width: 650px) {
          .gallery-main {
            padding: 18px 12px !important;
          }

          .gallery-header {
            gap: 14px !important;
            margin-bottom: 22px !important;
          }

          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          .gallery-stats {
            grid-template-columns: 1fr !important;
          }

          .gallery-form-grid {
            grid-template-columns: 1fr !important;
          }

          .gallery-modal {
            padding: 20px !important;
          }

          .gallery-details-grid {
            grid-template-columns: 1fr !important;
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

function ImageModal({
  title,
  image,
  setImage,
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
        className="gallery-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <div>
            <span style={styles.modalEyebrow}>PARADISE RESORT</span>
            <h2 style={styles.modalTitle}>{title}</h2>
          </div>

          <button style={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div style={styles.formGrid} className="gallery-form-grid">
            <FormField
              label="Image Title"
              value={image.title}
              onChange={(value) =>
                setImage({ ...image, title: value })
              }
              placeholder="e.g. Ocean Sunset"
            />

            <div style={styles.field}>
              <label style={styles.label}>Category</label>

              <select
                value={image.category}
                onChange={(e) =>
                  setImage({
                    ...image,
                    category: e.target.value,
                  })
                }
                style={styles.input}
              >
                <option>Beach</option>
                <option>Pool</option>
                <option>Rooms</option>
                <option>Villas</option>
                <option>Dining</option>
                <option>Experiences</option>
                <option>Resort</option>
              </select>
            </div>

            <FormField
              label="Image Path / URL"
              value={image.image}
              onChange={(value) =>
                setImage({ ...image, image: value })
              }
              placeholder="/images/beach.jpg"
            />

            <div style={styles.field}>
              <label style={styles.label}>Status</label>

              <select
                value={image.status}
                onChange={(e) =>
                  setImage({
                    ...image,
                    status: e.target.value,
                  })
                }
                style={styles.input}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div style={styles.previewBox}>
            <img
              src={image.image}
              alt="Preview"
              style={styles.previewImage}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>

            <textarea
              value={image.description}
              onChange={(e) =>
                setImage({
                  ...image,
                  description: e.target.value,
                })
              }
              placeholder="Describe the gallery image..."
              required
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
              onClick={onClose}
            >
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
    padding: "9px 13px",
    borderRadius: 7,
    fontSize: 11,
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
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 20,
  },

  card: {
    borderRadius: 13,
    overflow: "hidden",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
  },

  imageWrapper: {
    height: 205,
    position: "relative",
    overflow: "hidden",
    background: "#102b31",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  imageShade: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.6))",
  },

  categoryBadge: {
    position: "absolute",
    left: 14,
    bottom: 14,
    padding: "6px 9px",
    borderRadius: 20,
    background: "rgba(0,0,0,0.48)",
    color: "#e2d2ad",
    fontSize: 10,
  },

  status: {
    position: "absolute",
    right: 14,
    top: 14,
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

  galleryNumber: {
    position: "absolute",
    left: 14,
    top: 14,
    color: "rgba(255,255,255,0.6)",
    fontSize: 9,
    letterSpacing: 1,
  },

  cardContent: {
    padding: 18,
  },

  cardTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: 19,
    fontWeight: 400,
  },

  description: {
    color: "#7d8b8e",
    lineHeight: 1.6,
    fontSize: 11,
    margin: "11px 0 16px",
  },

  actions: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },

  viewButton: {
    flex: 1,
    minWidth: 55,
    border: "1px solid rgba(201,168,106,0.4)",
    background: "transparent",
    color: "#d8bc84",
    padding: "9px 9px",
    borderRadius: 7,
    fontSize: 10,
  },

  editButton: {
    border: "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    color: "#a9b3b5",
    padding: "9px 10px",
    borderRadius: 7,
    fontSize: 10,
  },

  statusButton: {
    border: "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    color: "#a9b3b5",
    padding: "9px 10px",
    borderRadius: 7,
    fontSize: 10,
  },

  deleteButton: {
    border: "1px solid rgba(220,80,80,0.2)",
    background: "transparent",
    color: "#d98282",
    padding: "9px 10px",
    borderRadius: 7,
    fontSize: 10,
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
    width: "min(700px, 100%)",
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
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: 20,
    zIndex: 2,
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

  previewBox: {
    height: 170,
    borderRadius: 9,
    overflow: "hidden",
    background: "#102b31",
    marginBottom: 16,
    border: "1px solid rgba(255,255,255,0.07)",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
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

  detailsImageArea: {
    height: 330,
    position: "relative",
    background: "#102b31",
  },

  detailsImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  detailsImageShade: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5))",
    pointerEvents: "none",
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
