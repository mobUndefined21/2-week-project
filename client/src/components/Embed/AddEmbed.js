import axios from 'axios';
import players from './players';


const AddEmbed = ({profileId, setLoading}) => {
  const url = `http://localhost:8080/api/profiles/${profileId}/music`;
  const handleClick = () => {
    const link = document.querySelector('#AddEmbedLink').value;
    const type = document.querySelector('#AddEmbedType').value;
    axios.post(url, { link, type }).then(() => setLoading(true));
  }
  return (
    <div>
      <input id="AddEmbedLink" type="text" placeholder="Link" />
      <select id="AddEmbedType" name="Type">
        {Object.keys(players).map((player, key) => <option key={key}>{player}</option>)}
      </select>
      <button className="remove-btn" onClick={handleClick}>+</button>
    </div>
  )
}

export default AddEmbed;