import { useState } from "react"

export default function Modalpage() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  })

  const today = new Date().toISOString().split("T")[0]

  function handleChange(e) {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  function handleOverlayClick(e) {
    // if clicked on outer modal div, close it
    if (e.target.classList.contains("modal")) {
      setIsOpen(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    // required fields
    if (!formData.username.trim()) {
      alert("Please fill out the Username field.")
      return
    }
    if (!formData.email.trim()) {
      alert("Invalid email. Please check your email address.")
      return
    }
    if (!formData.phone.trim()) {
      alert("Invalid phone number. Please enter a 10-digit phone number.")
      return
    }
    if (!formData.dob.trim()) {
      alert("Please fill out the Date of Birth field.")
      return
    }

    // email check
    if (!formData.email.includes("@")) {
      alert("Invalid email. Please check your email address.")
      return
    }

    // phone check
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.")
      return
    }

    // dob check
    const entered = new Date(formData.dob)
    const now = new Date()
    entered.setHours(0, 0, 0, 0)
    now.setHours(0, 0, 0, 0)
    if (entered > now) {
      alert("Invalid date of birth. Please enter a valid past date.")
      return
    }

    // success: reset + close
    setFormData({ username: "", email: "", phone: "", dob: "" })
    setIsOpen(false)
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>User Details Modal</h1>

      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={handleOverlayClick} style={overlayStyle}>
          <div className="modal-content" style={modalStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
              <h2>Fill details</h2>

              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />

              <label htmlFor="email">Email Address:</label>
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
              />

              <label htmlFor="phone">Phone Number:</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
              />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                id="dob"
                type="date"
                max={today}
                value={formData.dob}
                onChange={handleChange}
              />

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Some basic inline styles for demo
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}
const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "400px"
}
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px"
}
