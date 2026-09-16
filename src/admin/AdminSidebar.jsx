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
    navigate(path);
  };

  return (
    <aside className="admin-sidebar">

      {/* LOGO */}
      <div className="admin-logo">
        <span>PARADISE</span>
        <strong>RESORT</strong>
      </div>

      {/* NAVIGATION */}
      <nav className="admin-nav">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              className={`admin-side-link ${
                isActive ? "active" : ""
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <button
        type="button"
        className="logout-button"
        onClick={() => navigate("/admin")}
      >
        <span>↪</span>
        Logout
      </button>

      <style>{`
        .admin-sidebar {
          width: 250px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          padding: 35px 20px;
          border-right: 1px solid rgba(255,255,255,0.08);
          background: rgba(4,15,17,0.96);
          z-index: 1000;
        }

        .admin-logo {
          text-align: center;
          margin-bottom: 50px;
          letter-spacing: 3px;
        }

        .admin-logo span {
          display: block;
          color: #d6b46a;
          font-size: 15px;
        }

        .admin-logo strong {
          display: block;
          color: #f4efe5;
          font-size: 9px;
          letter-spacing: 5px;
          margin-top: 5px;
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .admin-side-link {
  width: 100%;
  border: none;
  background: transparent;
  color: #829294;
  padding: 13px 15px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  border-radius: 4px;
  transition: all 0.25s ease;
}

        .admin-side-link span {
          width: 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .admin-side-link:hover {
          background: rgba(214,180,106,0.08);
          color: #d6b46a;
        }

        .admin-side-link.active {
          background: rgba(214,180,106,0.12);
          color: #d6b46a;
        }

        .logout-button {
          width: 100%;
          margin-top: auto;
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: #829294;
          padding: 22px 15px 0;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          text-align: left;
          font-size: 13px;
        }

        .logout-button span {
          width: 20px;
          text-align: center;
        }

        .logout-button:hover {
          color: #d6b46a;
        }

        @media (max-width: 700px) {
          .admin-sidebar {
            position: relative;
            width: 100%;
            min-height: auto;
            padding: 20px;
          }

          .admin-logo {
            margin-bottom: 20px;
          }

          .admin-nav {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }

          .logout-button {
            margin-top: 15px;
          }
        }

        @media (max-width: 430px) {
          .admin-nav {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

    </aside>
  );
}