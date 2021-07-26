import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProfileGalleryPage.css';

const ProfileGalleryPage = ({ loggedIn }) => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchProfiles = async() => {
    const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/`;
    const allProfiles = await axios.get(url);
    setProfiles(allProfiles.data);
    setLoading(false);
  }
  useEffect(()=>{
    if (isLoading)
    fetchProfiles();
  },[isLoading]);

  if (isLoading) return(
    <div>...</div>
  )
  return (
    <div className="gallery">
      <h1 className="gallery-title">Browse Musicians</h1>
      {profiles.map(profile => (
        <section key={profile._id}>
          <Link to={loggedIn ? `profile/${profile._id}` : '/login'}>
            <div className="profile-details">
              <img className="avatar" src={profile.avatar}></img>
              <div className="profile-details-text">
                <h2 className="profile-details-title">{profile.name}</h2>
                <p className="profile-details-subtitle">{`${profile.title !== undefined ? profile.title : ''}`}</p>
              </div>
            </div>
          </Link>
        </section>
      ))}
    </div>
  )
}

export default ProfileGalleryPage;
