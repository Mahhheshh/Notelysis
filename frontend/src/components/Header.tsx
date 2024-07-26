import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold">
        Amazing Notes
      </Link>
      {location.pathname !== "/" ? (
        <Link
          to="/"
          className="text-gray-200 hover:text-white bg-blue-500 hover:bg-blue-600 rounded-lg py-2 px-4"
        >
          Go Back
        </Link>
      ) : (
        <Link
          to="/new"
          className="text-gray-200 hover:text-white bg-blue-500 hover:bg-blue-600 rounded-lg py-2 px-4"
        >
          New Note
        </Link>
      )}
    </header>
  );
}
