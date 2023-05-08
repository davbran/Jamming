import React from 'react';
import './Track.css';
import { Track as TrackType } from '../../util/CommonTypes.types';

interface TrackProps {
  track:TrackType, 
  handleTrackAction:any,
  onPlaylist:boolean
}

const Track:React.FC<TrackProps> = ({track, handleTrackAction, onPlaylist}) => {

	return (
    <div className="tile tile-centered">
      <div className="tile-icon">
        <img src={track.cover} alt={track.name}className="img-responsive" />
      </div>
      <div className="tile-content">
        <div className="tile-title">{track.name}</div>
        <small className="tile-subtitle">{track.artist} | {track.album}</small>
        {!onPlaylist && 
          <div className="chip audio-preview">
            <audio src={track.preview} controls></audio>
          </div>
        }
      </div>
      <div className="tile-action">
        <button className="btn btn-link" onClick={()=>handleTrackAction(track)}>
          <i className={onPlaylist ? "icon icon-minus" : "icon icon-plus"}></i>
        </button>
      </div>
    </div>
    );
  
  }

export default Track;
