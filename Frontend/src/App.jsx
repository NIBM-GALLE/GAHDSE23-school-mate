import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
<<<<<<< HEAD
import StudyMaterial from "./Pages/StudyMaterial";
=======
import StudentLogin from "./Pages/StudentLandingPage/StudentLogin";
import TeacherLogin from "./Pages/TeacherLandingPage/TeacherLogin";
import AdminLoginPage from "./Pages/AdminPortal/AdminPortal";
import TeacherParentChat from "./Pages/TeacherChatPage/TeacherChatPage";
import UploadStudyMaterial from "./Pages/UploadStudyMaterial/UploadStudyMaterial";
import PublishExamSchedule from "./Pages/PublishExamSchedule/PublishExamSchedule";
import TimeTableManager from "./Pages/TimeTableManager/TimeTableManager";
import AttendanceManager from "./Pages/AttendanceManager/AttendanceManager";
import AnnouncementPosting from "./Pages/AnnouncementPosting/AnnouncementPosting";

>>>>>>> 63834f1de3bb435132818742a1d6d3bcb37fc6a2

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/study-material" />} />
        <Route path="/study-material" element={<StudyMaterial />} />
=======
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/teacher-chat" element={<TeacherParentChat />} />
        <Route path="/upload_studymaterial" element={<UploadStudyMaterial />} />
        <Route path="/publish_examschedule" element={<PublishExamSchedule />} />
        <Route path="/timetable-manager" element={<TimeTableManager />} />
        <Route path="/attendance-manager" element={<AttendanceManager />} />
        <Route path="/announcement_posting" element={<AnnouncementPosting />} />

        {/* Add more routes as needed */}


>>>>>>> 63834f1de3bb435132818742a1d6d3bcb37fc6a2
      </Routes>
    </BrowserRouter>
  );
}

export default App;
