import "./App.css"
import AtalkiWidget from "./components/Widget"
function App({ domelement }) {
  const id = domelement.getAttribute("data-docid");
  console.log(id)
  return (
    <div className="container">
      <AtalkiWidget />
    </div>
  );
}

export default App;
