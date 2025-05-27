import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./Pages/StudentLandingPage/StudentLogin";
import TeacherLogin from "./Pages/TeacherLandingPage/TeacherLogin";
import AdminLoginPage from "./Pages/AdminPortal/AdminPortal";
import TeacherParentChat from "./Pages/TeacherChatPage/TeacherChatPage";
import UploadStudyMaterial from "./Pages/UploadStudyMaterial/UploadStudyMaterial";
import TimeTableManager from "./Pages/TimeTableManager/TimeTableManager";
import AttendanceManager from "./Pages/AttendanceManager/AttendanceManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        <Route path="/teacher-chat" element={<TeacherParentChat />} />

        <Route path="/upload_studymaterial" element={<UploadStudyMaterial />} />

        <Route path="/timetable-manager" element={<TimeTableManager />} />
        <Route path="/attendance-manager" element={<AttendanceManager />} />
        {/* Add more routes as needed */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
