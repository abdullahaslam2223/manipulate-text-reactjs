import { useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [btnText, setBtnText] = useState("Change Mode");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => setAlert(null), 1000);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      setBtnText("Set Default Mode");
      const color = document.getElementById('color').value;
      document.body.style.backgroundColor = color;
      document.body.style.color = 'white';
      document.getElementById('colorPicker').style.visibility = "hidden";
      showAlert("Mode Changed", "Success");
    } else {
      setMode('light');
      setBtnText("Change Mode");
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      document.getElementById('colorPicker').style.visibility = "visible";
      showAlert("Default Mode Enabled", "Success");
    }
  }

  return (
    <>
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} btnText={btnText} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path='/' element={<TextForm heading="Enter your text to analyze" showAlert={showAlert} />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

