import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileDown, GraduationCap, School, Calendar, User, BookOpen, Trophy, Star, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for A/L students
const mockGradeReports = [
  {
    _id: "1",
    moduleId: { _id: "m1", name: "Combined Mathematics" },
    date: "2023-10-15",
    grade: "A",
    reportUrl: "#",
    feedback: "Excellent performance in calculus and algebra"
  },
  {
    _id: "2",
    moduleId: { _id: "m2", name: "Physics" },
    date: "2023-11-20",
    grade: "B",
    reportUrl: "#",
    feedback: "Good understanding of concepts, needs more practice in practicals"
  },
  {
    _id: "3",
    moduleId: { _id: "m3", name: "Chemistry" },
    date: "2023-09-05",
    grade: "A",
    reportUrl: "#",
    feedback: "Outstanding performance in organic chemistry"
  },
  {
    _id: "4",
    moduleId: { _id: "m4", name: "General English" },
    date: "2023-12-10",
    grade: "C",
    feedback: "Needs improvement in essay writing"
  }
];

const gradePoints = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 };

// Color palette
const colors = {
  primary: '#f74464',    // Vibrant pink/red
  dark: '#374258',       // Dark navy blue
  medium: '#6a7285',     // Medium slate gray
  light: '#c4c4c4',      // Light gray
  background: '#f3f3f3'  // Off-white background
};

