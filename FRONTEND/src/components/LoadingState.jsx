function LoadingState({ label = "Loading..." }) {
  return <div className="loading-state"><span aria-hidden="true" className="spinner" />{label}</div>;
}

export default LoadingState;
