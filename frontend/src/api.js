// Change these two URLs to your real backend endpoints.
export const DISEASE_API_URL = import.meta.env.VITE_DISEASE_API_URL || 'http://127.0.0.1:5000/predict-disease';
export const BACKEND_TIMEOUT = 15000;

export async function sendBackendRequest(url, payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BACKEND_TIMEOUT);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Server returned ${response.status}`);
    const type = response.headers.get('content-type') || '';
    if (!type.toLowerCase().includes('application/json')) throw new Error('Backend did not return JSON.');
    const data = await response.json();
    if (data === null || data === undefined) throw new Error('Backend returned an empty response.');
    return data;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Backend timeout');
    if (error instanceof TypeError) throw new Error('Cannot connect to the backend. Start your backend and check the API URL.');
    throw error;
  } finally { clearTimeout(timeout); }
}

export function extractResult(data) {
  if (typeof data === 'string') return { disease: data };
  if (!data || typeof data !== 'object') return null;
  return {
    disease: data.disease ?? data.prediction ?? data.predicted_disease ?? data.predictedDisease ?? data.result ?? null,
    percentage: data.risk_percentage ?? data.riskPercentage ?? data.risk_score ?? data.riskScore ?? data.percentage ?? null,
    level: data.risk_level ?? data.riskLevel ?? data.level ?? data.risk ?? null,
    raw: data
  };
}
