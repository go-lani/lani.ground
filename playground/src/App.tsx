import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Lnb from './test/common/Lnb';

function App() {
  const location = useLocation();

  return (
    <main className="relative flex min-h-[100dvh] flex-col bg-neutral-900 p-8 text-white md:flex-row md:items-start md:justify-center">
      <nav className="mb-14 w-full md:sticky md:top-8 md:mb-0 md:mr-auto md:max-w-[300px]">
        <Lnb />
      </nav>
      <div className="mr-auto w-full md:max-w-[800px]">
        {location.key === 'default' && (
          <h1 className="mb-14 text-3xl font-bold">Welcome to @lani.ground</h1>
        )}
        <Outlet />
      </div>
    </main>
  );
}

export default App;
