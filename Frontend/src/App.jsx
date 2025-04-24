import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./Pages/StudentLandingPage/StudentLogin";
import TeacherLogin from "./Pages/TeacherLandingPage/TeacherLogin";
import AdminLoginPage from "./Pages/AdminPortal/AdminPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
