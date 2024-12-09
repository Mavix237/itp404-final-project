import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SongCard from '../Components/SongCard';
import { setDocumentTitle } from '../utils';

export default function Search() {
  useEffect(() => {
    setDocumentTitle('Search Songs');
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch('http://localhost:3001/songs');
      if (!response.ok) throw new Error('Failed to fetch songs');
      const allSongs = await response.json();

      // Add null checks for all fields being searched
      const filteredSongs = allSongs.filter(song => {
        const title = song.title?.toLowerCase() || '';
        const genre = song.genre?.toLowerCase() || '';
        const lyrics = song.lyrics?.toLowerCase() || '';
        const artist = song.artist?.toLowerCase() || '';
        const searchTermLower = searchTerm.toLowerCase();

        return title.includes(searchTermLower) ||
               genre.includes(searchTermLower) ||
               lyrics.includes(searchTermLower) ||
               artist.includes(searchTermLower);
      });

      setSearchResults(filteredSongs);
      setIsSearching(false);

      if (filteredSongs.length === 0) {
        toast.info('No matching songs found');
      }

    } catch (error) {
      console.error('Error:', error);
      setIsSearching(false);
      toast.error('Search failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for songs by title, artist, genre, or lyrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="row">
        {isSearching ? (
          <div className="col">
            <p>Searching...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="col">
            <h3>Search Results</h3>
            {searchResults.map(song => (
              <div key={song.id} className="mb-3">
                <SongCard 
                  song={song}
                  showActions={false}
                />
              </div>
            ))}
          </div>
        ) : searchTerm && (
          <div className="col">
            <p>No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}