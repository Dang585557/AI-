import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Add Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faComments, 
  faNewspaper, 
  faRobot, 
  faSpinner, 
  faTimes,
  faPaperPlane,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faThumbsUp, 
  faComment, 
  faShareSquare 
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faComments, 
  faNewspaper, 
  faRobot, 
  faSpinner, 
  faTimes,
  faPaperPlane,
  faExclamationCircle,
  faThumbsUp, 
  faComment, 
  faShareSquare
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
