// src/ProjectDonut.jsx
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const PROJECT_COLORS = {
  Project:    '#1f77b4',
  Experiment: '#2ca02c',
  Work:       '#ff7f0e',
  Creative:   '#d62728',
  Writing:    '#9467bd',
  Reading:    '#8c564b',
  Contemplating: '#17becf',
};
const REMAINING_GRADIENTS = {
  Project: 'remainingBlue',
  Experiment: 'remainingPurple',
  Work: 'remainingOrange',
  Creative: 'remainingPink',
  Writing: 'remainingYellow',
  Reading: 'remainingRed',
  Contemplating: 'remainingWhite',
};

export default function ProjectDonut({ data }) {
  // Find the project name from the parent row (App passes data as [{name:..., value:...}, ...])
  // We'll try to infer the project name from the parent cell if possible, else fallback to blue.
  const projectName = (data && data.length && data[0].project) || (window && window.__currentProjectName) || 'Project';
  // Try to get the color for this project
  const LOGGED_COLOR = PROJECT_COLORS[projectName] || '#1f77b4';

  return (
    <PieChart width={160} height={160}>
      <defs>
        {/* Metallic gradient for the logged portion, but colored per project */}
        <linearGradient id="metallicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="20%" stopColor={LOGGED_COLOR} />
          <stop offset="45%" stopColor="#f8f8f8" />
          <stop offset="60%" stopColor={LOGGED_COLOR} />
          <stop offset="80%" stopColor="#e0e0e0" />
          <stop offset="100%" stopColor={LOGGED_COLOR} />
        </linearGradient>
        {/* Metallic gradients for remaining by project */}
        <linearGradient id="remainingBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b3c6e7" />
          <stop offset="50%" stopColor="#5a8fd6" />
          <stop offset="100%" stopColor="#e0e8f3" />
        </linearGradient>
        <linearGradient id="remainingPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d1b3e7" />
          <stop offset="50%" stopColor="#a259d9" />
          <stop offset="100%" stopColor="#f3e0fa" />
        </linearGradient>
        <linearGradient id="remainingOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe0b3" />
          <stop offset="50%" stopColor="#ffb347" />
          <stop offset="100%" stopColor="#fff3e0" />
        </linearGradient>
        <linearGradient id="remainingPink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7b3e7" />
          <stop offset="50%" stopColor="#e75480" />
          <stop offset="100%" stopColor="#fae0f3" />
        </linearGradient>
        <linearGradient id="remainingYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff9b3" />
          <stop offset="50%" stopColor="#ffe347" />
          <stop offset="100%" stopColor="#fffbe0" />
        </linearGradient>
        <linearGradient id="remainingRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7b3b3" />
          <stop offset="50%" stopColor="#e75454" />
          <stop offset="100%" stopColor="#fae0e0" />
        </linearGradient>
        <linearGradient id="remainingWhite" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8f8f8" />
          <stop offset="50%" stopColor="#e0e0e0" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius="40%"
        outerRadius="60%"
        paddingAngle={2}
        label={false}
      >
        <Cell key="logged" fill="url(#metallicGrad)" stroke="#888" strokeWidth={1.5} />
        <Cell key="remaining" fill={`url(#${REMAINING_GRADIENTS[projectName] || 'remainingBlue'})`} stroke="#ccc" strokeWidth={1} />
      </Pie>
      <Tooltip
        formatter={(value, name) =>
          name === 'Logged'
            ? [`${value} hour${value !== 1 ? 's' : ''} completed`, 'Logged']
            : [`${value} hour${value !== 1 ? 's' : ''} remaining`, 'Remaining']
        }
      />
    </PieChart>
  );
}
