import React from 'react';
import { Trophy, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

const gradePoints = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 };

const PerformanceSummary = ({ gradeReports }) => {
  const calculateGPA = () => {
    if (!gradeReports || gradeReports.length === 0) return 0;
    const validGrades = gradeReports.filter(report => report.grade in gradePoints);
    if (validGrades.length === 0) return 0;
    const total = validGrades.reduce((sum, report) => sum + gradePoints[report.grade], 0);
    return (total / validGrades.length).toFixed(2);
  };

  const getGradeDistribution = () => {
    const distribution = {};
    Object.keys(gradePoints).forEach(grade => {
      distribution[grade] = gradeReports?.filter(r => r.grade === grade).length || 0;
    });
    return distribution;
  };

  const getRecentResults = () => {
    if (!gradeReports || gradeReports.length === 0) return [];
    return [...gradeReports]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* GPA Card */}
      <Card className="border border-[#c4c4c4] dark:border-[#6a7285]">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#f74464]/10">
              <Trophy className="h-5 w-5 text-[#f74464]" />
            </div>
            <CardTitle className="text-lg text-[#374258] dark:text-white">
              Average Grade
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#f74464] mb-2">
            {calculateGPA()}
          </div>
          <Progress 
            value={(Number(calculateGPA()) / 5) * 100} 
            className="h-2 bg-[#c4c4c4]"
          />
          <p className="text-sm text-[#6a7285] dark:text-[#c4c4c4] mt-2">
            Average out of 5.0 scale
          </p>
        </CardContent>
      </Card>

      {/* Grade Distribution Card */}
      <Card className="border border-[#c4c4c4] dark:border-[#6a7285]">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#f74464]/10">
              <TrendingUp className="h-5 w-5 text-[#f74464]" />
            </div>
            <CardTitle className="text-lg text-[#374258] dark:text-white">
              Grade Distribution
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(getGradeDistribution()).map(([grade, count]) => (
              <div key={grade} className="flex justify-between items-center">
                <span className="text-[#374258] dark:text-[#c4c4c4]">Grade {grade}</span>
                <span className="font-medium text-[#374258] dark:text-white">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Results Card */}
      <Card className="border border-[#c4c4c4] dark:border-[#6a7285]">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#f74464]/10">
              <Calendar className="h-5 w-5 text-[#f74464]" />
            </div>
            <CardTitle className="text-lg text-[#374258] dark:text-white">
              Recent Results
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getRecentResults().map(report => (
              <div key={report._id} className="flex justify-between items-center">
                <span className="text-[#374258] dark:text-[#c4c4c4] truncate">
                  {report.moduleId?.name || "Unknown Module"}
                </span>
                <Badge 
                  variant="outline"
                  className={
                    report.grade === 'A' ? 'border-green-200 text-green-800 dark:border-green-800 dark:text-green-200' :
                    report.grade === 'B' ? 'border-blue-200 text-blue-800 dark:border-blue-800 dark:text-blue-200' :
                    report.grade === 'C' ? 'border-yellow-200 text-yellow-800 dark:border-yellow-800 dark:text-yellow-200' :
                    'border-red-200 text-red-800 dark:border-red-800 dark:text-red-200'
                  }
                >
                  {report.grade}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceSummary;