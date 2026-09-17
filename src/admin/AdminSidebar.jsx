import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  /* =========================================
     MOBILE SIDEBAR TOGGLE
  ========================================= */

  useEffect(() => {
    const handleToggle = () => {
      setIsMobileOpen((previous) => !previous);
    };

    window.addEventListener(
      "toggle-admin-sidebar",
      handleToggle
    );

    return () => {
      window.removeEventListener(
        "toggle-admin-sidebar",
        handleToggle
      );
    };
  }, []);

  /* =========================================
     CLOSE SIDEBAR AFTER NAVIGATION
  ========================================= */

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  /* =========================================
     PREVENT BODY SCROLL WHEN MENU OPEN
  ========================================= */

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  /* =========================================
     NAVIGATION
  ========================================= */

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    setIsMobileOpen(false);
    navigate("/admin");
  };

  return (
    <>
      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}

      <div
        className={`admin-sidebar-overlay ${
          isMobileOpen ? "show" : ""
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`admin-sidebar ${
          isMobileOpen ? "mobile-open" : ""
        }`}
      >

        {/* ===================================
            MOBILE CLOSE BUTTON
        =================================== */}

        <button
          type="button"
          className="sidebar-close-button"
          aria-label="Close menu"
          onClick={() => setIsMobileOpen(false)}
        >
          ×
        </button>

        {/* ===================================
            LOGO
        =================================== */}

        <div className="admin-logo">
          <span>PARADISE</span>
          <strong>RESORT</strong>
        </div>

        {/* ===================================
            NAVIGATION
        =================================== */}

        <nav className="admin-nav">
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.path}
                type="button"
                className={`admin-side-link ${
                  isActive ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation(item.path)
                }
              >
                <span className="side-icon">
                  {item.icon}
                </span>

                <span className="side-label">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ===================================
            LOGOUT
        =================================== */}

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          <span className="logout-icon">↪</span>

          <span>Logout</span>
        </button>
      </aside>

      {/* =====================================
          SIDEBAR STYLES
      ===================================== */}

      <style>{`

        /* =====================================
           SIDEBAR
        ===================================== */

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

          border-right:
            1px solid rgba(255,255,255,0.08);

          background:
            rgba(4,15,17,0.98);

          z-index: 1000;

          overflow-y: auto;

          scrollbar-width: thin;
        }

        /* =====================================
           LOGO
        ===================================== */

        .admin-logo {
          text-align: center;

          margin-bottom: 50px;

          letter-spacing: 3px;

          flex-shrink: 0;
        }

        .admin-logo span {
          display: block;

          color: #d6b46a;

          font-size: 15px;

          letter-spacing: 3px;
        }

        .admin-logo strong {
          display: block;

          color: #f4efe5;

          font-size: 9px;

          letter-spacing: 5px;

          margin-top: 5px;
        }

        /* =====================================
           NAVIGATION
        ===================================== */

        .admin-nav {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }

        .admin-side-link {
          width: 100%;

          min-height: 46px;

          border: none;

          background: transparent;

          color: #829294;

          padding: 11px 15px;

          display: flex;

          align-items: center;

          gap: 14px;

          cursor: pointer;

          text-align: left;

          font-size: 14px;

          border-radius: 4px;

          transition:
            background 0.25s ease,
            color 0.25s ease,
            transform 0.2s ease;

          touch-action: manipulation;
        }

        .side-icon {
          width: 20px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          font-size: 15px;

          line-height: 1;
        }

        .side-label {
          flex: 1;

          min-width: 0;
        }

        .admin-side-link:hover {
          background:
            rgba(214,180,106,0.08);

          color: #d6b46a;

          transform:
            translateX(2px);
        }

        .admin-side-link.active {
          background:
            rgba(214,180,106,0.12);

          color: #d6b46a;
        }

        /* =====================================
           LOGOUT
        ===================================== */

        .logout-button {
          width: 100%;

          min-height: 46px;

          margin-top: auto;

          border: none;

          border-top:
            1px solid rgba(255,255,255,0.08);

          background: transparent;

          color: #829294;

          padding: 22px 15px 0;

          display: flex;

          align-items: center;

          gap: 14px;

          cursor: pointer;

          text-align: left;

          font-size: 13px;

          transition: color 0.25s ease;

          touch-action: manipulation;
        }

        .logout-icon {
          width: 20px;

          display: flex;

          justify-content: center;

          flex-shrink: 0;
        }

        .logout-button:hover {
          color: #d6b46a;
        }

        /* =====================================
           CLOSE BUTTON
        ===================================== */

        .sidebar-close-button {
          display: none;

          position: absolute;

          top: 14px;

          right: 14px;

          width: 44px;
          height: 44px;

          border:
            1px solid rgba(214,180,106,0.2);

          border-radius: 5px;

          background:
            rgba(255,255,255,0.025);

          color: #d6b46a;

          font-size: 26px;

          font-weight: 300;

          line-height: 1;

          cursor: pointer;

          align-items: center;

          justify-content: center;

          touch-action: manipulation;
        }

        /* =====================================
           OVERLAY
        ===================================== */

        .admin-sidebar-overlay {
          display: none;

          position: fixed;

          inset: 0;

          background:
            rgba(0,0,0,0.62);

          backdrop-filter:
            blur(3px);

          -webkit-backdrop-filter:
            blur(3px);

          z-index: 999;

          opacity: 0;

          pointer-events: none;

          transition:
            opacity 0.3s ease;
        }

        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 1200px) {

          .admin-sidebar {
            width: 220px;

            padding:
              30px 16px;
          }

          .admin-logo {
            margin-bottom: 40px;
          }

          .admin-side-link {
            font-size: 13px;

            padding:
              11px 12px;
          }
        }

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 700px) {

          .admin-sidebar {
            width: min(290px, 82vw);

            min-height: 100vh;

            height: 100vh;

            left: 0;

            top: 0;
            bottom: 0;

            padding:
              25px 18px;

            border-right:
              1px solid rgba(214,180,106,0.15);

            transform:
              translateX(-105%);

            transition:
              transform 0.3s ease;

            box-shadow:
              15px 0 50px rgba(0,0,0,0.35);

            overflow-y: auto;

            z-index: 1200;
          }

          .admin-sidebar.mobile-open {
            transform:
              translateX(0);
          }

          /* LOGO */

          .admin-logo {
            text-align: left;

            margin:
              10px 45px 35px 5px;

            padding-bottom: 20px;

            border-bottom:
              1px solid rgba(255,255,255,0.06);
          }

          .admin-logo span {
            font-size: 14px;
          }

          .admin-logo strong {
            font-size: 8px;

            letter-spacing: 4px;
          }

          /* NAV */

          .admin-nav {
            gap: 5px;
          }

          .admin-side-link {
            min-height: 48px;

            padding:
              12px 13px;

            font-size: 14px;

            border-radius: 5px;
          }

          .admin-side-link:hover {
            transform: none;
          }

          .side-icon {
            width: 22px;

            font-size: 16px;
          }

          /* LOGOUT */

          .logout-button {
            min-height: 48px;

            margin-top: auto;

            padding:
              20px 13px 5px;

            font-size: 13px;
          }

          /* CLOSE */

          .sidebar-close-button {
            display: flex;
          }

          /* OVERLAY */

          .admin-sidebar-overlay {
            display: block;
          }

          .admin-sidebar-overlay.show {
            opacity: 1;

            pointer-events: auto;
          }
        }

        /* =====================================
           SMALL PHONES
        ===================================== */

        @media (max-width: 400px) {

          .admin-sidebar {
            width: 86vw;

            padding:
              22px 15px;
          }

          .admin-logo {
            margin-bottom: 28px;
          }

          .admin-side-link {
            min-height: 47px;

            font-size: 13px;
          }
        }

        /* =====================================
           ACCESSIBILITY
        ===================================== */

        .admin-side-link:focus-visible,
        .logout-button:focus-visible,
        .sidebar-close-button:focus-visible {
          outline:
            2px solid #d6b46a;

          outline-offset: 3px;
        }

        /* =====================================
           REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {

          .admin-sidebar,
          .admin-sidebar-overlay,
          .admin-side-link,
          .logout-button {
            transition: none;
          }
        }

      `}</style>
    </>
  );
}