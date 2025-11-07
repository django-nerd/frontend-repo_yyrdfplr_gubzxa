import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';
import ResultsViewer from './components/ResultsViewer';
import Monitoring from './components/Monitoring';

function Container({ children }) {
  return <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">{children}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 text-gray-900">
        <NavBar />
        <Hero />
        <Container>
          <Routes>
            <Route path="/" element={<TaskForm />} />
            <Route path="/results" element={<ResultsViewer />} />
            <Route path="/monitoring" element={<Monitoring />} />
          </Routes>
        </Container>
        <footer className="mt-auto py-8 text-center text-xs text-gray-500">Built for the Distributed Task Network</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
