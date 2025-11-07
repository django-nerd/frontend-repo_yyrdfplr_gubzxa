export default function Monitoring() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Monitoring</h2>
        <p className="mt-1 text-gray-600">Quick access to your system tools.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noreferrer"
            className="block p-4 rounded-lg border hover:border-gray-900 transition-colors"
          >
            <div className="text-sm font-medium text-gray-800">FastAPI Docs</div>
            <div className="text-xs text-gray-600">Explore and test your API endpoints.</div>
          </a>
          <a
            href="http://localhost:5555"
            target="_blank"
            rel="noreferrer"
            className="block p-4 rounded-lg border hover:border-gray-900 transition-colors"
          >
            <div className="text-sm font-medium text-gray-800">Flower UI</div>
            <div className="text-xs text-gray-600">Monitor Celery tasks and workers.</div>
          </a>
        </div>
      </div>
    </div>
  );
}
