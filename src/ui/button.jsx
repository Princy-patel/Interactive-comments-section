function Button({ event, children }) {
  return (
    <button
      onClick={event}
      className="bg-indigo-600 text-white font-medium px-3 rounded-md hover:bg-indigo-700 flex-shrink-0"
    >
      {children}
    </button>
  );
}

export default Button;
