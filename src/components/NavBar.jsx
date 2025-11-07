import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Submit Task' },
  { to: '/results', label: 'Results' },
  { to: '/monitoring', label: 'Monitoring' },
];

export default function NavBar() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="text-sm font-semibold tracking-wide text-gray-800">DTN</div>
          <div className="flex gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  pathname === l.to
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
