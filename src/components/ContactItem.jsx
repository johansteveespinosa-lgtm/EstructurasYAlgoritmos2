function ContactItem({ contact, onDeleteContact }) {
  return (
    <li>
      {contact.name} - {contact.phone}

      <button onClick={() => onDeleteContact(contact.id)}>
        Delete
      </button>
    </li>
  )
}

export default ContactItem