const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

async function handleResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    const error = new Error((body && body.detail) || res.statusText);
    error.status = res.status;
    error.body = body;
    throw error;
  }
  return body;
}

export async function createTask(payload) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function getResult(jobId) {
  const res = await fetch(`${BASE_URL}/results/${encodeURIComponent(jobId)}`);
  if (res.status === 404) {
    const error = new Error('Result not ready');
    error.status = 404;
    throw error;
  }
  return handleResponse(res);
}

export function generateUUID() {
  // RFC4122 v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
