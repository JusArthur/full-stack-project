import "./App.css";
import Footer from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <Menu />
      </main>
      <Footer />
    </div>
  );
}

export default App;
