import React from 'react';
import axios from 'axios';

const Skill = ({profileId, skillsetName, skillName, isOwner, setLoading}) => {
  const deleteSkill = () => {
    axios.delete(`${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profileId}/${skillsetName}`, {data: { name: skillName }}).then(() => setLoading(true));
  }
  return (
    <p className="">
      {skillName}{isOwner && <button className="remove-btn margin--right-small" onClick={deleteSkill}>-</button>}
    </p>
  )
}

export default Skill
