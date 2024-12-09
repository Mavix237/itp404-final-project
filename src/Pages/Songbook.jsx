import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setDocumentTitle } from '../utils';

export default function Songbook() {
  useEffect(() => {
    setDocumentTitle('Your Songbook');
  }, []);
  const [songs, setSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSongs = async () => {
    // GET
    if (!isLoaded) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3001/songs');
        if (!response.ok) throw new Error('Failed to fetch songs');
        const data = await response.json();
        setSongs(data);
        setIsLoaded(true);
        toast.success('Songs loaded successfully!');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load songs');
      } finally {
        // Delay the loading state change to make the spinner more visible
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }
  };

  //DELETE
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/songs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete song');
      setSongs(songs.filter(song => song.id !== id));
      toast.success('Song deleted successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete song');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h2>Your Songbook</h2>
          <button
            className={`btn btn-primary mb-3 ${isLoading ? 'disabled' : ''}`}
            onClick={fetchSongs}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : isLoaded ? 'Refresh Songs' : 'Load Songs'}
          </button>
          {!isLoading && isLoaded && (
            <div className="list-group">
              {songs.map(song => (
                <div key={song.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <Link to={`/songbook/${song.id}`} className="text-decoration-none">
                    <h5 className="mb-1">{song.title}</h5>
                    <small className="text-muted">{song.artist}</small>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(song.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}