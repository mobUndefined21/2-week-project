import axios from 'axios';
import {useState} from 'react';
import './AddImage.css';
require('dotenv').config();

const AddImage = ({profile}) => {
  const [isUploading, setUploading] = useState(false);
  const [avatar, setAvatar] = useState(profile.avatar);
  const uploadImage = (file) => {
    setUploading(true);
    const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profile._id}`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tnp6wl7e");
    axios.post("https://api.cloudinary.com/v1_1/dssjfgqnr/image/upload", 
    formData, 
    {
      transformRequest: (data, headers) => {
        delete headers.common['authorization'];
        return data;
      }
    })
      .then(res => {
        console.log(res.data.secure_url);
        const imageLink = res.data.secure_url;
        axios.patch(url, { avatar: imageLink })
          .then(() => { 
            setAvatar(imageLink);
            setUploading(false);
          });
      });
  }
  
  return( 
    // I believe in you! AWWWW! Thanks :D
    <div className="avatar-input">
      <button className="edit-btn btn-centered" type="submit">
      <label for="files" class="btn"><i className="far fa-edit"></i></label>
      <input
        type="file"
        id="files"
        onChange={e=>{uploadImage(e.target.files[0])}}
      ></input>
      </button>
      <img className="avatar--profile" 
        src={avatar} 
        alt="avatar">
      </img>
    </div>
  )
}

export default AddImage;