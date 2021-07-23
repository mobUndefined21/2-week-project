import axios from 'axios';

const AddField = ({appendProfile, profileId, skillset}) => {

  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profileId}/${skillset}`;
  const sendNewField = () => {
    const name = document.querySelector(`#input${skillset}`).value;
    axios.post(url, {name, skill: 4}).then(() => appendProfile({}));
  }

  return (
    <div>
      <input type="text" id={`input${skillset}`} placeholder={`add ${skillset}`} />
      <button onClick={sendNewField}>Add</button>
    </div>
  )
}

export default AddField;