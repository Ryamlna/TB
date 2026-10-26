import { useState } from "react";
import PageHeading from "../components/PageHeading";
import UserCard from "../components/UserCard";
import EmptyState from "../components/EmptyState";
import { initialUsers } from "../data/mockData";

export default function ManageUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Murid");
  const [className, setClassName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function addUser(event) {
    event.preventDefault();
    if (!name.trim() || !className.trim()) {
      setError("Nama dan kelas/mata pelajaran wajib diisi.");
      setMessage("");
      return;
    }
    setUsers((current) => [
      { id: Date.now(), name: name.trim(), role, className: className.trim() },
      ...current,
    ]);
    setName("");
    setClassName("");
    setError("");
    setMessage("Pengguna demo berhasil ditambahkan.");
  }

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.role} ${user.className}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeading
        eyebrow="DATA PENGGUNA"
        title="Manajemen Pengguna"
        description="Kelola contoh data guru dan murid sekolah."
      />
      <div className="two-columns">
        <section className="panel">
          <h2>Tambah pengguna</h2>
          <form onSubmit={addUser}>
            <label htmlFor="user-name">Nama</label>
            <input
              id="user-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nama lengkap"
            />
            <label htmlFor="user-role">Peran</label>
            <select
              id="user-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option>Murid</option>
              <option>Guru</option>
            </select>
            <label htmlFor="user-class">Kelas / mata pelajaran</label>
            <input
              id="user-class"
              value={className}
              onChange={(event) => setClassName(event.target.value)}
              placeholder="Contoh: XI Geomatika"
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="success-message" role="status">
                {message}
              </p>
            )}
            <button className="primary-button" type="submit">
              Tambah pengguna
            </button>
          </form>
        </section>
        <section className="panel">
          <h2>Daftar pengguna</h2>
          <label htmlFor="user-search">Cari pengguna</label>
          <input
            id="user-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nama, peran, atau kelas..."
          />
          <p className="muted small-text">
            Menampilkan {filteredUsers.length} pengguna
          </p>
          <div className="user-list">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={(id) =>
                  setUsers((current) =>
                    current.filter((item) => item.id !== id)
                  )
                }
              />
            ))}
          </div>
          {filteredUsers.length === 0 && (
            <EmptyState
              title="Pengguna tidak ditemukan"
              description="Coba kata kunci lain."
            />
          )}
        </section>
      </div>
    </>
  );
}
