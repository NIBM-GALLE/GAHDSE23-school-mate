import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./Pages/StudentLandingPage/StudentLogin";
import TeacherLogin from "./Pages/TeacherLandingPage/TeacherLogin";
import AdminLoginPage from "./Pages/AdminPortal/AdminPortal";
import TeacherParentChat from "./Pages/TeacherChatPage/TeacherChatPage";
import TimeTableManager from "./Pages/TimeTableManager/TimeTableManager";
import AttendanceManager from "./Pages/AttendanceManager/AttendanceManager";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/teacher-chat" element={<TeacherParentChat />} />
        <Route path="/timetable-manager" element={<TimeTableManager />} />
        <Route path="/attendance-manager" element={<AttendanceManager />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Add more routes as needed */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
