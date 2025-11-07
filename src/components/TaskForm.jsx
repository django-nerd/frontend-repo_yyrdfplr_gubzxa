import { useState } from 'react';
import { createTask, generateUUID } from '../api/task-service';

export default function TaskForm() {
  const [jobId, setJobId] = useState('');
  const [taskType, setTaskType] = useState('example');
  const [dataText, setDataText] = useState('');
  const [workSeconds, setWorkSeconds] = useState(2);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      let parsedData = undefined;
      if (dataText.trim()) {
        try {
          parsedData = JSON.parse(dataText);
        } catch (err) {
          throw new Error('Data must be valid JSON');
        }
      }
      const payload = {
        job_id: jobId.trim() ? jobId.trim() : generateUUID(),
        task_type: taskType.trim(),
        data: parsedData ?? {},
        work_seconds: Number(workSeconds) || 2,
      };
      const res = await createTask(payload);
      setResult(res);
      setJobId(payload.job_id);
    } catch (err) {
      setError(err?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={onSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job ID (optional)</label>
            <input
              type="text"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              placeholder="Auto-generated if empty"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Type</label>
            <input
              type="text"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Data (JSON)</label>
          <textarea
            value={dataText}
            onChange={(e) => setDataText(e.target.value)}
            rows={6}
            placeholder='{"key":"value"}'
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 font-mono text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Provide a JSON object that your worker expects.</p>
        </div>

        <div className="mt-4 max-w-xs">
          <label className="block text-sm font-medium text-gray-700">Work Seconds</label>
          <input
            type="number"
            min={1}
            value={workSeconds}
            onChange={(e) => setWorkSeconds(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Task'}
          </button>
          {jobId && (
            <span className="text-sm text-gray-600">Current job_id: <span className="font-mono">{jobId}</span></span>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>
        )}
        {result && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800">Submitted</h3>
            <pre className="mt-2 bg-gray-50 p-3 rounded-lg border text-sm overflow-auto max-h-64"><code>{JSON.stringify(result, null, 2)}</code></pre>
          </div>
        )}
      </form>
    </div>
  );
}
