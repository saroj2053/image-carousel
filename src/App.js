import "./App.css";
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";

function App() {
  return (
    <div className="app">
      <h2>Image Carousel</h2>
      <ImageCarousel
        url={"https://picsum.photos/v2/list"}
        page={"3"}
        limit={"7"}
      />
    </div>
  );
}

export default App;
