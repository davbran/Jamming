import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';
import { Track as TrackType } from '../../util/CommonTypes.types';

interface TrackListProps{
  tracks:TrackType[], 
  handleTrackAction: any,
  onPlaylist: any
}

const TrackList:React.FC<TrackListProps> = ({tracks, handleTrackAction, onPlaylist}) => {
    return (
      <div className="trackList">
        {tracks.map(track => {
          return <Track track={track} key={track.id} handleTrackAction={handleTrackAction} onPlaylist={onPlaylist} />  })}
      </div>
    );
  
}

export default TrackList;
