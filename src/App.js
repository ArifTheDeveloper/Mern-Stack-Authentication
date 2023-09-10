
import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
    <Header/>
         <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Error />} />

          </Routes>
    </div>
  );
}

export default App;
