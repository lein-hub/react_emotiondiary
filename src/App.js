import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import New from './pages/New.js';
import Edit from './pages/Edit.js';
import Diary from './pages/Diary.js';
import RouteTest from './components/RouteTest';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
        <RouteTest></RouteTest> 
      </div>
    </BrowserRouter>
  );
}

export default App;
