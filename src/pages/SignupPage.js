import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // ✅ reuse same CSS

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim()
    };

    if (!userData.name || !userData.email || !userData.password) {
      alert("Please fill all fields ❗");
      return;
    }

    fetch("https://herbal-backend-6oh6.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Signup failed");
        return res.text();
      })
      .then(() => {
        alert("Signup successful 🎉");
        navigate("/login");
      })
      .catch(() => alert("Signup failed ❌"));
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2> Create Account</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Signup</button>

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