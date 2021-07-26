import React from 'react'
import players from './players'
const Embed = ({isOwner, embedLink, player, setLoading}) => {
  return (
    <div className="music-div" dangerouslySetInnerHTML={{__html: players[player](embedLink)}}>
      
    </div>
  )
}

export default Embed