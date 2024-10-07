import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user details:', error));
  }, [id]);

  return (
    user ? (
      <div>
        <h2>{user.name}'s Details</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
        <p>Company: {user.company.name}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default UserDetailPage;
