// No import needed—use the global fetch

// We pull your secret values from environment variables:
const TOGGL_TOKEN = process.env.TOGGL_TOKEN;
const WORKSPACE_ID = process.env.WORKSPACE_ID;

export async function handler(event) {
  const date = event.queryStringParameters.date; // e.g. "2025-07-10"

  const resp = await fetch(
    `https://api.track.toggl.com/reports/api/v2/details?workspace_id=${WORKSPACE_ID}&since=${date}&until=${date}`,
    {
      headers: {
        Authorization: `Basic ${Buffer
          .from(`${TOGGL_TOKEN}:api_token`)
          .toString('base64')}`
      }
    }
  );

  if (!resp.ok) {
    return {
      statusCode: resp.status,
      body: await resp.text()
    };
  }

  const { data } = await resp.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
