import { useState } from 'react';
import { Button } from 'antd';
import BookingTable from './components/BookingTable';
import BookingForm from './components/BookingForm';
import './App.css';

const App = () => {
  
  const [showForm, setShowForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateBookingRow, setUpdateBookingRow] = useState(() => () => {});

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
      updateBookingRow((prev) => {
        return prev.map((row) => (row.id === updatedBooking.id ? updatedBooking : row));
      });
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
        <BookingTable
          onEdit={(booking) => handleEditBooking(booking, (updatedBooking) => {
            setSelectedBooking((prevState) => {
              if (prevState && prevState.id === updatedBooking.id) {
                return updatedBooking; // Update the existing booking in state
              }
              return prevState;
            });
          })}
        />
      )}
    </div>
  );
};

export default App;
