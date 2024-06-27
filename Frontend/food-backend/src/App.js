import './App.css';
import Home from './screens/Home.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login.js';
// import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "bootstrap-dark-5/dist/css/bootstrap-dark.css.map";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from './screens/Signup.js';
import CartProvider from './components/ContextReducer.js';


function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
