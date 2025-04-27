import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const json = await res.json();
      if (res.ok) setUsers(json.data);
      else setError(json.message || 'Failed to load users');
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers(users.filter(u => u._id !== id));
      } else {
        const json = await res.json();
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map(user => (
        <div key={user._id} className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={user.imageUrl || 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
            {user.firstName} {user.lastName}
          </h3>
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            <li><strong>Emp ID:</strong> {user.employeeId}</li>
            <li><strong>NIC:</strong> {user.nic}</li>
            <li><strong>Birth:</strong> {new Date(user.birthDate).toLocaleDateString()}</li>
            <li><strong>Designation:</strong> {user.designation}</li>
            <li><strong>Marital:</strong> {user.marriedStatus}</li>
            <li><strong>Age:</strong> {user.age}</li>
          </ul>
          <div className="flex justify-between">
            <button
              onClick={() => navigate(`/users/edit/${user._id}`)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
