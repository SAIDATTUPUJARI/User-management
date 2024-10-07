import React, { useState } from 'react';
import axios from 'axios';

const EditUser = ({ user, setEditUser, setUsers }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData)
      .then(response => {
        setUsers(prevUsers =>
          prevUsers.map(u => (u.id === user.id ? response.data : u))
        );
        setEditUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="modal">
      <h2>Edit User</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        required
      />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={() => setEditUser(null)}>Cancel</button>
    </div>
  );
};

export default EditUser;
