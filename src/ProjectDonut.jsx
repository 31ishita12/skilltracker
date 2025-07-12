// src/ProjectDonut.jsx
import { PieChart, Pie, Cell } from 'recharts';

const BASE_COLORS = [ /* … */ ];

export default function ProjectDonut({ data }) {
  return (
    <PieChart width={160} height={160}>
      <defs>
        {data.map((_, i) => {
          const color = BASE_COLORS[i % BASE_COLORS.length];
          return (
            <radialGradient
              key={i}
              id={`grad${i}`}
              cx="50%" cy="50%" r="75%"
              fx="50%" fy="50%"
            >
              <stop offset="0%"  stopColor="#fff" stopOpacity={0.3} />
              <stop offset="60%" stopColor={color} stopOpacity={0.8} />
              <stop offset="100%" stopColor={color} stopOpacity={1} />
            </radialGradient>
          );
        })}
      </defs>
      <Pie
        data={data}
        dataKey="hours"
        nameKey="project"
        cx="50%"
        cy="50%"
        innerRadius="40%"
        outerRadius="60%"
        paddingAngle={2}
        label={false}
      >
        {data.map((_, i) => (
          <Cell key={i} fill={`url(#grad${i})`} stroke="#333" strokeWidth={1} />
        ))}
      </Pie>
    </PieChart>
  );
}
