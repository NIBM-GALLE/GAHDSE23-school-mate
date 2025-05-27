import { saveAs } from 'file-saver';

export const exportToCSV = (gradeReports, studentId) => {
  const headers = ["Subject", "Grade", "Date", "Feedback"];
  const csvContent = [
    headers.join(","),
    ...gradeReports.map(report => 
      [
        report.moduleId?.name || "Unknown Module",
        report.grade,
        new Date(report.date).toLocaleDateString(),
        (report.feedback || "").replace(/,/g, ";") // Replace commas in feedback to avoid CSV issues
      ].join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  saveAs(blob, `grade_reports_${studentId}.csv`);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};