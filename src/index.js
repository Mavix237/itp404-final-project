import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Root from './Routes/Root';
import Songbook from './Pages/Songbook';
import LyricsLog from './Pages/LyricsLog';
import Search from './Pages/Search';
import Instruction from './Routes/Instruction';
import Playlists from './Pages/Playlists';
import SongDetails from './Pages/SongDetails';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Root />,
        children: [
          {
            path: "/",
            element: <Instruction />,
          },
          {
            path: "/lyrics-log",
            element: <LyricsLog />,
          },
          {
            path: "/songbook",
            element: <Songbook />,
            children: [
              {
                path: ":id",
                element: <SongDetails />
              }
            ],
          },
          {
            path: "/search",
            element: <Search />,
          },
          {
            path:"/search/:query",
            element: <Search />,
          },
          {
            path: "/playlists",
            element: <Playlists />,
          }
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

