import React, { useState } from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Spotify from "../../util/Spotify.js";
import { Track } from '../../util/CommonTypes.types'

export interface AppProps {

}

const App: AppProps = () => {

  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlayListName] = useState<string>('')
  const [playlistTracks, setPlayListTracks] = useState<Track[]>([])


  const addTrack = (track:Track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      playlistTracks.push(track);
      setPlayListTracks(playlistTracks);
    }
  }

  const removeTrack = (track:Track) => {
    let newPlaylist = playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    setPlayListTracks(newPlaylist);
  }

  const updatePlaylistName = (name:string) => {
    setPlayListName(name);
  }

  const savePlaylist = () => {
    let trackURIs = playlistTracks.map(track => track.uri)
    console.log(trackURIs);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlayListName('New Playlist')
      setPlayListTracks([])
    });
  };



  const search = (searchTerm:string) => {
    console.log(searchTerm);
    Spotify.search(searchTerm).then(searchResults => {
      setSearchResults(searchResults)
    });
  }

  return (
    <div>
      <h1>Mix<span className="highlight">tape</span>r</h1>
      <div className="App">
        <SearchBar onSearch={search} /*saveSearchTerm={saveSearchTerm}*/ />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}


export default App;
