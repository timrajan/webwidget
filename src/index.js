import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const WidgetDivs = document.querySelectorAll('.atalki-widget')
// Inject our React App into each
WidgetDivs.forEach(Div => {
  ReactDOM.render(
    <React.StrictMode>
      <App domelement={Div} />
    </React.StrictMode>,
    Div
  );
})

