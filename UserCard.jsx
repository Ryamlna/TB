export default function UserCard({ user, onDelete }) {
  return (
    <article className="user-card">
      <div className="avatar" aria-hidden="true">{user.name.slice(0, 1).toUpperCase()}</div>
      <div className="user-info">
        <strong>{user.name}</strong>
        <span>{user.role} · {user.className}</span>
      </div>
      <button className="danger-button" onClick={() => onDelete(user.id)}>Hapus</button>
    </article>
  );
}