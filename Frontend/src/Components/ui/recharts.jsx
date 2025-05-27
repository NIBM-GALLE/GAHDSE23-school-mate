import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const GradeChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="module" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="gradeValue" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default GradeChart;
