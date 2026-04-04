import { useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  // 🌿 Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
   fetch("https://herbal-backend-6oh6.onrender.com/api/plants")
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  const filteredPlants = plants.filter(p =>
    p.common_name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "" || p.category === filter)
  );

  // 🌿 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container">

      {/* 🌿 HEADER */}
      <div className="header">
        <div>
          <h1> Virtual Herbal Garden for AYUSH.</h1>
          <p>Welcome to the land of plants, {user?.name} </p>
        </div>

        {/* 🔥 RIGHT SIDE BUTTONS */}
        <div style={{ display: "flex", gap: "10px" }}>

          {/* 🔥 ADMIN BUTTON (ONLY FOR ADMIN) */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              style={{
                background: "#1b5e20",
                borderRadius: "20px"
              }}
            >
              Admin Panel
            </button>
          )}

          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* 🌿 HERO SECTION */}
      <div className="hero">
        <h1>Virtual Herbal Garden</h1>
        <p>Discover the healing power of plants </p>
      </div>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search plants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* 🔘 FILTER */}
      <div className="filters">
  <button onClick={() => setFilter("")}>All</button>

  <button onClick={() => setFilter("Immunity")}>Immunity</button>
  <button onClick={() => setFilter("Skin Care")}>Skin Care</button>

  {/* 🔥 NEW FILTERS */}
  <button onClick={() => setFilter("Respiratory")}>Respiratory</button>
  <button onClick={() => setFilter("Digestive")}>Digestive</button>
  <button onClick={() => setFilter("Hair Care")}>Hair Care</button>
</div>

      {/* 🌿 ACTION BUTTONS */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => navigate("/garden")}>
           My Garden
        </button>
      </div>

      {/* 🌿 GRID */}
      <div className="grid">
        {filteredPlants.map(p => (
          <div
            className="card"
            key={p.id}
            onClick={() => navigate(`/plant/${p.id}`)}
          >
            <img src={p.image_url} alt="" />
            <h3>{p.common_name}</h3>
            <p>{p.scientific_name}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default HomePage;