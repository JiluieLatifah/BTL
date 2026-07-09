import React, { createContext, useContext, useState, ReactNode } from 'react';
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
  verifyOtp: (otp: string) => boolean;
  logout: () => void;
  selectClinic: (clinic: Clinic) => void;
  setConsultation: (details: { specialty: string; service: { name: string; price: number }; room: string; date: string; timeSlot: string }) => void;
  setPatient: (info: { name: string; dob: string; gender: string }) => void;
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

  const setPhoneNumber = (phone: string) => {
    setBookingState(prev => ({
      ...prev,
      user: { phoneNumber: phone, isLoggedIn: false }
    }));
  };

  const verifyOtp = (otp: string) => {
    // Giả lập mã OTP mặc định là 123456 hoặc bất kì mã 6 số nào
    if (otp.length === 6) {
      setBookingState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, isLoggedIn: true } : { phoneNumber: '0912345678', isLoggedIn: true }
      }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setBookingState(prev => ({
      ...prev,
      user: null
    }));
  };

  const selectClinic = (clinic: Clinic) => {
    setBookingState(prev => ({
      ...prev,
      selectedClinic: clinic
    }));
  };

  const setConsultation = (details: {
    specialty: string;
    service: { name: string; price: number };
    room: string;
    date: string;
    timeSlot: string;
  }) => {
    setBookingState(prev => ({
      ...prev,
      specialty: details.specialty,
      service: details.service,
      room: details.room,
      date: details.date,
      timeSlot: details.timeSlot,
    }));
  };

  const setPatient = (info: { name: string; dob: string; gender: string }) => {
    setBookingState(prev => ({
      ...prev,
      patientInfo: info
    }));
  };

  const selectPayment = (method: 'MoMo' | 'ZaloPay' | 'VNPAY') => {
    setBookingState(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const generateTicket = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `PK-2026-${randomNum}`;
    setBookingState(prev => ({
      ...prev,
      ticketId: newId
    }));
    return newId;
  };

  const resetBooking = () => {
    setBookingState(prev => ({
      ...defaultState,
      user: prev.user // Giữ lại thông tin user đã đăng nhập
    }));
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
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
