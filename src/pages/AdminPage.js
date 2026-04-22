import { useEffect, useState } from "react";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [plants, setPlants] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    common_name: "",
    scientific_name: "",
    image_url: "",
    category: "",
    description: "",
    botanical_description: "",
    medicinal_uses: "",
    benefits: "",
    habitat: ""
  });

  const navigate = useNavigate();

  const API = "https://herbal-backend-6oh6.onrender.com/api/plants";

  // ✅ FETCH FUNCTION (REUSABLE)
  const fetchPlants = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPlants(data);
    } catch (err) {
      console.log(err);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    fetchPlants();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD
  const handleAdd = async () => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error();

      await fetchPlants(); // 🔥 FIX: auto refresh UI

      setForm({
        common_name: "",
        scientific_name: "",
        image_url: "",
        category: "",
        description: "",
        botanical_description: "",
        medicinal_uses: "",
        benefits: "",
        habitat: ""
      });

      alert("Added ✅");

    } catch {
      alert("Error ❌");
    }
  };

  // ✅ EDIT
  const handleEdit = (plant) => {
    setForm(plant);
    setEditingId(plant.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error();

      await fetchPlants(); // 🔥 FIX: auto refresh UI

      setEditingId(null);

      setForm({
        common_name: "",
        scientific_name: "",
        image_url: "",
        category: "",
        description: "",
        botanical_description: "",
        medicinal_uses: "",
        benefits: "",
        habitat: ""
      });

      alert("Updated ✅");

    } catch {
      alert("Update failed ❌");
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });

    await fetchPlants(); // 🔥 FIX
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container">

      {/* HEADER */}
      <div className="admin-header">
        <h1>🌿 Admin Dashboard</h1>

        <div className="admin-actions">
          <button onClick={() => navigate("/home")}>← Back</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* FORM */}
      <div className="admin-form">

        <input name="common_name" placeholder="Common Name" value={form.common_name} onChange={handleChange} />
        <input name="scientific_name" placeholder="Scientific Name" value={form.scientific_name} onChange={handleChange} />

        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <textarea name="botanical_description" placeholder="Botanical Description" value={form.botanical_description} onChange={handleChange} />
        <textarea name="medicinal_uses" placeholder="Medicinal Uses" value={form.medicinal_uses} onChange={handleChange} />
        <textarea name="benefits" placeholder="Benefits" value={form.benefits} onChange={handleChange} />
        <textarea name="habitat" placeholder="Habitat" value={form.habitat} onChange={handleChange} />

        <button
          className="add-btn"
          onClick={editingId ? handleUpdate : handleAdd}
        >
          {editingId ? "Update Plant ✏️" : "Add Plant +"}
        </button>

      </div>

      {/* CARDS */}
      <div className="admin-grid">
        {plants.map(p => (
          <div className="admin-card" key={p.id}>
            <img src={p.image_url} alt="" />

            <div className="admin-card-body">
              <h3>{p.common_name}</h3>
              <p>{p.scientific_name}</p>

              <div className="card-buttons">
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminPage;