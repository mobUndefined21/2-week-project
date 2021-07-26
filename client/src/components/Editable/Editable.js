import { useState, useEffect } from 'react';
import axios from 'axios';
import './Editable.css';

const updateProfile = async (profileId, field, property) => {
  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profileId}`;
  console.log('sending axios ');
  console.dir({ [field]: property });
  return await axios.patch(url, { [field]: property });
};

const Editable = ({ Tag, content, field, profileId, appendProfile, owner, textarea = false}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);
  if(!editing && !value) setEditing(true);
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
    ? (
      textarea 
      ? 
      <textarea onChange={onChange}>
        {value}
      </textarea>
      : 
      <input
      type="text"
      placeholder={field}
      onKeyPress={e=>{if(e.key==='Enter')toggleEdit()}}
      onChange={onChange}
      value={value}
      />
      )
    : <Tag>{content}</Tag>

  return (
    <div className="editable">
      {output}
      {editing
        ? <button className="remove-btn" onClick={toggleEdit}>+</button>
        : <button className="edit-btn" onClick={toggleEdit}><i className="far fa-edit"></i></button>}
    </div>
  ) 
}
export default Editable;