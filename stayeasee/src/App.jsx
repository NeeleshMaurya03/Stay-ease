import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Host from './pages/Host';
import Contact from './pages/Contact';
import SignInPage from './pages/SignInPage';
import SearchPage from './pages/SearchPage';
import Detail from './pages/ListingDetail';



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<Host />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/listing/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
