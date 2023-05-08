import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';
import { Track } from '../../util/CommonTypes.types.js';

interface SearchResultsProps {
  tracks:Track[], 
  handleTrackAction: (track: Track) => Track[] | void,
}

const SearchResults: React.FC<SearchResultsProps> = ({ tracks, handleTrackAction }) => {

  return (
    <div className="panel searchResults">
      <div className="panel-header">
        <div className="panel-title h3">Results</div>
      </div>
      <div className="panel-body">
        <TrackList tracks={tracks} handleTrackAction={handleTrackAction} onPlaylist={false} />
      </div>
    </div>

  )
}


export default SearchResults;
