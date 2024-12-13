import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';

function RegistrationPage() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        role: 'consumer',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save registration details to localStorage
        localStorage.setItem('userRole', formData.role);
        localStorage.setItem('isRegistered', 'true'); // Explicitly set as 'true'

        alert('Registration successful!');
        navigate('/dashboard'); // Redirect to dashboard
    };

    return (
        <section className={styles.registrationSection}>
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Role:
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="consumer">Consumer</option>
                        <option value="producer">Producer</option>
                    </select>
                </label>
                <button type="submit" className={styles.submitButton}>
                    Register
                </button>
            </form>
        </section>
    );
}

export default RegistrationPage;
