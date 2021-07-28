import React from 'react';
import players from './players';
import axios from 'axios';
import './Embed.css';

const profileId = window.localStorage.getItem('profileId');

const Embed = ({isOwner, embedLink, player, setLoading}) => {
  const deleteEmbed = () => {
    axios.delete(`${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profileId}/music`, {data: {link: embedLink} });
    setLoading(true);
  };
  return (
    <div className="embeded-wrapper">
      <div
        className="music-div" 
        dangerouslySetInnerHTML={{__html: players[player.toLowerCase()](embedLink)}}>
      </div>
      {isOwner && 
        <button
        className="remove-btn margin--right-small"
        onClick={deleteEmbed}>-</button>
      }
    </div>
  )
}

export default Embed