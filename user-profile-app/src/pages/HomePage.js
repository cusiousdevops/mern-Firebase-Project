// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import InteractiveImage from '../components/InteractiveImage';
import Navbar from '../components/Navbar';


const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get('http://localhost:5000/api/profile/' + userId);
        setUser(res)

        const response = await axios.get('http://localhost:5000/api/allprofile');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {user && <Navbar user={user} />} {/* Conditionally render Navbar */}
      <h1>I am Home Page</h1>

      {/* <InteractiveImage /> */}
      <div style={styles.container}>
        {users.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  },
};

export default HomePage;
