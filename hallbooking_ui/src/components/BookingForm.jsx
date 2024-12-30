import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import moment from 'moment';
import { createBooking, updateBooking, getAllBookings } from '../services/api';

const BookingForm = ({ selectedBooking, onClose }) => {
  const [form] = Form.useForm();
  const halls = ['Hall A', 'Hall B', 'Hall C', 'Hall D'];
  const timeSlots = ['Morning 8:00am-3:00pm', 'Afternoon 3:30pm-6:00pm', 'Evening 6:00pm onwards'];
  const statusOptions = ['Advance Pending', 'Waiting', 'Confirmed'];
  const [lastReceiptNo, setLastReceiptNo] = useState(null);

  // Fetch last receipt number on component mount
  useEffect(() => {
    const fetchLastReceiptNo = async () => {
      const bookings = await getAllBookings();
      if (bookings && bookings.length > 0) {
        const lastBooking = bookings[bookings.length - 1];
        setLastReceiptNo(lastBooking.receiptNo);
      } else {
        setLastReceiptNo('MBMC17122403000'); // Initial receipt number
      }
    };

    fetchLastReceiptNo();
  }, []);

  useEffect(() => {
    if (selectedBooking) {
      form.setFieldsValue({
        ...selectedBooking,
        startDate: moment(selectedBooking.startDate),
        endDate: moment(selectedBooking.endDate),
        receiptDate: moment(selectedBooking.receiptDate),
      });
    } else {
      form.setFieldsValue({
        startDate: moment(),
        endDate: moment(),
        receiptDate: moment(),
        receiptNo: generateNextReceiptNo(),
      });
    }
  }, [selectedBooking, form, lastReceiptNo]);

  // Generate the next receipt number based on the last receipt number
  const generateNextReceiptNo = () => {
    if (!lastReceiptNo) return 'MBMC17122403001'; // Default initial receipt number
    const prefix = lastReceiptNo.slice(0, -3);
    const number = parseInt(lastReceiptNo.slice(-3), 10) + 1;
    return `${prefix}${String(number).padStart(3, '0')}`;
  };

  // Disable past dates for receipt date
  const disabledReceiptDate = (current) => {
    return current && current < moment().startOf('day');
  };

  // Disable past dates for start date
  const disabledStartDate = (current) => {
    return current && current <= moment().startOf('day');
  };

  // Disable dates earlier than start date for end date
  const disabledEndDate = (current) => {
    const startDate = form.getFieldValue('startDate');
    if (!startDate) {
      return current && current < moment().startOf('day');
    }
    return current && current <= moment(startDate).startOf('day');
  };

  // Enforce input limits
  const enforceInputLimit = (e, maxDigits) => {
    if (e.target.value.length > maxDigits) {
      e.target.value = e.target.value.slice(0, maxDigits);
    }
  };

  const onFinish = async (values) => {
    try {
      const bookingData = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
        receiptDate: values.receiptDate.format('YYYY-MM-DD'),
        receiptNo: form.getFieldValue('receiptNo'), // Use generated receipt number
      };

      if (selectedBooking) {
        await updateBooking(selectedBooking.id, bookingData);
        message.success('Booking updated successfully!');
      } else {
        await createBooking(bookingData);
        message.success('Booking created successfully!');
        setLastReceiptNo(bookingData.receiptNo); // Update last receipt number after successful submission
      }

      onClose();
    } catch (error) {
      message.error('Failed to save booking. Please try again.');
      console.error(error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '0px',
      overflowY: 'auto',
      backgroundColor: '#f5f5f5',
    }}>
      <div style={{
        width: '600px',
        padding: '30px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        borderRadius: '8px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
          {selectedBooking ? 'Update Booking' : 'Add New Booking'}
        </h2>
        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          style={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
          <Form.Item
            name="applicantName"
            label="Applicant Name"
            rules={[{ required: true, message: 'Please enter applicant name' }]}
          >
            <Input placeholder="Enter applicant name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', required: true, message: 'Please enter a valid email' }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="mobileNo"
            label="Mobile No"
            rules={[{ required: true, message: 'Please enter a valid 10-digit number' }]}
          >
            <Input
              type="number"
              placeholder="Enter mobile number"
              maxLength={10}
              onInput={(e) => enforceInputLimit(e, 10)}
            />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
              disabledDate={disabledStartDate}
              onChange={() => form.validateFields(['endDate'])}
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            dependencies={['startDate']}
            rules={[
              { required: true, message: 'Please select end date' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.isSameOrAfter(getFieldValue('startDate'))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('End Date must be equal to or later than Start Date')
                  );
                },
              }),
            ]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
              disabledDate={disabledEndDate}
            />
          </Form.Item>

          <Form.Item
            name="rent"
            label="Rent"
            initialValue={0}
            rules={[{ required: true, message: 'Please enter rent' }]}
          >
            <Input
              type="number"
              placeholder="Enter rent amount"
              maxLength={7}
              onInput={(e) => enforceInputLimit(e, 7)}
            />
          </Form.Item>

          <Form.Item
            name="additionalCharges"
            label="Additional Charges"
            initialValue={0}
          >
            <Input
              type="number"
              placeholder="Enter additional charges"
              maxLength={7}
              onInput={(e) => enforceInputLimit(e, 7)}
            />
          </Form.Item>

          <Form.Item
            name="total"
            label="Total"
          >
            <Input disabled placeholder="Auto-calculated total" />
          </Form.Item>

          <Form.Item
            name="hallName"
            label="Hall Name"
            rules={[{ required: true, message: 'Please select hall name' }]}
          >
            <Select placeholder="Select">
              <Select.Option value="Select" disabled>Select</Select.Option>
              {halls.map((hall) => <Select.Option key={hall} value={hall}>{hall}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            name="bookingType"
            label="Booking Type"
          >
            <Select placeholder="Select">
              <Select.Option value="Select" disabled>Select</Select.Option>
              <Select.Option value="Online">Online</Select.Option>
              <Select.Option value="Offline">Offline</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timeSlot"
            label="Time Slot"
          >
            <Select placeholder="Select">
              <Select.Option value="Select" disabled>Select</Select.Option>
              {timeSlots.map((slot) => <Select.Option key={slot} value={slot}>{slot}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select">
              <Select.Option value="Select" disabled>Select</Select.Option>
              {statusOptions.map((status) => <Select.Option key={status} value={status}>{status}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            name="receiptNo"
            label="Receipt No"
            rules={[{ required: true, message: 'Receipt number is required' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="receiptDate"
            label="Receipt Date"
            rules={[{ required: true, message: 'Please select receipt date' }]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
              disabledDate={disabledReceiptDate}
            />
          </Form.Item>

          <Form.Item
            name="remark"
            label="Remark"
            rules={[{ required: true, max: 200, message: 'Maximum 200 characters allowed' }]}
          >
            <Input.TextArea maxLength={200} placeholder="Enter remarks" />
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
              {selectedBooking ? 'Update' : 'Add'} Booking
            </Button>
            <Button type="default" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;
