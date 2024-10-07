import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUser from './EditUser';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDeleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => setEditUser(user)}>Edit</button>
                <button onClick={() => setDeleteUser(user)}>Delete</button>
                <Link to={`/user/${user.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && <EditUser user={editUser} setEditUser={setEditUser} setUsers={setUsers} />}
      {deleteUser && <DeleteConfirmationModal user={deleteUser} onDelete={handleDeleteUser} setDeleteUser={setDeleteUser} />}
    </div>
  );
};

export default UserList;
