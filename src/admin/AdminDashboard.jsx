import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", icon: "⌂", label: "Dashboard" },
    { path: "/admin/bookings", icon: "▣", label: "Bookings" },
    { path: "/admin/rooms", icon: "▤", label: "Rooms" },
    { path: "/admin/dining", icon: "♨", label: "Dining" },
    { path: "/admin/experiences", icon: "✦", label: "Experiences" },
    { path: "/admin/offers", icon: "◫", label: "Offers" },
    { path: "/admin/gallery", icon: "◉", label: "Gallery" },
    { path: "/admin/settings", icon: "⚙", label: "Settings" },
  ];

  const handleNavigation = (path) => {
    alert("CLICKED: " + path);
    navigate(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <span>PARADISE</span>
        <strong>RESORT</strong>
      </div>

      <nav className="admin-nav">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              className={`admin-side-link ${isActive ? "active" : ""}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        className="logout-button"
        onClick={() => {
          alert("LOGOUT CLICKED");
          navigate("/admin");
        }}
      >
        <span>↪</span>
        Logout
      </button>

      <style>{`
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 250px;
          background: #061416;
          border-right: 1px solid rgba(214, 180, 106, 0.15);
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .admin-logo {
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .admin-logo span {
          color: #d6b46a;
          font-size: 18px;
          letter-spacing: 4px;
          font-weight: 400;
        }

        .admin-logo strong {
          color: #f4efe5;
          font-size: 10px;
          letter-spacing: 5px;
          margin-top: 5px;
          font-weight: 400;
        }

        .admin-nav {
          flex: 1;
          padding: 25px 15px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .admin-side-link {
          width: 100%;
          min-height: 48px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 15px;
          border: none;
          border-radius: 4px;
          background: transparent;
          color: #718183;
          font-size: 12px;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .admin-side-link span {
          width: 20px;
          display: inline-flex;
          justify-content: center;
          color: #718183;
          font-size: 16px;
        }

        .admin-side-link:hover {
          background: rgba(214, 180, 106, 0.08);
          color: #d6b46a;
        }

        .admin-side-link:hover span {
          color: #d6b46a;
        }

        .admin-side-link.active {
          background: rgba(214, 180, 106, 0.12);
          color: #d6b46a;
        }

        .admin-side-link.active span {
          color: #d6b46a;
        }

        .logout-button {
          margin: 15px;
          min-height: 48px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 15px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          background: transparent;
          color: #718183;
          font-size: 12px;
          cursor: pointer;
          text-align: left;
          transition: all 0.25s ease;
        }

        .logout-button span {
          font-size: 16px;
        }

        .logout-button:hover {
          background: rgba(198, 124, 124, 0.08);
          color: #c67c7c;
          border-color: rgba(198, 124, 124, 0.2);
        }

        @media (max-width: 1000px) {
          .admin-sidebar {
            width: 210px;
          }
        }

        @media (max-width: 700px) {
          .admin-sidebar {
            position: relative;
            width: 100%;
            min-height: auto;
            height: auto;
          }

          .admin-logo {
            height: 80px;
          }

          .admin-nav {
            padding: 15px;
          }

          .logout-button {
            margin: 10px 15px 15px;
          }
        }
      `}</style>
    </aside>
  );
}