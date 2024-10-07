import React from 'react';

const DeleteConfirmationModal = ({ user, onDelete, setDeleteUser }) => {
  const handleDelete = () => {
    onDelete(user.id);
    setDeleteUser(null);
  };

  return (
    <div className="modal">
      <h2>Are you sure you want to delete {user.name}?</h2>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={() => setDeleteUser(null)}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmationModal;
