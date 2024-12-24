import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TonLotteryCard from './page/ticket';
import TicketSelector from './page/Random/Rando';
import './App.css';

function App() {
  return (
    <Router>
      {/* <nav style={{ textAlign: 'center', margin: '20px' }}>
        <Link 
          to="/" 
          style={{ marginRight: '20px', color: '#00eaff', textDecoration: 'none' }}
        >
          Ticket Selector
        </Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<TicketSelector />} />
        <Route path="/lottery-ticket/:id" element={<TonLotteryCard />} />
      </Routes>
    </Router>
  );
}

export default App;
