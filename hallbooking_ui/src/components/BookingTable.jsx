import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { getAllBookings, deleteBooking } from '../services/api';

const BookingTable = ({ onEdit }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      message.error('Failed to fetch bookings.');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      message.success('Booking deleted successfully!');
      fetchBookings();
    } catch (error) {
      message.error('Failed to delete booking.');
      console.error(error);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Applicant Name', dataIndex: 'applicantName', key: 'applicantName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Mobile No', dataIndex: 'mobileNo', key: 'mobileNo' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Rent', dataIndex: 'rent', key: 'rent' },
    { title: 'Additional Charges', dataIndex: 'additionalCharges', key: 'additionalCharges' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    { title: 'Hall Name', dataIndex: 'hallName', key: 'hallName' },
    { title: 'Booking Type', dataIndex: 'bookingType', key: 'bookingType' },
    { title: 'Time Slot', dataIndex: 'timeSlot', key: 'timeSlot' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Receipt No', dataIndex: 'receiptNo', key: 'receiptNo' },
    { title: 'Receipt Date', dataIndex: 'receiptDate', key: 'receiptDate' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>Update</Button>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding:'20px',
      paddingTop:'50px'
    }}>
      <h1 style={{
        marginBottom: '20px',
        color: '#495057',
        fontWeight: 'bold',
        fontSize: '2rem',
        textAlign: 'center',
      }}>
        Hall Booking Management
      </h1>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto', // Enable horizontal scroll
      }}>
        <Button type="primary" style={{ marginBottom: '20px' }} onClick={() => onEdit(null)}>
          Add New Booking
        </Button>
        <div style={{ overflowX: 'auto' }}>
          <Table
            dataSource={bookings}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            bordered
            style={{ minWidth: '1500px' }} // Set minimum width for the table
          />
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
