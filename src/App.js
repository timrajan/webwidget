import React from 'react';
import "./App.css"
import AtalkiWidget from "./components/Widget"
function App({ domelement }) {
  const id = domelement.getAttribute("data-docid");
  if (!id) {
    console.error("Doc id is required");
    return null;
  }

  return (
    <div className="container">
      <AtalkiWidget id={id} />
    </div>
  );
}

export default App;
