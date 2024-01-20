import React, { useState } from 'react';
import axios from 'axios';
import blackboxAI from './blackboxAI';

const UserProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(user);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    // Call the backend to update the user profile
    await axios.put('/api/user-profile', profile);
    setEditing(false);
  };

  const handleCancel = () => {
    setProfile(user);
    setEditing(false);
  };

  return (
    <div>
      <h1>User Profile</h1>
      {editing ? (
        <>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <input
            type="text"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      {/* Display profile picture and preferences */}
      {/* Use Blackbox AI to provide personalized suggestions */}
    </div>
  );
};

export default UserProfile;
