import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';
import { Track } from '../../util/CommonTypes.types.js';

interface PlaylistProps {
  tracks:Track[], 
  onRemove:(track:Track) => void,
  onSave:(track:Track) => void,
  playlistNameInput:any;
}

const Playlist:React.FC<PlaylistProps> = ({tracks, onRemove, onSave, playlistNameInput}) => {
  
  const handleSave= () => {
    onSave(playlistNameInput.current.value);
  }

    return (
      <div className="panel playlist">
        <div className="panel-header">
          <div className="panel-title h3">
            <input ref={playlistNameInput} type="text" defaultValue={'New Playlist'} />
          </div>
        </div>
        <div className="panel-body">
          <TrackList tracks={tracks} handleTrackAction={onRemove} onPlaylist={true} />
          <div className="playlist-save-container">
            <button className="playlist-save" onClick={handleSave} >SAVE TO SPOTIFY</button>
          </div>
        </div>
        
          
      </div>
    );
  }



export default Playlist;
