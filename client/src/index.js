import * as ReactDOMClient from 'react-dom/client';
import React from 'react';
/* Comment for importing the app */
import App from './App';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);
root.render(<App />);