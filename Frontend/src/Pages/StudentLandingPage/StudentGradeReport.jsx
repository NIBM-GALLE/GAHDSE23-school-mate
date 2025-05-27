import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { GraduationCap, School, FileDown, BookOpen, Trophy, TrendingUp, Calendar, Download } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import GradeReportsList from "../../components/GradeReportsList";
import PerformanceSummary from "../../components/PerformanceSummary";
import { GradeReportService } from "../../services/gradeReportService";
import { exportToCSV } from "../../utils/exportUtils";

const StudentGradeReport = () => {
  const [studentId, setStudentId] = useState("");
  const [gradeReports, setGradeReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchGradeReports = async () => {
    if (!studentId.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a student ID",
        variant: "destructive",
        style: { backgroundColor: '#f74464', color: 'white' }
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await GradeReportService.searchGradeReports({ studentId });
      setGradeReports(response);
      
      toast({
        title: "Success!",
        description: "Grade reports loaded successfully",
        style: { backgroundColor: '#6a7285', color: 'white' }
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch grade reports');
      
      toast({
        title: "Error",
        description: err.message || 'Failed to fetch grade reports',
        variant: "destructive",
        style: { backgroundColor: '#f74464', color: 'white' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    if (gradeReports.length === 0) {
      toast({
        title: "No Data",
        description: "There are no grade reports to download",
        variant: "destructive"
      });
      return;
    }
    
    exportToCSV(gradeReports, studentId);
    
    toast({
      title: "Download Complete",
      description: "Your grade reports have been downloaded as CSV"
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] dark:bg-[#374258] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#f74464]/10 mb-4 animate-bounce">
            <GraduationCap className="h-8 w-8 text-[#f74464]" />
          </div>
          <h1 className="text-4xl font-bold text-[#374258] dark:text-white mb-2">
             Student <span className="text-[#f74464]">Grade Portal</span>
          </h1>
          <p className="text-lg text-[#6a7285] dark:text-[#c4c4c4]">
            Track your Advanced Level academic progress
          </p>
        </div>

        {/* Student ID Input Card */}
        <Card className="mb-8 border-0 shadow-md bg-white dark:bg-[#374258]/90">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#f74464]/10">
                <School className="h-5 w-5 text-[#f74464]" />
              </div>
              <div>
                <CardTitle className="text-xl text-[#374258] dark:text-white">
                  Student Information
                </CardTitle>
                <CardDescription className="text-[#6a7285] dark:text-[#c4c4c4]">
                  Enter your student ID to view grade reports
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#374258] dark:text-[#c4c4c4] mb-2">
                  Student ID
                </label>
                <Input
                  placeholder="Enter your A/L student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="bg-white dark:bg-[#374258]/70 border-[#c4c4c4] focus:border-[#f74464]"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={fetchGradeReports} 
                  className="w-full bg-[#f74464] hover:bg-[#f74464]/90 text-white shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <School className="mr-2 h-4 w-4" />
                      View Grade Reports
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {(gradeReports.length > 0 || isLoading) && (
          <div className={`space-y-6 ${!isLoading && "animate-in fade-in-50"}`}>
            {/* Grade Reports Card */}
            <Card className="border-0 shadow-md bg-white dark:bg-[#374258]/90">
              <CardHeader className="border-b border-[#c4c4c4] dark:border-[#6a7285]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className="bg-[#f74464]/10 text-[#f74464] border-[#f74464]/20">
                        A/L STUDENT
                      </Badge>
                      <Badge className="bg-[#6a7285]/10 text-[#6a7285] border-[#6a7285]/20">
                        ID: {studentId}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-[#f74464]" />
                      <CardTitle className="text-2xl text-[#374258] dark:text-white">
                        Advanced Level Grade Reports
                      </CardTitle>
                    </div>
                    <CardDescription className="text-[#6a7285] dark:text-[#c4c4c4] mt-1">
                      2024/2025 Academic Year
                    </CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleDownloadCSV} 
                      className="bg-white/50 dark:bg-gray-800/50 transition-all duration-200 hover:bg-primary hover:text-white"
                      disabled={isLoading || gradeReports.length === 0}
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      CSV Report
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Tabs defaultValue="reports">
                  <TabsList className="grid w-full grid-cols-2 bg-[#f3f3f3] dark:bg-[#374258] p-2">
                    <TabsTrigger 
                      value="reports" 
                      className="flex items-center gap-2 data-[state=active]:bg-[#f74464] data-[state=active]:text-white"
                    >
                      <BookOpen className="h-4 w-4" />
                      Subject Grades
                    </TabsTrigger>
                    <TabsTrigger 
                      value="summary" 
                      className="flex items-center gap-2 data-[state=active]:bg-[#f74464] data-[state=active]:text-white"
                    >
                      <FileDown className="h-4 w-4" />
                      Performance Summary
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="reports" className="p-4">
                    <GradeReportsList gradeReports={gradeReports} isLoading={isLoading} />
                  </TabsContent>

                  <TabsContent value="summary" className="p-4">
                    <PerformanceSummary gradeReports={gradeReports} />
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="bg-[#f3f3f3] dark:bg-[#6a7285]/20 p-4 border-t border-[#c4c4c4] dark:border-[#6a7285]">
                <p className="text-sm text-[#6a7285] dark:text-[#c4c4c4]">
                  {error ? (
                    <span className="text-red-500">{error}</span>
                  ) : (
                    "Connected to server: Reports fetched from API"
                  )}
                </p>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGradeReport;