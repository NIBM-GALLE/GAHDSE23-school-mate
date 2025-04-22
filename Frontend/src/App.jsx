import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./Pages/StudentLandingPage/StudentLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<StudentLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
