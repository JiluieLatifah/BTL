import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { BookingProvider } from './context/BookingContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ClinicList } from './pages/ClinicList';
import { BookingForm } from './pages/BookingForm';
import { Payment } from './pages/Payment';
import { MoMoPay } from './pages/MoMoPay';
import { TicketDetail } from './pages/TicketDetail';

function App() {
  return (
    <BookingProvider>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#ffffff',
            color: '#333',
          },
        }} 
      />
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clinics" element={<ClinicList />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/momo-pay" element={<MoMoPay />} />
          <Route path="/ticket-detail" element={<TicketDetail />} />
       </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;