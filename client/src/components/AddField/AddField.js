import axios from 'axios';
import './AddField.css';

const AddField = ({appendProfile, profileId, skillset}) => {

  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profileId}/${skillset}`;
  const sendNewField = () => {
    const name = document.querySelector(`#input${skillset}`).value;
    axios.post(url, { name }).then(() => appendProfile({}));
  }

  return (
    <div>
      <input type="text" onKeyPress={e=>{if(e.key==='Enter')sendNewField()}} id={`input${skillset}`} placeholder={`add ${skillset}`} />
      <button onClick={sendNewField}  className="remove-btn">+</button>
    </div>
  )
}

export default AddField;