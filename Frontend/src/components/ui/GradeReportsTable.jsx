// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Download, FileDown, BookOpen, Trophy, Star, TrendingUp, Calendar } from "lucide-react";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const GradeReportsTable = ({ studentId, gradeReports, downloadCSV, calculateGPA, gradePoints }) => {
//   return (
//     <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5">
//       <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90">
//         <CardHeader className="border-b dark:border-gray-700">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <Badge variant="outline" className="bg-primary/10 text-primary">
//                   A/L STUDENT
//                 </Badge>
//                 <Badge variant="outline" className="bg-primary/10 text-primary">
//                   ID: {studentId}
//                 </Badge>
//               </div>
//               <CardTitle className="text-xl flex items-center gap-2">
//                 <BookOpen className="h-5 w-5 text-primary" />
//                 Advanced Level Grade Reports
//               </CardTitle>
//               <CardDescription>
//                 {new Date().getFullYear() - 1}/{new Date().getFullYear()} Academic Year
//               </CardDescription>
//             </div>
//             <div className="flex gap-3">
//               <Button variant="outline" onClick={downloadCSV} className="bg-white/70 dark:bg-gray-800/70">
//                 <FileDown className="mr-2 h-4 w-4" />
//                 Export CSV
//               </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-4">
//           <Tabs defaultValue="reports">
//             <TabsList className="grid w-full grid-cols-2 mb-4">
//               <TabsTrigger value="reports" className="flex items-center gap-2">
//                 <Star className="h-4 w-4" />
//                 Subject Grades
//               </TabsTrigger>
//               <TabsTrigger value="summary" className="flex items-center gap-2">
//                 <TrendingUp className="h-4 w-4" />
//                 Performance Summary
//               </TabsTrigger>
//             </TabsList>
//             <TabsContent value="reports">
//               <div className="rounded-lg border dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-gray-50 dark:bg-gray-900">
//                       <TableHead className="font-semibold">Subject</TableHead>
//                       <TableHead className="font-semibold">Grade</TableHead>
//                       <TableHead className="font-semibold">Date</TableHead>
//                       <TableHead className="font-semibold">Feedback</TableHead>
//                       <TableHead className="font-semibold">Report</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {gradeReports.map((report) => (
//                       <TableRow key={report._id}>
//                         <TableCell className="font-medium">{report.moduleId.name}</TableCell>
//                         <TableCell>
//                           <Badge 
//                             variant="outline" 
//                             className={
//                               report.grade === 'A' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
//                               report.grade === 'B' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
//                               report.grade === 'C' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
//                               report.grade === 'D' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
//                               'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                             }
//                           >
//                             {report.grade}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
//                         <TableCell className="max-w-xs truncate">{report.feedback || "No feedback provided"}</TableCell>
//                         <TableCell>
//                           {report.reportUrl ? (
//                             <Button variant="ghost" size="sm">
//                               <Download className="mr-2 h-4 w-4" />
//                               Download
//                             </Button>
//                           ) : (
//                             "Not available"
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </TabsContent>
//             <TabsContent value="summary">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <Card className="bg-white/80 dark:bg-gray-800/80">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Trophy className="h-5 w-5 text-primary" />
//                       Average Grade
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-3xl font-bold text-primary mb-2">{calculateGPA()}</div>
//                     <Progress 
//                       value={(Number(calculateGPA()) / 5) * 100} 
//                       className="h-2 mb-2" 
//                     />
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Average out of 5.0 scale</p>
//                   </CardContent>
//                 </Card>
                
//                 <Card className="bg-white/80 dark:bg-gray-800/80">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <TrendingUp className="h-5 w-5 text-primary" />
//                       Grade Distribution
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-3">
//                       {Object.entries(gradePoints).map(([grade, points]) => (
//                         <div key={grade} className="flex justify-between items-center">
//                           <span>Grade {grade}:</span>
//                           <span>
//                             {gradeReports.filter(r => r.grade === grade).length}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
                
//                 <Card className="bg-white/80 dark:bg-gray-800/80">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Calendar className="h-5 w-5 text-primary" />
//                       Recent Results
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-3">
//                       {gradeReports
//                         .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//                         .slice(0, 3)
//                         .map(report => (
//                           <div key={report._id} className="flex justify-between">
//                             <span className="truncate">{report.moduleId.name}</span>
//                             <Badge variant="outline">{report.grade}</Badge>
//                           </div>
//                         ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//         <CardFooter className="bg-gray-50 dark:bg-gray-900/50 p-3">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             This is a demo using mock data. In a real application, data would be fetched from the server.
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default GradeReportsTable;