import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const GradeReportsList = ({ gradeReports, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-lg overflow-hidden border border-[#c4c4c4] dark:border-[#6a7285] p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#f3f3f3] dark:bg-[#6a7285] rounded w-full"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-[#f3f3f3] dark:bg-[#6a7285]/30 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!gradeReports || gradeReports.length === 0) {
    return (
      <div className="rounded-lg overflow-hidden border border-[#c4c4c4] dark:border-[#6a7285] p-8 text-center">
        <p className="text-[#6a7285] dark:text-[#c4c4c4]">No grade reports found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-[#c4c4c4] dark:border-[#6a7285]">
      <Table>
        <TableHeader className="bg-[#f3f3f3] dark:bg-[#6a7285]">
          <TableRow>
            <TableHead className="text-[#374258] dark:text-white font-semibold">Subject</TableHead>
            <TableHead className="text-[#374258] dark:text-white font-semibold">Grade</TableHead>
            <TableHead className="text-[#374258] dark:text-white font-semibold">Date</TableHead>
            <TableHead className="text-[#374258] dark:text-white font-semibold">Feedback</TableHead>
            <TableHead className="text-[#374258] dark:text-white font-semibold">Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gradeReports.map((report) => (
            <TableRow key={report._id} className="border-t border-[#c4c4c4] dark:border-[#6a7285]">
              <TableCell className="font-medium text-[#374258] dark:text-white">
                {report.moduleId?.name || "Unknown Module"}
              </TableCell>
              <TableCell>
                <Badge 
                  className={
                    report.grade === 'A' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    report.grade === 'B' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    report.grade === 'C' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }
                >
                  {report.grade}
                </Badge>
              </TableCell>
              <TableCell className="text-[#6a7285] dark:text-[#c4c4c4]">
                {new Date(report.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-[#6a7285] dark:text-[#c4c4c4] max-w-xs">
                {report.feedback || "No feedback provided"}
              </TableCell>
              <TableCell>
                {report.reportUrl ? (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-[#f74464] hover:bg-[#f74464]/10"
                    onClick={() => window.open(report.reportUrl, '_blank')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                ) : (
                  <span className="text-[#6a7285] dark:text-[#c4c4c4]">Not available</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GradeReportsList;