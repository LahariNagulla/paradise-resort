import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "TOTAL BOOKINGS",
      value: "128",
      change: "+12%",
      label: "vs last month",
    },
    {
      title: "OCCUPANCY",
      value: "78%",
      change: "+6%",
      label: "vs last month",
    },
    {
      title: "REVENUE",
      value: "₹8.42L",
      change: "+18%",
      label: "vs last month",
    },
    {
      title: "GUESTS",
      value: "246",
      change: "+9%",
      label: "this month",
    },
  ];

  const recentBookings = [
    {
      id: "#PR1001",
      guest: "Rahul Sharma",
      room: "Ocean View Suite",
      date: "16 Sep 2026",
      status: "Confirmed",
    },
    {
      id: "#PR1002",
      guest: "Ananya Reddy",
      room: "Beach Villa",
      date: "16 Sep 2026",
      status: "Confirmed",
    },
    {
      id: "#PR1003",
      guest: "Arjun Kumar",
      room: "Deluxe Sea View",
      date: "15 Sep 2026",
      status: "Pending",
    },
    {
      id: "#PR1004",
      guest: "Priya Singh",
      room: "Premium Villa",
      date: "15 Sep 2026",
      status: "Confirmed",
    },
    {
      id: "#PR1005",
      guest: "Vikram Rao",
      room: "Ocean View Suite",
      date: "14 Sep 2026",
      status: "Completed",
    },
  ];

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        {/* HEADER */}
        <motion.header
          className="dashboard-header"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="dashboard-eyebrow">
              PARADISE RESORT
            </span>

            <h1>Dashboard</h1>

            <p>
              Welcome back. Here's what's happening
              at your resort today.
            </p>
          </div>

          <div className="admin-date">
            <span>Today</span>
            <strong>16 September 2026</strong>
          </div>
        </motion.header>

        {/* STAT CARDS */}
        <section className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              className="stat-card"
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <span className="stat-title">
                {stat.title}
              </span>

              <div className="stat-value">
                {stat.value}
              </div>

              <div className="stat-bottom">
                <span className="stat-change">
                  {stat.change}
                </span>

                <span className="stat-label">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CONTENT GRID */}
        <section className="dashboard-grid">
          {/* RECENT BOOKINGS */}
          <motion.div
            className="dashboard-card bookings-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
          >
            <div className="card-header">
              <div>
                <span className="card-eyebrow">
                  RESERVATIONS
                </span>

                <h2>Recent Bookings</h2>
              </div>

              <button
                type="button"
                className="view-all-button"
                onClick={() => navigate("/admin/bookings")}
              >
                View All →
              </button>
            </div>

            <div className="booking-table-wrapper">
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>BOOKING</th>
                    <th>GUEST</th>
                    <th>ROOM</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="booking-id">
                        {booking.id}
                      </td>

                      <td>
                        {booking.guest}
                      </td>

                      <td className="room-name">
                        {booking.room}
                      </td>

                      <td>
                        {booking.date}
                      </td>

                      <td>
                        <span
                          className={`status status-${booking.status.toLowerCase()}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* QUICK ACTIONS */}
          <motion.div
            className="dashboard-card quick-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
          >
            <div className="card-header">
              <div>
                <span className="card-eyebrow">
                  MANAGEMENT
                </span>

                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="quick-actions">
              {/* NEW BOOKING */}
              <button
                type="button"
                onClick={() => navigate("/admin/bookings")}
              >
                <span className="quick-icon">＋</span>

                <div>
                  <strong>New Booking</strong>
                  <small>Create a reservation</small>
                </div>

                <span className="quick-arrow">→</span>
              </button>

              {/* MANAGE ROOMS */}
              <button
                type="button"
                onClick={() => navigate("/admin/rooms")}
              >
                <span className="quick-icon">▤</span>

                <div>
                  <strong>Manage Rooms</strong>
                  <small>Update room availability</small>
                </div>

                <span className="quick-arrow">→</span>
              </button>

              {/* CREATE OFFER */}
              <button
                type="button"
                onClick={() => navigate("/admin/offers")}
              >
                <span className="quick-icon">◫</span>

                <div>
                  <strong>Create Offer</strong>
                  <small>Add a new resort offer</small>
                </div>

                <span className="quick-arrow">→</span>
              </button>

              {/* SETTINGS */}
              <button
                type="button"
                onClick={() => navigate("/admin/settings")}
              >
                <span className="quick-icon">⚙</span>

                <div>
                  <strong>Settings</strong>
                  <small>Manage resort settings</small>
                </div>

                <span className="quick-arrow">→</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* TODAY'S OVERVIEW */}
        <motion.section
          className="overview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
          }}
        >
          <div className="overview-heading">
            <div>
              <span className="card-eyebrow">
                TODAY
              </span>

              <h2>Resort Overview</h2>
            </div>
          </div>

          <div className="overview-grid">
            <div className="overview-item">
              <span className="overview-icon">↘</span>

              <div>
                <strong>12</strong>
                <span>Check-ins</span>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">↗</span>

              <div>
                <strong>8</strong>
                <span>Check-outs</span>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">♨</span>

              <div>
                <strong>24</strong>
                <span>Dining Orders</span>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">✦</span>

              <div>
                <strong>17</strong>
                <span>Activities Booked</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="admin-footer">
          <span>
            © 2026 Paradise Resort
          </span>

          <span>
            Admin Management System
          </span>
        </footer>
      </main>

      {/* PAGE STYLES */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .admin-dashboard {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at top right,
              rgba(214,180,106,0.05),
              transparent 30%
            ),
            #081719;
          color: #f4efe5;
        }

        .admin-main {
          margin-left: 250px;
          min-height: 100vh;
          padding: 45px 50px;
        }

        /* HEADER */

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
        }

        .dashboard-eyebrow,
        .card-eyebrow {
          display: block;
          color: #d6b46a;
          font-size: 10px;
          letter-spacing: 3px;
          margin-bottom: 10px;
        }

        .dashboard-header h1 {
          margin: 0;
          font-size: 38px;
          font-weight: 400;
          letter-spacing: -1px;
        }

        .dashboard-header p {
          margin: 10px 0 0;
          color: #718183;
          font-size: 14px;
        }

        .admin-date {
          text-align: right;
          color: #718183;
          font-size: 12px;
        }

        .admin-date strong {
          display: block;
          margin-top: 6px;
          color: #d9d2c5;
          font-size: 13px;
          font-weight: 400;
        }

        /* STATS */

        .stats-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 25px;
        }

        .stat-card {
          padding: 25px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 6px;
          transition: 0.3s ease;
        }

        .stat-card:hover {
          border-color: rgba(214,180,106,0.3);
          transform: translateY(-2px);
        }

        .stat-title {
          color: #718183;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .stat-value {
          margin: 15px 0;
          color: #f4efe5;
          font-size: 30px;
          font-weight: 400;
        }

        .stat-bottom {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stat-change {
          color: #9dbb9d;
          font-size: 11px;
        }

        .stat-label {
          color: #596b6d;
          font-size: 10px;
        }

        /* DASHBOARD GRID */

        .dashboard-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 2fr)
            minmax(280px, 1fr);
          gap: 25px;
          margin-bottom: 25px;
        }

        .dashboard-card,
        .overview-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 6px;
        }

        .dashboard-card {
          padding: 28px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .card-header h2,
        .overview-heading h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 400;
        }

        .view-all-button {
          border: none;
          background: transparent;
          color: #d6b46a;
          font-size: 11px;
          cursor: pointer;
        }

        .view-all-button:hover {
          color: #f0d79d;
        }

        /* TABLE */

        .booking-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .booking-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 650px;
        }

        .booking-table th {
          padding: 12px 10px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          color: #596b6d;
          font-size: 8px;
          letter-spacing: 1.5px;
          text-align: left;
          font-weight: 400;
        }

        .booking-table td {
          padding: 15px 10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: #aab5b5;
          font-size: 11px;
        }

        .booking-id {
          color: #d6b46a !important;
        }

        .room-name {
          color: #d9d2c5 !important;
        }

        .status {
          display: inline-block;
          padding: 5px 8px;
          border-radius: 3px;
          font-size: 8px;
          letter-spacing: 0.5px;
        }

        .status-confirmed {
          color: #a8c8ad;
          background: rgba(100,160,110,0.1);
        }

        .status-pending {
          color: #d6b46a;
          background: rgba(214,180,106,0.1);
        }

        .status-completed {
          color: #8fa5ad;
          background: rgba(120,150,160,0.1);
        }

        /* QUICK ACTIONS */

        .quick-actions {
          display: flex;
          flex-direction: column;
        }

        .quick-actions button {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 15px 0;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          color: #aab5b5;
          text-align: left;
          cursor: pointer;
        }

        .quick-actions button:last-child {
          border-bottom: none;
        }

        .quick-actions button:hover {
          color: #d9d2c5;
        }

        .quick-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(214,180,106,0.2);
          border-radius: 4px;
          color: #d6b46a;
          flex-shrink: 0;
        }

        .quick-actions button div {
          flex: 1;
        }

        .quick-actions strong {
          display: block;
          color: #d9d2c5;
          font-size: 11px;
          font-weight: 400;
        }

        .quick-actions small {
          display: block;
          margin-top: 4px;
          color: #596b6d;
          font-size: 9px;
        }

        .quick-arrow {
          color: #596b6d;
          transition: 0.2s ease;
        }

        .quick-actions button:hover .quick-arrow {
          color: #d6b46a;
          transform: translateX(3px);
        }

        /* OVERVIEW */

        .overview-card {
          padding: 28px;
          margin-bottom: 30px;
        }

        .overview-heading {
          margin-bottom: 25px;
        }

        .overview-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 15px;
        }

        .overview-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px;
          background: rgba(255,255,255,0.018);
          border-radius: 4px;
        }

        .overview-icon {
          color: #d6b46a;
          font-size: 18px;
        }

        .overview-item strong {
          display: block;
          color: #f4efe5;
          font-size: 20px;
          font-weight: 400;
        }

        .overview-item div span {
          display: block;
          margin-top: 4px;
          color: #596b6d;
          font-size: 9px;
        }

        /* FOOTER */

        .admin-footer {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          color: #465759;
          font-size: 9px;
          letter-spacing: 0.5px;
        }

        /* TABLET */

        @media (max-width: 1100px) {
          .admin-main {
            margin-left: 210px;
            padding: 35px 30px;
          }

          .stats-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .overview-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }

        /* MOBILE */

        @media (max-width: 700px) {
          .admin-main {
            margin-left: 0;
            padding: 25px 18px;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .dashboard-header h1 {
            font-size: 30px;
          }

          .admin-date {
            text-align: left;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-card,
          .overview-card {
            padding: 20px;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .admin-footer {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}