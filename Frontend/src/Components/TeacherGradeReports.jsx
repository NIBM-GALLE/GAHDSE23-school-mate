import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter,} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from '@/components/ui/table';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from '@/components/ui/select';
import { Loader } from '@/components/ui/Loader';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

export default function TeacherGradeReports() {
  const { toast } = useToast();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [modules, setModules] = useState([]);
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for new grade report
  const [formData, setFormData] = useState({
    studentId: '',
    moduleId: '',
    grade: '',
    feedback: '',
    reportUrl: '',
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockModules = [
          { _id: '1', name: 'Mathematics' },
          { _id: '2', name: 'Science' },
          { _id: '3', name: 'Literature' },
        ];
        const mockStudents = [
          { _id: '1', name: 'John Doe', email: 'john@example.com' },
          { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
          { _id: '3', name: 'Alex Johnson', email: 'alex@example.com' },
        ];
        const mockReports = [
          {
            _id: '1',
            studentId: { _id: '1', name: 'John Doe', email: 'john@example.com' },
            moduleId: { _id: '1', name: 'Mathematics' },
            grade: 'A',
            feedback: 'Excellent work throughout the semester. Demonstrated deep understanding of all concepts.',
            date: new Date('2023-05-15'),
            reportUrl: 'https://example.com/reports/john-math.pdf',
          },
          {
            _id: '2',
            studentId: { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
            moduleId: { _id: '2', name: 'Science' },
            grade: 'B+',
            feedback: 'Good performance with room for improvement in lab work.',
            date: new Date('2023-05-18'),
            reportUrl: 'https://example.com/reports/jane-science.pdf',
          },
          {
            _id: '3',
            studentId: { _id: '3', name: 'Alex Johnson', email: 'alex@example.com' },
            moduleId: { _id: '3', name: 'Literature' },
            grade: 'A-',
            feedback: 'Strong analytical skills but could improve writing structure.',
            date: new Date('2023-05-20'),
          },
        ];

        setModules(mockModules);
        setStudents(mockStudents);
        setReports(mockReports);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch data',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newReport = {
        _id: Date.now().toString(),
        studentId: students.find(s => s._id === formData.studentId),
        moduleId: modules.find(m => m._id === formData.moduleId),
        grade: formData.grade,
        feedback: formData.feedback,
        date: new Date(),
        reportUrl: formData.reportUrl,
      };

      setReports(prev => [...prev, newReport]);
      toast({
        title: 'Success',
        description: 'Grade report published successfully',
      });
      setFormData({
        studentId: '',
        moduleId: '',
        grade: '',
        feedback: '',
        reportUrl: '',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to publish grade report',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = searchTerm === '' || 
      report.studentId.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.moduleId.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.grade.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesModule = selectedModule === 'all' || report.moduleId._id === selectedModule;
    
    return matchesSearch && matchesModule;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#374258]">Grade Management</h1>
          <p className="text-[#6a7285] mt-2">View and manage student grade reports</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Form */}
          <div className="lg:w-1/3">
            <Card className="border border-[#c4c4c4] shadow-sm">
              <CardHeader className="bg-[#374258] rounded-t-lg">
                <CardTitle className="text-white">Publish New Grade</CardTitle>
                <CardDescription className="text-[#c4c4c4]">
                  Submit a new grade report for a student
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="studentId" className="block text-sm font-medium text-[#374258] mb-2">
                      Student
                    </label>
                    <Select 
                      value={formData.studentId} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, studentId: value }))}
                    >
                      <SelectTrigger className="w-full border-[#c4c4c4] hover:border-[#6a7285] focus:ring-2 focus:ring-[#f74464]/50">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent className="border-[#c4c4c4] shadow-lg">
                        {students.map(student => (
                          <SelectItem key={student._id} value={student._id} className="hover:bg-[#f3f3f3]">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-[#f74464] flex items-center justify-center text-white text-xs font-medium">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-[#374258]">{student.name}</p>
                                <p className="text-xs text-[#6a7285]">{student.email}</p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="moduleId" className="block text-sm font-medium text-[#374258] mb-2">
                      Module
                    </label>
                    <Select 
                      value={formData.moduleId} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, moduleId: value }))}
                    >
                      <SelectTrigger className="w-full border-[#c4c4c4] hover:border-[#6a7285] focus:ring-2 focus:ring-[#f74464]/50">
                        <SelectValue placeholder="Select module" />
                      </SelectTrigger>
                      <SelectContent className="border-[#c4c4c4] shadow-lg">
                        {modules.map(module => (
                          <SelectItem key={module._id} value={module._id} className="hover:bg-[#f3f3f3]">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-md bg-[#374258] flex items-center justify-center text-white text-xs font-medium">
                                {module.name.charAt(0)}
                              </div>
                              <span className="text-[#374258]">{module.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-[#374258] mb-2">
                        Grade
                      </label>
                      <Select 
                        value={formData.grade} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}
                      >
                        <SelectTrigger className="w-full border-[#c4c4c4] hover:border-[#6a7285] focus:ring-2 focus:ring-[#f74464]/50">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent className="border-[#c4c4c4] shadow-lg">
                          {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'].map(grade => (
                            <SelectItem key={grade} value={grade} className="hover:bg-[#f3f3f3]">
                              <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                  grade === 'A' ? 'bg-green-100 text-green-800' :
                                  grade.includes('B') ? 'bg-blue-100 text-blue-800' :
                                  grade.includes('C') ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {grade}
                                </div>
                                <span className="text-[#374258]">{grade}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-[#374258] mb-2">
                        Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal border-[#c4c4c4] hover:border-[#6a7285] focus:ring-2 focus:ring-[#f74464]/50",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-[#6a7285]" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-[#c4c4c4] shadow-lg">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="bg-white rounded-md"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reportUrl" className="block text-sm font-medium text-[#374258] mb-2">
                      Report URL (optional)
                    </label>
                    <Input
                      type="url"
                      id="reportUrl"
                      name="reportUrl"
                      value={formData.reportUrl}
                      onChange={handleInputChange}
                      className="border-[#c4c4c4] hover:border-[#6a7285] focus:ring-2 focus:ring-[#f74464]/50"
                      placeholder="https://example.com/report.pdf"
                    />
                  </div>

                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-[#374258] mb-2">
                      Feedback
                    </label>
                    <Textarea
                      id="feedback"
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      className="border-[#c4c4c4] hover:border-[#6a7285] focus:ring-2 focus:ring-[#f74464]/50 min-h-[120px]"
                      placeholder="Enter detailed feedback for the student..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#f74464] hover:bg-[#e03a58] text-white font-medium py-3 rounded-md transition-colors shadow-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader className="h-4 w-4 text-white" />
                        Publishing...
                      </span>
                    ) : 'Publish Grade Report'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Reports list */}
          <div className="lg:w-2/3">
            <Card className="border border-[#c4c4c4] shadow-sm">
              <CardHeader className="bg-[#374258] rounded-t-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-white">Grade Reports</CardTitle>
                    <CardDescription className="text-[#c4c4c4]">
                      {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="text"
                      placeholder="Search reports..."
                      className="flex-1 border-[#c4c4c4] hover:border-[#6a7285] focus:ring-2 focus:ring-[#f74464]/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select 
                      value={selectedModule} 
                      onValueChange={setSelectedModule}
                    >
                      <SelectTrigger className="w-[180px] border-[#c4c4c4] hover:border-[#6a7285] focus:ring-2 focus:ring-[#f74464]/50">
                        <SelectValue placeholder="Filter by module" />
                      </SelectTrigger>
                      <SelectContent className="border-[#c4c4c4] shadow-lg">
                        <SelectItem value="all" className="hover:bg-[#f3f3f3]">All Modules</SelectItem>
                        {modules.map(module => (
                          <SelectItem key={module._id} value={module._id} className="hover:bg-[#f3f3f3]">
                            {module.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader className="bg-[#f3f3f3]">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-[#374258] font-medium py-3 pl-6">Student</TableHead>
                        <TableHead className="text-[#374258] font-medium py-3">Module</TableHead>
                        <TableHead className="text-[#374258] font-medium py-3">Grade</TableHead>
                        <TableHead className="text-[#374258] font-medium py-3">Date</TableHead>
                        <TableHead className="text-right text-[#374258] font-medium py-3 pr-6">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.length > 0 ? (
                        filteredReports.map(report => (
                          <TableRow key={report._id} className="border-b border-[#c4c4c4]/50 hover:bg-[#f3f3f3]/50">
                            <TableCell className="py-4 pl-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#f74464] flex items-center justify-center text-white font-medium">
                                  {report.studentId.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium text-[#374258]">{report.studentId.name}</p>
                                  <p className="text-xs text-[#6a7285]">{report.studentId.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-md bg-[#374258] flex items-center justify-center text-white text-xs font-medium">
                                  {report.moduleId.name.charAt(0)}
                                </div>
                                <span className="text-[#374258]">{report.moduleId.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                                report.grade === 'A' ? 'bg-green-100 text-green-800' :
                                report.grade.includes('B') ? 'bg-blue-100 text-blue-800' :
                                report.grade.includes('C') ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {report.grade}
                              </span>
                            </TableCell>
                            <TableCell className="py-4 text-[#374258]">
                              {format(new Date(report.date), 'MMM dd, yyyy')}
                            </TableCell>
                            <TableCell className="py-4 pr-6 text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-[#c4c4c4] text-[#374258] hover:bg-[#f3f3f3] hover:border-[#6a7285] focus:ring-2 focus:ring-[#f74464]/50"
                                onClick={() => {
                                  toast({
                                    title: (
                                      <div className="flex items-center gap-2">
                                        <span className="text-[#374258]">Grade Report Details</span>
                                      </div>
                                    ),
                                    description: (
                                      <div className="mt-2 space-y-3">
                                        <div className="flex items-start gap-4">
                                          <div className="w-12 h-12 rounded-full bg-[#f74464] flex items-center justify-center text-white font-medium mt-1">
                                            {report.studentId.name.charAt(0)}
                                          </div>
                                          <div>
                                            <h4 className="font-medium text-[#374258]">{report.studentId.name}</h4>
                                            <p className="text-sm text-[#6a7285]">{report.studentId.email}</p>
                                          </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                          <div>
                                            <p className="text-sm text-[#6a7285]">Module</p>
                                            <p className="font-medium text-[#374258]">{report.moduleId.name}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-[#6a7285]">Grade</p>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                              report.grade === 'A' ? 'bg-green-100 text-green-800' :
                                              report.grade.includes('B') ? 'bg-blue-100 text-blue-800' :
                                              report.grade.includes('C') ? 'bg-yellow-100 text-yellow-800' :
                                              'bg-red-100 text-red-800'
                                            }`}>
                                              {report.grade}
                                            </span>
                                          </div>
                                          <div>
                                            <p className="text-sm text-[#6a7285]">Date</p>
                                            <p className="font-medium text-[#374258]">{format(new Date(report.date), 'PPP')}</p>
                                          </div>
                                          {report.reportUrl && (
                                            <div>
                                              <p className="text-sm text-[#6a7285]">Report</p>
                                              <a 
                                                href={report.reportUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-[#f74464] hover:underline font-medium text-sm"
                                              >
                                                View PDF
                                              </a>
                                            </div>
                                          )}
                                        </div>
                                        
                                        <div className="mt-4">
                                          <p className="text-sm text-[#6a7285]">Feedback</p>
                                          <p className="text-[#374258] mt-1">{report.feedback}</p>
                                        </div>
                                      </div>
                                    ),
                                  });
                                }}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow className="hover:bg-transparent">
                          <TableCell colSpan={5} className="py-12 text-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <svg className="w-12 h-12 text-[#c4c4c4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <h3 className="text-lg font-medium text-[#374258]">No grade reports found</h3>
                              <p className="text-[#6a7285]">Try adjusting your search or filter criteria</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}