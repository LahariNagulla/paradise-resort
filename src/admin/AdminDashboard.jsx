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

        {/* MOBILE TOP BAR */}
        <div className="mobile-admin-bar">
          <div className="mobile-brand">
            <span className="mobile-brand-mark">P</span>

            <div>
              <strong>PARADISE</strong>
              <small>ADMIN</small>
            </div>
          </div>

          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Open admin menu"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("toggle-admin-sidebar")
              );
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

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
                onClick={() =>
                  navigate("/admin/bookings")
                }
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

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/bookings")
                }
              >
                <span className="quick-icon">
                  ＋
                </span>

                <div>
                  <strong>New Booking</strong>
                  <small>
                    Create a reservation
                  </small>
                </div>

                <span className="quick-arrow">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/rooms")
                }
              >
                <span className="quick-icon">
                  ▤
                </span>

                <div>
                  <strong>Manage Rooms</strong>
                  <small>
                    Update room availability
                  </small>
                </div>

                <span className="quick-arrow">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/offers")
                }
              >
                <span className="quick-icon">
                  ◫
                </span>

                <div>
                  <strong>Create Offer</strong>
                  <small>
                    Add a new resort offer
                  </small>
                </div>

                <span className="quick-arrow">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/settings")
                }
              >
                <span className="quick-icon">
                  ⚙
                </span>

                <div>
                  <strong>Settings</strong>
                  <small>
                    Manage resort settings
                  </small>
                </div>

                <span className="quick-arrow">
                  →
                </span>
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
              <span className="overview-icon">
                ↘
              </span>

              <div>
                <strong>12</strong>
                <span>Check-ins</span>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">
                ↗
              </span>

              <div>
                <strong>8</strong>
                <span>Check-outs</span>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">
                ♨
              </span>

              <div>
                <strong>24</strong>
                <span>Dining Orders</span>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">
                ✦
              </span>

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

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          overflow-x: hidden;
        }

        button {
          font-family: inherit;
        }

        /* ================================
           MAIN DASHBOARD
        ================================= */

        .admin-dashboard {
          position: relative;
          width: 100%;
          min-height: 100vh;

          background:
            radial-gradient(
              circle at top right,
              rgba(214, 180, 106, 0.05),
              transparent 30%
            ),
            #081719;

          color: #f4efe5;

          overflow-x: hidden;
        }

        .admin-main {
          width: calc(100% - 250px);

          margin-left: 250px;

          min-height: 100vh;

          padding: 45px 50px;
        }

        /* ================================
           MOBILE TOP BAR
        ================================= */

        .mobile-admin-bar {
          display: none;
        }

        /* ================================
           HEADER
        ================================= */

        .dashboard-header {
          display: flex;

          justify-content: space-between;
          align-items: flex-end;

          gap: 30px;

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

          line-height: 1.6;
        }

        .admin-date {
          flex-shrink: 0;

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

        /* ================================
           STATS
        ================================= */

        .stats-grid {
          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 18px;

          margin-bottom: 25px;
        }

        .stat-card {
          min-width: 0;

          padding: 25px;

          background:
            rgba(255, 255, 255, 0.025);

          border:
            1px solid rgba(255, 255, 255, 0.07);

          border-radius: 6px;

          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
        }

        .stat-card:hover {
          border-color:
            rgba(214, 180, 106, 0.3);

          transform:
            translateY(-2px);
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

          line-height: 1.1;

          overflow-wrap: anywhere;
        }

        .stat-bottom {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

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

        /* ================================
           DASHBOARD GRID
        ================================= */

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
          min-width: 0;

          background:
            rgba(255, 255, 255, 0.025);

          border:
            1px solid rgba(255, 255, 255, 0.07);

          border-radius: 6px;
        }

        .dashboard-card {
          padding: 28px;
        }

        /* ================================
           CARD HEADER
        ================================= */

        .card-header {
          display: flex;

          justify-content: space-between;

          align-items: flex-start;

          gap: 20px;

          margin-bottom: 25px;
        }

        .card-header h2,
        .overview-heading h2 {
          margin: 0;

          color: #f4efe5;

          font-size: 20px;

          font-weight: 400;
        }

        .view-all-button {
          min-height: 44px;

          padding: 8px 0;

          border: none;

          background: transparent;

          color: #d6b46a;

          font-size: 11px;

          cursor: pointer;

          white-space: nowrap;

          touch-action: manipulation;

          transition: color 0.2s ease;
        }

        .view-all-button:hover {
          color: #f0d79d;
        }

        .view-all-button:focus-visible,
        .quick-actions button:focus-visible,
        .mobile-menu-button:focus-visible {
          outline: 2px solid #d6b46a;

          outline-offset: 3px;
        }

        /* ================================
           TABLE
        ================================= */

        .booking-table-wrapper {
          width: 100%;

          overflow-x: auto;

          overflow-y: hidden;

          -webkit-overflow-scrolling: touch;

          scrollbar-width: thin;
        }

        .booking-table {
          width: 100%;

          min-width: 650px;

          border-collapse: collapse;
        }

        .booking-table th {
          padding: 12px 10px;

          border-bottom:
            1px solid rgba(255, 255, 255, 0.07);

          color: #596b6d;

          font-size: 8px;

          letter-spacing: 1.5px;

          text-align: left;

          font-weight: 400;

          white-space: nowrap;
        }

        .booking-table td {
          padding: 15px 10px;

          border-bottom:
            1px solid rgba(255, 255, 255, 0.05);

          color: #aab5b5;

          font-size: 11px;

          white-space: nowrap;
        }

        .booking-table tbody tr:last-child td {
          border-bottom: none;
        }

        .booking-id {
          color: #d6b46a !important;
        }

        .room-name {
          color: #d9d2c5 !important;
        }

        .status {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          min-height: 26px;

          padding: 5px 8px;

          border-radius: 3px;

          font-size: 8px;

          letter-spacing: 0.5px;

          white-space: nowrap;
        }

        .status-confirmed {
          color: #a8c8ad;

          background:
            rgba(100, 160, 110, 0.1);
        }

        .status-pending {
          color: #d6b46a;

          background:
            rgba(214, 180, 106, 0.1);
        }

        .status-completed {
          color: #8fa5ad;

          background:
            rgba(120, 150, 160, 0.1);
        }

        /* ================================
           QUICK ACTIONS
        ================================= */

        .quick-actions {
          display: flex;

          flex-direction: column;
        }

        .quick-actions button {
          display: flex;

          align-items: center;

          gap: 14px;

          width: 100%;

          min-height: 60px;

          padding: 12px 0;

          border: none;

          border-bottom:
            1px solid rgba(255, 255, 255, 0.06);

          background: transparent;

          color: #aab5b5;

          text-align: left;

          cursor: pointer;

          touch-action: manipulation;

          transition: color 0.2s ease;
        }

        .quick-actions button:last-child {
          border-bottom: none;
        }

        .quick-actions button:hover {
          color: #d9d2c5;
        }

        .quick-icon {
          width: 38px;
          height: 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border:
            1px solid rgba(214, 180, 106, 0.2);

          border-radius: 4px;

          color: #d6b46a;

          font-size: 16px;
        }

        .quick-actions button div {
          flex: 1;

          min-width: 0;
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

          line-height: 1.4;
        }

        .quick-arrow {
          flex-shrink: 0;

          color: #596b6d;

          transition: transform 0.2s ease,
            color 0.2s ease;
        }

        .quick-actions button:hover .quick-arrow {
          color: #d6b46a;

          transform:
            translateX(3px);
        }

        /* ================================
           OVERVIEW
        ================================= */

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
            repeat(4, minmax(0, 1fr));

          gap: 15px;
        }

        .overview-item {
          display: flex;

          align-items: center;

          gap: 14px;

          min-width: 0;

          padding: 18px;

          background:
            rgba(255, 255, 255, 0.018);

          border-radius: 4px;
        }

        .overview-icon {
          flex-shrink: 0;

          color: #d6b46a;

          font-size: 18px;
        }

        .overview-item div {
          min-width: 0;
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

          white-space: nowrap;
        }

        /* ================================
           FOOTER
        ================================= */

        .admin-footer {
          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 15px;

          padding: 20px 0;

          color: #465759;

          font-size: 9px;

          letter-spacing: 0.5px;
        }

        /* ================================
           LARGE TABLET
        ================================= */

        @media (max-width: 1050px) {

          .admin-main {
            width: calc(100% - 220px);

            margin-left: 220px;

            padding:
              40px 32px;
          }

          .stats-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .overview-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        /* ================================
           TABLET
        ================================= */

        @media (max-width: 900px) {

          .admin-main {
            width: calc(100% - 210px);

            margin-left: 210px;

            padding:
              32px 24px;
          }

          .dashboard-header {
            align-items: flex-start;
          }

          .dashboard-header h1 {
            font-size: 34px;
          }

          .stats-grid {
            gap: 14px;
          }

          .stat-card {
            padding: 20px;
          }

          .dashboard-card,
          .overview-card {
            padding: 24px;
          }
        }

        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 700px) {

          .admin-dashboard {
            min-height: 100svh;
          }

          .admin-main {
            width: 100%;

            margin-left: 0;

            padding:
              0 16px 20px;
          }

          /* MOBILE NAV BAR */

          .mobile-admin-bar {
            position: sticky;

            top: 0;

            z-index: 100;

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 15px;

            width: calc(100% + 32px);

            margin-left: -16px;

            padding:
              12px 16px;

            background:
              rgba(8, 23, 25, 0.96);

            border-bottom:
              1px solid rgba(255, 255, 255, 0.07);

            backdrop-filter: blur(14px);

            -webkit-backdrop-filter: blur(14px);
          }

          .mobile-brand {
            display: flex;

            align-items: center;

            gap: 10px;

            min-width: 0;
          }

          .mobile-brand-mark {
            display: flex;

            align-items: center;

            justify-content: center;

            width: 34px;
            height: 34px;

            flex-shrink: 0;

            border:
              1px solid rgba(214, 180, 106, 0.4);

            border-radius: 50%;

            color: #d6b46a;

            font-family: Georgia, serif;

            font-size: 17px;
          }

          .mobile-brand strong {
            display: block;

            color: #e7dfd0;

            font-size: 11px;

            font-weight: 500;

            letter-spacing: 2px;
          }

          .mobile-brand small {
            display: block;

            margin-top: 2px;

            color: #596b6d;

            font-size: 7px;

            letter-spacing: 2px;
          }

          .mobile-menu-button {
            display: flex;

            flex-direction: column;

            justify-content: center;

            align-items: center;

            gap: 4px;

            width: 44px;
            height: 44px;

            flex-shrink: 0;

            padding: 0;

            border:
              1px solid rgba(214, 180, 106, 0.22);

            border-radius: 5px;

            background:
              rgba(255, 255, 255, 0.025);

            cursor: pointer;

            touch-action: manipulation;
          }

          .mobile-menu-button span {
            display: block;

            width: 18px;

            height: 1px;

            background: #d6b46a;

            transition:
              transform 0.2s ease;
          }

          /* HEADER */

          .dashboard-header {
            flex-direction: column;

            align-items: flex-start;

            gap: 18px;

            margin:
              28px 0 25px;
          }

          .dashboard-eyebrow,
          .card-eyebrow {
            font-size: 8px;

            letter-spacing: 2.5px;

            margin-bottom: 8px;
          }

          .dashboard-header h1 {
            font-size: 30px;

            line-height: 1.1;
          }

          .dashboard-header p {
            max-width: 330px;

            margin-top: 8px;

            font-size: 12px;

            line-height: 1.6;
          }

          .admin-date {
            text-align: left;

            font-size: 11px;
          }

          .admin-date strong {
            font-size: 12px;
          }

          /* STATS */

          .stats-grid {
            grid-template-columns: 1fr;

            gap: 10px;

            margin-bottom: 16px;
          }

          .stat-card {
            padding: 18px;

            border-radius: 6px;
          }

          .stat-title {
            font-size: 8px;

            letter-spacing: 1.7px;
          }

          .stat-value {
            margin: 11px 0;

            font-size: 27px;
          }

          /* DASHBOARD */

          .dashboard-grid {
            grid-template-columns: 1fr;

            gap: 16px;

            margin-bottom: 16px;
          }

          .dashboard-card,
          .overview-card {
            width: 100%;

            padding: 18px;

            border-radius: 6px;
          }

          .card-header {
            align-items: center;

            gap: 12px;

            margin-bottom: 18px;
          }

          .card-header h2,
          .overview-heading h2 {
            font-size: 18px;
          }

          .view-all-button {
            font-size: 10px;
          }

          /* TABLE */

          .booking-table-wrapper {
            margin-right: -18px;

            width:
              calc(100% + 18px);

            padding-bottom: 3px;
          }

          .booking-table {
            min-width: 600px;
          }

          .booking-table th {
            padding:
              10px 8px;

            font-size: 7px;
          }

          .booking-table td {
            padding:
              13px 8px;

            font-size: 10px;
          }

          /* QUICK ACTIONS */

          .quick-actions button {
            min-height: 64px;

            gap: 12px;
          }

          .quick-icon {
            width: 36px;
            height: 36px;

            font-size: 15px;
          }

          .quick-actions strong {
            font-size: 11px;
          }

          .quick-actions small {
            font-size: 8px;
          }

          /* OVERVIEW */

          .overview-card {
            margin-bottom: 20px;
          }

          .overview-heading {
            margin-bottom: 18px;
          }

          .overview-grid {
            grid-template-columns: 1fr 1fr;

            gap: 8px;
          }

          .overview-item {
            min-height: 72px;

            padding: 13px;

            gap: 10px;
          }

          .overview-icon {
            font-size: 15px;
          }

          .overview-item strong {
            font-size: 18px;
          }

          .overview-item div span {
            font-size: 8px;

            white-space: normal;

            line-height: 1.3;
          }

          /* FOOTER */

          .admin-footer {
            flex-direction: column;

            align-items: flex-start;

            gap: 7px;

            padding:
              15px 0 5px;

            font-size: 8px;
          }
        }

        /* ================================
           SMALL PHONES
        ================================= */

        @media (max-width: 400px) {

          .admin-main {
            padding-left: 12px;

            padding-right: 12px;
          }

          .mobile-admin-bar {
            width:
              calc(100% + 24px);

            margin-left: -12px;

            padding:
              11px 12px;
          }

          .dashboard-header {
            margin-top: 24px;
          }

          .dashboard-header h1 {
            font-size: 27px;
          }

          .dashboard-header p {
            font-size: 11px;
          }

          .stat-card,
          .dashboard-card,
          .overview-card {
            padding: 16px;
          }

          .stat-value {
            font-size: 25px;
          }

          .card-header h2,
          .overview-heading h2 {
            font-size: 17px;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .overview-item {
            min-height: 65px;
          }

          .booking-table-wrapper {
            margin-right: -16px;

            width:
              calc(100% + 16px);
          }
        }

        /* ================================
           REDUCE MOTION
        ================================= */

        @media (prefers-reduced-motion: reduce) {

          .stat-card,
          .quick-actions button,
          .quick-arrow,
          .view-all-button {
            transition: none;
          }
        }

      `}</style>
    </div>
  );
}