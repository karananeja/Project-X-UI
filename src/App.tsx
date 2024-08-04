import { Toaster } from './components/ui/toaster';
import { AppProvider } from './providers';
import { AppRoutes } from './router';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <Toaster />
    </AppProvider>
  );
}

export default App;
