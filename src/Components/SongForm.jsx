import React from 'react';


export default function SongForm({ 
  formData, 
  setFormData, 
  handleSubmit, 
  errors = {},
  buttonText = "Publish"
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Song Title</label>
        <input
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="artist" className="form-label">Artist Name</label>
        <input
          type="text"
          className={`form-control ${errors.artist ? 'is-invalid' : ''}`}
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
        {errors.artist && <div className="invalid-feedback">{errors.artist}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="genre" className="form-label">Genre</label>
        <select 
          className={`form-select ${errors.genre ? 'is-invalid' : ''}`}
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="">--Select a genre--</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="hip-hop">Hip-Hop</option>
          <option value="r&b">R&B</option>
          <option value="jazz">Jazz</option>
          <option value="classical">Classical</option>
          <option value="electronic">Electronic</option>
          <option value="country">Country</option>
          <option value="indie">Indie</option>
          <option value="k-pop">K-Pop</option>
        </select>
        {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="lyrics" className="form-label">Lyrics</label>
        <textarea 
          className={`form-control ${errors.lyrics ? 'is-invalid' : ''}`}
          id="lyrics"
          name="lyrics"
          value={formData.lyrics}
          onChange={handleChange}
          rows="3"
        />
        {errors.lyrics && <div className="invalid-feedback">{errors.lyrics}</div>}
      </div>

      <div className="mb-3">
        <p>Which playlist do you want to add to?</p>
        {["morning vibe", "night time", "on repeat"].map((playlistOption) => (
          <div key={playlistOption} className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id={`playlist-${playlistOption}`}
              name="playlist"
              value={playlistOption}
              checked={formData.playlist === playlistOption}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={`playlist-${playlistOption}`}>
              {playlistOption}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-3 form-check">
        <input 
          type="checkbox" 
          className="form-check-input"
          id="isFavorite"
          name="isFavorite"
          checked={formData.isFavorite}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="isFavorite">
          Add to favorites
        </label>
      </div>

      <button className="btn btn-primary" type="submit">
        {buttonText}
      </button>
    </form>
  );
}