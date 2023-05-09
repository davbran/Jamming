import { useEffect, useState } from 'react';
import { User } from './CommonTypes.types';
import { toast } from 'react-toastify';


const clientId = '010c2f942076433abe90a54a0a7f9e95';
const redirectUri = 'http://localhost:3000/';

let accessToken:string|null = "";

  /**
   * This function gets the access token for the user to access content from Spotify. 
   * It first checks if an access token has already been generated and stored in the accessToken variable. 
   * It then checks for the access token and expiresIn parameters in the window location href. 
   * If both are found, the access token is set to the value of the parameter and a timer is initialized 
   * to reset the access token after the number of seconds specified in the expiresIn parameter. 
   * If no access token is found, the user is redirected to the Spotify authorization page to authenticate 
   * and provide the access token.
   * 
   * @returns accessToken: string
   */

  export const getAccessToken = () => {
        if(accessToken) {
            return accessToken;
        }
        const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (hasAccessToken && hasExpiresIn) {
            accessToken = hasAccessToken[1];
            const expiresIn = Number(hasExpiresIn[1]);
            window.setTimeout(() => accessToken = null, expiresIn * 1000);
            window.history.pushState('Access Token', '', '/');
            return accessToken;
        } else {
            const accessUrl: string |Location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location.href = accessUrl;
        }
    }

    const headers = () => {
      return { Authorization: `Bearer ${getAccessToken()}` };
    };

/**
 * search() is an asynchronous function that takes in a string 'term' as a parameter 
 * and fetches data from the API endpoint. It then takes the response and creates an 
 * object with the relevant data. It returns an array of objects with the information, 
 * where each object contain the id, name, artist, album, uri, cover and preview of the track.
 * @param term 
 * @returns Track[]
 */
   export const search = async (term:string) => {
        return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: headers()
        }).then(
            response => { 
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('API request failed');
                }
        }).then(
            jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map((track:any) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                cover: track.album.images[2].url,
                preview: track.preview_url
            }));
        });
    }

    /**
     * This function creates a playlist for the specified userId with the provided playlistName. 
     * The postEndpoint is specified and the response is then returned as a JSON object.
     * @param userId 
     * @param playlistName 
     * @returns 
     */

    export const createPlaylist = async (userId:string, playlistName:any) => {
      const postEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
      const response = await fetch(postEndpoint, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ name: playlistName }),
      });
      return await response.json();
    };
    
    /**
      * addTracks() sends an HTTP POST request to the Spotify Web API 
      * with the provided playlist ID and list of track URIs. 
      * Upon successful request, it prints 'Playlist saved' to console 
      * and shows a success toast.  
      * @param playlistId :string
      * @param trackURIs :string
    */
    export const addTracks = (playlistId:string, trackURIs:string[]) => {
      const postEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    
      fetch(postEndpoint, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          uris: trackURIs,
        }),
      }).then(
        response => { 
          if (response.ok) {
              console.info('Playlist saved');
              toast.success('Playlist successfully saved')
          } else {
              console.info('API request failed');
          }
        }
      )
    };

      const fetchUser= async() => {
          try {
            const response = await fetch("https://api.spotify.com/v1/me", {
              method: "GET",
              headers: headers(),
            });
            return await response.json();
          } catch (error) {
            console.log(error);
          }
        }
            
      export const useUser = () => {
        const [user, setUser] = useState<User>();
        useEffect(() => {
          fetchUser().then((me) => {
            setUser(me);
          });
        }, []);
        return user;
      };


      // a function to list users current playlists- not implemented yet

      export const getUserPlaylists = async (userName:string) => {
        return await fetch(`https://api.spotify.com/v1/users/${userName}/playlists`, {
            headers: headers()
        }).then(
            response => { 
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('API request failed');
                }
        }).then(
            jsonResponse => {
            if(!jsonResponse.items) {
                return [];
            }
            return jsonResponse.items.map((playlist:any) => ({
                id: playlist.id,
                name: playlist.name,
                uri: playlist.uri,
                images: playlist.images,
            }));
        });
    }




            
    


