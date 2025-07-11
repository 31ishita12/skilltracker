import axios from 'axios';

const BASE = import.meta.env.DEV
  ? 'http://localhost:8888/.netlify/functions/deeplog'
  : '/.netlify/functions/deeplog';

export async function fetchSessions(date) {
  const res = await axios.get(`${BASE}?date=${date}`);
  return res.data;
}
