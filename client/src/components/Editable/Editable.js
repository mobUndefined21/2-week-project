import { useState, useEffect } from 'react';
import axios from 'axios';

const updateProfile = async (profileId, field, property) => {
  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profileId}`;
  console.log('sending axios ' + { [field]: property })
  return await axios.patch(url, { [field]: property });
};

const Editable = ({ Tag, content, field, profileId, appendProfile, owner}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);

  const toggleEdit = async () => {
    if (editing) {
      const res = await updateProfile(profileId, field, value)
      appendProfile(res.data[field]);
      setValue(content);
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

    console.log(output);
  return (
    <div>
      {output}
      <button onClick={toggleEdit}>...</button>
    </div>
  ) 
}
export default Editable;