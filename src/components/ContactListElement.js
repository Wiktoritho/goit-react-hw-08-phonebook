
export default function ContactListItem({ name, number, id, onDelete}) {
  return (
    <li>
      {name}: {number}
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
}
