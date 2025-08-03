import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className="error-page min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-500 mb-8">
          <i>{error.message || 'Unknown error'}</i>
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}