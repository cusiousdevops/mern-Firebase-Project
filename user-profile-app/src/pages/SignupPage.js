import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [personalDetails, setPersonalDetails] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('profilePhoto', profilePhoto);
    formData.append('coverPhoto', coverPhoto);
    formData.append('personalDetails', personalDetails);

    try {
      //
      const response = await axios.post('http://localhost:5000/api/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        navigate('/login');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during signup');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    },
    form: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '300px',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    fileInput: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      display: 'block',
    },
    button: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
    },
    signupLink: {
      marginTop: '10px',
      display: 'block',
      textDecoration: 'none',
      color: '#007bff',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="file"
          onChange={(e) => setProfilePhoto(e.target.files[0])}
          required
          style={styles.fileInput}
        />
        <input
          type="file"
          onChange={(e) => setCoverPhoto(e.target.files[0])}
          required
          style={styles.fileInput}
        />
        <textarea
          placeholder="Personal Details"
          value={personalDetails}
          onChange={(e) => setPersonalDetails(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Signup</button>
        <Link to="/login" style={styles.signupLink}>Already have an account? Log in</Link>
      </form>
    </div>
  );
};

export default SignupPage;
