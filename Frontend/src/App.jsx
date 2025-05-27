import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentGradeReport from "./Pages/StudentLandingPage/StudentGradeReport";
import TeacherGradeReports from "./components/TeacherGradeReports"; // ✅ Add this
import { ToastProvider } from "@/hooks/use-toast";
import { ToastViewport } from "@/components/ui/toast";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/grade-report" />} />
          <Route path="/grade-report" element={<StudentGradeReport />} />
          <Route path="/teacher/grade-reports" element={<TeacherGradeReports />} />
        </Routes>
      </BrowserRouter>
      <ToastViewport />
    </ToastProvider>
  );
}

export default App;
