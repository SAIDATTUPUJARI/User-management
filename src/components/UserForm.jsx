import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ setUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: {
      street: '',
      city: ''
    },
    company: {
      name: ''
    },
    website: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address') || name.includes('company')) {
      const [group, field] = name.split('.');
      setFormData({
        ...formData,
        [group]: {
          ...formData[group],
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = () => {
    axios.post('https://jsonplaceholder.typicode.com/users', formData)
      .then(response => setUsers(prevUsers => [...prevUsers, response.data]))
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <div className="modal">
      <h2>Create New User</h2>
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
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default UserForm;
