import { useState, useEffect } from 'react';
import ProjectDonut from './ProjectDonut';

const WHITELIST = [
  'Project', 'Experiment', 'Work',
  'Creative', 'Writing', 'Reading', 'Contemplating'
];
const WORK_SUBPROJECTS = ['CA', 'Recording Secretary', 'Meeting'];

export default function App() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/.netlify/functions/projectSummary')
      .then(res => res.json())
      .then(all => {
        // 1) Sum “Work” sub-projects
        const workHours = all
          .filter(p => WORK_SUBPROJECTS.includes(p.project))
          .reduce((sum, p) => sum + p.hours, 0);

        // 2) Build exactly those seven projects
        const rows = WHITELIST.map(name => {
          if (name === 'Work') {
            // Sum the hours for the three sub-projects
            return { project: 'Work', hours: Math.round(workHours * 10) / 10 };
          }
          // Exclude the sub-projects from the main list (so they don't show up as their own rows)
          if (WORK_SUBPROJECTS.includes(name)) {
            return null;
          }
          const found = all.find(p => p.project === name);
          return { project: name, hours: found ? found.hours : 0 };
        }).filter(Boolean);

        // 3) Progress track for donut charts (100h goal)
        const GOAL = 100;
        const gaugeRows = rows.map(({ project, hours }) => ({
          project,
          data: [
            { name: 'Logged',    value: Math.min(hours, GOAL) },
            { name: 'Remaining', value: Math.max(GOAL - hours, 0) }
          ]
        }));
        setData(gaugeRows);
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10">Loading…</div>;
  if (!data || data.length === 0)
    return <div className="p-10">No project data found.</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Ishita's Skill Tracker
      </h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Project</th>
            <th className="border-b px-4 py-2 text-left">Chart</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ project, data }) => (
            <tr key={project}>
              <td className="border-t px-4 py-2">{project}</td>
              <td className="border-t px-4 py-2 w-40 h-40">
                <ProjectDonut data={data} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
