import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  const [coverTransform, setCoverTransform] = useState('translate(0px, 0px)');
  const [profileTransform, setProfileTransform] = useState('translate(0px, 0px)');

  const handleMouseMove = (e) => {
    const { clientX: x, clientY: y } = e;
    const { innerWidth: width, innerHeight: height } = window;
    const moveX = ((x / width) - 0.5) * 20; // Change 20 to control the sensitivity
    const moveY = ((y / height) - 0.5) * 20; // Change 20 to control the sensitivity

    setCoverTransform(`translate(${moveX}px, ${moveY}px)`);
    setProfileTransform(`translate(${moveX / 2}px, ${moveY / 2}px)`); // Adjust profile image movement
  };

  return (
    <div style={styles.card} onMouseMove={handleMouseMove}>
      <div style={styles.header}>
        <img
          src={`http://localhost:5000/uploads/${user.coverPhoto}`}
          alt="Cover"
          style={{ ...styles.coverPhoto, transform: coverTransform }}
        />
      </div>
      <div style={styles.body}>
        <img
          src={`http://localhost:5000/uploads/${user.profilePhoto}`}
          alt="Profile"
          style={{ ...styles.profilePhoto, transform: profileTransform }}
        />
      </div>
      <div style={styles.footer}>
        <p>{user.personalDetails}</p>
        <Link to={`/profile/${user._id}`} style={styles.button}>Visit Profile</Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '10px',
    width: '300px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    cursor: 'pointer',
  },
  header: {
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    transition: 'transform 0.2s ease-out',
  },
  body: {
    textAlign: 'center',
    padding: '10px',
  },
  profilePhoto: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '5px solid #fff',
    objectFit: 'cover',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-out',
  },
  footer: {
    padding: '10px',
    textAlign: 'center',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};

export default UserCard;
