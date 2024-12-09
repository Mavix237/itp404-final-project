import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setDocumentTitle } from '../utils';

export default function Playlists() {
  useEffect(() => {
    setDocumentTitle('Your Playlists');
  }, []);
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);

  const fetchData = async () => {
    try {
      const [playlistsResponse, songsResponse] = await Promise.all([
        fetch('http://localhost:3001/playlists'),
        fetch('http://localhost:3001/songs')
      ]);

      const playlistsData = await playlistsResponse.json();
      const songsData = await songsResponse.json();

      setPlaylists(playlistsData);
      setSongs(songsData);
    } catch (error) {
      toast.error('Failed to load playlists');
    }
  };

  if (playlists.length === 0) {
    fetchData();
  }

  const getPlaylistSongs = (playlist) => {
    return songs.filter(song => song.playlist === playlist.name);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Playlists</h2>
      
      <div className="row">
        {playlists.map(playlist => (
          <div key={playlist.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-header">
                <h3 className="h5 mb-0">{playlist.name}</h3>
              </div>
              <div className="card-body">
                {getPlaylistSongs(playlist).map(song => (
                  <div key={song.id} className="mb-2 p-2 border-bottom">
                    <Link 
                      to={`/songbook/${song.id}`}
                      className="text-decoration-none"
                    >
                      <h4 className="h6 mb-1">{song.title}</h4>
                      <small className="text-muted">
                        {song.artist} • {song.genre}
                        {song.isFavorite && ' ❤️'}
                      </small>
                    </Link>
                  </div>
                ))}
                {getPlaylistSongs(playlist).length === 0 && (
                  <p className="text-muted">No songs in this playlist</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}