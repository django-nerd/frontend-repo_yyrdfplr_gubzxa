import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-6 md:px-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight">
            Distributed Task Network
          </h1>
          <p className="mt-3 md:mt-4 text-gray-600 max-w-2xl mx-auto">
            Minimal, responsive tools to submit tasks, track results, and monitor your workers.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/30" />
    </section>
  );
}
