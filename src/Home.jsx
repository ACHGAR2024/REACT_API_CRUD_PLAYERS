
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomeContent from './components/HomeContent';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.css';
import Clubs from './pages/Clubs';
import Players from './pages/Players';

function PageWrapper({ children }) {
  return (
    <main className="w-full h-full text-center p-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </main>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Home() {
  return (
    <Router>
      <Nav 
        logo="https://img.icons8.com/?size=100&id=bzf0DqjXFHIW&format=png&color=000000" 
        liste={['Accueil', 'Clubs', 'Players']}
        links={['/', '/clubs', '/players']}
      />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </PageWrapper>
      <Footer />
    </Router>
  );
}
