import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function MyGardenPage() {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 📥 LOAD PLANTS
  const loadPlants = useCallback(() => {
    if (!user) return;

    fetch(`https://herbal-backend-6oh6.onrender.com/api/bookmarks/${user.id}`)
      .then(res => res.json())
      .then(data => setPlants(Array.isArray(data) ? data : []))
      .catch(() => setPlants([]));
  }, [user]);

  useEffect(() => {
    loadPlants();
  }, [loadPlants]);

  // ❌ REMOVE FUNCTION
  const handleRemove = (plantId) => {
    fetch("https://herbal-backend-6oh6.onrender.com/api/bookmark", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        plant_id: plantId
      })
    })
      .then(() => {
        alert("Removed from garden ❌");
        loadPlants();
      })
      .catch(() => alert("Error removing plant"));
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔥 HEADER WITH BUTTON */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h1>🌿 My Garden</h1>

        <button
          onClick={() => navigate("/home")}
          style={{
            background: "#2e7d32",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "20px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>
      </div>

      {plants.length === 0 ? (
        <p>No plants added yet 🌱</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}
        >
          {plants.map((p) => (
            <div
              key={p.id}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "12px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                position: "relative",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/plant/${p.id}`)}
            >
              <img
                src={p.image_url}
                alt={p.common_name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />

              <h3>{p.common_name}</h3>
              <p>{p.scientific_name}</p>

              {/* ❌ REMOVE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(p.id);
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#d32f2f",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyGardenPage;