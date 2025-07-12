// netlify/functions/projectSummary.js

// netlify/functions/projectSummary.js
const TOGGL_TOKEN  = process.env.TOGGL_TOKEN;
const WORKSPACE_ID = process.env.WORKSPACE_ID;

export async function handler() {
  // Hard-code start date:
  const since = '2025-07-01';
  // Until today (YYYY-MM-DD)
  const until = new Date().toLocaleDateString('en-CA');

  const url = new URL('https://api.track.toggl.com/reports/api/v2/summary');
  url.searchParams.set('workspace_id', WORKSPACE_ID);
  url.searchParams.set('since',         since);
  url.searchParams.set('until',         until);
  url.searchParams.set('grouping',      'projects');

  const resp = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${TOGGL_TOKEN}:api_token`).toString('base64')}`
    }
  });

  if (!resp.ok) {
    return { statusCode: resp.status, body: await resp.text() };
  }

  const { data } = await resp.json();

  // Roll up your Work sub-projects
  const WORK_SUBPROJECTS = ['CA', 'Recording Secretary', 'Meeting'];
  const workHours = data
    .filter(p => WORK_SUBPROJECTS.includes(p.title.project))
    .reduce((sum, p) => sum + (p.time / 3600000), 0);

  // Build your whitelist
  const WHITELIST = [
    'Project', 'Experiment', 'Work',
    'Creative', 'Writing', 'Reading', 'Contemplating'
  ];

  const output = WHITELIST.map(name => {
    if (name === 'Work') {
      return { project: 'Work', hours: Math.round(workHours * 10) / 10 };
    }
    const found = data.find(p => p.title.project === name);
    const hours = found ? Math.round((found.time / 3600000) * 10) / 10 : 0;
    return { project: name, hours };
  });

  return {
    statusCode: 200,
    body:       JSON.stringify(output)
  };
}
