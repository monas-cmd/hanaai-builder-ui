import { Outlet } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <AppProvider>
      <div className="app min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;