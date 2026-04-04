import { useEffect, useState } from "react";
import "./AdminPage.css";

function AdminPage() {
  const [plants, setPlants] = useState([]);

  const [form, setForm] = useState({
    common_name: "",
    scientific_name: "",
    description: "",
    botanical_description: "",
    medicinal_uses: "",
    benefits: "",
    habitat: "",
    image_url: "",
    category: ""
  });

  const [editId, setEditId] = useState(null);

  // 📥 LOAD PLANTS
  const loadPlants = () => {
    fetch("https://herbal-backend-6oh6.onrender.com/api/plants")
      .then(res => res.json())
      .then(data => setPlants(data))
      .catch(err => console.error("Error loading plants:", err));
  };

  useEffect(() => {
    loadPlants();
  }, []);

  // ➕ ADD / ✏️ UPDATE
  const handleSubmit = () => {
    if (!form.common_name || !form.scientific_name) {
      alert("Fill required fields ❗");
      return;
    }

    const url = editId
      ? `https://herbal-backend-6oh6.onrender.com/api/plants/${editId}`
      : "https://herbal-backend-6oh6.onrender.com/api/plants";

    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(() => {
        alert(editId ? "Updated ✅" : "Added 🌿");

        // reset form
        setForm({
          common_name: "",
          scientific_name: "",
          description: "",
          botanical_description: "",
          medicinal_uses: "",
          benefits: "",
          habitat: "",
          image_url: "",
          category: ""
        });

        setEditId(null);
        loadPlants();
      })
      .catch(() => alert("Error saving plant ❌"));
  };

  // ❌ DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Delete this plant?")) return;

    fetch(`https://herbal-backend-6oh6.onrender.com/api/plants/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        alert("Deleted ❌");
        loadPlants();
      })
      .catch(() => alert("Error deleting plant ❌"));
  };

  // ✏️ EDIT
  const handleEdit = (plant) => {
    setForm({
      common_name: plant.common_name || "",
      scientific_name: plant.scientific_name || "",
      description: plant.description || "",
      botanical_description: plant.botanical_description || "",
      medicinal_uses: plant.medicinal_uses || "",
      benefits: plant.benefits || "",
      habitat: plant.habitat || "",
      image_url: plant.image_url || "",
      category: plant.category || ""
    });

    setEditId(plant.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌿 Admin Dashboard</h1>

      {/* 🌿 FORM */}
      <div className="admin-form">
        <input
          placeholder="Common Name"
          value={form.common_name}
          onChange={e => setForm({ ...form, common_name: e.target.value })}
        />

        <input
          placeholder="Scientific Name"
          value={form.scientific_name}
          onChange={e => setForm({ ...form, scientific_name: e.target.value })}
        />

        <input
          placeholder="Image URL"
          value={form.image_url}
          onChange={e => setForm({ ...form, image_url: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <textarea
          placeholder="Botanical Description"
          value={form.botanical_description}
          onChange={e => setForm({ ...form, botanical_description: e.target.value })}
        />

        <textarea
          placeholder="Medicinal Uses"
          value={form.medicinal_uses}
          onChange={e => setForm({ ...form, medicinal_uses: e.target.value })}
        />

        <textarea
          placeholder="Benefits"
          value={form.benefits}
          onChange={e => setForm({ ...form, benefits: e.target.value })}
        />

        <textarea
          placeholder="Habitat"
          value={form.habitat}
          onChange={e => setForm({ ...form, habitat: e.target.value })}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update Plant ✏️" : "Add Plant ➕"}
        </button>
      </div>

      {/* 🌿 TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Scientific</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {plants.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.common_name}</td>
              <td>{p.scientific_name}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;