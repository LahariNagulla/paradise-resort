import { useState } from "react";
import { motion } from "motion/react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (
      email === "admin@paradiseresort.com" &&
      password === "resort123"
    ) {
      window.location.href = "/admin/dashboard";
    } else {
      setError("Invalid admin email or password.");
    }
  };

  return (
    <div
      className="admin-login-page"
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #06171b, #0b2529, #06161a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "#f5f0e7",
        boxSizing: "border-box",
      }}
    >
      <motion.div
        className="admin-login-card"
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "rgba(255,255,255,0.035)",
          border:
            "1px solid rgba(214,180,106,0.28)",
          padding: "45px",
          boxSizing: "border-box",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* ================= LOGO ================= */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "38px",
          }}
        >
          <div
            style={{
              color: "#d6b46a",
              fontSize: "11px",
              letterSpacing: "4px",
              marginBottom: "14px",
            }}
          >
            PARADISE RESORT
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "400",
              letterSpacing: "-0.5px",
            }}
          >
            Admin Portal
          </h1>

          <p
            style={{
              marginTop: "12px",
              marginBottom: 0,
              color: "#89999c",
              fontSize: "13px",
            }}
          >
            Manage your resort operations
          </p>
        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            style={{
              padding: "12px",
              marginBottom: "20px",
              border:
                "1px solid rgba(220,80,80,0.35)",
              background:
                "rgba(220,80,80,0.08)",
              color: "#f0a5a5",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            {error}
          </motion.div>
        )}

        {/* ================= LOGIN FORM ================= */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <label
            style={{
              display: "block",
              color: "#d6b46a",
              fontSize: "10px",
              letterSpacing: "2px",
              marginBottom: "9px",
            }}
          >
            ADMIN EMAIL
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="admin@paradiseresort.com"
            autoComplete="email"
            style={inputStyle}
          />

          {/* PASSWORD */}

          <label
            style={{
              display: "block",
              color: "#d6b46a",
              fontSize: "10px",
              letterSpacing: "2px",
              marginTop: "22px",
              marginBottom: "9px",
            }}
          >
            PASSWORD
          </label>

          <div
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              autoComplete="current-password"
              style={{
                ...inputStyle,
                paddingRight: "60px",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                border: "none",
                background: "transparent",
                color: "#d6b46a",
                cursor: "pointer",
                fontSize: "10px",
                letterSpacing: "1px",
              }}
            >
              {showPassword
                ? "HIDE"
                : "SHOW"}
            </button>
          </div>

          {/* LOGIN BUTTON */}

          <motion.button
            type="submit"
            whileHover={{
              y: -2,
              scale: 1.01,
              boxShadow:
                "0 12px 30px rgba(214,180,106,0.18)",
            }}
            whileTap={{
              scale: 0.98,
            }}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "16px",
              border:
                "1px solid #d6b46a",
              background: "#d6b46a",
              color: "#071b20",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "2px",
              cursor: "pointer",
            }}
          >
            SIGN IN
          </motion.button>
        </form>

        {/* ================= FOOTER ================= */}

        <div
          style={{
            marginTop: "28px",
            paddingTop: "20px",
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
            color: "#69797c",
            fontSize: "10px",
          }}
        >
          Paradise Resort · Administration
        </div>
      </motion.div>

      {/* ================= RESPONSIVE ================= */}

      <style>
        {`
          @media (max-width: 500px) {
            .admin-login-page {
              padding: 16px !important;
            }

            .admin-login-card {
              padding: 30px 22px !important;
            }
          }

          @media (max-width: 360px) {
            .admin-login-card {
              padding: 25px 18px !important;
            }

            .admin-login-card h1 {
              font-size: 27px !important;
            }
          }
        `}
      </style>
    </div>
  );
}


/* ================= INPUT STYLE ================= */

const inputStyle = {
  width: "100%",
  height: "48px",
  padding: "0 14px",
  boxSizing: "border-box",
  border:
    "1px solid rgba(255,255,255,0.12)",
  background:
    "rgba(255,255,255,0.04)",
  color: "#f5f0e7",
  outline: "none",
  fontSize: "13px",
};