const ALGradesReports = () => {
  const [studentId, setStudentId] = useState("");
  const [gradeReports, setGradeReports] = useState([]);
  const { toast } = useToast();

  const loadMockData = () => {
    if (!studentId.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a student ID",
        variant: "destructive"
      });
      return;
    }
    
    setGradeReports(mockGradeReports);
    toast({
      title: "Demo Mode Active",
      description: "Showing mock A/L grade report data"
    });
  };

  const calculateGPA = () => {
    if (gradeReports.length === 0) return 0;
    const validGrades = gradeReports.filter(report => report.grade in gradePoints);
    if (validGrades.length === 0) return 0;
    const total = validGrades.reduce((sum, report) => sum + gradePoints[report.grade], 0);
    return (total / validGrades.length).toFixed(2);
  };

  const downloadCSV = () => {
    const headers = ["Subject", "Grade", "Date", "Feedback"];
    const csvContent = [
      headers.join(","),
      ...gradeReports.map(report => 
        [
          report.moduleId.name,
          report.grade,
          new Date(report.date).toLocaleDateString(),
          report.feedback || ""
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `al_grade_reports_${studentId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: "Your A/L grade reports have been downloaded as CSV"
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 pt-8">
          <div className="inline-block p-3 rounded-lg mb-3" style={{ backgroundColor: `${colors.primary}20` }}>
            <GraduationCap className="h-10 w-10" style={{ color: colors.primary }} />
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.dark})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            A/L Student Grade Portal
          </h1>
          <p style={{ color: colors.medium }}>Track your Advanced Level academic progress</p>
        </div>

        <Card className="mb-6 shadow-lg" style={{ 
          backgroundColor: 'white',
          borderColor: colors.light
        }}>
          <CardHeader className="space-y-1 pb-3">
            <CardTitle className="text-xl flex items-center gap-2" style={{ color: colors.dark }}>
              <User className="h-5 w-5" style={{ color: colors.primary }} />
              Student Information
            </CardTitle>
            <p style={{ color: colors.medium }}>Enter your student ID to view grade reports</p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: colors.dark }}>Student ID</label>
              <Input
                placeholder="Enter your A/L student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                style={{ 
                  backgroundColor: 'white',
                  borderColor: colors.light
                }}
              />
            </div>
            <div className="space-y-2 flex items-end">
              <Button 
                onClick={loadMockData} 
                disabled={!studentId}
                className="w-full"
                style={{ 
                  backgroundColor: colors.primary,
                  color: 'white'
                }}
              >
                <School className="mr-2 h-4 w-4" />
                View Grade Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        {gradeReports.length > 0 && (
          <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5">
            <Card className="shadow-lg" style={{ 
              backgroundColor: 'white',
              borderColor: colors.light
            }}>
              <CardHeader className="border-b" style={{ borderColor: colors.light }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" style={{ 
                        backgroundColor: `${colors.primary}10`, 
                        color: colors.primary,
                        borderColor: colors.primary
                      }}>
                        A/L STUDENT
                      </Badge>
                      <Badge variant="outline" style={{ 
                        backgroundColor: `${colors.primary}10`, 
                        color: colors.primary,
                        borderColor: colors.primary
                      }}>
                        ID: {studentId}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl flex items-center gap-2" style={{ color: colors.dark }}>
                      <BookOpen className="h-5 w-5" style={{ color: colors.primary }} />
                      Advanced Level Grade Reports
                    </CardTitle>
                    <p style={{ color: colors.medium }}>
                      {new Date().getFullYear() - 1}/{new Date().getFullYear()} Academic Year
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={downloadCSV}
                      style={{
                        borderColor: colors.light,
                        color: colors.dark
                      }}
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="reports">
                  <TabsList className="grid w-full grid-cols-2 mb-4" style={{ 
                    backgroundColor: colors.light,
                    borderColor: colors.light
                  }}>
                    <TabsTrigger 
                      value="reports" 
                      className="flex items-center gap-2"
                      style={{ color: colors.dark }}
                    >
                      <Star className="h-4 w-4" />
                      Subject Grades
                    </TabsTrigger>
                    <TabsTrigger 
                      value="summary" 
                      className="flex items-center gap-2"
                      style={{ color: colors.dark }}
                    >
                      <TrendingUp className="h-4 w-4" />
                      Performance Summary
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="reports">
                    <div className="rounded-lg border overflow-hidden" style={{ 
                      backgroundColor: 'white',
                      borderColor: colors.light
                    }}>
                      <Table>
                        <TableHeader>
                          <TableRow style={{ backgroundColor: colors.background }}>
                            <TableHead className="font-semibold" style={{ color: colors.dark }}>Subject</TableHead>
                            <TableHead className="font-semibold" style={{ color: colors.dark }}>Grade</TableHead>
                            <TableHead className="font-semibold" style={{ color: colors.dark }}>Date</TableHead>
                            <TableHead className="font-semibold" style={{ color: colors.dark }}>Feedback</TableHead>
                            <TableHead className="font-semibold" style={{ color: colors.dark }}>Report</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gradeReports.map((report) => (
                            <TableRow key={report._id}>
                              <TableCell className="font-medium" style={{ color: colors.dark }}>{report.moduleId.name}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  style={{
                                    borderColor: colors.primary,
                                    color: colors.dark,
                                    backgroundColor: `${colors.primary}10`
                                  }}
                                >
                                  {report.grade}
                                </Badge>
                              </TableCell>
                              <TableCell style={{ color: colors.medium }}>{new Date(report.date).toLocaleDateString()}</TableCell>
                              <TableCell className="max-w-xs truncate" style={{ color: colors.medium }}>{report.feedback || "No feedback provided"}</TableCell>
                              <TableCell>
                                {report.reportUrl ? (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    style={{ color: colors.primary }}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                ) : (
                                  <span style={{ color: colors.medium }}>Not available</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="summary">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card style={{ backgroundColor: colors.background }}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2" style={{ color: colors.dark }}>
                            <Trophy className="h-5 w-5" style={{ color: colors.primary }} />
                            Average Grade
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>{calculateGPA()}</div>
                          <Progress 
                            value={(Number(calculateGPA()) / 5) * 100} 
                            className="h-2 mb-2"
                            style={{ 
                              backgroundColor: colors.light,
                              color: colors.primary
                            }}
                          />
                          <p className="text-sm" style={{ color: colors.medium }}>Average out of 5.0 scale</p>
                        </CardContent>
                      </Card>
                      
                      <Card style={{ backgroundColor: colors.background }}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2" style={{ color: colors.dark }}>
                            <TrendingUp className="h-5 w-5" style={{ color: colors.primary }} />
                            Grade Distribution
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {Object.entries(gradePoints).map(([grade, points]) => (
                              <div key={grade} className="flex justify-between items-center">
                                <span style={{ color: colors.dark }}>Grade {grade}:</span>
                                <span style={{ color: colors.dark }}>
                                  {gradeReports.filter(r => r.grade === grade).length}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card style={{ backgroundColor: colors.background }}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2" style={{ color: colors.dark }}>
                            <Calendar className="h-5 w-5" style={{ color: colors.primary }} />
                            Recent Results
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {gradeReports
                              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                              .slice(0, 3)
                              .map(report => (
                                <div key={report._id} className="flex justify-between">
                                  <span className="truncate" style={{ color: colors.dark }}>{report.moduleId.name}</span>
                                  <Badge 
                                    variant="outline" 
                                    style={{ 
                                      color: colors.primary,
                                      borderColor: colors.primary,
                                      backgroundColor: `${colors.primary}10`
                                    }}
                                  >
                                    {report.grade}
                                  </Badge>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="p-3" style={{ backgroundColor: colors.background }}>
                <p className="text-sm" style={{ color: colors.medium }}>
                  This is a demo using mock data. In a real application, data would be fetched from the server.
                </p>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ALGradesReports;