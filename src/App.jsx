import "./App.css";
import Comments from "./components/comments";
import DataContext from "./context/DataContext";

function App() {
  return (
    <DataContext>
      <Comments />
    </DataContext>
  );
}

export default App;
