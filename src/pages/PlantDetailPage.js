import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PlantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plant, setPlant] = useState(null);

  useEffect(() => {
    fetch(`https://herbal-backend-6oh6.onrender.com/api/plants/${id}`)
      .then(res => res.json())
      .then(data => setPlant(data))
      .catch(() => setPlant(null));
  }, [id]);

  // 🌿 BOOKMARK FUNCTION
  const handleBookmark = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first ❌");
      return;
    }

    fetch("https://herbal-backend-6oh6.onrender.com/api/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        plant_id: plant.id
      })
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
      })
      .catch(err => {
        console.log(err);
        alert("Error adding plant ❌");
      });
  };

  if (!plant) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ padding: "30px" }}>

      {/* 🌿 IMAGE */}
      <img
        src={`${window.location.origin}${plant.image_url}`}
        alt={plant.common_name}
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "block",
          margin: "auto",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
        }}
      />

      {/* 🌿 NAME */}
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        {plant.common_name}
      </h1>

      {/* 🌿 SCIENTIFIC NAME */}
      <h3 style={{
        textAlign: "center",
        fontStyle: "italic",
        color: "#2e7d32"
      }}>
        {plant.scientific_name}
      </h3>

      {/* 🌿 DETAILS */}
      <div
        style={{
          maxWidth: "800px",
          margin: "30px auto",
          background: "rgba(255,255,255,0.8)",
          padding: "20px",
          borderRadius: "15px",
          backdropFilter: "blur(6px)",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        }}
      >
        <p>
          <strong>Botanical Description:</strong><br />
          {plant.botanical_description || plant.description}
        </p>

        <p>
          <strong>Medicinal Uses:</strong><br />
          {plant.medicinal_uses || "Not available"}
        </p>

        <p>
          <strong>Benefits:</strong><br />
          {plant.benefits || "Not available"}
        </p>

        <p>
          <strong>Habitat:</strong><br />
          {plant.habitat}
        </p>
      </div>

      {/* 🌿 BUTTONS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginTop: "20px"
      }}>

        <button
          onClick={handleBookmark}
          style={{
            padding: "12px 25px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
           Add to My Garden
        </button>

        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "12px 25px",
            background: "#1b5e20",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default PlantDetailPage;