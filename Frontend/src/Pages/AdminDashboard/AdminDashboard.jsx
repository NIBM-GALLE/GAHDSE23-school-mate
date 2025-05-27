import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Bell, 
  Clock, 
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [exams, setExams] = useState([]);
  const [payments, setPayments] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);

  // API Base URL
  const API_BASE = 'http://localhost:5000/api';

  // Fetch data functions
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/user`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`${API_BASE}/announcement`);
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE}/events`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await fetch(`${API_BASE}/exam`);
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_BASE}/payments`);
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchTimetables = async () => {
    try {
      const response = await fetch(`${API_BASE}/timetable`);
      const data = await response.json();
      setTimetables(data);
    } catch (error) {
      console.error('Error fetching timetables:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCourses();
    fetchAnnouncements();
    fetchEvents();
    fetchExams();
    fetchPayments();
    fetchTimetables();
  }, []);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'exams', label: 'Exams', icon: FileText },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'timetable', label: 'Timetable', icon: Clock },
  ];

  const DashboardOverview = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-slate-700">{users.length}</p>
            </div>
            <Users className="h-12 w-12 text-red-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-3xl font-bold text-slate-700">{courses.length}</p>
            </div>
            <BookOpen className="h-12 w-12 text-slate-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-slate-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Events</p>
              <p className="text-3xl font-bold text-slate-700">{events.length}</p>
            </div>
            <Calendar className="h-12 w-12 text-slate-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-3xl font-bold text-slate-700">{payments.filter(p => p.status === 'Pending').length}</p>
            </div>
            <DollarSign className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Recent Announcements</h3>
          <div className="space-y-3">
            {announcements.slice(0, 5).map((announcement) => (
              <div key={announcement._id} className="border-l-4 border-red-400 pl-4 py-2">
                <p className="font-medium text-slate-700">{announcement.title}</p>
                <p className="text-sm text-gray-600">{announcement.message}</p>
                <p className="text-xs text-gray-500 mt-1">Audience: {announcement.audience}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Upcoming Exams</h3>
          <div className="space-y-3">
            {exams.slice(0, 5).map((exam) => (
              <div key={exam._id} className="border-l-4 border-slate-600 pl-4 py-2">
                <p className="font-medium text-slate-700">{exam.title}</p>
                <p className="text-sm text-gray-600">{exam.subject}</p>
                <p className="text-xs text-gray-500 mt-1">Date: {exam.date} | Venue: {exam.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const UsersSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Users Management</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-slate-600 hover:text-slate-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const CoursesSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Courses Management</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{course.courseName}</h3>
            <p className="text-gray-600 mb-4">Director: {course.courseDirector?.firstName} {course.courseDirector?.lastName}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Created: {new Date(course.createdAt).toLocaleDateString()}</span>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AnnouncementsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Announcements</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{announcement.title}</h3>
                <p className="text-gray-600 mb-4">{announcement.message}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Type: {announcement.type}</span>
                  <span>Audience: {announcement.audience}</span>
                  <span>Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EventsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Events Management</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-slate-800">{event.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                event.eventType === 'Competition' ? 'bg-red-100 text-red-800' :
                event.eventType === 'Sports' ? 'bg-blue-100 text-blue-800' :
                event.eventType === 'Academic' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.eventType}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Max Participants: {event.maxParticipants}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="text-slate-600 hover:text-slate-900">
                <Eye className="h-4 w-4" />
              </button>
              <button className="text-blue-600 hover:text-blue-900">
                <Edit className="h-4 w-4" />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ExamsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Exams Schedule</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Schedule Exam
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.startTime} - {exam.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.venue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button className="text-slate-600 hover:text-slate-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const PaymentsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Payments Management</h2>
        <div className="flex gap-2">
          <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Fee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Total Collected</h3>
          <p className="text-3xl font-bold text-green-600">₹45,000</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">₹12,000</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Overdue</h3>
          <p className="text-3xl font-bold text-red-600">₹3,500</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.studentId?.firstName} {payment.studentId?.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.feeId?.feeType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{payment.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button className="text-slate-600 hover:text-slate-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TimetableSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Timetable Management</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Schedule
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timetables.map((entry) => (
              <tr key={entry._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.day}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.timeSlot}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.teacherId?.firstName} {entry.teacherId?.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.room}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.courseId?.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UsersSection />;
      case 'courses':
        return <CoursesSection />;
      case 'announcements':
        return <AnnouncementsSection />;
      case 'events':
        return <EventsSection />;
      case 'exams':
        return <ExamsSection />;
      case 'payments':
        return <PaymentsSection />;
      case 'timetable':
        return <TimetableSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-slate-300 text-sm mt-1">School Management System</p>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-slate-700 transition-colors ${
                  activeTab === item.id ? 'bg-slate-700 border-r-4 border-red-400' : ''
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 capitalize">
                {activeTab === 'dashboard' ? 'Dashboard' : activeTab}
              </h2>
              <p className="text-gray-600 text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-400" />
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {announcements.length}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Admin User</p>
                  <p className="text-xs text-gray-600">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;