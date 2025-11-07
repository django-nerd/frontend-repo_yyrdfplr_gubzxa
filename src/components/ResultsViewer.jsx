import { useState } from 'react';
import { getResult } from '../api/task-service';

export default function ResultsViewer() {
  const [jobId, setJobId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const check = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    setMessage('');
    try {
      const res = await getResult(jobId.trim());
      setResult(res);
    } catch (err) {
      if (err.status === 404) {
        setMessage('Processing... Result not ready yet.');
      } else {
        setError(err?.message || 'Failed to retrieve result');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={check} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700">Job ID</label>
        <div className="mt-1 flex gap-3">
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="Enter job_id"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 font-mono"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black disabled:opacity-60"
          >
            {loading ? 'Checking...' : 'Check'}
          </button>
        </div>

        {message && <div className="mt-4 p-3 rounded-md bg-amber-50 text-amber-800 text-sm">{message}</div>}
        {error && <div className="mt-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>}

        {result && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800">Result</h3>
            <pre className="mt-2 bg-gray-50 p-3 rounded-lg border text-sm overflow-auto max-h-96"><code>{JSON.stringify(result, null, 2)}</code></pre>
          </div>
        )}
      </form>
    </div>
  );
}
