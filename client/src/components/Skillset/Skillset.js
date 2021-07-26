import AddField from '../AddField/AddField.js';
import Skill from '../Skill/Skill.js';
import {useState} from 'react';

const Skillset = ({skillsetName, profile, appendProfile, profileId, setLoading}) => {
  const [skills, setSkills] = useState(profile[skillsetName]);

  return (
    <div>
    {
      profile[skillsetName]?.length > 0 && <h3>{skillsetName}:</h3>
    }
    {
        profile[skillsetName]?.length > 0 &&
        profile[skillsetName]?.map((skill, index) => {
          return skill.name
            && <Skill
              key={index}
              isOwner={profile.isOwner} 
              skillsetName={skillsetName} 
              skillName={skill.name} 
              setLoading={setLoading}
              profileId={profileId} />
        })
    }
    {profile.isOwner ?
      <AddField skillset={skillsetName}
      appendProfile={appendProfile}
      profileId={profileId} />
      : null 
    }
    </div>
  )
}

export default Skillset;