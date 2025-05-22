import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudyMaterial from "./Pages/StudyMaterial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/study-material" />} />
        <Route path="/study-material" element={<StudyMaterial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
