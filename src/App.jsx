import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import Layout from './components/Layout';
import Home from './components/Home';
import ChapterView from './components/ChapterView';
import ActivityView from './components/ActivityView';

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapter/:id" element={<ChapterView />} />
            <Route path="/chapter/:id/:type" element={<ActivityView />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;
