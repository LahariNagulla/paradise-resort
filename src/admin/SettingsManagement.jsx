import { useState } from "react";
import { motion } from "motion/react";
import AdminSidebar from "./AdminSidebar";

const initialSettings = {
  resortName: "Paradise Resort",
  tagline: "A private escape by the sea",
  email: "reservations@paradiseresort.com",
  phone: "+91 98765 43210",
  address: "Beach Road, Coastal Paradise, Andhra Pradesh, India",

  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  currency: "INR (₹)",
  timezone: "Asia/Kolkata",

  bookingNotice: "Bookings are subject to availability.",

  emailNotifications: true,
  bookingNotifications: true,
  promotionalEmails: false,

  maintenanceMode: false,
};

export default function SettingsManagement() {

  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all settings?"
    );

    if (!confirmReset) return;

    setSettings(initialSettings);
    setSaved(false);
  };

  return (
    <div style={styles.page}>
      <AdminSidebar />

{/* MAIN */}
      <main className="settings-main" style={styles.main}>
        {/* HEADER */}
        <header
          className="settings-header"
          style={styles.header}
        >
          <div>
            <div style={styles.breadcrumb}>
              ADMIN / SETTINGS
            </div>

            <h1 style={styles.title}>
              Resort Settings
            </h1>

            <p style={styles.subtitle}>
              Manage your resort information and system preferences.
            </p>
          </div>

          {saved && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              style={styles.savedMessage}
            >
              ✓ Changes saved successfully
            </motion.div>
          )}
        </header>

        <form onSubmit={handleSave}>
          {/* RESORT INFORMATION */}
          <section
            className="settings-section"
            style={styles.section}
          >
            <SectionHeading
              number="01"
              title="Resort Information"
              subtitle="Basic information displayed across the resort website."
            />

            <div
              className="settings-form-grid"
              style={styles.formGrid}
            >
              <FormField
                label="Resort Name"
                value={settings.resortName}
                onChange={(value) =>
                  updateSetting("resortName", value)
                }
                placeholder="Paradise Resort"
              />

              <FormField
                label="Tagline"
                value={settings.tagline}
                onChange={(value) =>
                  updateSetting("tagline", value)
                }
                placeholder="A private escape by the sea"
              />

              <FormField
                label="Email Address"
                type="email"
                value={settings.email}
                onChange={(value) =>
                  updateSetting("email", value)
                }
                placeholder="reservations@example.com"
              />

              <FormField
                label="Phone Number"
                value={settings.phone}
                onChange={(value) =>
                  updateSetting("phone", value)
                }
                placeholder="+91 98765 43210"
              />

              <div
                className="settings-full-field"
                style={styles.fullField}
              >
                <FormField
                  label="Resort Address"
                  value={settings.address}
                  onChange={(value) =>
                    updateSetting("address", value)
                  }
                  placeholder="Resort address"
                />
              </div>
            </div>
          </section>

          {/* BOOKING */}
          <section
            className="settings-section"
            style={styles.section}
          >
            <SectionHeading
              number="02"
              title="Booking Preferences"
              subtitle="Configure the default reservation experience."
            />

            <div
              className="settings-form-grid"
              style={styles.formGrid}
            >
              <SelectField
                label="Check-in Time"
                value={settings.checkIn}
                onChange={(value) =>
                  updateSetting("checkIn", value)
                }
                options={[
                  "12:00 PM",
                  "1:00 PM",
                  "2:00 PM",
                  "3:00 PM",
                  "4:00 PM",
                ]}
              />

              <SelectField
                label="Check-out Time"
                value={settings.checkOut}
                onChange={(value) =>
                  updateSetting("checkOut", value)
                }
                options={[
                  "10:00 AM",
                  "11:00 AM",
                  "12:00 PM",
                  "1:00 PM",
                ]}
              />

              <SelectField
                label="Currency"
                value={settings.currency}
                onChange={(value) =>
                  updateSetting("currency", value)
                }
                options={[
                  "INR (₹)",
                  "USD ($)",
                  "EUR (€)",
                  "GBP (£)",
                ]}
              />

              <SelectField
                label="Timezone"
                value={settings.timezone}
                onChange={(value) =>
                  updateSetting("timezone", value)
                }
                options={[
                  "Asia/Kolkata",
                  "Asia/Dubai",
                  "Asia/Singapore",
                  "Europe/London",
                  "America/New_York",
                ]}
              />

              <div
                className="settings-full-field"
                style={styles.fullField}
              >
                <FormField
                  label="Booking Notice"
                  value={settings.bookingNotice}
                  onChange={(value) =>
                    updateSetting("bookingNotice", value)
                  }
                  placeholder="Booking notice"
                />
              </div>
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section
            className="settings-section"
            style={styles.section}
          >
            <SectionHeading
              number="03"
              title="Notifications"
              subtitle="Choose which administrative notifications are enabled."
            />

            <div style={styles.toggleList}>
              <ToggleRow
                title="Email Notifications"
                description="Receive important system notifications by email."
                checked={settings.emailNotifications}
                onChange={(value) =>
                  updateSetting(
                    "emailNotifications",
                    value
                  )
                }
              />

              <ToggleRow
                title="Booking Notifications"
                description="Receive an alert whenever a new booking is created."
                checked={settings.bookingNotifications}
                onChange={(value) =>
                  updateSetting(
                    "bookingNotifications",
                    value
                  )
                }
              />

              <ToggleRow
                title="Promotional Emails"
                description="Allow promotional and marketing email notifications."
                checked={settings.promotionalEmails}
                onChange={(value) =>
                  updateSetting(
                    "promotionalEmails",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* SYSTEM */}
          <section
            className="settings-section"
            style={styles.section}
          >
            <SectionHeading
              number="04"
              title="System"
              subtitle="Important operational controls for the resort website."
            />

            <div
              className="settings-system-box"
              style={styles.systemBox}
            >
              <div>
                <h3 style={styles.systemTitle}>
                  Maintenance Mode
                </h3>

                <p style={styles.systemDescription}>
                  Temporarily disable public website access
                  while maintenance is being performed.
                </p>
              </div>

              <Toggle
                checked={settings.maintenanceMode}
                onChange={(value) =>
                  updateSetting(
                    "maintenanceMode",
                    value
                  )
                }
              />
            </div>

            {settings.maintenanceMode && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                style={styles.warning}
              >
                ⚠ Maintenance mode is currently enabled.
                Public visitors may not be able to access
                the resort website.
              </motion.div>
            )}
          </section>

          {/* ACTIONS */}
          <div
            className="settings-footer-actions"
            style={styles.footerActions}
          >
            <button
              type="button"
              className="settings-reset"
              style={styles.resetButton}
              onClick={handleReset}
            >
              Reset Defaults
            </button>

            <button
              type="submit"
              className="settings-save"
              style={styles.saveButton}
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>

      {/* RESPONSIVE CSS */}
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
        select {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        input::placeholder {
          color: #5d6a6d;
        }

        select option {
          background: #102126;
          color: #f5f0e8;
        }

        @media (max-width: 900px) {
          html,
          body,
          #root {
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .settings-main {
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            padding: 28px 20px !important;
            overflow-x: hidden !important;
          }

          .settings-header {
            width: 100% !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }

          .settings-form-grid {
            width: 100% !important;
            grid-template-columns: 1fr !important;
          }

          .settings-full-field {
            grid-column: auto !important;
            width: 100% !important;
          }

          .settings-section {
            width: 100% !important;
            max-width: 100% !important;
          }

          .settings-system-box {
            width: 100% !important;
          }
        }

        @media (max-width: 600px) {
          .settings-main {
            padding: 18px 12px !important;
          }

          .settings-section {
            padding: 18px !important;
            border-radius: 12px !important;
          }

          .settings-section-heading {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }

          .settings-footer-actions {
            flex-direction: column-reverse !important;
            width: 100% !important;
          }

          .settings-save,
          .settings-reset {
            width: 100% !important;
          }

          .settings-system-box {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 18px !important;
          }

          .settings-header h1 {
            font-size: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* =========================
   NAVIGATION BUTTON
========================= */

function NavButton({
  icon,
  label,
  active = false,
  onClick,
}) {
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

/* =========================
   SECTION HEADING
========================= */

function SectionHeading({
  number,
  title,
  subtitle,
}) {
  return (
    <div
      className="settings-section-heading"
      style={styles.sectionHeading}
    >
      <div style={styles.sectionNumber}>
        {number}
      </div>

      <div>
        <h2 style={styles.sectionTitle}>
          {title}
        </h2>

        <p style={styles.sectionSubtitle}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* =========================
   INPUT
========================= */

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

/* =========================
   SELECT
========================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        style={styles.input}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================
   TOGGLE ROW
========================= */

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div style={styles.toggleRow}>
      <div>
        <h3 style={styles.toggleTitle}>
          {title}
        </h3>

        <p style={styles.toggleDescription}>
          {description}
        </p>
      </div>

      <Toggle
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

/* =========================
   TOGGLE
========================= */

function Toggle({
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      aria-label={
        checked ? "Disable" : "Enable"
      }
      onClick={() =>
        onChange(!checked)
      }
      style={{
        ...styles.toggle,
        ...(checked
          ? styles.toggleOn
          : styles.toggleOff),
      }}
    >
      <span
        style={{
          ...styles.toggleKnob,
          ...(checked
            ? styles.knobOn
            : styles.knobOff),
        }}
      />
    </button>
  );
}

/* =========================
   STYLES
========================= */

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
    maxWidth: 1450,
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

  savedMessage: {
    padding: "10px 15px",
    borderRadius: 8,
    background:
      "rgba(73, 180, 124, 0.12)",
    border:
      "1px solid rgba(73, 180, 124, 0.2)",
    color: "#79d5a4",
    fontSize: 11,
  },

  section: {
    background:
      "rgba(255,255,255,0.025)",
    border:
      "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 28,
    marginBottom: 20,
  },

  sectionHeading: {
    display: "flex",
    alignItems: "flex-start",
    gap: 15,
    paddingBottom: 22,
    marginBottom: 24,
    borderBottom:
      "1px solid rgba(255,255,255,0.06)",
  },

  sectionNumber: {
    width: 34,
    height: 34,
    borderRadius: 9,
    display: "grid",
    placeItems: "center",
    background:
      "rgba(201,168,106,0.1)",
    color: "#c9a86a",
    fontSize: 10,
    fontWeight: 700,
  },

  sectionTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: 21,
    fontWeight: 400,
  },

  sectionSubtitle: {
    margin: "6px 0 0",
    color: "#77868a",
    fontSize: 11,
    lineHeight: 1.5,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: 18,
  },

  fullField: {
    gridColumn: "1 / -1",
  },

  field: {
    marginBottom: 2,
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

  toggleList: {
    display: "flex",
    flexDirection: "column",
  },

  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    padding: "18px 0",
    borderBottom:
      "1px solid rgba(255,255,255,0.06)",
  },

  toggleTitle: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    color: "#e7e2d9",
  },

  toggleDescription: {
    margin: "5px 0 0",
    color: "#77868a",
    fontSize: 10,
    lineHeight: 1.5,
  },

  toggle: {
    width: 48,
    height: 26,
    borderRadius: 20,
    border: "none",
    padding: 3,
    position: "relative",
    flexShrink: 0,
    transition:
      "background 0.2s ease",
  },

  toggleOn: {
    background: "#c9a86a",
  },

  toggleOff: {
    background: "#26363a",
  },

  toggleKnob: {
    display: "block",
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#f5f0e8",
    transition:
      "transform 0.2s ease",
  },

  knobOn: {
    transform: "translateX(22px)",
  },

  knobOff: {
    transform: "translateX(0)",
  },

  systemBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    padding: 18,
    borderRadius: 10,
    border:
      "1px solid rgba(255,255,255,0.06)",
    background:
      "rgba(255,255,255,0.02)",
  },

  systemTitle: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
  },

  systemDescription: {
    margin: "6px 0 0",
    color: "#77868a",
    fontSize: 10,
    lineHeight: 1.5,
  },

  warning: {
    marginTop: 12,
    padding: 13,
    borderRadius: 8,
    background:
      "rgba(201,168,106,0.08)",
    border:
      "1px solid rgba(201,168,106,0.2)",
    color: "#c9a86a",
    fontSize: 10,
    lineHeight: 1.5,
  },

  footerActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginBottom: 40,
  },

  resetButton: {
    padding: "12px 20px",
    border:
      "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#a8b2b4",
    borderRadius: 7,
    fontSize: 12,
  },

  saveButton: {
    padding: "12px 24px",
    border: "none",
    background: "#c9a86a",
    color: "#07151a",
    borderRadius: 7,
    fontWeight: 700,
    fontSize: 12,
  },
};