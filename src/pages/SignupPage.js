import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = () => {
    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim()
    };

    // ✅ VALIDATION
    if (!userData.name || !userData.email || !userData.password) {
      alert("Please fill all fields ❗");
      return;
    }

    setLoading(true);

    fetch("https://herbal-backend-6oh6.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(async (res) => {
        const text = await res.text(); // 🔥 get backend message

        if (!res.ok) {
          throw new Error(text || "Signup failed");
        }

        return text;
      })
      .then(() => {
        alert("Signup successful 🎉");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Signup error:", err.message);
        alert(err.message || "Signup failed ❌");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Create Account</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup} disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default SignupPage;