import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import RoutePage from "./router/RoutePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <RoutePage />
      </BrowserRouter>
    </>
  );
}

export default App;
