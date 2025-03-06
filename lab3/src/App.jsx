import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./assets/components/Footer.jsx";
import Header from "./assets/components/Header.jsx";
import Menu from "./assets/pages/Menu.jsx";
import Basket from "./assets/pages/Basket.jsx";
import Orders from "./assets/pages/Orders.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
