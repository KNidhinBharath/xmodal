import { useState } from "react"
import Modal from 'react-modal'

Modal.setAppElement("#root");

export default function Modalpage () {

    const [isOpen ,setOpen] = useState(false)
    const [formData ,setFormdata] = useState ({

        username : "",
        email: "",
        phone : "",
        date : ""
    })

    const today = new Date().toISOString().split("T")[0];


    function handleChange(e) {
        setFormdata((prev) => ({...prev ,[e.target.name]:e.target.value }))
    }

    function handleSubmit(e) {

        if (!formData.username.trim()) {
            alert("Please fill out the Username field.")
            return
        }

        if (!formData.email.trim()) {
            alert("Please fill out the Email field.")
            return
        }

        if (!formData.phone.trim()) {
            alert("Please fill out the Phone field.")
            return
        }

        if (!formData.date.trim()) {
            alert("Please fill out the Date of Birth field.")
            return
        }

        // 2. Email validation
        if (!formData.email.includes("@")) {
            alert("Invalid email. Please check your email address.")
            return
        }

        // 3. Phone validation: must be exactly 10 digits
        if (!/^\d{10}$/.test(formData.phone)) {
            alert("Invalid phone number. Please enter a 10-digit phone number.")
            return
        }

        // 4. DOB validation: must not be a future date
        const entered = new Date(formData.date)
        const today = new Date()
        entered.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        if (isNaN(entered.getTime()) || entered > today) {
            alert("Invalid date of birth. Please enter a valid past date.")
            return
        }

        // If all validations pass → reset form & close modal
        alert("Form submitted successfully!")
        setFormdata({
            username: "",
            email: "",
            phone: "",
            date: ""
        })
        setOpen(false)

    }

    return (
        <div className="modal" 
            style={{
                textAlign:"center"
            }}>

            <h1>User Details Modal</h1>

            <button onClick={() => setOpen(true)}>Open Form</button>

                    <Modal 
                        isOpen = {isOpen}
                        onRequestClose={() => setOpen(false)}
                        contentLabel="FormModal"
                        className="modal-content"
                        overlayClassName="modal-overlay"
                      
                        >
                            <form onSubmit={handleSubmit} 
                                style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    width:"400px",
                                    justifyContent:"center",
                                    alignItems:"center"
                                }}>
                                    <h2>Fill details</h2>

                                    <label htmlFor="username" >Username:</label>
                                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required></input>

                                    <label htmlFor="email">Email Address:</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required></input>

                                    <label htmlFor="phone">Phone Number:</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required></input>

                                    <label htmlFor="date">Date of Birth:</label>
                                    <input type="date" id="date" name="date" max={today} value={formData.date} pattern="[0-9]{10}"  maxLength="10" onChange={handleChange} required></input>

                                    <button type="submit"> Submit</button>
                            </form>

                    </Modal>
       

        </div>

    )
}