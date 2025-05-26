const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course'); // Import the course routes
const moduleRoutes = require('./routes/module'); // Import the module routes
const studentRoutes = require('./routes/student'); // Import the student routes
const studyMaterialRoutes = require('./routes/studyMaterial'); // Import the studyMaterial routes
const gradeReportRoutes = require('./routes/gradeReport'); // Import the gradeReport routes
const timetableRoutes = require('./routes/timetable'); // Import the timetable routes
const attendanceRoutes = require('./routes/attendance'); // Import the attendance routes
const announcementRoutes = require('./routes/announcement'); // Import the announcement routes
const examScheduleRoutes = require('./routes/examSchedule'); // Import the examSchedule routes
const facilityFeeRoutes = require('./routes/facilityFee'); // Import the facilityFee routes
const userRoutes = require('./routes/user'); // Import the user routes
const facilityPaymentRoutes = require('./routes/facilityPaymentRoutes'); // Import the facilityPayment routes
const parentRoutes = require('./routes/parentRoutes'); // Import the parent routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/courses', courseRoutes); // Course routes
app.use('/api/modules', moduleRoutes); // module routes
app.use('/api/student', studentRoutes); // student routes
app.use('/api/study-materials', studyMaterialRoutes); // studyMaterial routes
app.use('/api/grade-report', gradeReportRoutes); // gradeReport routes
app.use('/api/timetable', timetableRoutes); // timetable routes
app.use('/api/attendance', attendanceRoutes); // attendance routes
app.use('/api/announcement', announcementRoutes); // announcement routes
app.use('/api/exam-schedule', examScheduleRoutes); // examSchedule routes
app.use('/api/facility-fee', facilityFeeRoutes); // facilityFee routes
app.use('/api/user', userRoutes); // user routes
app.use('/api/facility-payments', facilityPaymentRoutes); // facilityPayment routes
app.use('/api/parent', parentRoutes); // parent routes

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
