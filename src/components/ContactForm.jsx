import { useState } from 'react'

function ContactForm({ onAddContact }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (name === '' || phone === '') {
      return
    }

    onAddContact({
      id: Date.now(),
      name: name,
      phone: phone,
    })

    setName('')
    setPhone('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      <button type="submit">Add Contact</button>
    </form>
  )
}

export default ContactForm