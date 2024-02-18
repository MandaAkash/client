import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../services/helper';
const Addavailabledates = () => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://server-e37o.onrender.com/api/add-available-date', { date });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('This date is already filled');
    }
  };

  return (
    <div>
      <h2>Add Available Date</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Date</button>
      </form>
      <p>{message}</p>
    </div>
  );
};
export default Addavailabledates;
