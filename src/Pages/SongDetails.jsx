import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SongForm from '../Components/SongForm';
import { useLocation } from 'react-router-dom'; 
import { setDocumentTitle } from '../utils';

export default function SongDetails() {
   const [song, setSong] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   const [editForm, setEditForm] = useState({
       title: '',
       artist: '',
       genre: '',
       lyrics: '',
       playlist: 'morning vibe',
       isFavorite: false
   });
   const [errors, setErrors] = useState({});
   const location = useLocation();
   const songId = window.location.pathname.split('/').pop();

   useEffect(() => {
    if (song) {
      setDocumentTitle(`${song.title} by ${song.artist}`);
    } else {
      setDocumentTitle('Song Details');
    }
  }, [song]);
   
   const loadSong = async () => {
    try {
        const response = await fetch(`http://localhost:3001/songs/${songId}`);
        if (!response.ok) throw new Error('Song not found');
        const data = await response.json();
        setSong(data);
        setEditForm(data);
    } catch (error) {
        toast.error('Failed to load song details');
        }
    };
    if (location.pathname.includes('/songbook/') && (!song || song.id !== songId)) {
        loadSong();
    }
useEffect(() => {
     if (song) {
       setDocumentTitle(`${song.title} by ${song.artist}`);
     } else {
       setDocumentTitle('Song Details');
     }
   }, [song]);
   const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/songs/${songId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm)
            });

            if (!response.ok) throw new Error('Failed to update song');
            const updatedSong = await response.json();
            setSong(updatedSong);
            setIsEditing(false);
            toast.success('Changes saved successfully! 🎵');
        } catch (error) {
            toast.error('Failed to save changes. Please try again.');
        }
    };

   

   return (
    
       <div>
           {song && !isEditing ? (
               <div className="card">
                   <div className="card-body">
                       <h2>{song.title}</h2>
                       <p><strong>Genre:</strong> {song.genre}</p>
                       <p><strong>Artist:</strong> {song.artist}</p>
                       <p><strong>Playlist:</strong> {song.playlist}</p>
                       {song.isFavorite && <p className="text-danger">❤️ Favorite</p>}
                       
                       <div className="mt-3">
                           <strong>Lyrics:</strong>
                           <pre className="mt-2" style={{ whiteSpace: 'pre-wrap' }}>
                               {song.lyrics}
                           </pre>
                       </div>
                       
                       <button
                           className="btn btn-primary mt-3 me-2"
                           onClick={() => setIsEditing(true)}
                       >
                           Edit Details
                       </button>
                       
                   </div>
               </div>
           ) : isEditing ? (
               <div className="card">
                   <div className="card-body">
                       <h3>Edit Song</h3>
                       <SongForm 
                           formData={editForm}
                           setFormData={setEditForm}
                           handleSubmit={handleEditSubmit}
                           errors={errors}
                           buttonText="Save Changes"
                       />
                       <button
                           className="btn btn-secondary mt-3"
                           onClick={() => setIsEditing(false)}
                       >
                           Cancel
                       </button>
                   </div>
               </div>
           ) : null}
       </div>
   );
}