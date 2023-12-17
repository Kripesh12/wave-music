export default function Nav({ setLibraryState }) {
  return (
    <div className="nav">
      <h3>Wave</h3>
      <button
        className="nav-btn"
        onClick={() => setLibraryState((currentState) => !currentState)}
      >
        Library
      </button>
    </div>
  );
}
