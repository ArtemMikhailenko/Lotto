import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Ваши компоненты
import TonLotteryCard from './page/ticket';         // Лотерейный билет
import TicketSelector from './page/Random/Rando'; // Компонент выбора билета
import './App.css';

function App() {
  return (
    <Router>
      {/* Небольшая навигация для примера */}
      <nav style={{ textAlign: 'center', margin: '20px' }}>
        <Link 
          to="/" 
          style={{ 
            marginRight: '20px', 
            color: '#00eaff',
            textDecoration: 'none'
          }}
        >
          Ticket Selector
        </Link>
        
        <Link 
          to="/lottery-ticket" 
          style={{ 
            color: '#00eaff', 
            textDecoration: 'none' 
          }}
        >
          Lottery Ticket
        </Link>
      </nav>

      <Routes>
        {/* При переходе по адресу "/" будет рендериться TicketSelector */}
        <Route path="/" element={<TicketSelector />} />

        {/* При переходе по адресу "/lottery-ticket" будет рендериться TonLotteryCard */}
        <Route path="/lottery-ticket" element={<TonLotteryCard />} />
      </Routes>
    </Router>
  );
}

export default App;
