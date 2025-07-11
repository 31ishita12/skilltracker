import { useState, useEffect } from 'react';
import { fetchSessions } from './api';
import DeepWorkChart from './DeepWorkChart';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Get today’s date as YYYY-MM-DD
    // Local YYYY-MM-DD (Canada, ISO format)
const today = new Date().toLocaleDateString('en-CA');


    fetchSessions(today).then(raw => {
      console.log('🔍 raw sessions:', raw);

      // Group and sum “deep” sessions (>=25 min)
      const tally = raw.reduce((acc, session) => {
        const minutes = session.dur / 60000;
        if (minutes >= 25) {
          const day = session.start.slice(0, 10);
          acc[day] = (acc[day] || 0) + Math.round(minutes);
        }
        return acc;
      }, {});

      // Convert to array for the chart
      const chartData = Object.entries(tally).map(([date, deepMinutes]) => ({
        date,
        deepMinutes
      }));

      setData(chartData);
    });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Deep Work Today</h1>
      <DeepWorkChart data={data} />
    </div>
  );
}
