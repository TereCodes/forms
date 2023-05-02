import React, { useState } from 'react';
import axios from 'axios';
const INITIAL_VALUES = { name: '', email: '', subject: '', message: '' };

const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.name) {
        errors.name = 'Name is required';
    }
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid format"
    }
    if (!values.subject) {
        errors.subject = 'Subject is required';
    }
    if (!values.message) {
        errors.message = 'Message is required';
    }
    return errors;
};

const ContactUsForm = () => {
    const [form, setForm] = useState(INITIAL_VALUES);
    const [errorMessage, setErrorMessage] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (event) => {
        const updatedForm = { ...form, [event.target.id]: event.target.value }
        setForm(updatedForm);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(() => validate(form));
        setIsSubmit(true);
        setStatus("Submitting");




        // Post data to API
        axios.post(`https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries`, { form }
        )
            .then((response) => {
                console.log(response);
                setStatus("Submitted");
            })
            .catch((error) => console.log(error));
        setForm(INITIAL_VALUES);
    };

    return (
        <div className="contact-us">
            {isSubmit && Object.keys(errorMessage).length === 0 ? (
                <span className="success">Your message was sent successfully!</span>
            ) : isSubmit && Object.keys(errorMessage).length > 0 ? (
                <span className="error">There was an error sending your message.</span>
            ) : null}
            <form onSubmit={handleSubmit}>
                <h2>Contact Us</h2>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={form.name} name="name" onChange={handleChange} placeholder="name" />
                </div>
                <span>{errorMessage.name}</span>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" value={form.email} name="email" onChange={handleChange} placeholder="email" />
                </div>
                <span>{errorMessage.email}</span>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="enter a subject" />

                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" value={form.message} name="message" onChange={handleChange} placeholder="leave your message here..." />
                </div>
                <span>{errorMessage.message}</span>

                <button type="submit">
                    {status === "Submitting" ? "Submitting..." : status === "Submitted" ? "Submitted" : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default ContactUsForm