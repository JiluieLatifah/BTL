import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Clinic } from '../services/mockData';

export interface BookingState {
  user: {
    phoneNumber: string;
    isLoggedIn: boolean;
  } | null;
  selectedClinic: Clinic | null;
  specialty: string;
  service: { name: string; price: number } | null;
  room: string;
  date: string;
  timeSlot: string;
  patientInfo: {
    name: string;
    dob: string;
    gender: string;
  } | null;
  paymentMethod: 'MoMo' | 'ZaloPay' | 'VNPAY' | null;
  ticketId: string;
}

interface BookingContextProps {
  bookingState: BookingState;
  setPhoneNumber: (phone: string) => void;
  verifyOtp: (otp: string, isNewUser: boolean) => void; // Cập nhật
  logout: () => void;
  selectClinic: (clinic: Clinic) => void;
  setConsultation: (details: any) => void;
  setPatient: (info: any) => void;
  selectPayment: (method: 'MoMo' | 'ZaloPay' | 'VNPAY') => void;
  generateTicket: () => string;
  resetBooking: () => void;
}

const defaultState: BookingState = {
  user: null,
  selectedClinic: null,
  specialty: '',
  service: null,
  room: '',
  date: '',
  timeSlot: '',
  patientInfo: null,
  paymentMethod: null,
  ticketId: '',
};

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingState, setBookingState] = useState<BookingState>(defaultState);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setBookingState(prev => ({ ...prev, user: JSON.parse(savedUser) }));
    }
  }, []);

  const setPhoneNumber = (phone: string) => {
    setBookingState(prev => ({
      ...prev,
      user: { phoneNumber: phone, isLoggedIn: false }
    }));
  };

  const verifyOtp = (otp: string, isNewUser: boolean) => {
    if (otp.length === 6) {
      const newUser = { phoneNumber: bookingState.user?.phoneNumber || '0912345678', isLoggedIn: true };
      localStorage.setItem('user', JSON.stringify(newUser));
      setBookingState(prev => ({ ...prev, user: newUser }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setBookingState(prev => ({ ...prev, user: null }));
  };

  const selectClinic = (clinic: Clinic) => setBookingState(prev => ({ ...prev, selectedClinic: clinic }));
  const setConsultation = (details: any) => setBookingState(prev => ({ ...prev, ...details }));
  const setPatient = (info: any) => setBookingState(prev => ({ ...prev, patientInfo: info }));
  const selectPayment = (method: any) => setBookingState(prev => ({ ...prev, paymentMethod: method }));

  const generateTicket = () => {
    const newId = `PK-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingState(prev => ({ ...prev, ticketId: newId }));
    return newId;
  };

  const resetBooking = () => {
    setBookingState(prev => ({ ...defaultState, user: prev.user }));
  };

  return (
    <BookingContext.Provider
      value={{
        bookingState,
        setPhoneNumber,
        verifyOtp,
        logout,
        selectClinic,
        setConsultation,
        setPatient,
        selectPayment,
        generateTicket,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};