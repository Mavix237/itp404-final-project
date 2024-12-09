import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import SongForm from '../Components/SongForm'
import { setDocumentTitle } from '../utils'

export default function LyricsLog() {
  useEffect(() => {
    setDocumentTitle('Add New Song');
  }, []);
  
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    lyrics: '',
    playlist: 'morning vibe',
    isFavorite: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Song title is required'
    if (!formData.artist.trim()) newErrors.artist = 'Artist name is required'  // Updated error message
    if (!formData.genre) newErrors.genre = 'Genre is required'
    if (!formData.lyrics.trim()) newErrors.lyrics = 'Lyrics are required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  //POST
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3001/songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        if (response.ok) {
          toast.success('Song added successfully!')
          // Clear form
          setFormData({
            title: '',
            artist: '',
            genre: '',
            lyrics: '',
            playlist: 'morning vibe',
            isFavorite: false
          })
          window.location.href = '/songbook'
        } else {
          throw new Error('Failed to add song')
        }
      } catch (error) {
        toast.error('Error adding song. Please try again.')
      }
    }
  }

  return (
    <div className="container mt-4">
    <h1>Add New Song</h1>
    <SongForm 
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      errors={errors}
      buttonText="Publish"
    />
  </div>
);
}