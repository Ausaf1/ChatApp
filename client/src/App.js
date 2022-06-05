import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Messenger from "./components/Messenger";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/messenger/login" element={<Login />} exact />
        <Route path="/messenger/register" element={<Register />} exact />
        <Route path="/" element={<Messenger />} exact />
      </Routes>
    </Router>
  );
}

export default App;
