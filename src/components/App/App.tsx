import { useCallback, useRef, useState } from "react";
import './App.css';
import Playlist from "../Playlist/Playlist"
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import { search, useUser, addPlaylist, createPlaylist } from "../../util/Spotify";
import { Track } from "../../util/CommonTypes.types";
import React from "react";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";


const App = () => {
	const user = useUser();
  const [searchResults, setSearchResults] = useState<Track[]>([])
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([])
	const playlistNameInputRef = useRef();

	const addTrack = useCallback(
		(track) => {
			if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
        toast.warn('Track already added to playlist')
				return 
			}
			setPlaylistTracks((current) => [...current, track]);
		},
		[playlistTracks]
	);

	const removeTrack = useCallback(
		(track) => {
			if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
				setPlaylistTracks((prevPlaylistTracks) =>
					prevPlaylistTracks.filter((prevTrack) => prevTrack.id !== track.id)
				);
			}
			return;
		},
		[playlistTracks]
	);

  
  const searchTracks = (searchTerm:string) => {
    if(!searchTerm){
      return
    }
    search(searchTerm)
    .then((searchResults:Track[]) => {
      setSearchResults(searchResults)
    });
    return searchResults
  }


  const savePlaylist = useCallback(
		async (playlistName) => {
      if(!user){
        return
      }
			const playlist = await createPlaylist(user.id, playlistName);
			const trackURIs = playlistTracks.map((track) => track.uri);
			addPlaylist(playlist.id, trackURIs);
		},
		[user, playlistTracks]
	);

	return (
    <div className="container App">
       
      <header className="navbar">
        <section className="navbar-section logo">
          <h1>Mix<span className="highlight">tape</span>r</h1>
        </section>
        <section className="navbar-section greeting">
          <h2 >{user &&  `Hello ${user.display_name}`}</h2>
        </section>
      </header>
      <div>
        <SearchBar searchTracks={searchTracks} />
      </div>
      <div className="columns App-playlist">
        <div className="column col-5">
          <SearchResults 
            tracks={searchResults} 
            handleTrackAction={addTrack} 
          />
        </div>
        <div className="divider-vert"></div>
        <div className="column col-5">
          <Playlist
            tracks={playlistTracks}
            onRemove={removeTrack}
            playlistNameInput={playlistNameInputRef}
            onSave={savePlaylist}
				  />
        </div>
      </div>
      <ToastContainer closeOnClick />
    </div>
    )
  }

export default App;