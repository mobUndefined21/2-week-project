import { useEffect } from 'react'
import {useParams } from 'react-router-dom';
import Profile from '../Profile/Profile.js';
import './ProfilePage.css';

const ProfilePage = () => {
  let { id } = useParams();
  return (
    <div className='profile-page'>
      <Profile profileId={id} />
    </div>
  )
}

export default ProfilePage