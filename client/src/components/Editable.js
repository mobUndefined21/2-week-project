import { useState } from 'react';
import axios from 'axios';

const updateProfile = async (profileId, field, property) => {
  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profileId}`;
  console.log('sending axios ' + { [field]: property })
  await axios.patch(url, { [field]: property });
};

const Editable = ({ Tag, content, field, profileId, getProfile}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);
  const toggleEdit = () => {
    if (editing) {
      updateProfile(profileId, field, value);
    }
    setEditing(!editing);
  };

  const onChange = e => {
    setValue(e.target.value);
  }

  const output = editing
    ? <input
      type="text"
      onChange={onChange}
      value={value}
      />
    : <Tag>{content}</Tag>
  return (
    <div>
      {output}
      <button onClick={toggleEdit}>...</button>
    </div>
  ) 
}
export default Editable;