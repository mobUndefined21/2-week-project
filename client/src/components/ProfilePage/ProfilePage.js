import React from 'react'
import {useParams } from 'react-router-dom';
import Profile from '../Profile/Profile.js';
const ProfilePage = () => {
  let { id } = useParams();
  return (
    <div>
      <Profile profileId={id} />
    </div>
  )
}

export default ProfilePage