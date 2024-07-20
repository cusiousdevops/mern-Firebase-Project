import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        setUser(res.data);
        generateQrCode(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const generateQrCode = (userData) => {
    const qrData = `${window.location.origin}/profile/${userData._id}`;
    setQrCode(qrData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={`http://localhost:5000/uploads/${user.coverPhoto}`} alt="Cover" style={styles.coverPhoto} />
      </div>
      <div style={styles.profileInfo}>
        <img src={`http://localhost:5000/uploads/${user.profilePhoto}`} alt="Profile" style={styles.profilePhoto} />
        <h1 style={styles.name}>{user.name}</h1>
        <p style={styles.phone}>Phone: {user.phone}</p>
        <p style={styles.details}>{user.personalDetails}</p>
      </div>
      <div style={styles.qrCodeContainer}>
        <QRCode value={qrCode} size={256} />
        <p style={styles.qrText}>Scan this QR code to visit your profile</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    position: 'relative',
    marginBottom: '20px',
  },
  coverPhoto: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  profilePhoto: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '5px solid #fff',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  name: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  phone: {
    fontSize: '16px',
    color: '#555',
  },
  details: {
    fontSize: '14px',
    color: '#777',
    margin: '10px 0',
  },
  qrCodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
  },
  qrText: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#555',
  },
};

export default ProfilePage;
