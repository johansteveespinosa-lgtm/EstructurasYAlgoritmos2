import { useEffect, useState } from 'react'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  setTimeout(() => {
    setContacts([
      { id: 1, name: 'Juan', phone: '3001234567' },
      { id: 2, name: 'Maria', phone: '3159876543' },
    ])

    setLoading(false)
  }, 1500)
}, [])

const addContact = (contact) => {
  setContacts((oldContacts) => [...oldContacts, contact])
}
const deleteContact = (id) => {
  setContacts((oldContacts) =>
    oldContacts.filter((contact) => contact.id !== id)
  )
}

  return (
  <div>
    <h1>My Contacts</h1>

    <ContactForm onAddContact={addContact} />

    <ContactList
  contacts={contacts}
  onDeleteContact={deleteContact}
/>
  </div>
)
}

export default App
