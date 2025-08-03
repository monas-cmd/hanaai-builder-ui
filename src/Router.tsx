import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import BuilderFlow from './pages/BuilderFlow';
import Preview from './pages/Preview';
// Make sure Published.tsx exists at ./pages/Published
import Published from './pages/Published';
// If the file is named differently or in another folder, update the path accordingly, e.g.:
// import Published from './pages/PublishedPage';
// import Published from '../components/Published';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <BuilderFlow />,
      },
      {
        path: 'preview',
        element: <Preview />,
      },
      {
        path: 'published',
        element: <Published />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}