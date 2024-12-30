import { useState } from 'react'
import { Button } from 'antd';
import BookingTable from './components/BookingTable';
import BookingForm from './components/BookingForm';
import './App.css'

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateBookingRow, setUpdateBookingRow] = useState(null);

  const handleAddNewBooking = () => {
    setSelectedBooking(null);
    setShowForm(true);
  };

  const handleEditBooking = (booking, updateRowCallback) => {
    setSelectedBooking(booking);
    setUpdateBookingRow(() => updateRowCallback);
    setShowForm(true);
  };

  const handleFormClose = (updatedBooking) => {
    setShowForm(false);
    if (updatedBooking && updateBookingRow) {
      updateBookingRow(updatedBooking);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {showForm ? (
        <BookingForm
          selectedBooking={selectedBooking}
          onClose={handleFormClose}
        />
      ) : (
        <BookingTable onEdit={(booking) => handleEditBooking(booking, updateBookingRow)} />
      )}
    </div>
  );
};

export default App;
