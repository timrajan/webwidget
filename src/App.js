import React from 'react';
import "./App.css"
import AtalkiWidget from "./components/Widget"
function App({ domelement }) {
  const id = domelement.getAttribute("data-docid");
  const color = domelement.getAttribute("data-primary-color");
  const secColor = domelement.getAttribute("data-secondary-color");
  if (!id) {
    console.error("Doc id is required");
    return null;
  }

  return (
    <div className="container">
      <AtalkiWidget id={id} color={color || "#027ffb"} secColor={secColor} />
    </div>
  );
}

export default App;
