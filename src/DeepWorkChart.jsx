import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

/**
 * Renders a simple bar chart of deep-work minutes per day.
 * Expects data = [ { date: '2025-07-10', deepMinutes: 120 }, … ]
 */
export default function DeepWorkChart({ data }) {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="deepMinutes" />
    </BarChart>
  );
}
