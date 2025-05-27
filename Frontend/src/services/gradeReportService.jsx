import API from './api';

export const GradeReportService = {
  // Get grade reports for a specific student
  getStudentGradeReports: async (studentId) => {
    try {
      const response = await API.get(`/grade-report/search?studentId=${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching grade reports:', error);
      throw error;
    }
  },

  // Get a specific grade report by ID
  getGradeReportById: async (reportId) => {
    try {
      const response = await API.get(`/grade-report/${reportId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching grade report:', error);
      throw error;
    }
  },

  // Search grade reports by filters
  searchGradeReports: async (filters) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.studentId) queryParams.append('studentId', filters.studentId);
      if (filters.moduleId) queryParams.append('moduleId', filters.moduleId);
      if (filters.grade) queryParams.append('grade', filters.grade);
      if (filters.date) queryParams.append('date', filters.date);
      
      const response = await API.get(`/grade-report/search?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error searching grade reports:', error);
      throw error;
    }
  }
};