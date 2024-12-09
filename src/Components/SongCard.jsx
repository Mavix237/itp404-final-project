export default function SongCard({ song, showActions = false, onDelete }) {
  return (
    <div className="card mb-3 bg-blue-700">
      <div className="card-body">
        <h5 className="card-title">{song.title}</h5>
        <h6 className="card-subtitle mb-2 text-gray-300">
          Genre: {song.genre}
          {song.isFavorite && <span className="ms-2">❤️</span>}
        </h6>
        <div className="card-text lyrics-preview">
          {song.lyrics?.substring(0, 100)}...
        </div>
        <div className="mt-2">
          <a href={`/songbook/${song.id}`} className="btn btn-primary btn-sm">
            View Details
          </a>
          {showActions && (
            <button 
              onClick={() => onDelete(song.id)} 
              className="btn btn-sm ms-2"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

