import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SvgDefs } from './components/ui';
import { useRoute } from './lib/router';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

const PAGES = { home: Home, services: Services, about: About, contact: Contact };

function App() {
  const { page } = useRoute();
  const Page = PAGES[page];

  return (
    <div className="flex min-h-screen flex-col">
      <SvgDefs />
      <Header currentPage={page} />
      <main className="flex-grow">
        <div key={page} className="page-enter">
          <Page />
        </div>
      </main>
      <Footer currentPage={page} />
    </div>
  );
}

export default App;
