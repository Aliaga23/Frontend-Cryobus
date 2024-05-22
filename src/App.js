import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;
