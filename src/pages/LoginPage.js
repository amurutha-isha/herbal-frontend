import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    // ✅ VALIDATION
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password ❗");
      return;
    }

    setLoading(true);

    fetch("https://herbal-backend-6oh6.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim()
      })
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Login failed");
        }
        return res.json();
      })
      .then((user) => {
        console.log("Logged in user:", user);

        // ✅ STORE USER
        localStorage.setItem("user", JSON.stringify(user));

        // 🔥 ROLE-BASED REDIRECT
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Invalid login ❌");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Virtual Herbal Garden for AYUSH</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;