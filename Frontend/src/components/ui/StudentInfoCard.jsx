// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { School, User } from "lucide-react";

// const StudentInfoCard = ({ studentId, setStudentId, loadMockData }) => {
//   return (
//     <Card className="mb-6 shadow-lg border-0 bg-white/90 dark:bg-gray-800/90">
//       <CardHeader className="space-y-1 pb-3">
//         <CardTitle className="text-xl flex items-center gap-2">
//           <User className="h-5 w-5 text-primary" />
//           Student Information
//         </CardTitle>
//         <CardDescription>Enter your student ID to view grade reports</CardDescription>
//       </CardHeader>
//       <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Student ID</label>
//           <Input
//             placeholder="Enter your A/L student ID"
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//             className="bg-white/70 dark:bg-gray-800/70"
//           />
//         </div>
//         <div className="space-y-2 flex items-end">
//           <Button 
//             onClick={loadMockData} 
//             disabled={!studentId}
//             className="w-full bg-primary hover:bg-primary/90 text-white"
//           >
//             <School className="mr-2 h-4 w-4" />
//             View Grade Reports
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default StudentInfoCard;